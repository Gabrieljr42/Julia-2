// Sistema de Galeria de Momentos
class Gallery {
    constructor() {
        this.moments = [
            {
                id: 1,
                title: "Nosso Primeiro Encontro",
                date: "Há 1 mês e meio",
                description: "O dia em que tudo começou. Seus olhos brilharam de um jeito que eu nunca vou esquecer. Foi quando soube que você era especial.",
                icon: "💕",
                color: "linear-gradient(135deg, #F8BBD9, #E4C1F9)"
            },
            {
                id: 2,
                title: "Descobrindo Sua Paixão pela Música",
                date: "Primeiros dias juntos",
                description: "Quando você me contou sobre seu amor pela música, vi seus olhos se iluminarem. É lindo ver alguém falar do que ama com tanta paixão.",
                icon: "🎵",
                color: "linear-gradient(135deg, #A8E6CF, #F7D794)"
            },
            {
                id: 3,
                title: "Conhecendo Seus Sonhos",
                date: "Conversas especiais",
                description: "Você me contou sobre a pedagogia, sobre seu amor pelas crianças. Vi uma futura professora incrível, alguém que vai mudar vidas.",
                icon: "📚",
                color: "linear-gradient(135deg, #F7D794, #F8BBD9)"
            },
            {
                id: 4,
                title: "Sua Fé Me Inspira",
                date: "Todos os dias",
                description: "Sua fé cristã é uma das coisas mais lindas em você. Me inspira a ser uma pessoa melhor e a buscar a Deus todos os dias.",
                icon: "✨",
                color: "linear-gradient(135deg, #E4C1F9, #A8E6CF)"
            },
            {
                id: 5,
                title: "Minha Princesa",
                date: "Desde sempre",
                description: "Para mim, você sempre foi e sempre será minha princesa. Delicada, forte, linda por dentro e por fora. Você é perfeita do seu jeito.",
                icon: "👑",
                color: "linear-gradient(135deg, #F8BBD9, #F7D794)"
            },
            {
                id: 6,
                title: "Nosso Futuro Juntos",
                date: "Para sempre",
                description: "Mesmo sendo pouco tempo, já sonho com nosso futuro. Quero estar ao seu lado em cada conquista, cada sonho realizado, cada momento especial.",
                icon: "🌟",
                color: "linear-gradient(135deg, #A8E6CF, #E4C1F9)"
            }
        ];
        
        this.init();
    }

    init() {
        this.createGallery();
        this.setupModal();
    }

    createGallery() {
        const galleryGrid = document.getElementById('galleryGrid');
        if (!galleryGrid) return;

        galleryGrid.innerHTML = '';

        this.moments.forEach((moment, index) => {
            const galleryItem = this.createGalleryItem(moment, index);
            galleryGrid.appendChild(galleryItem);
        });
    }

    createGalleryItem(moment, index) {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.style.animationDelay = `${index * 0.1}s`;
        
        item.innerHTML = `
            <div class="gallery-image" style="background: ${moment.color}">
                <span class="gallery-icon">${moment.icon}</span>
            </div>
            <div class="gallery-content">
                <h3 class="gallery-title">${moment.title}</h3>
                <p class="gallery-date">${moment.date}</p>
                <p class="gallery-description">${moment.description}</p>
            </div>
        `;

        // Adicionar evento de clique para modal
        item.addEventListener('click', () => {
            this.openModal(moment);
        });

        // Adicionar animação de entrada quando item ficar visível
        this.observeElement(item);

        return item;
    }

    observeElement(element) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        observer.observe(element);
    }

    setupModal() {
        // Criar modal se não existir
        if (!document.getElementById('galleryModal')) {
            this.createModal();
        }
    }

    createModal() {
        const modal = document.createElement('div');
        modal.id = 'galleryModal';
        modal.className = 'gallery-modal';
        modal.innerHTML = `
            <div class="modal-overlay" id="modalOverlay"></div>
            <div class="modal-content">
                <button class="modal-close" id="modalClose">×</button>
                <div class="modal-image" id="modalImage"></div>
                <div class="modal-info">
                    <h2 class="modal-title" id="modalTitle"></h2>
                    <p class="modal-date" id="modalDate"></p>
                    <p class="modal-description" id="modalDescription"></p>
                </div>
                <div class="modal-navigation">
                    <button class="modal-nav-btn" id="modalPrev">❮</button>
                    <button class="modal-nav-btn" id="modalNext">❯</button>
                </div>
            </div>
        `;

        // Adicionar estilos do modal
        const modalStyles = document.createElement('style');
        modalStyles.textContent = `
            .gallery-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1000;
                display: none;
                align-items: center;
                justify-content: center;
            }

            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(5px);
            }

            .modal-content {
                position: relative;
                background: var(--branco-perola);
                border-radius: 20px;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                animation: modalSlideIn 0.3s ease-out;
            }

            .modal-close {
                position: absolute;
                top: 15px;
                right: 20px;
                background: none;
                border: none;
                font-size: 2rem;
                color: var(--rosa-escuro);
                cursor: pointer;
                z-index: 1001;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: var(--transition-smooth);
            }

            .modal-close:hover {
                background: var(--rosa-suave);
                color: var(--branco-perola);
            }

            .modal-image {
                height: 250px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 4rem;
                color: var(--branco-perola);
                border-radius: 20px 20px 0 0;
            }

            .modal-info {
                padding: var(--spacing-md);
            }

            .modal-title {
                font-family: var(--font-title);
                font-size: 2rem;
                color: var(--rosa-escuro);
                margin-bottom: var(--spacing-xs);
            }

            .modal-date {
                color: #999;
                margin-bottom: var(--spacing-sm);
                font-style: italic;
            }

            .modal-description {
                line-height: 1.6;
                color: #666;
                font-size: 1.1rem;
            }

            .modal-navigation {
                display: flex;
                justify-content: space-between;
                padding: var(--spacing-md);
                border-top: 1px solid var(--cinza-suave);
            }

            .modal-nav-btn {
                background: var(--rosa-escuro);
                color: var(--branco-perola);
                border: none;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                font-size: 1.5rem;
                cursor: pointer;
                transition: var(--transition-smooth);
            }

            .modal-nav-btn:hover {
                background: var(--rosa-suave);
                transform: scale(1.1);
            }

            @keyframes modalSlideIn {
                from {
                    opacity: 0;
                    transform: scale(0.8) translateY(50px);
                }
                to {
                    opacity: 1;
                    transform: scale(1) translateY(0);
                }
            }

            @media (max-width: 768px) {
                .modal-content {
                    width: 95%;
                    margin: var(--spacing-sm);
                }
                
                .modal-image {
                    height: 200px;
                    font-size: 3rem;
                }
                
                .modal-title {
                    font-size: 1.5rem;
                }
            }
        `;

        document.head.appendChild(modalStyles);
        document.body.appendChild(modal);

        // Setup event listeners
        this.setupModalEvents();
    }

    setupModalEvents() {
        const modal = document.getElementById('galleryModal');
        const overlay = document.getElementById('modalOverlay');
        const closeBtn = document.getElementById('modalClose');
        const prevBtn = document.getElementById('modalPrev');
        const nextBtn = document.getElementById('modalNext');

        // Fechar modal
        [overlay, closeBtn].forEach(element => {
            if (element) {
                element.addEventListener('click', () => this.closeModal());
            }
        });

        // Navegação
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousMoment());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextMoment());
        }

        // Fechar com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                this.closeModal();
            }
        });

        // Navegação com setas
        document.addEventListener('keydown', (e) => {
            if (modal.style.display === 'flex') {
                if (e.key === 'ArrowLeft') this.previousMoment();
                if (e.key === 'ArrowRight') this.nextMoment();
            }
        });
    }

    openModal(moment) {
        const modal = document.getElementById('galleryModal');
        const modalImage = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalDate = document.getElementById('modalDate');
        const modalDescription = document.getElementById('modalDescription');

        if (modal && modalImage && modalTitle && modalDate && modalDescription) {
            // Encontrar índice do momento atual
            this.currentMomentIndex = this.moments.findIndex(m => m.id === moment.id);

            // Preencher conteúdo
            modalImage.style.background = moment.color;
            modalImage.innerHTML = `<span style="font-size: 4rem;">${moment.icon}</span>`;
            modalTitle.textContent = moment.title;
            modalDate.textContent = moment.date;
            modalDescription.textContent = moment.description;

            // Mostrar modal
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal() {
        const modal = document.getElementById('galleryModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    previousMoment() {
        this.currentMomentIndex = this.currentMomentIndex === 0 
            ? this.moments.length - 1 
            : this.currentMomentIndex - 1;
        
        this.updateModalContent();
    }

    nextMoment() {
        this.currentMomentIndex = (this.currentMomentIndex + 1) % this.moments.length;
        this.updateModalContent();
    }

    updateModalContent() {
        const moment = this.moments[this.currentMomentIndex];
        const modalImage = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalDate = document.getElementById('modalDate');
        const modalDescription = document.getElementById('modalDescription');

        if (modalImage && modalTitle && modalDate && modalDescription) {
            modalImage.style.background = moment.color;
            modalImage.innerHTML = `<span style="font-size: 4rem;">${moment.icon}</span>`;
            modalTitle.textContent = moment.title;
            modalDate.textContent = moment.date;
            modalDescription.textContent = moment.description;
        }
    }
}

// Inicializar galeria quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new Gallery();
});