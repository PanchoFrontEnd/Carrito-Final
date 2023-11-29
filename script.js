

function agregarAlCarrito(productoNuevo) {
    let productoEncontrado = carrito.find(p => p.id == productoNuevo.id)
    let index = carrito.indexOf(productoEncontrado)
    if (index !== -1) {
        carrito[index].cantidad += 1
        actualizarCarrito()
        sessionStorage.setItem("carrito", JSON.stringify(carrito));
        document.querySelector("#precio-texto").innerText = ( `
        Precio total: $ ${obtenerPrecioTotal()}`);
        Swal.fire({
            title: 'Ya está en tu carrito!',
            text: `se agregó una unidad más de ${productoNuevo.bebida} en tu carrito`,
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        })
        carrito.forEach(producto => {
            document.getElementById(`btnelim${producto.id}`).addEventListener("click", function () {
                eliminarDelCarrito(producto.id)

            });
        });
    } else {
        carrito.push(productoNuevo);
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Agregaste ${productoNuevo.bebida} al carrito!`,
            showConfirmButton: false,
            timer: 1500
          })
        sessionStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCarrito();
        saveLocal();
        document.querySelector("#precio-texto").innerText = (`
        Precio total: $${obtenerPrecioTotal()}`);

        carrito.forEach(producto => {
            document.getElementById(`btnelim${producto.id}`).addEventListener("click", function () {
                eliminarDelCarrito(producto.id);
            });
        })
    }
    
}



function actualizarCarrito() {
    document.getElementById("tablabody").innerHTML = ''
    for (const producto of carrito) {
        document.getElementById("tablabody").innerHTML += `
        <tr>
            <td>${producto.cantidad}</td>
            <td>${producto.bebida}</td>
            <td>$${producto.precio}</td>
            <td>$${producto.precio * producto.cantidad}</td>
            <td><button class="boton-eliminar-producto btn btn-outline-danger" type="button" id="btnelim${producto.id}"><i class="fa-solid fa-trash"></i></button></td>
        </tr>`;
    }
}


function eliminarDelCarrito(id) {
    Swal.fire({
            title: "Estás seguro?",
            text: "Este producto se va a eliminar del carrito",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
        })  
        .then((result) => {
            if (result.isConfirmed) {
                let newCarrito = carrito.filter(producto => producto.id !== id)
                carrito = newCarrito 
                sessionStorage.setItem("carrito", JSON.stringify(carrito));
                actualizarCarrito();
                carrito.forEach(producto => {
                    document.getElementById(`btnelim${producto.id}`).addEventListener("click", function () {
                        eliminarDelCarrito(producto.id);
                    });
                });
                Swal.fire(
                    'Listo!',
                    'Este producto fue eliminado',
                    'success'
                )
                document.querySelector("#precio-texto").innerText = (`Precio total: $ ${obtenerPrecioTotal()}`);
            } else {
                Swal.fire("El producto no se eliminó");
            }
        });
    actualizarCarrito();
    document.querySelector("#precio-texto").innerText = (`
    Precio total: $ ${obtenerPrecioTotal()}`);
    carrito.forEach(producto => {
        document.getElementById(`btnelim${producto.id}`).addEventListener("click", function () {
            eliminarDelCarrito(producto.id);
        });
    });
    

}

function obtenerPrecioTotal() {
    let precioTotal = 0;
    for (const producto of carrito) {
        precioTotal += producto.precio * producto.cantidad;

    }
    return precioTotal;
}

const confirmarCompra = () => {
    let botonComprar = document.getElementById('finalizar-compra')
    botonComprar.addEventListener('click', (event) => {
        event.preventDefault();
        if (carrito.length === 0) {
            Swal.fire({
                title: 'No hay nada que comprar!',
                text: 'Agregá productos a tu carrito',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            })
        } else {
            setTimeout(() => Swal.fire(
                'Listo!',
                'Compra realizada con éxito',
                'success'
            ),1000);
            carrito=[];
            sessionStorage.setItem("carrito", JSON.stringify(carrito));
            actualizarCarrito();
            document.querySelector("#precio-texto").innerText=(`
            Precio total: $ ${obtenerPrecioTotal()}`);

        }
    })
}

confirmarCompra ()















