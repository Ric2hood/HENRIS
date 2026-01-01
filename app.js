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
    imagenes:["Img/perfume2_1.png"]
},
{
    nombre:"PERFUME 3",
    precio:120,
    descripcion:"Descripción del perfume",
    imagenes:["Img/perfume2_1.png"]
},
{
    nombre:"PERFUME 4",
    precio:90,
    descripcion:"Descripción del perfume",
    imagenes:["Img/perfume2_1.png"]
},
{
    nombre:"PERFUME 5",
    precio:150,
    descripcion:"Descripción del perfume",
    imagenes:["Img/perfume2_1.png"]
},
{
    nombre:"PERFUME 6",
    precio:110,
    descripcion:"Descripción del perfume",
    imagenes:["Img/perfume2_1.png"]
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
    imagenes:["Img/perfume2_1.png"]
}
// Puedes agregar más hasta 40
];

/* ===== DECANTS (MISMA ESTRUCTURA) ===== */
const decants = [
{
    nombre:"DECANT 1",
    precio:50,
    descripcion:"Descripción del decant",
    imagenes:["Img/perfume2_1.png"]
},
{
    nombre:"DECANT 2",
    precio:45,
    descripcion:"Descripción del decant",
    imagenes:["Img/perfume2_1.png"]
},
{
    nombre:"DECANT 3",
    precio:55,
    descripcion:"Descripción del decant",
    imagenes:["Img/perfume2_1.png"]
},
{
    nombre:"DECANT 4",
    precio:60,
    descripcion:"Descripción del decant",
    imagenes:["Img/perfume2_1.png"]
},
{
    nombre:"DECANT 5",
    precio:40,
    descripcion:"Descripción del decant",
    imagenes:["Img/perfume2_1.png"]
},
{
    nombre:"DECANT 6",
    precio:65,
    descripcion:"Descripción del decant",
    imagenes:["Img/perfume2_1.png"]
},
{
    nombre:"DECANT 7",
    precio:70,
    descripcion:"Descripción del decant",
    imagenes:["Img/perfume2_1.png"]
},
{
    nombre:"DECANT 8",
    precio:35,
    descripcion:"Descripción del decant",
    imagenes:["Img/perfume2_1.png"]
}
// Puedes agregar más decants aquí
];

/* ===== GENERAR CATÁLOGO DE PERFUMES ===== */
const catPerfumes=document.getElementById("catPerfumes");
perfumes.forEach(p=>{
    catPerfumes.innerHTML+=`
    <div class="card">
        <img src="${p.imagenes[0]}" alt="${p.nombre}">
        <div class="card-info">
            <h4>${p.nombre}</h4>
            <p>S/ ${p.precio}</p>
            <div class="perfume-desc">${p.descripcion}</div>
            <button class="btn" onclick="addToCart('${p.nombre}', ${p.precio}, '${p.imagenes[0]}', 'perfume')">Añadir</button>
        </div>
    </div>`;
});

/* ===== GENERAR CATÁLOGO DE DECANTS ===== */
const catDecants=document.getElementById("catDecants");
decants.forEach(d=>{
    catDecants.innerHTML+=`
    <div class="card">
        <img src="${d.imagenes[0]}" alt="${d.nombre}">
        <div class="card-info">
            <h4>${d.nombre}</h4>
            <p>S/ ${d.precio}</p>
            <div class="perfume-desc">${d.descripcion}</div>
            <button class="btn" onclick="addToCart('${d.nombre}', ${d.precio}, '${d.imagenes[0]}', 'decant')">Añadir</button>
        </div>
    </div>`;
});

/* ===== CARRITO MEJORADO ===== */
let carrito=[];
const cartBtn = document.getElementById("cartBtn");

function addToCart(nombre, precio, imagen, tipo){
    const item = {
        id: Date.now() + Math.random(),
        nombre: nombre,
        precio: precio,
        imagen: imagen,
        tipo: tipo,
        cantidad: 1
    };
    
    carrito.push(item);
    
    // Efecto visual en el botón del carrito
    cartBtn.classList.add("bump");
    setTimeout(()=>cartBtn.classList.remove("bump"),300);
    
    // Actualizar carrito si está visible
    if(document.getElementById('carrito').classList.contains('active')) {
        actualizarCarrito();
    }
}

function eliminarDelCarrito(id){
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
}

function actualizarCarrito(){
    const carritoLista = document.getElementById("carritoLista");
    const totalCarrito = document.getElementById("totalCarrito");
    
    if(carrito.length === 0){
        carritoLista.innerHTML = "<p>Tu carrito está vacío</p>";
        totalCarrito.textContent = "Total: S/ 0";
        return;
    }
    
    let total = 0;
    let html = "";
    
    carrito.forEach(item => {
        total += item.precio * item.cantidad;
        html += `
        <div class="carrito-item" data-id="${item.id}">
            <img src="${item.imagen}" alt="${item.nombre}">
            <div class="carrito-item-info">
                <h4>${item.nombre}</h4>
                <p>S/ ${item.precio} - ${item.tipo}</p>
                <p>Cantidad: ${item.cantidad}</p>
            </div>
            <button class="carrito-item-eliminar" onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
        </div>`;
    });
    
    carritoLista.innerHTML = html;
    totalCarrito.textContent = `Total: S/ ${total}`;
}

/* ===== WHATSAPP ===== */
function comprar(){
    if(carrito.length === 0){
        alert("Tu carrito está vacío");
        return;
    }
    
    let m="🛒 *PEDIDO HENRIS* %0A%0A";
    let total = 0;
    
    carrito.forEach(i=>{
        m+=`• ${i.nombre} - S/ ${i.precio} (${i.tipo})%0A`;
        total += i.precio * i.cantidad;
    });
    
    m+=`%0A*TOTAL: S/ ${total}*%0A%0A`;
    m+=`👤 *Cliente:*%0A`;
    m+=`Nombre: ${document.getElementById('nombre').value || 'No especificado'}%0A`;
    m+=`Apellidos: ${document.getElementById('apellido').value || 'No especificado'}%0A`;
    m+=`Dirección: ${document.getElementById('direccion').value || 'No especificado'}%0A`;
    m+=`Detalles: ${document.getElementById('detalle').value || 'Ninguno'}`;
    
    window.open("https://wa.me/51910163936?text="+m);
}