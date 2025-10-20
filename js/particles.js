// Sistema de Partículas para Efeito Mágico
class ParticleSystem {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.maxParticles = 50;
        this.init();
    }

    init() {
        this.createParticles();
        this.animate();
    }

    createParticles() {
        for (let i = 0; i < this.maxParticles; i++) {
            this.particles.push(this.createParticle());
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Estilos da partícula
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = this.getRandomColor();
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.opacity = Math.random() * 0.8 + 0.2;
        particle.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px currentColor`;
        
        // Posição inicial
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = Math.random() * window.innerHeight + 'px';
        
        // Propriedades de movimento
        particle.vx = (Math.random() - 0.5) * 2;
        particle.vy = (Math.random() - 0.5) * 2;
        particle.life = Math.random() * 100 + 50;
        particle.maxLife = particle.life;
        
        this.container.appendChild(particle);
        return particle;
    }

    getRandomColor() {
        const colors = ['#F7D794', '#F8BBD9', '#E4C1F9', '#FEFEFE'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    updateParticle(particle) {
        // Movimento
        const currentLeft = parseFloat(particle.style.left);
        const currentTop = parseFloat(particle.style.top);
        
        particle.style.left = currentLeft + particle.vx + 'px';
        particle.style.top = currentTop + particle.vy + 'px';
        
        // Vida da partícula
        particle.life--;
        particle.style.opacity = particle.life / particle.maxLife;
        
        // Reposicionar se sair da tela ou morrer
        if (particle.life <= 0 || 
            currentLeft < -10 || currentLeft > window.innerWidth + 10 ||
            currentTop < -10 || currentTop > window.innerHeight + 10) {
            
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = Math.random() * window.innerHeight + 'px';
            particle.life = particle.maxLife;
            particle.vx = (Math.random() - 0.5) * 2;
            particle.vy = (Math.random() - 0.5) * 2;
        }
    }

    animate() {
        this.particles.forEach(particle => this.updateParticle(particle));
        requestAnimationFrame(() => this.animate());
    }

    // Método para ajustar quantidade de partículas baseado na performance
    adjustParticleCount() {
        const fps = this.getFPS();
        if (fps < 30 && this.maxParticles > 20) {
            this.maxParticles -= 5;
            this.removeExcessParticles();
        } else if (fps > 50 && this.maxParticles < 50) {
            this.maxParticles += 5;
            this.addMoreParticles();
        }
    }

    removeExcessParticles() {
        while (this.particles.length > this.maxParticles) {
            const particle = this.particles.pop();
            this.container.removeChild(particle);
        }
    }

    addMoreParticles() {
        while (this.particles.length < this.maxParticles) {
            this.particles.push(this.createParticle());
        }
    }

    getFPS() {
        // Implementação simples de medição de FPS
        return 60; // Placeholder - em produção, implementar medição real
    }
}

// Inicializar sistema de partículas quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        new ParticleSystem(particlesContainer);
    }
});