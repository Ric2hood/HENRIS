/* ===== SPA ===== */
function showPage(id){
    document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
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
    precio:"S/ 130",
    descripcion:"Khamrah de Lattafa huele dulce, especiado y cálido. ",
    imagenes:["img/khamrah1.png","img/khamrah2.png","img/khamrah3"]
},
{
    nombre:"PERFUME 2",
    precio:"S/ 000",
    descripcion:"Descripción del perfume",
    imagenes:["img/perfume2_1.png","img/perfume2_2.png","img/perfume2_3.png","img/perfume2_4.png"]
}
// 👉 DUPLICAS HASTA 40
];

const catPerfumes=document.getElementById("catPerfumes");
perfumes.forEach(p=>{
    catPerfumes.innerHTML+=`
    <div class="card">
        <img src="${p.imagenes[0]}">
        <div class="card-info">
            <h4>${p.nombre}</h4>
            <p>${p.precio}</p>
            <div class="perfume-desc">${p.descripcion}</div>
            <button class="btn" onclick="add('${p.nombre}','${p.precio}')">Añadir</button>
        </div>
    </div>`;
});

/* ===== CARRITO ===== */
let carrito=[];
function add(n,p){
    carrito.push({n,p});
    cartBtn.classList.add("bump");
    setTimeout(()=>cartBtn.classList.remove("bump"),300);
    carritoLista.innerHTML+=`<p>${n} - ${p}</p>`;
}

/* ===== WHATSAPP ===== */
function comprar(){
    let m="Pedido HENRIS:%0A";
    carrito.forEach(i=>m+=`- ${i.n} ${i.p}%0A`);
    m+=`%0ANombre: ${nombre.value}%0AApellidos: ${apellido.value}%0ADireccion: ${direccion.value}%0ADetalles: ${detalle.value}`;
    window.open("https://wa.me/51910163936?text="+m);
}