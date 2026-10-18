/**
 * DUOCARDS - APLICATIVO DE FLASHCARDS ESTILO DUOLINGO
 * Gamificação, Sintetizador de Áudio Web, Efeito 3D e Persistência Local
 */

// ==========================================================================
// 1. DADOS INICIAIS (STARTER PACK EM PORTUGUÊS)
// ==========================================================================
const DEFAULT_CARDS = [
  {
    id: "card_1",
    theme: "Inglês",
    question: "Como se diz 'Obrigado' em inglês?",
    answer: "Thank you (ou 'Thanks')",
    mastery: 0,
    createdAt: Date.now()
  },
  {
    id: "card_2",
    theme: "Inglês",
    question: "O que significa a expressão 'Piece of cake'?",
    answer: "Algo muito fácil / Moleza!",
    mastery: 0,
    createdAt: Date.now()
  },
  {
    id: "card_3",
    theme: "Inglês",
    question: "Qual é o passado simples do verbo 'To Go'?",
    answer: "Went",
    mastery: 0,
    createdAt: Date.now()
  },
  {
    id: "card_4",
    theme: "Conhecimentos Gerais",
    question: "Qual é a capital da França?",
    answer: "Paris",
    mastery: 0,
    createdAt: Date.now()
  },
  {
    id: "card_5",
    theme: "Conhecimentos Gerais",
    question: "Quantos planetas compõem o Sistema Solar?",
    answer: "8 planetas (Mercúrio, Vênus, Terra, Marte, Júpiter, Saturno, Urano e Netuno)",
    mastery: 0,
    createdAt: Date.now()
  },
  {
    id: "card_6",
    theme: "Programação",
    question: "O que significa a sigla HTML?",
    answer: "HyperText Markup Language (Linguagem de Marcação de Hipertexto)",
    mastery: 0,
    createdAt: Date.now()
  },
  {
    id: "card_7",
    theme: "Programação",
    question: "Para que serve o comando 'console.log()' em JavaScript?",
    answer: "Para imprimir mensagens ou valores no console do desenvolvedor para depuração",
    mastery: 0,
    createdAt: Date.now()
  }
];

// Tema e cores
const THEME_COLORS = ['theme-green', 'theme-blue', 'theme-yellow', 'theme-purple', 'theme-orange'];
const THEME_ICONS = {
  'inglês': '🇺🇸',
  'ingles': '🇺🇸',
  'espanhol': '🇪🇸',
  'conhecimentos gerais': '🌍',
  'programação': '💻',
  'programacao': '💻',
  'matemática': '📐',
  'matematica': '📐',
  'biologia': '🧬',
  'história': '🏛️',
  'historia': '🏛️',
  'geografia': '🗺️',
  'física': '⚡',
  'química': '🧪',
  'default': '💡'
};

// ==========================================================================
// 2. SISTEMA DE ÁUDIO SINTETIZADO (WEB AUDIO API - ZERO DEPENDÊNCIAS)
// ==========================================================================
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playPop() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  playFlip() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(550, now + 0.12);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.13);
  }

  playSuccess() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (Acorde alegre de vitória Duolingo)
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const noteTime = now + (idx * 0.07);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.22, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.23);
    });
  }

  playError() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [320, 240];

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const noteTime = now + (idx * 0.12);

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.16, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.01, noteTime + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.19);
    });
  }

  playFanfare() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const notes = [
      { f: 523.25, d: 0.12 },
      { f: 659.25, d: 0.12 },
      { f: 783.99, d: 0.12 },
      { f: 1046.50, d: 0.35 }
    ];

    let t = this.ctx.currentTime;
    notes.forEach(note => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, t);

      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + note.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + note.d + 0.05);
      t += note.d * 0.85;
    });
  }
}

const sfx = new SoundFX();

// ==========================================================================
// 3. ESTADO GLOBAL DA APLICAÇÃO
// ==========================================================================
class AppState {
  constructor() {
    this.cards = this.loadCards();
    this.stats = this.loadStats();
    
    // Sessão de estudo
    this.activeTopic = null;
    this.studyDeck = [];
    this.currentIndex = 0;
    this.correctCount = 0;
    this.totalCardsInSession = 0;
    this.studyMode = 'flip'; // 'flip' ou 'quiz'
    this.selectedQuizAnswer = null;
    this.isCardFlipped = false;
  }

  loadCards() {
    try {
      const saved = localStorage.getItem('duocards_items_v1');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Erro ao ler localStorage", e);
    }
    this.saveCards(DEFAULT_CARDS);
    return DEFAULT_CARDS;
  }

  saveCards(cards) {
    this.cards = cards;
    try {
      localStorage.setItem('duocards_items_v1', JSON.stringify(this.cards));
    } catch (e) {
      console.error("Falha ao salvar cards", e);
    }
  }

  loadStats() {
    try {
      const saved = localStorage.getItem('duocards_stats_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {}

    const initial = {
      streak: 1,
      gems: 120,
      hearts: 5,
      xp: 40,
      sound: true,
      lastActiveDate: new Date().toDateString()
    };
    this.saveStats(initial);
    return initial;
  }

  saveStats(stats) {
    this.stats = stats;
    try {
      localStorage.setItem('duocards_stats_v1', JSON.stringify(this.stats));
    } catch (e) {}
  }

  addCard(theme, question, answer) {
    const newCard = {
      id: 'card_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      theme: theme.trim(),
      question: question.trim(),
      answer: answer.trim(),
      mastery: 0,
      createdAt: Date.now()
    };
    this.cards.unshift(newCard);
    this.saveCards(this.cards);
    return newCard;
  }

  updateCard(id, theme, question, answer) {
    const idx = this.cards.findIndex(c => c.id === id);
    if (idx !== -1) {
      this.cards[idx].theme = theme.trim();
      this.cards[idx].question = question.trim();
      this.cards[idx].answer = answer.trim();
      this.saveCards(this.cards);
      return this.cards[idx];
    }
    return null;
  }

  deleteCard(id) {
    this.cards = this.cards.filter(c => c.id !== id);
    this.saveCards(this.cards);
  }

  getThemes() {
    const themes = {};
    this.cards.forEach(card => {
      const t = card.theme || 'Geral';
      if (!themes[t]) themes[t] = [];
      themes[t].push(card);
    });
    return themes;
  }
}

const state = new AppState();

// ==========================================================================
// 4. ELEMENTOS DO DOM
// ==========================================================================
const DOM = {
  // Badges superiores
  streakCount: document.getElementById('streakCount'),
  gemsCount: document.getElementById('gemsCount'),
  heartsCount: document.getElementById('heartsCount'),
  soundToggleBtn: document.getElementById('soundToggleBtn'),
  soundIcon: document.getElementById('soundIcon'),
  
  // Views
  homeView: document.getElementById('homeView'),
  studyView: document.getElementById('studyView'),
  victoryView: document.getElementById('victoryView'),
  manageView: document.getElementById('manageView'),
  
  // Bottom Nav
  appBottomNav: document.getElementById('appBottomNav'),
  navHome: document.getElementById('navHome'),
  navCreateCard: document.getElementById('navCreateCard'),
  navManage: document.getElementById('navManage'),
  
  // Home View
  decksGrid: document.getElementById('decksGrid'),
  totalCardsCount: document.getElementById('totalCardsCount'),
  searchTopicInput: document.getElementById('searchTopicInput'),
  clearSearchBtn: document.getElementById('clearSearchBtn'),
  emptyState: document.getElementById('emptyState'),
  btnOpenNewCard: document.getElementById('btnOpenNewCard'),
  btnEmptyCreate: document.getElementById('btnEmptyCreate'),
  mascotMessage: document.getElementById('mascotMessage'),
  
  // Modal de Criação / Edição
  cardModal: document.getElementById('cardModal'),
  modalTitle: document.getElementById('modalTitle'),
  cardForm: document.getElementById('cardForm'),
  editCardId: document.getElementById('editCardId'),
  cardThemeInput: document.getElementById('cardThemeInput'),
  cardQuestionInput: document.getElementById('cardQuestionInput'),
  cardAnswerInput: document.getElementById('cardAnswerInput'),
  btnCloseModal: document.getElementById('btnCloseModal'),
  btnCancelModal: document.getElementById('btnCancelModal'),
  themesDatalist: document.getElementById('themesDatalist'),
  themeChipsList: document.getElementById('themeChipsList'),
  miniPreviewCard: document.getElementById('miniPreviewCard'),
  prevThemeBadge: document.getElementById('prevThemeBadge'),
  prevBodyText: document.getElementById('prevBodyText'),
  
  // Study View
  btnCloseStudy: document.getElementById('btnCloseStudy'),
  studyProgressBar: document.getElementById('studyProgressBar'),
  studyHeartsCount: document.getElementById('studyHeartsCount'),
  studyTopicBadge: document.getElementById('studyTopicBadge'),
  tabFlipMode: document.getElementById('tabFlipMode'),
  tabQuizMode: document.getElementById('tabQuizMode'),
  flipStudyArea: document.getElementById('flipStudyArea'),
  quizStudyArea: document.getElementById('quizStudyArea'),
  
  // Flip Card
  activeFlashcard: document.getElementById('activeFlashcard'),
  cardFrontTopic: document.getElementById('cardFrontTopic'),
  cardQuestionText: document.getElementById('cardQuestionText'),
  cardAnswerText: document.getElementById('cardAnswerText'),
  flipActionsBar: document.getElementById('flipActionsBar'),
  btnRateHard: document.getElementById('btnRateHard'),
  btnRateMedium: document.getElementById('btnRateMedium'),
  btnRateEasy: document.getElementById('btnRateEasy'),
  
  // Quiz Mode
  quizQuestionText: document.getElementById('quizQuestionText'),
  quizOptionsList: document.getElementById('quizOptionsList'),
  
  // Bottom Sheet (Validação)
  duoBottomSheet: document.getElementById('duoBottomSheet'),
  sheetIcon: document.getElementById('sheetIcon'),
  sheetTitle: document.getElementById('sheetTitle'),
  sheetDesc: document.getElementById('sheetDesc'),
  btnSheetContinue: document.getElementById('btnSheetContinue'),
  
  // Victory View
  victoryXp: document.getElementById('victoryXp'),
  victoryAccuracy: document.getElementById('victoryAccuracy'),
  victoryGems: document.getElementById('victoryGems'),
  victoryStreak: document.getElementById('victoryStreak'),
  btnVictoryContinue: document.getElementById('btnVictoryContinue'),
  btnVictoryReview: document.getElementById('btnVictoryReview'),
  confettiCanvas: document.getElementById('confettiCanvas'),
  
  // Manage View
  cardsListContainer: document.getElementById('cardsListContainer'),
  btnManageNewCard: document.getElementById('btnManageNewCard'),
  btnExportCards: document.getElementById('btnExportCards'),
  importFileInput: document.getElementById('importFileInput'),
  
  // Toast
  duoToast: document.getElementById('duoToast'),
  toastText: document.getElementById('toastText')
};

// ==========================================================================
// 5. NAVEGAÇÃO E CONTROLE DE TELAS
// ==========================================================================
function switchView(targetViewId) {
  const views = [DOM.homeView, DOM.studyView, DOM.victoryView, DOM.manageView];
  views.forEach(v => {
    v.classList.remove('active-view');
    v.classList.add('hidden');
  });

  const target = document.getElementById(targetViewId);
  if (target) {
    target.classList.remove('hidden');
    target.classList.add('active-view');
  }

  // Atualiza as abas inferiores
  document.querySelectorAll('.nav-tab').forEach(tab => {
    if (tab.getAttribute('data-target') === targetViewId) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  // Mostra ou esconde nav inferior durante estudo ou vitória
  if (targetViewId === 'studyView' || targetViewId === 'victoryView') {
    DOM.appBottomNav.classList.add('hidden');
  } else {
    DOM.appBottomNav.classList.remove('hidden');
  }

  // Ações específicas de cada tela
  if (targetViewId === 'homeView') {
    renderDecksList();
  } else if (targetViewId === 'manageView') {
    renderManageList();
  }
}

// ==========================================================================
// 6. RENDERIZAÇÃO DA TELA INICIAL (DECKS & TEMAS)
// ==========================================================================
function getThemeIcon(themeName) {
  const clean = themeName.toLowerCase().trim();
  return THEME_ICONS[clean] || THEME_ICONS['default'];
}

function renderDecksList(searchFilter = '') {
  const themesMap = state.getThemes();
  const themeKeys = Object.keys(themesMap);
  const total = state.cards.length;

  DOM.totalCardsCount.textContent = `${total} ${total === 1 ? 'card' : 'cards'}`;
  DOM.decksGrid.innerHTML = '';

  const filter = searchFilter.toLowerCase().trim();
  let visibleCount = 0;

  themeKeys.forEach((theme, index) => {
    const cards = themesMap[theme];
    
    // Verifica busca por tema ou pelas perguntas dentro dele
    const matchesTheme = theme.toLowerCase().includes(filter);
    const matchingCards = cards.filter(c => 
      c.question.toLowerCase().includes(filter) || 
      c.answer.toLowerCase().includes(filter)
    );

    if (filter && !matchesTheme && matchingCards.length === 0) {
      return;
    }

    visibleCount++;
    const colorClass = THEME_COLORS[index % THEME_COLORS.length];
    const icon = getThemeIcon(theme);

    const deckEl = document.createElement('div');
    deckEl.className = `deck-item-card ${colorClass}`;
    deckEl.innerHTML = `
      <div class="deck-color-stripe"></div>
      <div class="deck-top-row">
        <div class="deck-info-left">
          <div class="deck-icon-badge">${icon}</div>
          <div>
            <h3 class="deck-name">${escapeHtml(theme)}</h3>
            <span class="deck-count-sub">${cards.length} ${cards.length === 1 ? 'flashcard' : 'flashcards'}</span>
          </div>
        </div>
      </div>
      <div class="deck-actions-row">
        <button class="duo-btn duo-btn-primary btn-sm btn-start-study" data-theme="${escapeHtml(theme)}">
          <span>🚀</span> PRATICAR
        </button>
        <button class="duo-btn duo-btn-secondary btn-sm btn-quick-add" data-theme="${escapeHtml(theme)}" title="Adicionar card neste tema">
          <span>+</span>
        </button>
      </div>
    `;

    DOM.decksGrid.appendChild(deckEl);
  });

  // Botões de estudo por deck
  document.querySelectorAll('.btn-start-study').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      sfx.playPop();
      const theme = btn.getAttribute('data-theme');
      startStudySession(theme);
    });
  });

  // Botões de adicionar card rápido
  document.querySelectorAll('.btn-quick-add').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      sfx.playPop();
      const theme = btn.getAttribute('data-theme');
      openCardModal(null, theme);
    });
  });

  // Exibe empty state se necessário
  if (visibleCount === 0) {
    DOM.emptyState.classList.remove('hidden');
  } else {
    DOM.emptyState.classList.add('hidden');
  }

  // Atualiza datalist de temas
  updateThemesDatalist(themeKeys);
}

function updateThemesDatalist(themes) {
  DOM.themesDatalist.innerHTML = '';
  DOM.themeChipsList.innerHTML = '';

  themes.forEach(theme => {
    const opt = document.createElement('option');
    opt.value = theme;
    DOM.themesDatalist.appendChild(opt);

    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'theme-chip-btn';
    chip.textContent = theme;
    chip.addEventListener('click', () => {
      sfx.playPop();
      DOM.cardThemeInput.value = theme;
      updateLivePreview();
    });
    DOM.themeChipsList.appendChild(chip);
  });
}

// ==========================================================================
// 7. MODAL DE CRIAÇÃO / EDIÇÃO DE FLASHCARD (Requisito Principal do Usuário)
// ==========================================================================
let previewFlipState = false;

function openCardModal(cardToEdit = null, prefillTheme = '') {
  sfx.playPop();
  previewFlipState = false;

  if (cardToEdit) {
    DOM.modalTitle.textContent = "Editar Flashcard";
    DOM.editCardId.value = cardToEdit.id;
    DOM.cardThemeInput.value = cardToEdit.theme;
    DOM.cardQuestionInput.value = cardToEdit.question;
    DOM.cardAnswerInput.value = cardToEdit.answer;
  } else {
    DOM.modalTitle.textContent = "Novo Flashcard";
    DOM.editCardId.value = "";
    DOM.cardThemeInput.value = prefillTheme || "";
    DOM.cardQuestionInput.value = "";
    DOM.cardAnswerInput.value = "";
  }

  updateLivePreview();
  DOM.cardModal.classList.remove('hidden');
  
  setTimeout(() => {
    if (!prefillTheme && !cardToEdit) {
      DOM.cardThemeInput.focus();
    } else {
      DOM.cardQuestionInput.focus();
    }
  }, 100);
}

function closeCardModal() {
  DOM.cardModal.classList.add('hidden');
}

function updateLivePreview() {
  const theme = DOM.cardThemeInput.value.trim() || 'Meu Tema';
  const question = DOM.cardQuestionInput.value.trim() || 'Sua pergunta aparecerá aqui...';
  const answer = DOM.cardAnswerInput.value.trim() || 'Sua resposta aparecerá aqui...';

  DOM.prevThemeBadge.textContent = theme;

  if (previewFlipState) {
    DOM.prevBodyText.textContent = answer;
    DOM.prevBodyText.style.color = '#15803d';
  } else {
    DOM.prevBodyText.textContent = question;
    DOM.prevBodyText.style.color = '#4b4b4b';
  }
}

// Eventos de digitação em tempo real no formulário
[DOM.cardThemeInput, DOM.cardQuestionInput, DOM.cardAnswerInput].forEach(inp => {
  inp.addEventListener('input', updateLivePreview);
});

DOM.miniPreviewCard.addEventListener('click', () => {
  sfx.playFlip();
  previewFlipState = !previewFlipState;
  updateLivePreview();
});

DOM.cardForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const theme = DOM.cardThemeInput.value.trim();
  const question = DOM.cardQuestionInput.value.trim();
  const answer = DOM.cardAnswerInput.value.trim();
  const editId = DOM.editCardId.value;

  if (!theme || !question || !answer) {
    showToast("Por favor preencha todos os campos!", "⚠️");
    return;
  }

  if (editId) {
    state.updateCard(editId, theme, question, answer);
    showToast("Flashcard atualizado com sucesso!", "✏️");
  } else {
    state.addCard(theme, question, answer);
    state.stats.gems += 5; // Recompensa por criar conteúdo
    state.saveStats(state.stats);
    updateStatsBadges();
    showToast("Novo card criado! +5 Gemas 💎", "🎉");
  }

  sfx.playSuccess();
  closeCardModal();
  renderDecksList();
  renderManageList();
});

// ==========================================================================
// 8. SESSÃO DE ESTUDO & QUIZ ESTILO DUOLINGO
// ==========================================================================
function startStudySession(themeName = null) {
  state.activeTopic = themeName;
  
  if (themeName) {
    state.studyDeck = state.cards.filter(c => c.theme.toLowerCase() === themeName.toLowerCase());
  } else {
    state.studyDeck = [...state.cards];
  }

  if (state.studyDeck.length === 0) {
    showToast("Nenhum card disponível para este tema!", "⚠️");
    return;
  }

  // Embaralha os cards
  state.studyDeck.sort(() => Math.random() - 0.5);
  state.currentIndex = 0;
  state.correctCount = 0;
  state.totalCardsInSession = state.studyDeck.length;

  DOM.studyTopicBadge.textContent = themeName || 'Todos os Temas';
  switchView('studyView');
  loadCurrentCard();
}

function loadCurrentCard() {
  if (state.currentIndex >= state.studyDeck.length) {
    finishStudySession();
    return;
  }

  const card = state.studyDeck[state.currentIndex];
  state.isCardFlipped = false;
  state.selectedQuizAnswer = null;

  // Atualiza Barra de Progresso com animação
  const progressPercent = (state.currentIndex / state.totalCardsInSession) * 100;
  DOM.studyProgressBar.style.width = `${progressPercent}%`;

  // Reseta estado do Card 3D
  DOM.activeFlashcard.classList.remove('flipped');
  DOM.flipActionsBar.classList.remove('active-actions');
  DOM.duoBottomSheet.classList.add('hidden');

  // Preenche dados do Card Flip
  DOM.cardFrontTopic.textContent = card.theme;
  DOM.cardQuestionText.textContent = card.question;
  DOM.cardAnswerText.textContent = card.answer;

  // Preenche dados do Quiz
  DOM.quizQuestionText.textContent = card.question;
  setupQuizOptions(card);
}

// Configura opções de múltipla escolha para o modo Quiz
function setupQuizOptions(currentCard) {
  DOM.quizOptionsList.innerHTML = '';
  
  // Opção correta
  const options = [{ text: currentCard.answer, correct: true }];

  // Busca opções distratoras de outros cards
  const otherAnswers = state.cards
    .filter(c => c.answer !== currentCard.answer)
    .map(c => c.answer);
  
  otherAnswers.sort(() => Math.random() - 0.5);

  const distractorsCount = 3;
  for (let i = 0; i < distractorsCount; i++) {
    if (otherAnswers[i]) {
      options.push({ text: otherAnswers[i], correct: false });
    } else {
      // Caso haja poucos cards, gera opções engraçadas/distratoras
      options.push({ text: `Alternativa diferente ${i + 1}`, correct: false });
    }
  }

  // Embaralha as 4 alternativas
  options.sort(() => Math.random() - 0.5);

  options.forEach((opt, idx) => {
    const letter = String.fromCharCode(65 + idx); // A, B, C, D
    const optCard = document.createElement('div');
    optCard.className = 'quiz-option-card';
    optCard.innerHTML = `
      <div class="quiz-opt-badge">${letter}</div>
      <div class="quiz-opt-text">${escapeHtml(opt.text)}</div>
    `;

    optCard.addEventListener('click', () => {
      sfx.playPop();
      document.querySelectorAll('.quiz-option-card').forEach(c => c.classList.remove('selected'));
      optCard.classList.add('selected');
      state.selectedQuizAnswer = opt;
      
      // Valida automaticamente no estilo Duolingo
      validateQuizSelection(opt, currentCard);
    });

    DOM.quizOptionsList.appendChild(optCard);
  });
}

function flipCard() {
  sfx.playFlip();
  state.isCardFlipped = !state.isCardFlipped;
  DOM.activeFlashcard.classList.toggle('flipped', state.isCardFlipped);
  
  if (state.isCardFlipped) {
    DOM.flipActionsBar.classList.add('active-actions');
  }
}

// Validação de resposta no Modo Quiz (com Gaveta Deslizante Duolingo)
function validateQuizSelection(selectedOption, currentCard) {
  DOM.duoBottomSheet.classList.remove('hidden', 'correct', 'wrong');

  if (selectedOption.correct) {
    sfx.playSuccess();
    state.correctCount++;
    DOM.duoBottomSheet.classList.add('correct');
    DOM.sheetIcon.textContent = '🎉';
    DOM.sheetTitle.textContent = 'Excelente!';
    DOM.sheetDesc.textContent = 'Você acertou na mosca!';
  } else {
    sfx.playError();
    state.stats.hearts = Math.max(0, state.stats.hearts - 1);
    state.saveStats(state.stats);
    updateStatsBadges();

    DOM.duoBottomSheet.classList.add('wrong');
    DOM.sheetIcon.textContent = '💔';
    DOM.sheetTitle.textContent = 'Quase lá...';
    DOM.sheetDesc.textContent = `A resposta certa era: "${currentCard.answer}"`;

    // Se o usuário errou, coloca o card de volta no final para reforço
    state.studyDeck.push(currentCard);
    state.totalCardsInSession++;
  }
}

// Avaliação manual no Modo Card (Fácil, Médio, Difícil)
function handleCardRating(rating) {
  sfx.playPop();
  const currentCard = state.studyDeck[state.currentIndex];

  if (rating === 'easy') {
    sfx.playSuccess();
    state.correctCount++;
    currentCard.mastery = (currentCard.mastery || 0) + 1;
  } else if (rating === 'medium') {
    sfx.playPop();
  } else if (rating === 'hard') {
    sfx.playError();
    // Coloca novamente no final da fila de estudo
    state.studyDeck.push(currentCard);
    state.totalCardsInSession++;
  }

  state.currentIndex++;
  loadCurrentCard();
}

// Finalização da Lição e Tela de Vitória Duolingo
function finishStudySession() {
  sfx.playFanfare();
  switchView('victoryView');

  const accuracy = Math.round((state.correctCount / Math.max(1, state.totalCardsInSession)) * 100);
  const earnedXp = Math.max(10, state.correctCount * 5);
  const earnedGems = accuracy >= 80 ? 10 : 5;

  state.stats.xp += earnedXp;
  state.stats.gems += earnedGems;
  state.stats.streak = Math.max(1, state.stats.streak);
  state.saveStats(state.stats);
  updateStatsBadges();

  DOM.victoryXp.textContent = earnedXp;
  DOM.victoryAccuracy.textContent = accuracy;
  DOM.victoryGems.textContent = earnedGems;
  DOM.victoryStreak.textContent = state.stats.streak;

  triggerConfetti();
}

// ==========================================================================
// 9. GERENCIADOR DE CARDS & BACKUP (JSON EXPORT/IMPORT)
// ==========================================================================
function renderManageList() {
  const themesMap = state.getThemes();
  const themeKeys = Object.keys(themesMap);

  DOM.cardsListContainer.innerHTML = '';

  if (state.cards.length === 0) {
    DOM.cardsListContainer.innerHTML = `
      <div class="empty-state">
        <p>Você ainda não tem flashcards cadastrados.</p>
      </div>
    `;
    return;
  }

  themeKeys.forEach(theme => {
    const cards = themesMap[theme];
    const group = document.createElement('div');
    group.className = 'theme-accordion-group';

    const header = document.createElement('div');
    header.className = 'theme-accordion-header';
    header.innerHTML = `
      <div class="theme-accordion-title">
        <span>${getThemeIcon(theme)}</span>
        <span>${escapeHtml(theme)}</span>
        <span class="badge-count">${cards.length}</span>
      </div>
      <span class="accordion-arrow">▼</span>
    `;

    const sublist = document.createElement('div');
    sublist.className = 'theme-cards-sublist';

    cards.forEach(card => {
      const row = document.createElement('div');
      row.className = 'card-manage-row';
      row.innerHTML = `
        <div class="card-manage-text-group">
          <div class="card-manage-q">Q: ${escapeHtml(card.question)}</div>
          <div class="card-manage-a">R: ${escapeHtml(card.answer)}</div>
        </div>
        <div class="card-manage-btns">
          <button class="btn-icon-tiny btn-edit-card" title="Editar Card">✏️</button>
          <button class="btn-icon-tiny btn-delete-card" title="Excluir Card">🗑️</button>
        </div>
      `;

      row.querySelector('.btn-edit-card').addEventListener('click', () => {
        openCardModal(card);
      });

      row.querySelector('.btn-delete-card').addEventListener('click', () => {
        if (confirm(`Deseja realmente excluir a pergunta:\n"${card.question}"?`)) {
          sfx.playPop();
          state.deleteCard(card.id);
          renderDecksList();
          renderManageList();
          showToast("Flashcard removido!", "🗑️");
        }
      });

      sublist.appendChild(row);
    });

    header.addEventListener('click', () => {
      sublist.classList.toggle('hidden');
      header.querySelector('.accordion-arrow').textContent = sublist.classList.contains('hidden') ? '▶' : '▼';
    });

    group.appendChild(header);
    group.appendChild(sublist);
    DOM.cardsListContainer.appendChild(group);
  });
}

// Exportar cards para download em formato JSON
function exportCards() {
  sfx.playPop();
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state.cards, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `duocards_backup_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast("Backup exportado com sucesso!", "💾");
}

// Importar cards de arquivo JSON
function handleImportFile(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const imported = JSON.parse(event.target.result);
      if (Array.isArray(imported) && imported.length > 0) {
        state.saveCards(imported);
        renderDecksList();
        renderManageList();
        sfx.playSuccess();
        showToast(`${imported.length} cards importados com sucesso!`, "🎉");
      } else {
        showToast("Arquivo JSON inválido ou vazio!", "⚠️");
      }
    } catch (err) {
      showToast("Erro ao processar arquivo JSON!", "❌");
    }
  };
  reader.readAsText(file);
}

// ==========================================================================
// 10. CANVAS CONFETTI ENGINE (DUOLINGO CELEBRATION)
// ==========================================================================
function triggerConfetti() {
  const canvas = DOM.confettiCanvas;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;

  const confettiCount = 80;
  const colors = ['#58cc02', '#1cb0f6', '#ffc800', '#ff4b4b', '#ce82ff', '#ff9600'];
  const confetti = [];

  for (let i = 0; i < confettiCount; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      size: Math.random() * 8 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 3 + 2,
      speedX: (Math.random() - 0.5) * 3,
      angle: Math.random() * 360,
      spin: (Math.random() - 0.5) * 8
    });
  }

  let animationFrame;
  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let activeParticles = 0;

    confetti.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.angle += p.spin;

      if (p.y < canvas.height) {
        activeParticles++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.angle * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }
    });

    if (activeParticles > 0) {
      animationFrame = requestAnimationFrame(update);
    }
  }

  update();
}

// ==========================================================================
// 11. SISTEMA DE TOAST E UTILITÁRIOS
// ==========================================================================
let toastTimeout;
function showToast(message, icon = "✨") {
  DOM.toastText.textContent = message;
  DOM.duoToast.querySelector('.toast-icon').textContent = icon;
  DOM.duoToast.classList.remove('hidden');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    DOM.duoToast.classList.add('hidden');
  }, 2600);
}

function updateStatsBadges() {
  DOM.streakCount.textContent = state.stats.streak;
  DOM.gemsCount.textContent = state.stats.gems;
  DOM.heartsCount.textContent = state.stats.hearts;
  DOM.studyHeartsCount.textContent = state.stats.hearts;
  DOM.soundIcon.textContent = sfx.enabled ? "🔊" : "🔇";
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ==========================================================================
// 12. VINCULAÇÃO DE EVENTOS GERAIS
// ==========================================================================
function bindEvents() {
  // Toggle de Som
  DOM.soundToggleBtn.addEventListener('click', () => {
    sfx.enabled = !sfx.enabled;
    state.stats.sound = sfx.enabled;
    state.saveStats(state.stats);
    updateStatsBadges();
    sfx.playPop();
  });

  // Navegação Inferior
  DOM.navHome.addEventListener('click', () => {
    sfx.playPop();
    switchView('homeView');
  });

  // Alternar Visualização Celular / Desktop Expandido
  const desktopToggle = document.getElementById('desktopViewToggle');
  if (desktopToggle) {
    desktopToggle.addEventListener('click', () => {
      sfx.playPop();
      document.body.classList.toggle('fullscreen-mode');
      const isFull = document.body.classList.contains('fullscreen-mode');
      desktopToggle.querySelector('.toggle-icon').textContent = isFull ? '🖥️' : '📱';
      desktopToggle.querySelector('.toggle-text').textContent = isFull ? 'Visualização: Tela Cheia' : 'Visualização: Celular';
    });
  }

  DOM.navCreateCard.addEventListener('click', () => {
    sfx.playPop();
    openCardModal();
  });

  DOM.navManage.addEventListener('click', () => {
    sfx.playPop();
    switchView('manageView');
  });

  // Botões de Criar Card na Home
  DOM.btnOpenNewCard.addEventListener('click', () => openCardModal());
  DOM.btnEmptyCreate.addEventListener('click', () => openCardModal());
  DOM.btnManageNewCard.addEventListener('click', () => openCardModal());

  // Fechar Modal
  DOM.btnCloseModal.addEventListener('click', closeCardModal);
  DOM.btnCancelModal.addEventListener('click', closeCardModal);
  DOM.cardModal.addEventListener('click', (e) => {
    if (e.target === DOM.cardModal) closeCardModal();
  });

  // Busca em tempo real
  DOM.searchTopicInput.addEventListener('input', (e) => {
    const val = e.target.value;
    DOM.clearSearchBtn.classList.toggle('hidden', val.length === 0);
    renderDecksList(val);
  });

  DOM.clearSearchBtn.addEventListener('click', () => {
    DOM.searchTopicInput.value = '';
    DOM.clearSearchBtn.classList.add('hidden');
    renderDecksList();
  });

  // Interação com Card 3D
  DOM.activeFlashcard.addEventListener('click', flipCard);

  // Botões de Avaliação do Flashcard
  DOM.btnRateHard.addEventListener('click', () => handleCardRating('hard'));
  DOM.btnRateMedium.addEventListener('click', () => handleCardRating('medium'));
  DOM.btnRateEasy.addEventListener('click', () => handleCardRating('easy'));

  // Alternar Modos de Estudo (Card vs Quiz)
  DOM.tabFlipMode.addEventListener('click', () => {
    sfx.playPop();
    state.studyMode = 'flip';
    DOM.tabFlipMode.classList.add('active');
    DOM.tabQuizMode.classList.remove('active');
    DOM.flipStudyArea.classList.remove('hidden');
    DOM.quizStudyArea.classList.add('hidden');
    DOM.duoBottomSheet.classList.add('hidden');
  });

  DOM.tabQuizMode.addEventListener('click', () => {
    sfx.playPop();
    state.studyMode = 'quiz';
    DOM.tabQuizMode.classList.add('active');
    DOM.tabFlipMode.classList.remove('active');
    DOM.flipStudyArea.classList.add('hidden');
    DOM.quizStudyArea.classList.remove('hidden');
    DOM.duoBottomSheet.classList.add('hidden');
  });

  // Botão Continuar da Gaveta do Duolingo
  DOM.btnSheetContinue.addEventListener('click', () => {
    sfx.playPop();
    DOM.duoBottomSheet.classList.add('hidden');
    state.currentIndex++;
    loadCurrentCard();
  });

  // Fechar Sessão de Estudo
  DOM.btnCloseStudy.addEventListener('click', () => {
    if (confirm("Deseja sair do treino agora? Seu progresso desta rodada será pausado.")) {
      sfx.playPop();
      switchView('homeView');
    }
  });

  // Botões da Tela de Vitória
  DOM.btnVictoryContinue.addEventListener('click', () => {
    sfx.playPop();
    switchView('homeView');
  });

  DOM.btnVictoryReview.addEventListener('click', () => {
    sfx.playPop();
    startStudySession(state.activeTopic);
  });

  // Backup e Restauração
  DOM.btnExportCards.addEventListener('click', exportCards);
  DOM.importFileInput.addEventListener('change', handleImportFile);
}

// ==========================================================================
// 13. INICIALIZAÇÃO DA APLICAÇÃO
// ==========================================================================
function initApp() {
  updateStatsBadges();
  bindEvents();
  renderDecksList();

  // Frases variadas do mascote para incentivo
  // Registro do Service Worker para suporte PWA offline
  if ('serviceWorker' in navigator && (window.location.protocol === 'http:' || window.location.protocol === 'https:')) {
    navigator.serviceWorker.register('./sw.js').catch(err => {
      console.log('SW registration note:', err);
    });
  }
}

document.addEventListener('DOMContentLoaded', initApp);
