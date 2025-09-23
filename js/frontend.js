/*
*
* effetto type prima schermata in home page
*
*/
document.addEventListener("DOMContentLoaded", () => {
    // Array di triplette di stringhe
    const textTriples = [
        ["By Oversonic.", "Designed for industry.", "Your workmate, cognitive, autonomous and safe."],
        ["Made in Italy.", "Bimanual manipulation.", "Adaptive pick & place functionality."],
        ["AI powered and self learning.", "Collaborative approach.", "Built to cooperate with humans."],
        ["Speech enabled and responsive.", "Certified product.", "Attention to quality, safety and environment."]
    ];

    // Elementi HTML
    const txt1 = document.getElementById("txt1");
    const txt2 = document.getElementById("txt2");
    const txt3 = document.getElementById("txt3");
    const body = document.body;

    let currentIndex = 0;

    if (txt1 && txt2 && txt3) {

        function typeEffect(element, text, callback) {
            let index = 0;
            const glitchLength = 4; // Numero di caratteri glitchati
            const glitchChars = "██████████████████████ABefghijklmuvwxyz0123456789!@#$%^&*()_+=-";
            const typingSpeed = 25; // Velocità di scrittura
            const glitchSpeed = 100; // Velocità del glitch
            const glitchDuration = 500; // Durata del glitch (ms)

            element.textContent = ""; // Resetta il contenuto

            const interval = setInterval(() => {
                if (index < text.length - glitchLength) {
                    // Scrive il testo normalmente fino alla parte finale glitch
                    element.textContent = text.slice(0, index + 1);
                    index++;
                } else {
                    // Fase di glitch
                    const visibleText = text.slice(0, index + 1);
                    const glitchText = Array.from({ length: glitchLength }, () =>
                        glitchChars.charAt(Math.floor(Math.random() * glitchChars.length))
                    ).join("");
                    element.textContent = visibleText + glitchText;

                    // Termina il glitch dopo un certo periodo
                    setTimeout(() => {
                        clearInterval(interval);
                        element.textContent = text; // Completa il testo
                        if (callback) callback(); // Chiama il callback alla fine
                    }, glitchDuration);
                }
            }, index < text.length - glitchLength ? typingSpeed : glitchSpeed);
        }

        function updateTexts() {
            const [text1, text2, text3] = textTriples[currentIndex];

            updateIndicator(currentIndex);
            updateBodyClass(currentIndex);
            typeEffect(txt1, text1);

            // Ritardi sfalsati per dare un effetto progressivo
            setTimeout(() => typeEffect(txt2, text2), 300);
            setTimeout(() => typeEffect(txt3, text3, () => {
                currentIndex = (currentIndex + 1) % textTriples.length;
            }), 600);
        }

        function updateBodyClass(index) {
            body.classList.remove("step-1", "step-2", "step-3", "step-4");
            body.classList.add(`step-${index + 1}`);
        }

        function updateIndicator(index) {
            const indicators = [document.getElementById("n1"), document.getElementById("n2"), document.getElementById("n3"), document.getElementById("n4")];

            indicators.forEach(indicator => indicator?.classList.remove("active"));
            indicators[index]?.classList.add("active");
        }

        // Avvia il ciclo di aggiornamento ogni 8 secondi
        updateTexts();
        setInterval(updateTexts, 8000);
    }
});


/*
*
* effetto type elementi successivi, in home e nelle altre pagine
*
*/
document.addEventListener("DOMContentLoaded", () => {
    function typeEffect(element, text, callback) {
        if (!element || !text) return;

        let index = 0;
        const glitchLength = 4;
        const glitchChars = "██████████████████████ABefghijklmuvwxyz0123456789!@#$%^&*()_+=-";
        const typingSpeed = 25;
        const glitchSpeed = 100;
        const glitchDuration = 500;

        element.textContent = "";

        const interval = setInterval(() => {
            if (index < text.length - glitchLength) {
                element.textContent = text.slice(0, index + 1);
                index++;
            } else {
                const visibleText = text.slice(0, index + 1);
                const glitchText = Array.from({ length: glitchLength }, () =>
                    glitchChars.charAt(Math.floor(Math.random() * glitchChars.length))
                ).join("");
                element.textContent = visibleText + glitchText;

                setTimeout(() => {
                    clearInterval(interval);
                    element.textContent = text;
                    if (callback) callback();
                }, glitchDuration);
            }
        }, index < text.length - glitchLength ? typingSpeed : glitchSpeed);
    }

    if (window.innerWidth >= 1200) {
        const pairs = [
            ["txt-1-1", "txt-1-2"],
            ["txt-2-1", "txt-2-2"],
            ["txt-3-1", "txt-3-2"],
            ["txt-4-1", "txt-4-2"]
        ];

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const [id1, id2] = entry.target.dataset.pair.split(",");
                    const el1 = document.getElementById(id1);
                    const el2 = document.getElementById(id2);

                    if (el1 && el2) {
                        const text1 = el1.textContent;
                        const text2 = el2.textContent;

                        // Reset iniziale
                        el1.textContent = "";
                        el2.textContent = "";
                        el2.style.visibility = "hidden";

                        // Avvio quasi simultaneo: primo e secondo element
                        setTimeout(() => {
                            typeEffect(el1, text1);
                            el2.style.visibility = "visible";
                            typeEffect(el2, text2);
                        }, 500); // 1 secondo delay iniziale
                    }

                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        pairs.forEach(([id1, id2]) => {
            const el1 = document.getElementById(id1);
            const el2 = document.getElementById(id2);
            if (el1 && el2) {
                el1.dataset.pair = `${id1},${id2}`;
                observer.observe(el1);
            }
        });
    } else {
        // Fallback: mostra tutto
        ["txt-1-1","txt-1-2","txt-2-1","txt-2-2","txt-3-1","txt-3-2","txt-4-1","txt-4-2"].forEach(id => {
            const el = document.getElementById(id);
            if (el && el.textContent.trim() === "") {
                el.textContent = el.getAttribute("data-fallback") || "";
                el.style.visibility = "visible";
            }
        });
    }
});



/*
*
* apertura /chiusura menu in mobile
*
*/
document.getElementById('mobile-menu-opener').addEventListener('click', function () {
    document.body.classList.add('show-menu');
});
document.getElementById('mobile-menu-closer').addEventListener('click', function () {
    document.body.classList.remove('show-menu');
});



/*
*
* scroll down bottone homepage (mobile)
*
*/
const scroller = document.getElementById('mobile-hero-scroller');
if (scroller) {
  scroller.addEventListener('click', function () {
    window.scrollBy({
      top: window.innerHeight,
      left: 0,
      behavior: 'smooth'
    });
  });
}



/*
*
* visione del menu in base allo scroll (desktop)
*
*/
const scrollThreshold = 450; // Soglia per l'attivazione di scroll-down
const upThreshold = 800; // Soglia per l'attivazione di scroll-up
let lastScrollTop = 0;
let hasPassedThreshold = false; // Flag per verificare se abbiamo superato la soglia
tempScrollUp = 0;

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > scrollThreshold) {
    if (scrollTop > lastScrollTop) {
      // Scorrimento verso il basso oltre la soglia
      if (!hasPassedThreshold) {
        document.body.classList.add("scroll-down");
        document.body.classList.remove("scroll-up");
        hasPassedThreshold = true;
        tempScrollUp = 0; // Reset della soglia di scroll-up
      }
    } else {
      // Scorrimento verso l'alto
      tempScrollUp += lastScrollTop - scrollTop;
      if (tempScrollUp > upThreshold) {
        document.body.classList.remove("scroll-down");
        document.body.classList.add("scroll-up");
        hasPassedThreshold = false;
      }
    }
  } else {
    // Se torniamo sopra la soglia, resettiamo il flag e rimuoviamo la classe
    document.body.classList.remove("scroll-down");
    document.body.classList.add("scroll-up");
    hasPassedThreshold = false;
  }

  lastScrollTop = scrollTop;
}, { passive: true });



/*
*
* controlli client footer form
*
*/
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const nameField = document.getElementById("first-name");
    const emailField = document.getElementById("email");
    const privacyField = document.getElementById("nl-privacy");
    const privacyLabel = document.getElementById("nl-label-privacy");

    // Rimuovi classe di errore al focus
    [nameField, emailField, privacyField].forEach(field => {
        field.addEventListener("focus", function () {
            if (field === privacyField) {
                privacyLabel.classList.remove("nl-error");
            } else {
                field.classList.remove("nl-error");
            }
        });
    });

    // Validazione form
    form.addEventListener("submit", function (e) {
        let valid = true;

        // Nome
        if (nameField.value.trim() === "") {
            nameField.classList.add("nl-error");
            valid = false;
        }

        // Email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailField.value.trim() === "" || !emailPattern.test(emailField.value)) {
            emailField.classList.add("nl-error");
            valid = false;
        }

        // Privacy
        if (!privacyField.checked) {
            privacyLabel.classList.add("nl-error");
            valid = false;
        }

        if (!valid) {
            e.preventDefault(); // blocca l'invio se ci sono errori
            return false;
        }
    });
});
