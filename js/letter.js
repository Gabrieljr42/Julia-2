// Sistema de Carta de Amor Digital
class LoveLetter {
    constructor() {
        this.letterText = `Minha querida Júlia Delaías,

Sei que estamos juntos há pouco tempo, apenas um mês e meio, mas já sinto que você é uma pessoa muito especial na minha vida. Desde o primeiro momento que te conheci, percebi que havia algo diferente em você, algo que me fazia querer conhecer mais e mais sobre quem você é.

Sua paixão pela música me encanta. Quando você fala sobre as canções que ama, seus olhos brilham de um jeito único. É lindo ver alguém que tem tanto amor pela arte, pela melodia, pela harmonia. Você tem um coração musical, e isso torna tudo ao seu redor mais bonito.

Admiro profundamente seus estudos em pedagogia e seu amor pelas crianças. Vejo em você uma futura educadora incrível, alguém que vai plantar sementes de conhecimento e amor no coração de cada criança que cruzar seu caminho. Sua dedicação aos estudos me inspira todos os dias. Você é determinada, inteligente e sei que vai conquistar tudo que sonhar.

Sua fé cristã é uma das coisas mais lindas em você. Me inspira a ser uma pessoa melhor e a buscar a Deus todos os dias. Você tem uma luz especial, uma paz que vem de dentro, e isso me faz sentir que estou ao lado de alguém verdadeiramente especial.

Para mim, você é minha princesa. Não apenas pela sua beleza externa, que é inegável, mas principalmente pela sua beleza interior. Você é delicada, mas forte. Gentil, mas determinada. Doce, mas cheia de personalidade. Você é perfeita do seu jeito único.

Mesmo sendo pouco tempo de relacionamento, já sonho com nosso futuro juntos. Quero estar ao seu lado em cada conquista, cada sonho realizado, cada momento especial. Quero apoiar seus estudos, celebrar suas vitórias, e caminhar junto com você nessa jornada da vida.

Você trouxe cor para os meus dias, música para o meu coração, e esperança para o meu futuro. Obrigado por ser quem você é, por me permitir fazer parte da sua vida, e por tornar cada dia mais especial só por existir.

Com todo o meu amor e carinho, prometo cuidar do seu coração com a delicadeza que uma princesa merece.

Te amo, minha linda Júlia. ✨`;

        this.currentIndex = 0;
        this.isTyping = false;
        this.isPaused = false;
        this.speed = 50; // milliseconds per character
        this.init();
    }

    init() {
        this.setupControls();
    }

    setupControls() {
        const startBtn = document.getElementById('startLetter');
        const pauseBtn = document.getElementById('pauseLetter');
        const speedControl = document.getElementById('speedControl');

        if (startBtn) {
            startBtn.addEventListener('click', () => this.startTyping());
        }

        if (pauseBtn) {
            pauseBtn.addEventListener('click', () => this.togglePause());
        }

        if (speedControl) {
            speedControl.addEventListener('input', (e) => {
                this.speed = 250 - parseInt(e.target.value); // Inverter para que maior valor = mais rápido
            });
        }
    }

    startTyping() {
        if (this.isTyping && !this.isPaused) return;

        const startBtn = document.getElementById('startLetter');
        const pauseBtn = document.getElementById('pauseLetter');
        const letterBody = document.getElementById('letterBody');

        if (!letterBody) return;

        // Reset if starting over
        if (!this.isTyping) {
            this.currentIndex = 0;
            letterBody.innerHTML = '';
        }

        this.isTyping = true;
        this.isPaused = false;

        // Update button visibility
        if (startBtn) startBtn.style.display = 'none';
        if (pauseBtn) pauseBtn.style.display = 'inline-block';

        this.typeNextCharacter();
    }

    typeNextCharacter() {
        if (!this.isTyping || this.isPaused) return;

        const letterBody = document.getElementById('letterBody');
        if (!letterBody) return;

        if (this.currentIndex < this.letterText.length) {
            const char = this.letterText[this.currentIndex];
            
            // Handle line breaks
            if (char === '\n') {
                letterBody.innerHTML += '<br><br>';
            } else {
                letterBody.innerHTML += char;
            }

            this.currentIndex++;

            // Auto-scroll to keep the typing visible
            letterBody.scrollTop = letterBody.scrollHeight;

            // Continue typing
            setTimeout(() => this.typeNextCharacter(), this.speed);
        } else {
            // Finished typing
            this.finishTyping();
        }
    }

    togglePause() {
        const pauseBtn = document.getElementById('pauseLetter');
        
        if (this.isPaused) {
            this.isPaused = false;
            if (pauseBtn) pauseBtn.textContent = 'Pausar';
            this.typeNextCharacter();
        } else {
            this.isPaused = true;
            if (pauseBtn) pauseBtn.textContent = 'Continuar';
        }
    }

    finishTyping() {
        this.isTyping = false;
        this.isPaused = false;

        const startBtn = document.getElementById('startLetter');
        const pauseBtn = document.getElementById('pauseLetter');

        // Update buttons
        if (startBtn) {
            startBtn.textContent = 'Ler Novamente';
            startBtn.style.display = 'inline-block';
        }
        if (pauseBtn) {
            pauseBtn.style.display = 'none';
        }

        // Add finishing animation
        this.addFinishingTouches();
    }

    addFinishingTouches() {
        const letterBody = document.getElementById('letterBody');
        if (!letterBody) return;

        // Add a subtle glow effect
        letterBody.style.animation = 'letterGlow 2s ease-in-out';

        // Create floating hearts animation
        this.createFloatingHearts();

        // Add completion message
        setTimeout(() => {
            this.showCompletionMessage();
        }, 1000);
    }

    createFloatingHearts() {
        const letterContainer = document.querySelector('.letter-container');
        if (!letterContainer) return;

        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = '💕';
                heart.style.cssText = `
                    position: absolute;
                    font-size: 1.5rem;
                    pointer-events: none;
                    z-index: 10;
                    animation: floatHeart 3s ease-out forwards;
                    left: ${Math.random() * 100}%;
                    top: 100%;
                `;

                letterContainer.appendChild(heart);

                // Remove heart after animation
                setTimeout(() => {
                    heart.remove();
                }, 3000);
            }, i * 200);
        }

        // Add CSS for heart animation if not exists
        if (!document.getElementById('heartAnimation')) {
            const style = document.createElement('style');
            style.id = 'heartAnimation';
            style.textContent = `
                @keyframes letterGlow {
                    0%, 100% { box-shadow: none; }
                    50% { box-shadow: 0 0 20px rgba(248, 187, 217, 0.5); }
                }

                @keyframes floatHeart {
                    0% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-100px) scale(1.5);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    showCompletionMessage() {
        const message = document.createElement('div');
        message.className = 'completion-message';
        message.innerHTML = `
            <p>💕 Espero que tenha gostado da surpresa, minha princesa! 💕</p>
        `;
        message.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: linear-gradient(135deg, var(--rosa-suave), var(--lavanda));
            color: var(--branco-perola);
            padding: 1rem 1.5rem;
            border-radius: 25px;
            font-family: var(--font-title);
            font-size: 1.1rem;
            box-shadow: 0 8px 25px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideInRight 0.5s ease-out;
            max-width: 300px;
            text-align: center;
        `;

        // Add slide animation
        if (!document.getElementById('slideAnimation')) {
            const style = document.createElement('style');
            style.id = 'slideAnimation';
            style.textContent = `
                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(100px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(message);

        // Remove message after 5 seconds
        setTimeout(() => {
            message.style.animation = 'slideInRight 0.5s ease-out reverse';
            setTimeout(() => message.remove(), 500);
        }, 5000);
    }

    // Method to handle visibility - start typing when section comes into view
    observeSection() {
        const letterSection = document.getElementById('letter');
        if (!letterSection) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAutoStarted) {
                    // Auto-start after a delay when section becomes visible
                    setTimeout(() => {
                        const startBtn = document.getElementById('startLetter');
                        if (startBtn && !this.isTyping) {
                            startBtn.style.animation = 'pulse 1s ease-in-out infinite';
                        }
                    }, 1000);
                    this.hasAutoStarted = true;
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });

        observer.observe(letterSection);

        // Add pulse animation
        if (!document.getElementById('pulseAnimation')) {
            const style = document.createElement('style');
            style.id = 'pulseAnimation';
            style.textContent = `
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Inicializar carta quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    const loveLetter = new LoveLetter();
    loveLetter.observeSection();
});