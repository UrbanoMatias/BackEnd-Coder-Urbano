let form = document.getElementById("loginForm");
form.addEventListener("submit",function(event){
    event.preventDefault();
    let info = new FormData(form);
    let sendObject={
        username:info.get('username'),
        password:info.get('password')
    }
    fetch('/api/users/login',{
        method:"POST",
        body:JSON.stringify(sendObject),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>result.json()).then(json=>{
        console.log(json);
        location.replace('../pages/chat.html')
    })

})