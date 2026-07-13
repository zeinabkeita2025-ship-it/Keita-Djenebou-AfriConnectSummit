// Navbar menu hamburgeur

const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

hamburger.addEventListener("click", () => {
    menu.classList.toggle("active");
});
// Dark Mode 
const body = document.body;
    // la selection du bouton dark-light
    const toggleBtn = document.getElementById("themeToggle");
    if (toggleBtn) { //verifie le bouton 
        let savedTheme = localStorage.getItem("theme") || "light";//on recupère le theme sauvegardé
        body.className = savedTheme;
        toggleBtn.textContent = savedTheme === "dark" ? "⭐" : "🌙";
        toggleBtn.addEventListener("click", () => { // quand on clique sur le bouton
            if (body.classList.contains("dark")) {
                body.classList.replace("dark", "light");
                localStorage.setItem("theme", "light");
                toggleBtn.textContent = "🌙";
            } else {
                body.classList.replace("light", "dark");
                localStorage.setItem("theme", "dark");
                toggleBtn.textContent = "⭐";
            }
        });
    }
// Section en fondu
const sections = document.querySelectorAll(".fade");
if (sections.length > 0) {
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add("show");
        });
    }, { threshold: 0.2 }); //quand 20% de l'element apparait à l'écran
    sections.forEach(s => fadeObserver.observe(s));
}

//Animation d'apparition des elements
const reveals = document.querySelectorAll(".reveal-left");

const observers = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("active");
        }

    });
},{
    threshold:0.15
});

reveals.forEach(reveal=>{
    observers.observe(reveal);
});

// Animation des cartes d'intervents
const cards = document.querySelectorAll(".speaker");

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.2
});

cards.forEach((card,index)=>{

    card.style.transition=`all .8s ease ${index*0.15}s`;

    observer.observe(card);

});