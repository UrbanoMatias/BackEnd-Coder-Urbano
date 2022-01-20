const socket = io();
// NORMALIZR

const users = new normalizr.schema.Entity('users',{},{idAttribute:'_id'});
    const messages = new normalizr.schema.Entity('messages',{
        user:users
    },{idAttribute:'_id'});
    const parentObject = new normalizr.schema.Entity('parent',{
        messages:[messages]
    });

// FIN NORMALIZR

let user;
fetch('/api/users/currentUser').then(result=>result.json()).then(json=>{
    user = json;
    console.log(user)
})

let input = document.getElementById('message');
input.addEventListener('keyup',(event)=>{
    if(event.key==="Enter"){
        if(event.target.value){
            socket.emit('message',{message:event.target.value})
            event.target.value="";
        }
    }
})
socket.on('messagesLog',data=>{
    let p = document.getElementById("log");
    let denormalizedData = normalizr.denormalize(data.result,parentObject,data.entities)
    let messages = denormalizedData.messages.map(messages=>{
        return `<div><spam>${messages.user.username} dice: ${messages.text}</spam></div>`
    }).join('');
    p.innerHTML=messages;
})