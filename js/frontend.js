document.addEventListener("DOMContentLoaded", () => {
    // Array di coppie di stringhe
    const textPairs = [
        ["Designed for industry.", "Your smart workmate, cognitive, autonomous and safe."],
        ["Bimanual manupulation.", "Adaptive pick & place functionality."],
        ["Collaborative approach.", "Built to cooperate with humans."],
        ["Certified product.", "Attention to quality, safety and environment."]
    ];

    // Elementi HTML
    const txt1 = document.getElementById("txt1");
    const txt2 = document.getElementById("txt2");
    const body = document.body;

    let currentIndex = 0;

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
        const [text1, text2] = textPairs[currentIndex];

        updateIndicator(currentIndex);
        updateBodyClass(currentIndex);
        typeEffect(txt1, text1);

        // Avvia txt2 con un ritardo fisso di 600 ms rispetto a txt1
        setTimeout(() => {
            typeEffect(txt2, text2, () => {
                // Aggiorna l'indice e ripete il ciclo
                currentIndex = (currentIndex + 1) % textPairs.length;
            });
        }, 300);
    }

    function updateBodyClass(index) {
        // Rimuove tutte le classi precedenti relative agli step
        body.classList.remove("step-1", "step-2", "step-3", "step-4");

        // Aggiunge la classe corrispondente allo step corrente
        body.classList.add(`step-${index + 1}`);
    }

    function updateIndicator(index) {
        // Recupera tutti gli indicatori
        const indicators = [document.getElementById("n1"), document.getElementById("n2"), document.getElementById("n3"), document.getElementById("n4")];

        // Rimuove la classe 'active' da tutti gli indicatori
        indicators.forEach((indicator) => {
            if (indicator) {
                indicator.classList.remove("active");
            }
        });

        // Aggiunge la classe 'active' all'indicatore corrente
        if (indicators[index]) {
            indicators[index].classList.add("active");
        }
    }

    // Avvia l'aggiornamento automatico ogni 8 secondi
    updateTexts(); // Esegue immediatamente il primo ciclo
    setInterval(updateTexts, 8000);
});

document.getElementById('mobile-menu-opener').addEventListener('click', function () {
    document.body.classList.add('show-menu');
});
document.getElementById('mobile-menu-closer').addEventListener('click', function () {
    document.body.classList.remove('show-menu');
});