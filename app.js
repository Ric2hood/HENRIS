/* ===== SPA ===== */
function showPage(id){
    document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    
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

/* ===== PERFUMES ===== */
const perfumes = [
{
    nombre:"khamrah",
    precio:130,
    descripcion:"Khamrah de Lattafa huele dulce, especiado y cálido.",
    imagenes:["Img/khamrah1.png","Img/khamrah2.png","Img/khamrah3.png"]
},
{
    nombre:"Rasasi Hawas Fire Edp 100ml",
    precio:100,
    descripcion:"Intenso, dulce, especiado, seductor, duradero.",
    imagenes:["Img/Rasasi Hawas Fire Edp 100ml.jpg", "", ""]
},
{
    nombre:"PERFUME 3",
    precio:120,
    descripcion:"Descripción del perfume",
    imagenes:["Img/perfume2_1.png", "Img/perfume2_2.png"]
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
    imagenes:["Img/perfume2_1.png", "Img/perfume2_2.png"]
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
    imagenes:["Img/perfume2_1.png"]
},
{
    nombre:"PERFUME 8",
    precio:140,
    descripcion:"Descripción del perfume",
    imagenes:["Img/perfume2_1.png", "Img/perfume2_2.png"]
}
];

/* ===== DECANTS ===== */
const decants = [
{
    nombre:"DECANT 1",
    precios: {"3ml":20,"5ml":30,"7ml":40},
    descripcion:"Descripción del decant - Fragancia premium",
    imagenes:["Img/perfume2_1.png", "Img/perfume2_2.png"]
},
{
    nombre:"DECANT 2",
    precios: {"3ml":25,"5ml":35,"7ml":45},
    descripcion:"Descripción del decant - Aroma exclusivo",
    imagenes:["Img/perfume2_1.png"]
},
{
    nombre:"DECANT 3",
    precios: {"3ml":30,"5ml":40,"7ml":50},
    descripcion:"Descripción del decant - Esencia duradera",
    imagenes:["Img/perfume2_1.png", "Img/perfume2_2.png", "Img/perfume2_3.png"]
},
{
    nombre:"DECANT 4",
    precios: {"3ml":35,"5ml":45,"7ml":55},
    descripcion:"Descripción del decant - Notas especiales",
    imagenes:["Img/perfume2_1.png"]
},
{
    nombre:"DECANT 5",
    precios: {"3ml":40,"5ml":50,"7ml":60},
    descripcion:"Descripción del decant - Fragancia intensa",
    imagenes:["Img/perfume2_1.png", "Img/perfume2_2.png"]
},
{
    nombre:"DECANT 6",
    precios: {"3ml":45,"5ml":55,"7ml":65},
    descripcion:"Descripción del decant - Aroma premium",
    imagenes:["Img/perfume2_1.png"]
},
{
    nombre:"DECANT 7",
    precios: {"3ml":50,"5ml":60,"7ml":70},
    descripcion:"Descripción del decant - Esencia exclusiva",
    imagenes:["Img/perfume2_1.png", "Img/perfume2_2.png", "Img/perfume2_3.png"]
},
{
    nombre:"DECANT 8",
    precios: {"3ml":55,"5ml":65,"7ml":75},
    descripcion:"Descripción del decant - Fragancia única",
    imagenes:["Img/perfume2_1.png"]
}
];

/* ===== GENERAR PERFUMES ===== */
const catPerfumes=document.getElementById("catPerfumes");
perfumes.forEach(p=>{
    let imagenesHTML = '';
    p.imagenes.forEach(img => {
        imagenesHTML += `<img src="${img}" alt="${p.nombre}" class="carrusel-img">`;
    });
    
    const tieneMultiples = p.imagenes.length > 1;
    
    catPerfumes.innerHTML+=`
    <div class="card">
        <div class="carrusel-container" data-index="0" data-total="${p.imagenes.length}">
            <div class="carrusel-track">${imagenesHTML}</div>
            ${tieneMultiples ? `
            <button class="carrusel-flecha izquierda" onclick="moverCarrusel(this, -1)">❮</button>
            <button class="carrusel-flecha derecha" onclick="moverCarrusel(this, 1)">❯</button>
            <div class="carrusel-indicadores">
                ${p.imagenes.map((_, i) => `<span class="indicador ${i === 0 ? 'active' : ''}" data-pos="${i}"></span>`).join('')}
            </div>` : ''}
        </div>
        <div class="card-info">
            <h4>${p.nombre}</h4>
            <p style="color:#d4af37; font-weight:bold; font-size:1.2rem;">S/ ${p.precio}</p>
            <div class="perfume-desc">${p.descripcion}</div>
        </div>
        <button class="btn" onclick="addToCart('${p.nombre}', ${p.precio}, '${p.imagenes[0]}', 'perfume')">Añadir</button>
    </div>`;
});

/* ===== GENERAR DECANTS ===== */
const catDecants=document.getElementById("catDecants");
decants.forEach((d, index)=>{
    const precioInicial = d.precios["3ml"];
    let imagenesHTML = '';
    d.imagenes.forEach(img => {
        imagenesHTML += `<img src="${img}" alt="${d.nombre}" class="carrusel-img">`;
    });
    
    const tieneMultiples = d.imagenes.length > 1;
    
    catDecants.innerHTML+=`
    <div class="card">
        <div class="carrusel-container" data-index="0" data-total="${d.imagenes.length}">
            <div class="carrusel-track">${imagenesHTML}</div>
            ${tieneMultiples ? `
            <button class="carrusel-flecha izquierda" onclick="moverCarrusel(this, -1)">❮</button>
            <button class="carrusel-flecha derecha" onclick="moverCarrusel(this, 1)">❯</button>
            <div class="carrusel-indicadores">
                ${d.imagenes.map((_, i) => `<span class="indicador ${i === 0 ? 'active' : ''}" data-pos="${i}"></span>`).join('')}
            </div>` : ''}
        </div>
        <div class="card-info">
            <h4>${d.nombre}</h4>
            <div class="opciones-ml" data-index="${index}">
                <button class="btn-ml active" data-ml="3ml" data-precio="${d.precios['3ml']}">3ml</button>
                <button class="btn-ml" data-ml="5ml" data-precio="${d.precios['5ml']}">5ml</button>
                <button class="btn-ml" data-ml="7ml" data-precio="${d.precios['7ml']}">7ml</button>
            </div>
            <p class="precio-decant" style="color:#d4af37; font-weight:bold; font-size:1.2rem; margin-top:10px;">
                S/ <span class="precio-actual">${precioInicial}</span>
            </p>
            <div class="perfume-desc">${d.descripcion}</div>
        </div>
        <button class="btn" onclick="addDecantToCart(${index})">Añadir</button>
    </div>`;
});

/* ===== FUNCIONES CARRUSEL ===== */
window.moverCarrusel = function(boton, direccion) {
    const container = boton.closest('.carrusel-container');
    const track = container.querySelector('.carrusel-track');
    const indicadores = container.querySelectorAll('.indicador');
    const imgWidth = track.querySelector('img').offsetWidth + 10;
    
    let currentIndex = parseInt(container.dataset.index);
    const total = parseInt(container.dataset.total);
    
    let newIndex = currentIndex + direccion;
    if (newIndex < 0) newIndex = total - 1;
    if (newIndex >= total) newIndex = 0;
    
    track.scrollTo({left: newIndex * imgWidth, behavior: 'smooth'});
    container.dataset.index = newIndex;
    
    indicadores.forEach((ind, i) => {
        if (i === newIndex) ind.classList.add('active');
        else ind.classList.remove('active');
    });
};

/* ===== OPCIONES ML ===== */
document.addEventListener('click', function(e) {
    if(e.target.classList.contains('btn-ml')) {
        const opcionesDiv = e.target.closest('.opciones-ml');
        opcionesDiv.querySelectorAll('.btn-ml').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        const precioSpan = opcionesDiv.parentElement.querySelector('.precio-actual');
        precioSpan.textContent = e.target.getAttribute('data-precio');
    }
});

/* ===== AÑADIR DECANT ===== */
function addDecantToCart(index) {
    const card = document.querySelectorAll('#catDecants .card')[index];
    const mlSeleccionado = card.querySelector('.btn-ml.active').getAttribute('data-ml');
    const precio = parseInt(card.querySelector('.btn-ml.active').getAttribute('data-precio'));
    const nombre = decants[index].nombre;
    const imagen = decants[index].imagenes[0];
    
    addToCart(`${nombre} (${mlSeleccionado})`, precio, imagen, 'decant');
}

/* ===== CARRITO ===== */
let carrito=[];
const cartBtn = document.getElementById("cartBtn");

function addToCart(nombre, precio, imagen, tipo){
    const productoExistente = carrito.find(item => item.nombre === nombre && item.tipo === tipo);
    
    if(productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({
            id: Date.now() + Math.random(),
            nombre: nombre,
            precio: precio,
            imagen: imagen,
            tipo: tipo,
            cantidad: 1
        });
    }
    
    cartBtn.classList.add("bump");
    setTimeout(()=>cartBtn.classList.remove("bump"),300);
    
    if(document.getElementById('carrito').classList.contains('active')) {
        actualizarCarrito();
    }
    
    mostrarNotificacion(`${nombre} añadido al carrito`);
}

function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement('div');
    notificacion.style.cssText = `
        position:fixed; top:20px; right:20px; background:#d4af37; color:#000;
        padding:15px 25px; border-radius:8px; z-index:10000; font-weight:600;
        box-shadow:0 4px 12px rgba(0,0,0,0.3); animation:slideIn 0.3s ease;
    `;
    
    if (!document.getElementById('notifStyles')) {
        const style = document.createElement('style');
        style.id = 'notifStyles';
        style.textContent = `
            @keyframes slideIn{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}
            @keyframes slideOut{from{transform:translateX(0);opacity:1}to{transform:translateX(100%);opacity:0}}
        `;
        document.head.appendChild(style);
    }
    
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
        notificacion.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => document.body.removeChild(notificacion), 300);
    }, 3000);
}

function eliminarDelCarrito(id){
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
    mostrarNotificacion('Producto eliminado');
}

function actualizarCarrito(){
    const carritoLista = document.getElementById("carritoLista");
    const totalCarrito = document.getElementById("totalCarrito");
    
    if(carrito.length === 0){
        carritoLista.innerHTML = "<p style='text-align:center; opacity:0.7;'>Tu carrito está vacío</p>";
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
                <div style="display:flex; align-items:center; gap:10px; margin-top:8px;">
                    <button onclick="cambiarCantidad(${item.id}, -1)" style="background:#333; color:white; border:none; width:30px; height:30px; border-radius:50%; cursor:pointer;">-</button>
                    <span style="font-weight:bold;">${item.cantidad}</span>
                    <button onclick="cambiarCantidad(${item.id}, 1)" style="background:#d4af37; color:#000; border:none; width:30px; height:30px; border-radius:50%; cursor:pointer; font-weight:bold;">+</button>
                    <span style="margin-left:15px; color:#d4af37; font-weight:bold;">Subtotal: S/ ${subtotal}</span>
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
        if(item.cantidad <= 0) eliminarDelCarrito(id);
        else actualizarCarrito();
    }
}

/* ===== CONTADOR DE PEDIDOS ===== */
function obtenerNumeroPedido() {
    let contador = localStorage.getItem('contadorPedidos');
    if (!contador) {
        contador = 1;
    } else {
        contador = parseInt(contador) + 1;
    }
    localStorage.setItem('contadorPedidos', contador);
    return contador;
}

/* ===== WHATSAPP ===== */
function comprar(){
    if(carrito.length === 0){
        mostrarNotificacion('Tu carrito está vacío');
        return;
    }
    
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const distrito = document.getElementById('distrito').value.trim();
    const provincia = document.getElementById('provincia').value.trim();
    const detalle = document.getElementById('detalle').value.trim();
    
    if(!nombre || !direccion || !distrito || !provincia) {
        mostrarNotificacion('Completa todos los datos de envío');
        return;
    }
    
    const numeroPedido = obtenerNumeroPedido();
    
    let mensaje = "";
    mensaje += "🛒 *PEDIDO #" + numeroPedido + "*\n";
    mensaje += "═══════════════════\n\n";
    
    let total = 0;
    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        mensaje += "• " + item.nombre + " x" + item.cantidad + " - S/ " + subtotal + " (" + item.tipo + ")\n";
    });
    
    mensaje += "\n*TOTAL: S/ " + total + "*\n";
    mensaje += "═══════════════════\n\n";
    mensaje += "👤 *DATOS DEL CLIENTE:*\n";
    mensaje += "Nombre: " + nombre + " " + apellido + "\n";
    mensaje += "Dirección: " + direccion + "\n";
    mensaje += "Distrito: " + distrito + "\n";
    mensaje += "Provincia: " + provincia + "\n";
    
    if(detalle) {
        mensaje += "Referencia: " + detalle + "\n";
    }
    
    const mensajeCodificado = encodeURIComponent(mensaje);
    window.open("https://wa.me/51910163936?text=" + mensajeCodificado);
    
    mostrarNotificacion('✅ Pedido enviado por WhatsApp');
    
    carrito = [];
    actualizarCarrito();
    
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('direccion').value = '';
    document.getElementById('distrito').value = '';
    document.getElementById('provincia').value = '';
    document.getElementById('detalle').value = '';
}

/* ===== FUNCIÓN PARA REINICIAR CONTADOR ===== */
function reiniciarContadorPedidos() {
    localStorage.setItem('contadorPedidos', '0');
    mostrarNotificacion('Contador reiniciado a 0');
}

/* ===== INICIAR CARRUSELES ===== */
setTimeout(() => {
    document.querySelectorAll('.carrusel-container').forEach(container => {
        if(container.dataset.total <= 1) return;
        
        const track = container.querySelector('.carrusel-track');
        container.addEventListener('wheel', (e) => {
            e.preventDefault();
            track.scrollLeft += e.deltaY;
        });
    });
}, 500);
