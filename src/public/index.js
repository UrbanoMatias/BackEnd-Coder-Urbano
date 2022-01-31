const socket = io();
//------------------------------SOCKET--------------------------
socket.on('updateProd',data=>{
    console.log(data)
    let products = data.payload;
    fetch('templates/prodTable.handlebars').then(string=>string.text()).then(template=>{
        const processedTemplate = Handlebars.compile(template);
        const templateObject={
            products:products
        }
        const html = processedTemplate(templateObject);
        let div = document.getElementById('prodTable');
        div.innerHTML=html;
    })
})

//------------------------------fIN DE SOCKET-------------------


document.addEventListener('submit',enviarFormulario);

function enviarFormulario(event){
    event.preventDefault();
    let form = document.getElementById('productForm');
    let data = new FormData(form);
    fetch('/api/products',{
        method:'POST',
        body:data
    }).then(result=>{
        return result.json();
    }).then(json=>{
        Swal.fire({
            title:"Exito",
            text:json.message,
            icon:"success",
            timer:2000,
        }).then(result=>{
            // location.href='/'
        })
    })
}