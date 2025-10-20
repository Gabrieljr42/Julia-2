# Documento de Design

## Visão Geral

O site surpresa para Júlia será uma aplicação web single-page (SPA) com design responsivo, focada em criar uma experiência emocional única e personalizada. A arquitetura priorizará performance, acessibilidade e uma experiência de usuário fluida, combinando elementos visuais elegantes com interatividade significativa.

## Arquitetura

### Estrutura Técnica
- **Frontend**: HTML5, CSS3 (com CSS Grid e Flexbox), JavaScript vanilla
- **Áudio**: Web Audio API para controle de música
- **Animações**: CSS Animations e Intersection Observer API
- **Responsividade**: Mobile-first design com breakpoints adaptativos
- **Performance**: Lazy loading para imagens e conteúdo

### Estrutura de Páginas
```
Site Principal (SPA)
├── Seção Hero (Página Inicial)
├── Seção Musical
├── Seção Pedagógica
├── Galeria de Momentos
├── Carta de Amor
└── Footer com Elementos Cristãos
```

## Componentes e Interfaces

### 1. Componente Hero Section
**Funcionalidade**: Página inicial com impacto emocional
- **Elementos visuais**: 
  - Background gradient suave (rosa claro para lavanda)
  - Partículas flutuantes douradas simulando estrelas
  - Tipografia elegante para o nome "Júlia Delaías"
- **Animações**:
  - Fade-in suave do nome (2s)
  - Partículas com movimento sutil
  - Texto de boas-vindas com efeito typewriter
- **Áudio**: Música de fundo cristã romântica (volume baixo, controles visíveis)

### 2. Componente Musical Player
**Funcionalidade**: Player interativo com playlist personalizada
- **Interface**:
  - Design inspirado em vinil/CD player vintage
  - Controles grandes e intuitivos
  - Visualizador de ondas sonoras sutil
- **Playlist sugerida**:
  - Músicas cristãs românticas
  - Instrumentais suaves
  - Possibilidade de adicionar músicas significativas do casal
- **Interatividade**:
  - Letras sincronizadas
  - Mensagens personalizadas para cada música

### 3. Componente Seção Pedagógica
**Funcionalidade**: Celebração da vocação educacional
- **Design**:
  - Paleta de cores alegres e educativas
  - Ícones de lápis, livros, crianças (estilizados)
  - Cards com mensagens de apoio
- **Conteúdo**:
  - Mensagens sobre o futuro brilhante na educação
  - Citações inspiradoras sobre ensinar
  - Elementos lúdicos (sem ser infantil)

### 4. Componente Galeria
**Funcionalidade**: Momentos especiais do relacionamento
- **Layout**: Grid responsivo com hover effects
- **Conteúdo**:
  - Ilustrações representando momentos (se não houver fotos)
  - Datas importantes
  - Descrições carinhosas
- **Interação**: Modal para visualização ampliada

### 5. Componente Carta Digital
**Funcionalidade**: Declaração de amor interativa
- **Design**:
  - Simulação de papel pergaminho
  - Tipografia manuscrita (Google Fonts)
  - Animação de escrita gradual
- **Controles**:
  - Velocidade de exibição
  - Pausa/continuar
  - Scroll suave

### 6. Componente Elementos Cristãos
**Funcionalidade**: Integração respeitosa da fé
- **Elementos**:
  - Versículos sobre amor (1 Coríntios 13, Cantares)
  - Símbolos sutis (cruz delicada, pomba)
  - Cores e design reverentes
- **Posicionamento**: Footer e transições entre seções

## Modelos de Dados

### Configuração do Site
```javascript
const siteConfig = {
  recipient: {
    name: "Júlia Delaías",
    interests: ["música", "pedagogia", "crianças", "fé cristã"],
    personality: "princesa"
  },
  sender: {
    name: "João Gabriel",
    relationship: "namorado"
  },
  timeline: {
    relationshipStart: "1.5 meses",
    specialMoments: []
  }
}
```

### Estrutura de Conteúdo Musical
```javascript
const musicData = {
  playlist: [
    {
      title: "Música 1",
      artist: "Artista",
      file: "audio/musica1.mp3",
      message: "Mensagem personalizada",
      lyrics: "Letra da música..."
    }
  ]
}
```

### Estrutura da Galeria
```javascript
const galleryData = {
  moments: [
    {
      id: 1,
      title: "Primeiro Encontro",
      description: "Descrição carinhosa...",
      image: "images/momento1.jpg",
      date: "Data especial"
    }
  ]
}
```

## Tratamento de Erros

### Estratégias de Fallback
- **Áudio não carrega**: Exibir mensagem elegante e continuar sem música
- **Imagens não carregam**: Placeholders com gradientes suaves
- **JavaScript desabilitado**: CSS puro para funcionalidades básicas
- **Conexão lenta**: Loading states com animações suaves

### Mensagens de Erro
- Linguagem carinhosa e positiva
- Design consistente com o tema
- Opções de retry quando apropriado

## Estratégia de Testes

### Testes de Funcionalidade
- **Player de áudio**: Reprodução, pausa, controle de volume
- **Responsividade**: Testes em diferentes dispositivos e orientações
- **Animações**: Performance e suavidade em diferentes browsers
- **Acessibilidade**: Navegação por teclado, screen readers

### Testes de Experiência
- **Tempo de carregamento**: Otimização para conexões lentas
- **Impacto emocional**: Feedback de usuários teste (amigos próximos)
- **Compatibilidade**: Chrome, Firefox, Safari, Edge

### Testes de Conteúdo
- **Ortografia e gramática**: Revisão cuidadosa de todos os textos
- **Adequação cultural**: Respeito aos valores cristãos
- **Personalização**: Verificação de todos os nomes e referências

## Paleta de Cores

### Cores Principais
- **Rosa Suave**: #F8BBD9 (elementos principais)
- **Lavanda**: #E4C1F9 (backgrounds)
- **Dourado Claro**: #F7D794 (acentos e detalhes)
- **Branco Pérola**: #FEFEFE (textos e cards)

### Cores de Apoio
- **Azul Serenidade**: #A8E6CF (elementos cristãos)
- **Cinza Suave**: #F5F5F5 (backgrounds neutros)
- **Rosa Escuro**: #D63384 (CTAs e destaques)

## Tipografia

### Fontes Principais
- **Títulos**: "Dancing Script" (elegante, manuscrita)
- **Corpo**: "Poppins" (moderna, legível)
- **Acentos**: "Great Vibes" (decorativa para elementos especiais)

## Elementos Visuais Especiais

### Animações Signature
- **Partículas de Estrelas**: JavaScript canvas para efeito mágico
- **Transições de Página**: Fade com movimento sutil
- **Hover Effects**: Elevação suave e mudança de cor
- **Loading States**: Spinner personalizado com tema princesa

### Ícones Personalizados
- Coroa delicada para elementos "princesa"
- Notas musicais estilizadas
- Livros e lápis para seção pedagógica
- Cruz sutil para elementos cristãos

## Considerações de Performance

### Otimizações
- **Imagens**: WebP com fallback para JPEG
- **Fontes**: Preload das fontes críticas
- **CSS**: Minificação e critical CSS inline
- **JavaScript**: Lazy loading de funcionalidades não críticas

### Métricas Alvo
- **First Contentful Paint**: < 2s
- **Largest Contentful Paint**: < 3s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms