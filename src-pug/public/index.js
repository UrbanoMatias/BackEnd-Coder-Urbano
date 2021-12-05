document.addEventListener('submit',enviarFormulario);

function enviarFormulario(event){
    event.preventDefault();
    let form = document.getElementById('productForm');
    let data = new FormData(form);
    let name = data.get('name');
    let precio = data.get('precio');
    let Object ={
        name:name,
        precio:precio
    }
    fetch('api/products',{
        method:'POST',
        body:Object,
        headers:{
            'Content-type':'application/json'
        }
    }).then(result=>{
        return result.json();
    }).then(json=>{
        Swal.fire({
            title:"Exito",
            text:json.message,
            icon:"success",
            timer:2000,
        }).then(result=>{
            location.href='/'
        })
    })
}