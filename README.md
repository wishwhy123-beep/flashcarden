# 🦉 DuoCards - Flashcards Estilo Duolingo

Aplicativo móvel de flashcards moderno, interativo e gamificado, inspirado na identidade visual vibrante do **Duolingo** (Design System Feather).

Permite criar e organizar flashcards por **Tema/Assunto**, **Pergunta** (frente) e **Resposta** (verso), com efeitos visuais táteis em 3D, áudios sintetizados, modo quiz com gaveta de validação e comemoração com chuva de confetes.

---

## ✨ Principais Funcionalidades

1. **🦉 Interface & Identidade Visual Duolingo**:
   - Botões 3D táteis com efeito de clique e sombras profundas.
   - Mascote coruja animado com balão de fala interativo.
   - Paleta de cores vibrante (Duo Green `#58cc02`, Feather Blue `#1cb0f6`, Yellow, Red e Purple).
   - Tipografia arredondada Duolingo (*Fredoka* e *Nunito*).

2. **🎴 Cadastro Rápido de Flashcards (Tema, Pergunta e Resposta)**:
   - Botão em destaque na tela inicial: **CRIAR NOVO FLASHCARD**.
   - Campo de **Tema** com sugestões e chips rápidos clicáveis (*Inglês, Conhecimentos Gerais, Programação, Biologia, etc.*).
   - Campo de **Pergunta** (Frente do Card).
   - Campo de **Resposta** (Verso do Card).
   - **Mini Pré-visualização Dinâmica**: veja o card sendo montado e toque para virar em tempo real enquanto digita.

3. **🎮 Dois Modos de Estudo Gamificados**:
   - **Modo Flashcard 3D**:
     - Toque no card para virar em 3D realista (`rotateY(180deg)`).
     - Avaliação de memorização: *❌ Preciso Rever*, *🤔 Bom* ou *✅ Acertei!*.
     - Se errar, o card volta para o final da fila de revisão ativa.
   - **Modo Desafio Duolingo (Quiz de Múltipla Escolha)**:
     - 4 alternativas dinâmicas em botões táteis (A, B, C, D).
     - **Gaveta Deslizante Duolingo**: sobe da base com som alegre e mascote comemorando quando você acerta, ou aviso acolhedor caso erre.

4. **⚡ Gamificação & Recompensas**:
   - **Sequência (Streak 🔥)**: conta os dias diários de estudo.
   - **Vidas (Hearts ❤️)**: sistema de vidas no modo desafio.
   - **Gemas (💎)** e **XP (⚡)**: ganhe gemas ao cadastrar cards e concluir lições.
   - **Tela de Vitória com Confetes**: animação de vitória em canvas e resumo estatístico de precisão ao concluir um tema.

5. **🔊 Efeitos Sonoros 100% Offline (Web Audio API)**:
   - Sons de vitória do Duolingo, clique tátil, virada de carta e alerta de erro gerados dinamicamente via síntese de frequências, sem precisar carregar nenhum arquivo MP3 externo.
   - Botão para ligar/desligar o áudio no topo a qualquer momento.

6. **📱 Experiência de Celular (PWA & Responsivo)**:
   - No celular: ocupa 100% da tela, suporte a toque, gestos e atalho de instalação na tela de início (*Add to Home Screen*).
   - No computador: moldura de smartphone com sombras realistas, com botão flutuante para alternar para **Tela Cheia** quando desejar.
   - Armazenamento automático no `localStorage` (seus cards nunca somem).
   - Backup: **Exportar** e **Importar** todos os seus cards em formato `.json`.

---

## 🚀 Como Executar

### Opção 1: Direto no Navegador (Sem Instalação)
Basta dar dois cliques no arquivo **`index.html`** para abrir diretamente no seu navegador padrão ou no Firefox.

### Opção 2: Servidor Local Automático (Computador e Celular no Wi-Fi)
1. Dê um duplo clique no arquivo **`iniciar.bat`** (ou execute `./start-server.ps1` no PowerShell).
2. O servidor iniciará e mostrará:
   - **Endereço no Computador**: `http://localhost:8080`
   - **Endereço para o Celular (no mesmo Wi-Fi)**: `http://192.168.x.x:8080`
3. Abra esse link no navegador do seu smartphone para usar o app direto no celular!

---

## 📱 Como instalar no Celular (Como Aplicativo Nativo / PWA)

1. Abra o link do aplicativo no **Google Chrome** (Android) ou **Safari** (iPhone/iOS).
2. No menu do navegador:
   - **Android**: Toque nos três pontinhos e selecione **"Adicionar à tela inicial"** ou **"Instalar aplicativo"**.
   - **iOS (iPhone)**: Toque no botão de compartilhamento (quadrado com seta para cima) e selecione **"Adicionar à Tela de Início"**.
3. O ícone oficial do **DuoCards** 🦉 aparecerá entre os aplicativos do seu celular, abrindo em tela cheia sem barras de navegador!

---

## 📂 Estrutura de Arquivos

```text
├── index.html         # Estrutura semântica completa e interface do app
├── style.css          # Design System Feather do Duolingo, efeitos 3D e responsividade
├── app.js             # Lógica de gamificação, áudio sintetizado, flashcards e quiz
├── icon.svg           # Ícone vetorial do mascote estilo Duolingo
├── icon-192.png       # Ícone 192x192 para celulares Android e iOS
├── icon-512.png       # Ícone 512x512 em alta resolução para PWA
├── manifest.json      # Configuração para instalação como app mobile (PWA)
├── sw.js              # Service Worker para funcionamento 100% offline
├── start-server.ps1   # Servidor HTTP local embutido em PowerShell/.NET
├── iniciar.bat        # Inicializador rápido para Windows
└── README.md          # Documentação completa
```

