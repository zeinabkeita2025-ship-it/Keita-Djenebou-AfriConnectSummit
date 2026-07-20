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
//Navbar qui change de style au scroll
const navbar = document.querySelector(".navbar");
if (navbar) { //dectecte la position du navbar
    window.addEventListener("scroll", () => {  //quand on commence à scroller la page
        navbar.classList.toggle("scrolled", window.scrollY > 40);//gere le style au moment du scroll et dans le cas contraire(quand on scroll de 40px)
    });
}
//Bouton retour en haut
const btn = document.getElementById("btnTop");
if (btn) { // detecte le bouton (sa position)
    window.addEventListener("scroll", () => { // quand on scroll la page
        btn.style.display = window.scrollY > 30 ? "block" : "none";
    });
    btn.addEventListener("click", () => { // quand on clique sur le bouton
        window.scrollTo({ top: 0, behavior: 'smooth' }); // ca ramene en haut avec animation
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
// Cmpteur animé
//la selection des elements(chiffres à compter)
const counters = document.querySelectorAll('.counter');
if (counters.length > 0) { //verifie s'il ya au moins un compteur(carte)
    const observer = new IntersectionObserver((entries) => { // création d'un observateur qui surveille les éléments
        entries.forEach(entry => { // on parcourt les éléments à observer
            if (entry.isIntersecting) {
                const el = entry.target; // l'élément html à observer
                const target = +el.dataset.target; //Lit la valeur de l'attribut data-target
                let count = 0;
                const update = () => { //une fonction qui met à jour le nombre affiché 
                    count += target / 100;// la vitesse du compteur
                    if (count < target) {
                        el.textContent = Math.floor(count);
                        requestAnimationFrame(update);//Demande au navigateur d'exécuter update() à la prochaine image (environ 60 fois par seconde)AF
                    } else {
                        el.textContent = target;
                    }
                };
                update(); //Lance l'animation du compteur.
                observer.unobserve(el); //on arrete d'observer les éléments pour que le compteur ne recommence op
            }
        });
    }, { threshold: 1 }); //quand tout l'élément visible à l'écran(100%)
    counters.forEach(c => observer.observe(c)); //On demande à l'observateur de surveiller chaque élément .counter.
}
//Onglets des tableau  jour et son planing
const tabs = document.querySelectorAll(".tab");
const plannings = document.querySelectorAll(".planning");

tabs.forEach(tab => {

    tab.addEventListener("click", () => {

        // Désactive tous les boutons
        tabs.forEach(btn => btn.classList.remove("active"));

        // Cache tous les plannings
        plannings.forEach(planning => {
            planning.classList.remove("active");
        });

        // Active le bouton cliqué
        tab.classList.add("active");

        // Affiche le planning correspondant
        const jour = tab.dataset.day;
        document.getElementById(jour).classList.add("active");

    });

});
//Filtrage dynamique des cartes
const buttons = document.querySelectorAll(".btn");
const cards = document.querySelectorAll(".col");

buttons.forEach(button => {

    button.addEventListener("click", () => {

        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.dataset.filter;

        cards.forEach(card => {

            const category = card.querySelector(".speaker").dataset.filter;

            if (filter === "all" || category === filter) {

                card.style.display = "block";

                setTimeout(() => {
                    card.classList.remove("hide");
                    card.classList.add("show");
                }, 10);

            } else {

                card.classList.remove("show");
                card.classList.add("hide");

                setTimeout(() => {
                    card.style.display = "none";
                }, 300);

            }

        });

    });

});

//Validation de formulaire
const form = document.getElementById("form");
const nom = document.getElementById("nom");
const email = document.getElementById("email");
const telephone = document.getElementById("telephone");
const type = document.getElementById("type");
const pays = document.getElementById("pays");
const message = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const telephoneError = document.getElementById("telephoneError");
const selectError = document.getElementById("selectError");
const selectpError = document.getElementById("SelectpError");
const messageError = document.getElementById("messageError");

const succes = document.querySelector(".succes");
if (form) {
    form.addEventListener("submit", function (e) {

        e.preventDefault();

        let valide = true;

        // Réinitialisation
        succes.textContent = "";

        document.querySelectorAll("small").forEach(s => {
            if (!s.classList.contains("succes")) {
                s.textContent = "";
            }
        });

        document.querySelectorAll("input, textarea, select").forEach(champ => {
            champ.classList.remove("erreur", "valide");
        });

        // Nom

        if (nom.value.trim().length < 3) {

            nameError.textContent = "Veuillez entrer votre nom complet.";
            nom.classList.add("erreur");
            valide = false;

        } else {

            nom.classList.add("valide");

        }

        // Email

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regexEmail.test(email.value.trim())) {

            emailError.textContent = "Adresse email invalide.";
            email.classList.add("erreur");
            valide = false;

        } else {

            email.classList.add("valide");

        }

        // Téléphone

        const regexTel = /^[0-9]{8,15}$/;

        if (!regexTel.test(telephone.value.trim())) {

            telephoneError.textContent = "Numéro de téléphone invalide.";
            telephone.classList.add("erreur");
            valide = false;

        } else {

            telephone.classList.add("valide");

        }

        // Type

        if (type.value === "") {

            selectError.textContent = "Choisissez un type de participation.";
            type.classList.add("erreur");
            valide = false;

        } else {
            type.classList.add("valide");
        }

        // Pays

        if (pays.value === "") {

            selectpError.textContent = "Choisissez un pays.";
            pays.classList.add("erreur");
            valide = false;

        } else {

            pays.classList.add("valide");

        }

        // Motivation

        if (message.value.trim().length < 20) {

            messageError.textContent = "Votre motivation doit contenir au moins 20 caractères.";
            message.classList.add("erreur");
            valide = false;

        } else {

            message.classList.add("valide");

        }
        // Succès
        if (valide) {
            succes.textContent = " Inscription effectuée avec succès !";
            form.reset(); //Après l'envoi vide les champs
            document.querySelectorAll("input, textarea, select").forEach(champ => {
                champ.classList.remove("valide");
            });

        }

    });
}

//Animation d'apparition des elements de gauche vers droite
const reveals = document.querySelectorAll(".reveal-left");
const observers = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }

    });
}, {
    threshold: 0.15
});

reveals.forEach(reveal => {
    observers.observe(reveal);
});

//Animation d'apparition des elements de droite vers gauche
const reveal_right = document.querySelectorAll(".reveal-right");
const observersdroit = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }

    });
}, {
    threshold: 0.15
});

reveal_right.forEach(reveal => {
    observersdroit.observe(reveal);
});

//Animations d'apparition des éléments du bas vers le haut
const reveal_bas = document.querySelectorAll(".reveal-bottom");
const observerses = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }

    });
}, {
    threshold: 0.15
});

reveal_bas.forEach(reveal => {
    observerses.observe(reveal);
});

// Animation des cartes d'intervents
const cardes = document.querySelectorAll(".speaker, .speakere");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: 0.2
});

cardes.forEach((card, index) => {

    card.style.transition = `all .8s ease ${index * 0.15}s`;

    observer.observe(card);

});

/*Apparition des cartes (pourquoi participer) les une après les autres*/
const revealse = document.querySelectorAll(".reveal");

const observerse = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const delay = entry.target.dataset.delay || 0;

            setTimeout(() => {
                entry.target.classList.add("active");
            }, delay);

        }

    });
}, {
    threshold: 0.2
});
revealse.forEach(item => observerse.observe(item));

//Anne dynamique
const anné = document.getElementById("year");
if (anné) {
    anné.textContent = new Date().getFullYear();
}

//three.js de ma page d'intervenants
