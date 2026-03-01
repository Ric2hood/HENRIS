/* ===== SPA ===== */
function showPage(id){
    document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    
    // Si se muestra el carrito, actualizamos la lista
    if(id === 'carrito') {
        actualizarCarrito();
    }
}

/* ===== PARTICULAS ===== */
const c=document.getElementById("fx"),x=c.getContext("2d");
function resize(){c.width=innerWidth;c.height=innerHeight}
resize();onresize=resize;

let pts=[...Array(120)].map(()=>({
    x:Math.random()*c.width,
    y:Math.random()*c.height,
    dx:(Math.random()-.5)*0.6,
    dy:(Math.random()-.5)*0.6
}));

(function anim(){
    x.clearRect(0,0,c.width,c.height);
    pts.forEach(p=>{
        p.x+=p.dx;p.y+=p.dy;
        if(p.x<0||p.x>c.width)p.dx*=-1;
        if(p.y<0||p.y>c.height)p.dy*=-1;
        x.fillStyle="rgba(212,175,55,.6)";
        x.beginPath();x.arc(p.x,p.y,2,0,7);x.fill();
    });
    requestAnimationFrame(anim);
})();

/* ===== PERFUMES (40 PLANTILLAS) ===== */
const perfumes = [
{
    nombre:"khamrah",
    precio:130,
    descripcion:"Khamrah de Lattafa huele dulce, especiado y cálido.",
    imagenes:["Img/khamrah1.png","Img/khamrah2.png","Img/khamrah3.png"]
},
{
    nombre:"PERFUME 2",
    precio:100,
    descripcion:"Descripción del perfume",
    imagenes:["Img/perfume2_1.png", "Img/perfume2_2.png", "Img/perfume2_3.png"]
},
{
    nombre:"PERFUME 3",
    precio:120,
    descripcion:"Descripción del perfume",
    imagenes:["Img/perfume2_1.png", "Img/perfume2_2.png"] // SOLO 2 IMÁGENES
},
{
    nombre:"PERFUME 4",
    precio:90,
    descripcion:"Descripción del perfume",
    imagenes:["Img/perfume2_1.png", "Img/perfume2_2.png", "Img/perfume2_3.png", "Img/perfume2_4.png"]
},
{
    nombre:"PERFUME 5",
    precio:150,
    descripcion:"Descripción del perfume",
    imagenes:["Img/perfume2_1.png", "Img/perfume2_2.png"] // SOLO 2 IMÁGENES
},
{
    nombre:"PERFUME 6",
    precio:110,
    descripcion:"Descripción del perfume",
    imagenes:["Img/perfume2_1.png", "Img/perfume2_2.png", "Img/perfume2_3.png"]
},
{
    nombre:"PERFUME 7",
    precio:95,
    descripcion:"Descripción del perfume",
    imagenes:["Img/perfume2_1.png"] // SOLO 1 IMAGEN
},
{
    nombre:"PERFUME 8",
    precio:140,
    descripcion:"Descripción del perfume",
    imagenes:["Img/perfume2_1.png", "Img/perfume2_2.png"] // SOLO 2 IMÁGENES
}
// Puedes agregar más hasta 40
];

/* ===== DECANTS CON OPCIONES DE ML ===== */
const decants = [
{
    nombre:"DECANT 1",
    precios: {
        "3ml": 20,
        "5ml": 30,
        "7ml": 40
    },
    descripcion:"Descripción del decant - Fragancia premium",
    imagenes:["Img/perfume2_1.png", "Img/perfume2_2.png"] // 2 IMÁGENES
},
{
    nombre:"DECANT 2",
    precios: {
        "3ml": 25,
        "5ml": 35,
        "7ml": 45
    },
    descripcion:"Descripción del decant - Aroma exclusivo",
    imagenes:["Img/perfume2_1.png"] // 1 IMAGEN
},
{
    nombre:"DECANT 3",
    precios: {
        "3ml": 30,
        "5ml": 40,
        "7ml": 50
    },
    descripcion:"Descripción del decant - Esencia duradera",
    imagenes:["Img/perfume2_1.png", "Img/perfume2_2.png", "Img/perfume2_3.png"] // 3 IMÁGENES
},
{
    nombre:"DECANT 4",
    precios: {
        "3ml": 35,
        "5ml": 45,
        "7ml": 55
    },
    descripcion:"Descripción del decant - Notas especiales",
    imagenes:["Img/perfume2_1.png"] // 1 IMAGEN
},
{
    nombre:"DECANT 5",
    precios: {
        "3ml": 40,
        "5ml": 50,
        "7ml": 60
    },
    descripcion:"Descripción del decant - Fragancia intensa",
    imagenes:["Img/perfume2_1.png", "Img/perfume2_2.png"] // 2 IMÁGENES
},
{
    nombre:"DECANT 6",
    precios: {
        "3ml": 45,
        "5ml": 55,
        "7ml": 65
    },
    descripcion:"Descripción del decant - Aroma premium",
    imagenes:["Img/perfume2_1.png"] // 1 IMAGEN
},
{
    nombre:"DECANT 7",
    precios: {
        "3ml": 50,
        "5ml": 60,
        "7ml": 70
    },
    descripcion:"Descripción del decant - Esencia exclusiva",
    imagenes:["Img/perfume2_1.png", "Img/perfume2_2.png", "Img/perfume2_3.png"] // 3 IMÁGENES
},
{
    nombre:"DECANT 8",
    precios: {
        "3ml": 55,
        "5ml": 65,
        "7ml": 75
    },
    descripcion:"Descripción del decant - Fragancia única",
    imagenes:["Img/perfume2_1.png"] // 1 IMAGEN
}
// Puedes agregar más decants aquí
];

/* ===== GENERAR CATÁLOGO DE PERFUMES CON CARRUSEL ===== */
const catPerfumes=document.getElementById("catPerfumes");
perfumes.forEach(p=>{
    // Generar las imágenes para el carrusel
    let imagenesHTML = '';
    p.imagenes.forEach(img => {
        imagenesHTML += `<img src="${img}" alt="${p.nombre}" class="carrusel-img">`;
    });
    
    // Si hay más de una imagen, añadir indicadores y flechas
    const tieneMultiples = p.imagenes.length > 1;
    
    catPerfumes.innerHTML+=`
    <div class="card">
        <div class="carrusel-container" data-index="0" data-total="${p.imagenes.length}">
            <div class="carrusel-track">
                ${imagenesHTML}
            </div>
            ${tieneMultiples ? `
            <button class="carrusel-flecha izquierda" onclick="moverCarrusel(this, -1)">❮</button>
            <button class="carrusel-flecha derecha" onclick="moverCarrusel(this, 1)">❯</button>
            <div class="carrusel-indicadores">
                ${p.imagenes.map((_, i) => `<span class="indicador ${i === 0 ? 'active' : ''}" data-pos="${i}"></span>`).join('')}
            </div>
            ` : ''}
        </div>
        <div class="card-info">
            <h4>${p.nombre}</h4>
            <p style="color: #d4af37; font-weight: bold; font-size: 1.2rem;">S/ ${p.precio}</p>
            <div class="perfume-desc">${p.descripcion}</div>
        </div>
        <button class="btn" onclick="addToCart('${p.nombre}', ${p.precio}, '${p.imagenes[0]}', 'perfume')" style="background: #d4af37; color: #000; width: auto; margin: 10px 20px; padding: 12px 20px;">Añadir</button>
    </div>`;
});

/* ===== GENERAR CATÁLOGO DE DECANTS CON OPCIONES DE ML ===== */
const catDecants=document.getElementById("catDecants");
decants.forEach((d, index)=>{
    // Precio inicial (3ml por defecto)
    const precioInicial = d.precios["3ml"];
    
    // Generar las imágenes para el carrusel
    let imagenesHTML = '';
    d.imagenes.forEach(img => {
        imagenesHTML += `<img src="${img}" alt="${d.nombre}" class="carrusel-img">`;
    });
    
    // Si hay más de una imagen, añadir indicadores y flechas
    const tieneMultiples = d.imagenes.length > 1;
    
    catDecants.innerHTML+=`
    <div class="card">
        <div class="carrusel-container" data-index="0" data-total="${d.imagenes.length}">
            <div class="carrusel-track">
                ${imagenesHTML}
            </div>
            ${tieneMultiples ? `
            <button class="carrusel-flecha izquierda" onclick="moverCarrusel(this, -1)">❮</button>
            <button class="carrusel-flecha derecha" onclick="moverCarrusel(this, 1)">❯</button>
            <div class="carrusel-indicadores">
                ${d.imagenes.map((_, i) => `<span class="indicador ${i === 0 ? 'active' : ''}" data-pos="${i}"></span>`).join('')}
            </div>
            ` : ''}
        </div>
        <div class="card-info">
            <h4>${d.nombre}</h4>
            <div class="opciones-ml" data-index="${index}">
                <button class="btn-ml active" data-ml="3ml" data-precio="${d.precios['3ml']}">3ml</button>
                <button class="btn-ml" data-ml="5ml" data-precio="${d.precios['5ml']}">5ml</button>
                <button class="btn-ml" data-ml="7ml" data-precio="${d.precios['7ml']}">7ml</button>
            </div>
            <p class="precio-decant" style="color: #d4af37; font-weight: bold; font-size: 1.2rem; margin-top: 10px;">
                S/ <span class="precio-actual">${precioInicial}</span>
            </p>
            <div class="perfume-desc">${d.descripcion}</div>
        </div>
        <button class="btn" onclick="addDecantToCart(${index})" style="background: #d4af37; color: #000; width: auto; margin: 10px 20px; padding: 12px 20px;">Añadir</button>
    </div>`;
});

/* ===== FUNCIONES PARA EL CARRUSEL ===== */
// Función para mover el carrusel con las flechas
window.moverCarrusel = function(boton, direccion) {
    const container = boton.closest('.carrusel-container');
    const track = container.querySelector('.carrusel-track');
    const indicadores = container.querySelectorAll('.indicador');
    const imgWidth = track.querySelector('img').offsetWidth + 10; // 10 es el gap
    
    let currentIndex = parseInt(container.dataset.index);
    const total = parseInt(container.dataset.total);
    
    // Calcular nuevo índice
    let newIndex = currentIndex + direccion;
    
    // Validar límites
    if (newIndex < 0) newIndex = total - 1;
    if (newIndex >= total) newIndex = 0;
    
    // Mover el scroll
    track.scrollTo({
        left: newIndex * imgWidth,
        behavior: 'smooth'
    });
    
    // Actualizar índice y puntitos
    container.dataset.index = newIndex;
    actualizarIndicadores(container, newIndex);
};

// Función para actualizar los indicadores
function actualizarIndicadores(container, index) {
    const indicadores = container.querySelectorAll('.indicador');
    indicadores.forEach((ind, i) => {
        if (i === index) {
            ind.classList.add('active');
        } else {
            ind.classList.remove('active');
        }
    });
}

// Función para el scroll horizontal con el mouse
function initCarruselScroll() {
    document.querySelectorAll('.carrusel-container').forEach(container => {
        const track = container.querySelector('.carrusel-track');
        const total = parseInt(container.dataset.total);
        
        if (total <= 1) return; // No hay scroll si solo hay una imagen
        
        let isDown = false;
        let startX;
        let scrollLeft;
        
        // Scroll con la rueda del mouse (horizontal)
        container.addEventListener('wheel', (e) => {
            e.preventDefault();
            track.scrollLeft += e.deltaY;
            actualizarIndicadorPorScroll(container);
        });
        
        // Scroll con arrastre del mouse
        container.addEventListener('mousedown', (e) => {
            isDown = true;
            container.classList.add('active');
            startX = e.pageX - container.offsetLeft;
            scrollLeft = track.scrollLeft;
        });
        
        container.addEventListener('mouseleave', () => {
            isDown = false;
            container.classList.remove('active');
        });
        
        container.addEventListener('mouseup', () => {
            isDown = false;
            container.classList.remove('active');
        });
        
        container.addEventListener('mousemove', (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            track.scrollLeft = scrollLeft - walk;
            actualizarIndicadorPorScroll(container);
        });
        
        // Actualizar cuando el scroll termina
        track.addEventListener('scroll', () => {
            actualizarIndicadorPorScroll(container);
        });
    });
}

function actualizarIndicadorPorScroll(container) {
    const track = container.querySelector('.carrusel-track');
    const imgWidth = track.querySelector('img').offsetWidth + 10;
    const scrollPosition = track.scrollLeft;
    const newIndex = Math.round(scrollPosition / imgWidth);
    const total = parseInt(container.dataset.total);
    
    if (newIndex >= 0 && newIndex < total) {
        container.dataset.index = newIndex;
        actualizarIndicadores(container, newIndex);
    }
}

// Función para cambiar el precio cuando se selecciona un ML
document.addEventListener('click', function(e) {
    if(e.target.classList.contains('btn-ml')) {
        const opcionesDiv = e.target.closest('.opciones-ml');
        const index = opcionesDiv.getAttribute('data-index');
        
        // Remover clase active de todos los botones en este grupo
        opcionesDiv.querySelectorAll('.btn-ml').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Agregar clase active al botón clickeado
        e.target.classList.add('active');
        
        // Actualizar precio mostrado
        const precioSpan = opcionesDiv.parentElement.querySelector('.precio-actual');
        const nuevoPrecio = e.target.getAttribute('data-precio');
        precioSpan.textContent = nuevoPrecio;
    }
});

/* ===== FUNCIÓN ESPECIAL PARA AÑADIR DECANTS AL CARRITO ===== */
function addDecantToCart(index) {
    const card = document.querySelectorAll('#catDecants .card')[index];
    const mlSeleccionado = card.querySelector('.btn-ml.active').getAttribute('data-ml');
    const precio = parseInt(card.querySelector('.btn-ml.active').getAttribute('data-precio'));
    const nombre = decants[index].nombre;
    const imagen = decants[index].imagenes[0];
    
    addToCart(`${nombre} (${mlSeleccionado})`, precio, imagen, 'decant');
}

/* ===== CARRITO MEJORADO ===== */
let carrito=[];
const cartBtn = document.getElementById("cartBtn");

function addToCart(nombre, precio, imagen, tipo){
    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.nombre === nombre && item.tipo === tipo);
    
    if(productoExistente) {
        // Si ya existe, aumentar la cantidad
        productoExistente.cantidad += 1;
    } else {
        // Si no existe, agregar nuevo item
        const item = {
            id: Date.now() + Math.random(),
            nombre: nombre,
            precio: precio,
            imagen: imagen,
            tipo: tipo,
            cantidad: 1
        };
        
        carrito.push(item);
    }
    
    // Efecto visual en el botón del carrito
    cartBtn.classList.add("bump");
    setTimeout(()=>cartBtn.classList.remove("bump"),300);
    
    // Actualizar carrito si está visible
    if(document.getElementById('carrito').classList.contains('active')) {
        actualizarCarrito();
    }
    
    // Mostrar notificación
    mostrarNotificacion(`${nombre} añadido al carrito`);
}

function mostrarNotificacion(mensaje) {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #d4af37;
        color: #000;
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 10000;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease;
    `;
    
    // Agregar animación CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);
    
    // Remover notificación después de 3 segundos
    setTimeout(() => {
        notificacion.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notificacion);
            document.head.removeChild(style);
        }, 300);
    }, 3000);
}

function eliminarDelCarrito(id){
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
    
    // Mostrar notificación de eliminación
    mostrarNotificacion('Producto eliminado del carrito');
}

function actualizarCarrito(){
    const carritoLista = document.getElementById("carritoLista");
    const totalCarrito = document.getElementById("totalCarrito");
    
    if(carrito.length === 0){
        carritoLista.innerHTML = "<p style='text-align: center; opacity: 0.7;'>Tu carrito está vacío</p>";
        totalCarrito.textContent = "Total: S/ 0";
        return;
    }
    
    let total = 0;
    let html = "";
    
    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        html += `
        <div class="carrito-item" data-id="${item.id}">
            <img src="${item.imagen}" alt="${item.nombre}">
            <div class="carrito-item-info">
                <h4>${item.nombre}</h4>
                <p>S/ ${item.precio} - ${item.tipo}</p>
                <div style="display: flex; align-items: center; gap: 10px; margin-top: 8px;">
                    <button onclick="cambiarCantidad(${item.id}, -1)" style="background: #333; color: white; border: none; width: 30px; height: 30px; border-radius: 50%; cursor: pointer;">-</button>
                    <span style="font-weight: bold;">${item.cantidad}</span>
                    <button onclick="cambiarCantidad(${item.id}, 1)" style="background: #d4af37; color: #000; border: none; width: 30px; height: 30px; border-radius: 50%; cursor: pointer; font-weight: bold;">+</button>
                    <span style="margin-left: 15px; color: #d4af37; font-weight: bold;">Subtotal: S/ ${subtotal}</span>
                </div>
            </div>
            <button class="carrito-item-eliminar" onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
        </div>`;
    });
    
    carritoLista.innerHTML = html;
    totalCarrito.textContent = `Total: S/ ${total}`;
}

function cambiarCantidad(id, cambio) {
    const item = carrito.find(item => item.id === id);
    
    if(item) {
        item.cantidad += cambio;
        
        // Si la cantidad es 0 o menor, eliminar el producto
        if(item.cantidad <= 0) {
            eliminarDelCarrito(id);
        } else {
            actualizarCarrito();
        }
    }
}

/* ===== WHATSAPP ===== */
function comprar(){
    if(carrito.length === 0){
        mostrarNotificacion('Tu carrito está vacío');
        return;
    }
    
    // Validar datos básicos
    const nombre = document.getElementById('nombre').value;
    const direccion = document.getElementById('direccion').value;
    
    if(!nombre || !direccion) {
        mostrarNotificacion('Completa tu nombre y dirección');
        return;
    }
    
    let m="🛒 *PEDIDO HENRIS* %0A%0A";
    let total = 0;
    
    carrito.forEach(i=>{
        m+=`• ${i.nombre} x${i.cantidad} - S/ ${i.precio * i.cantidad} (${i.tipo})%0A`;
        total += i.precio * i.cantidad;
    });
    
    m+=`%0A*TOTAL: S/ ${total}*%0A%0A`;
    m+=`👤 *Cliente:*%0A`;
    m+=`Nombre: ${document.getElementById('nombre').value}%0A`;
    m+=`Apellidos: ${document.getElementById('apellido').value || 'No especificado'}%0A`;
    m+=`Dirección: ${document.getElementById('direccion').value}%0A`;
    m+=`Detalles: ${document.getElementById('detalle').value || 'Ninguno'}`;
    
    window.open("https://wa.me/51910163936?text="+m);
    
    // Limpiar carrito después de enviar
    carrito = [];
    actualizarCarrito();
    
    // Limpiar formulario
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('direccion').value = '';
    document.getElementById('detalle').value = '';
}

// Inicializar carruseles después de cargar los productos
setTimeout(initCarruselScroll, 500);
