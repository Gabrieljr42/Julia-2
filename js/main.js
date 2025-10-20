// Script Principal - Coordenação Geral do Site
class SiteController {
    constructor() {
        this.init();
    }

    init() {
        this.setupTypewriter();
        this.setupSmoothScrolling();
        this.setupNavigationHighlight();
        this.setupIntersectionObserver();
        this.setupResponsiveNavigation();
        this.addLoadingAnimation();
    }

    // Efeito Typewriter para o Hero
    setupTypewriter() {
        const typewriterElement = document.getElementById('typewriter');
        if (!typewriterElement) return;

        const messages = [
            "Uma surpresa especial para você... ✨",
            "Minha princesa linda... 👑",
            "Com todo meu amor... 💕"
        ];

        let messageIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const typeSpeed = 100;
        const deleteSpeed = 50;
        const pauseTime = 2000;

        const type = () => {
            const currentMessage = messages[messageIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentMessage.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterElement.textContent = currentMessage.substring(0, charIndex + 1);
                charIndex++;
            }

            let speed = isDeleting ? deleteSpeed : typeSpeed;

            if (!isDeleting && charIndex === currentMessage.length) {
                speed = pauseTime;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                messageIndex = (messageIndex + 1) % messages.length;
            }

            setTimeout(type, speed);
        };

        // Start typewriter effect after a delay
        setTimeout(type, 1000);
    }

    // Navegação suave entre seções
    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Destacar seção ativa na navegação
    setupNavigationHighlight() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.main-nav a');

        const highlightNavigation = () => {
            let current = '';
            const scrollPosition = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', highlightNavigation);
        highlightNavigation(); // Initial call
    }

    // Observer para animações quando elementos ficam visíveis
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Animações específicas por seção
                    this.handleSectionAnimation(entry.target);
                }
            });
        }, observerOptions);

        // Observar seções principais
        const sectionsToObserve = document.querySelectorAll('section:not(#hero)');
        sectionsToObserve.forEach(section => {
            observer.observe(section);
        });

        // Observar cards individuais
        const cardsToObserve = document.querySelectorAll('.pedagogy-card, .gallery-item');
        cardsToObserve.forEach(card => {
            observer.observe(card);
        });
    }

    // Animações específicas por seção
    handleSectionAnimation(element) {
        const sectionId = element.id;
        
        switch(sectionId) {
            case 'music':
                this.animateMusicSection();
                break;
            case 'pedagogy':
                this.animatePedagogyCards();
                break;
            case 'gallery':
                this.animateGalleryItems();
                break;
            case 'letter':
                this.animateLetterSection();
                break;
        }
    }

    animateMusicSection() {
        const vinylDisc = document.getElementById('vinylDisc');
        if (vinylDisc) {
            vinylDisc.style.animation = 'fadeInScale 1s ease-out';
        }
    }

    animatePedagogyCards() {
        const cards = document.querySelectorAll('.pedagogy-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'slideInUp 0.6s ease-out forwards';
            }, index * 200);
        });
    }

    animateGalleryItems() {
        const items = document.querySelectorAll('.gallery-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }, index * 100);
        });
    }

    animateLetterSection() {
        const letterPaper = document.querySelector('.letter-paper');
        if (letterPaper) {
            letterPaper.style.animation = 'letterAppear 1s ease-out forwards';
        }
    }

    // Navegação responsiva
    setupResponsiveNavigation() {
        const nav = document.querySelector('.main-nav');
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down - hide nav
                nav.style.transform = 'translateX(-50%) translateY(-100%)';
            } else {
                // Scrolling up - show nav
                nav.style.transform = 'translateX(-50%) translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);
    }

    // Animação de carregamento
    addLoadingAnimation() {
        // Add CSS animations if not already present
        if (!document.getElementById('mainAnimations')) {
            const style = document.createElement('style');
            style.id = 'mainAnimations';
            style.textContent = `
                @keyframes fadeInScale {
                    from {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes letterAppear {
                    from {
                        opacity: 0;
                        transform: translateY(50px) rotateX(10deg);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) rotateX(0deg);
                    }
                }

                .animate-in {
                    animation: fadeInUp 0.8s ease-out forwards;
                }

                .main-nav {
                    transition: transform 0.3s ease-out;
                }

                .main-nav a.active {
                    background: var(--rosa-escuro);
                    color: var(--branco-perola);
                    transform: translateY(-2px);
                }

                /* Loading state */
                .loading {
                    opacity: 0;
                    animation: fadeIn 0.5s ease-out 0.2s forwards;
                }

                @keyframes fadeIn {
                    to { opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }

        // Add loading class to main elements
        const mainElements = document.querySelectorAll('section, .main-nav');
        mainElements.forEach(element => {
            element.classList.add('loading');
        });
    }

    // Método para mostrar mensagens de feedback
    showMessage(text, type = 'info') {
        const message = document.createElement('div');
        message.className = `site-message ${type}`;
        message.textContent = text;
        
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#ff6b6b' : 'var(--azul-serenidade)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            z-index: 1001;
            animation: slideInRight 0.3s ease-out;
            max-width: 300px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        `;

        document.body.appendChild(message);

        setTimeout(() => {
            message.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => message.remove(), 300);
        }, 3000);
    }

    // Método para detectar dispositivo móvel
    isMobile() {
        return window.innerWidth <= 768;
    }

    // Método para otimizar performance em dispositivos móveis
    optimizeForMobile() {
        if (this.isMobile()) {
            // Reduzir partículas em dispositivos móveis
            const particlesContainer = document.getElementById('particles');
            if (particlesContainer) {
                particlesContainer.style.display = 'none';
            }

            // Simplificar algumas animações
            document.documentElement.style.setProperty('--transition-smooth', 'all 0.2s ease');
        }
    }
}

// Utilitários globais
const Utils = {
    // Debounce function para otimizar eventos de scroll
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Função para detectar se elemento está visível
    isElementVisible(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Função para gerar ID único
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
};

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    const siteController = new SiteController();
    
    // Otimizar para mobile se necessário
    siteController.optimizeForMobile();
    
    // Mostrar mensagem de boas-vindas após carregamento
    setTimeout(() => {
        siteController.showMessage('Bem-vinda à sua surpresa especial! 💕');
    }, 2000);
});

// Tratar erros globais graciosamente
window.addEventListener('error', (e) => {
    console.log('Erro capturado:', e.error);
    // Não mostrar erros para o usuário final - manter a experiência positiva
});

// Otimizar performance
window.addEventListener('load', () => {
    // Preload de recursos importantes
    const importantImages = ['audio/background.mp3'];
    importantImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = src;
        link.as = src.includes('.mp3') ? 'audio' : 'image';
        document.head.appendChild(link);
    });
});