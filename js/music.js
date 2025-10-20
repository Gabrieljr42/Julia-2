// Sistema de Música e Player
class MusicPlayer {
    constructor() {
        this.currentTrack = 0;
        this.isPlaying = false;
        this.audio = null;
        this.playlist = [
            {
                title: "Como Zaqueu",
                artist: "Bruna Karla",
                message: "Assim como Zaqueu, você me faz querer ser uma pessoa melhor todos os dias. Seu coração puro me inspira a crescer na fé e no amor.",
                file: "audio/como-zaqueu.mp3" // Placeholder - adicionar arquivos reais
            },
            {
                title: "Tua Graça Me Basta",
                artist: "Fernanda Brum",
                message: "Sua graça e gentileza me bastam para ser feliz. Você é um presente de Deus na minha vida, minha princesa.",
                file: "audio/tua-graca.mp3"
            },
            {
                title: "Oceanos",
                artist: "Hillsong United",
                message: "Como nos oceanos, meu amor por você é profundo e infinito. Juntos, podemos caminhar sobre as águas da vida.",
                file: "audio/oceanos.mp3"
            },
            {
                title: "Reckless Love",
                artist: "Cory Asbury",
                message: "O amor de Deus é imprudente, assim como o meu por você. Não há limites para o que sinto, meu amor.",
                file: "audio/reckless-love.mp3"
            }
        ];
        
        this.init();
    }

    init() {
        this.createPlaylist();
        this.setupControls();
        this.setupBackgroundMusic();
        this.updateTrackInfo();
    }

    createPlaylist() {
        const playlistContainer = document.getElementById('playlist');
        if (!playlistContainer) return;

        playlistContainer.innerHTML = '';
        
        this.playlist.forEach((track, index) => {
            const playlistItem = document.createElement('div');
            playlistItem.className = 'playlist-item';
            playlistItem.innerHTML = `
                <div class="playlist-track-title">${track.title}</div>
                <div class="playlist-track-artist">${track.artist}</div>
            `;
            
            playlistItem.addEventListener('click', () => {
                this.selectTrack(index);
            });
            
            playlistContainer.appendChild(playlistItem);
        });
        
        // Marcar primeira faixa como ativa
        this.updatePlaylistUI();
    }

    setupControls() {
        const playBtn = document.getElementById('musicPlayBtn');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const vinylDisc = document.getElementById('vinylDisc');

        if (playBtn) {
            playBtn.addEventListener('click', () => this.togglePlay());
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousTrack());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextTrack());
        }
    }

    setupBackgroundMusic() {
        // Configurar música de fundo suave para a página inicial
        const backgroundAudio = document.getElementById('backgroundAudio');
        const playPauseBtn = document.getElementById('playPauseBtn');
        
        if (backgroundAudio && playPauseBtn) {
            backgroundAudio.volume = 0.3; // Volume baixo
            
            playPauseBtn.addEventListener('click', () => {
                if (backgroundAudio.paused) {
                    backgroundAudio.play().catch(e => {
                        console.log('Autoplay bloqueado:', e);
                        this.showAudioMessage();
                    });
                    this.updateBackgroundControls(true);
                } else {
                    backgroundAudio.pause();
                    this.updateBackgroundControls(false);
                }
            });
        }
    }

    updateBackgroundControls(isPlaying) {
        const playIcon = document.querySelector('.play-icon');
        const pauseIcon = document.querySelector('.pause-icon');
        
        if (playIcon && pauseIcon) {
            if (isPlaying) {
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'inline';
            } else {
                playIcon.style.display = 'inline';
                pauseIcon.style.display = 'none';
            }
        }
    }

    showAudioMessage() {
        // Mostrar mensagem amigável se autoplay for bloqueado
        const message = document.createElement('div');
        message.className = 'audio-message';
        message.innerHTML = `
            <p>🎵 Clique no botão para ouvir uma música especial para você!</p>
        `;
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(248, 187, 217, 0.95);
            padding: 1rem 2rem;
            border-radius: 15px;
            color: #D63384;
            font-weight: 500;
            z-index: 1001;
            backdrop-filter: blur(10px);
            animation: fadeInUp 0.5s ease-out;
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }

    selectTrack(index) {
        this.currentTrack = index;
        this.updateTrackInfo();
        this.updatePlaylistUI();
        
        if (this.isPlaying) {
            this.playCurrentTrack();
        }
    }

    updateTrackInfo() {
        const track = this.playlist[this.currentTrack];
        const titleElement = document.getElementById('trackTitle');
        const artistElement = document.getElementById('trackArtist');
        const messageElement = document.getElementById('trackMessage');

        if (titleElement) titleElement.textContent = track.title;
        if (artistElement) artistElement.textContent = track.artist;
        if (messageElement) {
            messageElement.textContent = track.message;
            messageElement.style.display = 'block';
        }
    }

    updatePlaylistUI() {
        const playlistItems = document.querySelectorAll('.playlist-item');
        playlistItems.forEach((item, index) => {
            if (index === this.currentTrack) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    play() {
        this.playCurrentTrack();
        this.isPlaying = true;
        this.updatePlayButton();
        this.startVinylAnimation();
    }

    pause() {
        if (this.audio) {
            this.audio.pause();
        }
        this.isPlaying = false;
        this.updatePlayButton();
        this.stopVinylAnimation();
    }

    playCurrentTrack() {
        const track = this.playlist[this.currentTrack];
        
        // Parar áudio anterior se existir
        if (this.audio) {
            this.audio.pause();
            this.audio = null;
        }

        // Criar novo elemento de áudio
        this.audio = new Audio();
        this.audio.src = track.file;
        this.audio.volume = 0.7;
        
        // Event listeners
        this.audio.addEventListener('ended', () => {
            this.nextTrack();
        });
        
        this.audio.addEventListener('error', () => {
            console.log('Erro ao carregar música:', track.title);
            this.showMusicError();
        });

        // Tentar reproduzir
        this.audio.play().catch(e => {
            console.log('Erro ao reproduzir:', e);
            this.showMusicError();
        });
    }

    showMusicError() {
        const messageElement = document.getElementById('trackMessage');
        if (messageElement) {
            messageElement.innerHTML = `
                <p>🎵 Música não disponível no momento, mas a mensagem de amor continua a mesma:</p>
                <p><em>${this.playlist[this.currentTrack].message}</em></p>
            `;
        }
    }

    nextTrack() {
        this.currentTrack = (this.currentTrack + 1) % this.playlist.length;
        this.updateTrackInfo();
        this.updatePlaylistUI();
        
        if (this.isPlaying) {
            this.playCurrentTrack();
        }
    }

    previousTrack() {
        this.currentTrack = this.currentTrack === 0 ? this.playlist.length - 1 : this.currentTrack - 1;
        this.updateTrackInfo();
        this.updatePlaylistUI();
        
        if (this.isPlaying) {
            this.playCurrentTrack();
        }
    }

    updatePlayButton() {
        const playBtn = document.getElementById('musicPlayBtn');
        if (playBtn) {
            playBtn.textContent = this.isPlaying ? '⏸️' : '▶️';
        }
    }

    startVinylAnimation() {
        const vinylDisc = document.getElementById('vinylDisc');
        if (vinylDisc) {
            vinylDisc.classList.add('spinning');
        }
    }

    stopVinylAnimation() {
        const vinylDisc = document.getElementById('vinylDisc');
        if (vinylDisc) {
            vinylDisc.classList.remove('spinning');
        }
    }
}

// Inicializar player quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new MusicPlayer();
});