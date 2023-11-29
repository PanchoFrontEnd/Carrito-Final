const productos = [{
    id: 1,
    bebida: "Refresco de coco mango",
    descripcion: "Contiene jugo de mango con trozos gelatinados de coco. Bebida de 340ml",
    imagen: "assets/image/cocolata.png",
    precio: 1750,
    cantidad: 1
}, {
    id: 2,
    bebida: "Refresco de frutilla",
    descripcion: "Bebida Olipop sabor frutilla y Vainilla. Contiene 355ml",
    imagen: "assets/image/frutillalata.png",
    precio: 1250,
    cantidad: 1

}, {
    id: 3,
    bebida: "Refresco de sandía",
    descripcion: "Refrescante bebida de sandía. Contiene 350ml",
    imagen: "assets/image/sandialata.png",
    precio: 1300,
    cantidad: 1
}, {
    id: 4,
    bebida: "Refresco de melón",
    descripcion: "Soda de melón, contiene 350ml",
    imagen: "assets/image/melon.jpg",
    precio: 750,
    cantidad: 1
}, {
    id: 5,
    bebida: "Refresco de durazno",
    descripcion: "Refresco de durazno y coco de 340ml",
    imagen: "assets/image/durazno.jpg",
    precio: 1150,
    cantidad: 1
}, {
    id: 6,
    bebida: "Refresco de uva",
    descripcion: "Refrescante bebida sabor uva. Contiene 345ml",
    imagen: "assets/image/uva.jpg",
    precio: 920,
    cantidad: 1
}, {
    id: 7,
    bebida: "Refresco de limón",
    descripcion: "Refrescante bebida de limón, se puede combinar. De 340ml",
    imagen: "assets/image/limon.jpg",
    precio: 1890,
    cantidad: 1
}, {
    id: 8,
    bebida: "Refresco de Cherry Lime",
    descripcion: "Refrescante bebida sabor Cherry lime, 355ml",
    imagen: "assets/image/kiwi.jpg",
    precio: 1450,
    cantidad: 1
}];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


function renderizarProductos(productos) {
    let container = document.getElementById("contenedor-tarjetas");

    for (const producto of productos) {
        let productoBebida = document.createElement("div");

        productoBebida.innerHTML = `
                <div class="producto-bebida"> 
                <h3 class="nombre"><strong>${producto.bebida}</strong></h3>
                <img class="producto-img" src="${producto.imagen}">
                <div class="contenido">
                <div class="contenido-texto">
                <p class="descripcion"> Descripción: ${producto.descripcion}</p>
                <p> <strong>Precio: $${producto.precio}</strong></p>
                </div>
                <div class="contenido-boton"
                <button type="button" class="btn btn-outline-warning" id="btnañadir${producto.id}">AGREGAR AL CARRITO</button>
                </div>
                </div>
                </div>`;
        container.appendChild(productoBebida);
    }
     productos.forEach(producto => {
        document.getElementById(`btnañadir${producto.id}`).addEventListener("click", function () {
            agregarAlCarrito(producto);
        });

     });

}

renderizarProductos(productos);


const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify (carrito));

};


renderizarCarrito(carrito);



