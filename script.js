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

const container = document.getElementById("contenedor-tarjetas");
const tablaBody = document.getElementById("tablabody");
const precioTexto = document.getElementById("#precio-texto");


function renderizarProductos() {
    container.innerHTML = "";
    for (const producto of productos) {
        const productoBebida = document.createElement("div");

        productoBebida.innerHTML = `
        <div class="producto-bebida"> 
          <h3 class="nombre"><strong>${producto.bebida}</strong></h3>
          <img class="producto-img" src="${producto.imagen}">
          <div class="contenido">
            <div class="contenido-texto">
              <p class="descripcion"> Descripción: ${producto.descripcion}</p>
              <p> <strong>Precio: $${producto.precio}</strong></p>
            </div>
            <div class="contenido-boton">
              <button type="button" class="btn btn-outline-warning" id="btnañadir${producto.id}">AGREGAR AL CARRITO</button>
            </div>
          </div>
        </div>`;
  
      container.appendChild(productoBebida);

      document.getElementById(`btnañadir${producto.id}`).addEventListener("click", () => {
        agregarAlCarrito(producto);
      });
    }
}

function agregarAlCarrito(productoNuevo) {
    const productoEncontrado = carrito.find((p) => p.id === productoNuevo.id);
    if (productoEncontrado) {
      productoEncontrado.cantidad += 1;
    } else {
        carrito.push(productoNuevo);
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Agregaste ${productoNuevo.bebida} al carrito!`,
            showConfirmButton: false,
            timer: 1500
          })
        localStorage.setItem("carrito", JSON.stringify(carrito));
        saveLocal();
        actualizarCarrito();
        document.querySelector("#precio-texto").innerText = (`
        Precio total: $${obtenerPrecioTotal()}`);

        carrito.forEach(producto => {
            document.getElementById(`btnelim${producto.id}`).addEventListener("click", function () {
                eliminarDelCarrito(producto.id);
            });
        })
    }

    saveLocal();
    actualizarCarrito();
}


function saveLocal() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }


function actualizarCarrito() {
    tablaBody.innerHTML = "";
    for (const producto of carrito) {
      tablaBody.innerHTML += `
        <tr>
          <td>${producto.cantidad}</td>
          <td>${producto.bebida}</td>
          <td>$${producto.precio}</td>
          <td>$${producto.precio * producto.cantidad}</td>
          <td><button class="boton-eliminar-producto btn btn-outline-danger" type="button" id="btnelim${producto.id}"><i class="fa-solid fa-trash"></i></button></td>
        </tr>`;
    }

    for (const producto of carrito) {
        document.getElementById(`btnelim${producto.id}`).addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
        });
    }

    precioTexto.innerText = `Precio total: $ ${obtenerPrecioTotal()}`;
}

function eliminarDelCarrito(id) {
    Swal.fire({
        title: "Estás seguro?",
        text: "Este producto se va a eliminar del carrito",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar",
    }).then((result) => {
     if (result.isConfirmed) {
         carrito = carrito.filter((producto) => producto.id !== id);
        saveLocal();
        actualizarCarrito();
        Swal.fire("Listo!", "Este producto fue eliminado", "success");
      } else {
         Swal.fire("El producto no se eliminó");
      }
    });
}

function obtenerPrecioTotal() {
    return carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
}

const confirmarCompra = () => {
  const botonComprar = document.getElementById("finalizar-compra");
  botonComprar.addEventListener("click", (event) => {
    event.preventDefault();
    if (carrito.length === 0) {
        Swal.fire({
            title: "No hay nada que comprar!",
            text: "Agregá productos a tu carrito",
            icon: "warning",
            confirmButtonText: "Aceptar",
          });
    } else {
        setTimeout(() => Swal.fire("Listo!", "Compra realizada con éxito", "success"), 1000);
        carrito = [];
        saveLocal();
        actualizarCarrito();
      }
  });
}


confirmarCompra();
renderizarProductos();
actualizarCarrito();