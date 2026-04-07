// ==========================
// NAVEGACIÓN CON TRANSICIÓN ENTRE PÁGINAS
// ==========================
function goTo(page){
  document.body.classList.add('fade-out');
  setTimeout(() => { window.location.href = page; }, 800);
}

// ==========================
// SOBRE Y SELLO CON SESSIONSTORAGE
// ==========================
const seal = document.getElementById("seal");
const envelope = document.getElementById("envelope");
const hero = document.getElementById("hero");
const openedBefore = sessionStorage.getItem("envelopeOpened");

if(openedBefore){
  if(envelope) envelope.style.display = "none";
  if(seal) seal.style.display = "none";
  if(hero) hero.classList.add("show");
}else{
  if(seal){
    seal.addEventListener("click", () => {
      // 1️⃣ Animación de romper sello
      seal.classList.add("break"); // CSS animación smoothSeal
      setTimeout(() => { 
        seal.style.display = "none"; // desaparece primero
      }, 800); // dura lo mismo que la animación del sello

      // 2️⃣ Abrir solapa del sobre ligeramente después
      setTimeout(() => {
        envelope.classList.add("open");
      }, 900); // un poco después de que el sello desaparezca

      // 3️⃣ Ocultar el sobre y mostrar contenido
      setTimeout(() => {
        envelope.style.display = "none";
        if(hero) hero.classList.add("show");
        sessionStorage.setItem("envelopeOpened","true");
      }, 1600); // sobre se oculta después
    });
  }
}

// ==========================
// FORMULARIO (RSVP)
// ==========================
function handleSubmit(e){ 
  e.preventDefault(); 
  const msg = document.getElementById("msg");
  if(msg) msg.innerText="¡Gracias por confirmar tu asistencia!"; 
}

// ==========================
// COUNTDOWN ANIMADO
// ==========================
const weddingDate = new Date("November 20, 2027 00:00:00").getTime();

setInterval(() => {
  const daysElem = document.getElementById("days");
  const hoursElem = document.getElementById("hours");
  const minutesElem = document.getElementById("minutes");
  const secondsElem = document.getElementById("seconds");
  if(!daysElem || !hoursElem || !minutesElem || !secondsElem) return;

  const now = new Date().getTime();
  const diff = weddingDate - now;

  const days = Math.floor(diff/(1000*60*60*24));
  const hours = Math.floor((diff/(1000*60*60))%24);
  const minutes = Math.floor((diff/(1000*60))%60);
  const seconds = Math.floor((diff/1000)%60);

  // Animación para los números
  function animateNumber(id, value){
    const el = document.getElementById(id);
    if(el.innerText != value){
      el.classList.remove("flip");
      void el.offsetWidth; // reinicia la animación
      el.innerText = value;
      el.classList.add("flip");
    }
  }

  animateNumber("days", days);
  animateNumber("hours", hours);
  animateNumber("minutes", minutes);
  animateNumber("seconds", seconds);
}, 1000);