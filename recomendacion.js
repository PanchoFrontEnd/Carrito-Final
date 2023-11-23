const recomendacion = ["Refresco de coco mango", "Refresco de frutilla", "Refresco de limón"]

const [a, b] = recomendacion

let boton = document.getElementById("boton2")
boton.onclick = () => {
    recomendacion.length !== 0 && Swal.fire({
        title: 'Recomendacion del dia!',
        text: 'Refresco de coco mango, refresco de frutilla y refresco de limón. ¿Qué esperas para probrarlos?',
    })
}

function productosRecomendacion() {
    fetch('recomendacion.json')
        .then(response => response.json())
        .then(bebida => {
            bebida.forEach(bebida =>{
             document.getElementById("tarjeta2").innerHTML+=`  
            <div class="card" style="width: 300px;">
            <h3> ${bebida.title} </h3>  
            <img src="${bebida.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h4>${bebida.price}</h4>
            `
            });
        });
}