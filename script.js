// --- 1. GLOBAL & THEME LOGIC ---
const themeBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
// Kita tembak tag <html> langsung, bukan document.body lagi
const rootElement = document.documentElement;

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    // Cek tema yang lagi aktif sekarang
    const currentTheme = rootElement.getAttribute("data-theme");

    if (currentTheme === "dark") {
      rootElement.setAttribute("data-theme", "light");
      themeIcon.classList.replace("fa-moon", "fa-sun"); // Ganti icon ke Matahari
    } else {
      rootElement.setAttribute("data-theme", "dark");
      themeIcon.classList.replace("fa-sun", "fa-moon"); // Ganti icon ke Bulan
    }
  });
}
// --- 2. BACKGROUND EFFECTS ---
function createHeart() {
  const bg = document.getElementById("particles-bg");
  const heart = document.createElement("div");
  heart.classList.add("heart-particle");
  heart.innerHTML = ["💖", "✨", "🌸", "🤍"][Math.floor(Math.random() * 4)];
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 3 + 4 + "s";
  if (bg) bg.appendChild(heart);
  setTimeout(() => {
    heart.remove();
  }, 7000);
}
setInterval(createHeart, 800);

// --- 3. NAVIGATION ---
function switchTab(tabId) {
  // 1. Sembunyiin semua halaman (tab) yang lagi kebuka
  const contents = document.querySelectorAll(".tab-content");
  contents.forEach((content) => {
    content.classList.remove("active");
    content.style.display = "none"; // Pastiin bener-bener ngilang
  });

  // 2. Cari dan munculin halaman yang dipanggil (home / calm / games)
  const targetTab = document.getElementById(tabId);
  if (targetTab) {
    targetTab.classList.add("active");
    targetTab.style.display = "block"; // Tunjukin ke layar

    // Kasih efek transisi halus (opsional)
    targetTab.style.animation = "fadeIn 0.5s ease";
  } else {
    console.error("Waduh, Tab dengan ID '" + tabId + "' gak ketemu Bang!");
  }

  document.querySelectorAll('.nav-item-top.dropdown').forEach(item => {
    item.classList.remove('menu-buka'); // Tutup menu pas sub-menu diklik
  });
}

// Quote Logic
const quotes = [
  "Etin, Sayang berharga banget bagi Mpit. Jangan pernah ngerasa sendirian ya.",
  "Maafin mpit kalau kadang kaku, tapi cinta mpit ke sayang itu nyata banget.",
  "Sayang itu segalanya buat mpit. Mpit selalu ada buat Sayang.",
  "Bentuk manapun dari sayang, sayang tetep yang tercantik di mata mpit.",
];
function newQuote() {
  const textEl = document.getElementById("daily-message");
  textEl.classList.remove("show");
  setTimeout(() => {
    textEl.innerText = `"${quotes[Math.floor(Math.random() * quotes.length)]}"`;
    textEl.classList.add("show");
  }, 500);
}

// Mood Tracker
function checkMood(mood) {
  const res = document.getElementById("mood-response");
  res.classList.remove("show");
  setTimeout(() => {
    if (mood === "senang")
      res.innerText =
        "Alhamdulillah, senyum terus ya sayang! Mpit ikut seneng.";
    if (mood === "sedih")
      res.innerText =
        "Cup cup cup.. Sini cerita sama Mpit, jangan dipendam sendiri ya.";
    if (mood === "takut")
      res.innerText =
        "Gak usah takut, ada Mpit yang bakal selalu ngelindungin Etin.";
    res.classList.add("show");
  }, 300);
}

// --- 4. BREATHING & STRESS RELIEF ---
const breatheArea = document.getElementById("card-napas");
const orbCore = document.getElementById("circle");
const orbAura = document.getElementById("aura");
const breatheStatus = document.getElementById("breathe-status");
let progress = 0;
let isBreathingIn = false;

function updateBreathe() {
  if (isBreathingIn) {
    progress += 0.8;
    if (progress > 100) progress = 100;
  } else {
    progress -= 1.2;
    if (progress < 0) progress = 0;
  }
  if (orbCore) orbCore.style.transform = `scale(${1 + progress / 50})`;
  if (orbAura) orbAura.style.transform = `scale(${1 + progress / 30})`;
  if (orbAura) orbAura.style.opacity = 0.5 + progress / 200;
  if (breatheStatus) {
    if (progress === 100) breatheStatus.innerText = "Hembuskan Pelan...";
    else if (progress === 0) breatheStatus.innerText = "Tekan & Tahan Layar";
    else if (isBreathingIn) breatheStatus.innerText = "Tarik Terus Sayang...";
  }
  requestAnimationFrame(updateBreathe);
}
if (breatheArea) {
  breatheArea.addEventListener("mousedown", () => (isBreathingIn = true));
  breatheArea.addEventListener("mouseup", () => (isBreathingIn = false));
  breatheArea.addEventListener("touchstart", (e) => {
    e.preventDefault();
    isBreathingIn = true;
  });
  breatheArea.addEventListener("touchend", () => (isBreathingIn = false));
}
updateBreathe();

// Bubble Popper
const bubbleContainer = document.getElementById("bubble-container");
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playPopSound() {
  if (audioCtx.state === "suspended") audioCtx.resume();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(900, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.05);
  gain.gain.setValueAtTime(1, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.05);
}
function createBubbles() {
  if (!bubbleContainer) return;
  bubbleContainer.innerHTML = "";
  for (let i = 0; i < 16; i++) {
    const wrap = document.createElement("div");
    wrap.className = "bubble-wrapper";
    const bub = document.createElement("div");
    bub.className = "bubble";
    const bst = document.createElement("div");
    bst.className = "burst";
    wrap.append(bub, bst);
    bubbleContainer.appendChild(wrap);
    bub.addEventListener("click", () => {
      if (!bub.classList.contains("popped")) {
        bub.classList.add("popped");
        bst.classList.add("active");
        playPopSound();
      }
    });
  }
}
function resetBubbles() {
  const container = document.getElementById("bubble-container");
  // 1. Kosongin dulu biar bener-bener reset
  container.innerHTML = "";

  // 2. Buat ulang bubble-nya
  for (let i = 0; i < 16; i++) {
    const wrap = document.createElement("div");
    wrap.className = "bubble-wrapper";

    const bub = document.createElement("div");
    bub.className = "bubble reset-anim"; // Langsung kasih class animasinya

    // Kasih delay tiap bubble biar efeknya 'pop-up' berurutan (optional tapi keren)
    bub.style.animationDelay = `${i * 0.03}s`;

    const bst = document.createElement("div");
    bst.className = "burst";

    wrap.append(bub, bst);
    container.appendChild(wrap);

    // Pasang lagi event listener-nya
    bub.addEventListener("click", () => {
      if (!bub.classList.contains("popped")) {
        bub.classList.add("popped");
        bst.classList.add("active");
        playPopSound();
      }
    });
  }
}
createBubbles();

// --- SCRATCH TO REVEAL LOGIC ---
const surpriseMessages = [
  "Sayang hebat banget hari ini, Etin! ❤️",
  "Mpit bangga banget punya Sayang. ✨",
  "Istirahat dulu ya, semua bakal baik-baik aja.",
  "Senyum Sayang itu penyemangat Mpit. 😊",
  "I love you more than 3000! 💖",
  "Jangan lupa minum air ya, sayang.",
  "Etin itu kado terindah buat Mpit. 🎁",
];

function initScratch() {
  const canvas = document.getElementById("scratch-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const container = canvas.parentElement;

  // Set ukuran canvas sesuai kontainer
  canvas.width = container.offsetWidth;
  canvas.height = container.offsetHeight;

  // Ganti pesan secara random
  const msgEl = document.getElementById("scratch-text");
  msgEl.innerText =
    surpriseMessages[Math.floor(Math.random() * surpriseMessages.length)];

  // Warnai penutup (Abu-abu estetik)
  ctx.fillStyle = "#bdc3c7";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Tambah tekstur titik-titik dikit biar gak polos
  ctx.fillStyle = "#95a5a6";
  for (let i = 0; i < 100; i++) {
    ctx.fillRect(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      2,
      2,
    );
  }

  let isDrawing = false;

  function scratch(e) {
    if (!isDrawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();
  }

  canvas.addEventListener("mousedown", () => (isDrawing = true));
  canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();
    isDrawing = true;
  });

  window.addEventListener("mouseup", () => (isDrawing = false));
  window.addEventListener("touchend", () => (isDrawing = false));

  canvas.addEventListener("mousemove", scratch);
  canvas.addEventListener("touchmove", scratch);
}

// Panggil fungsi ini pas web pertama kali load
window.addEventListener("load", initScratch);
// Panggil lagi kalau dia pindah tab biar ukuran canvas pas
document.querySelectorAll(".nav-item").forEach((nav) => {
  nav.addEventListener("click", () => setTimeout(initScratch, 100));
});

// --- AUDIO BAKAR (White Noise + Crackle) ---
function playBurnSound() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const bufferSize = 2 * ctx.sampleRate;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);

  // Bikin White Noise buat suara 'Sshhh' api
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }

  const whiteNoise = ctx.createBufferSource();
  whiteNoise.buffer = noiseBuffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 1000;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);

  whiteNoise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  whiteNoise.start();
  whiteNoise.stop(ctx.currentTime + 1.5);
}

// --- FUNGSI BURN BARU ---
function burnWorry() {
  const input = document.getElementById("worry-input");
  const feedback = document.getElementById("burner-feedback");

  if (input.value.trim() === "" || input.classList.contains("burn-animation")) return;

  // 1. Jalanin Suara
  playBurnSound();

  // 2. Tambahin Animasi Bakar
  input.classList.add("burn-animation");
  feedback.classList.remove("show");

  setTimeout(() => {
    // 3. Reset Input & Munculin Notifikasi Halus (Gantiin Alert)
    input.value = "";
    input.classList.remove("burn-animation");

    feedback.innerText = "Beban pikirannya udah dibakar ya sayang ❤️";
    feedback.classList.add("show");

    // Ilangin notifikasi setelah 4 detik
    setTimeout(() => {
      feedback.classList.remove("show");
    }, 4000);
  }, 1200); // Durasi disesuain sama animasi CSS
}

// --- COMPLIMENT SHOWER ---
function rainCompliments() {
  const sweetWords = [
    "Sayang cantik banget hari ini! ❤️",
    "Etin kebanggaan Mpit 🌟",
    "Semangat ya sayangku!",
    "Ada Mpit di sini, tenang ya..",
    "I love you more than coding!",
    "Etin itu kado terindah Mpit",
    "You are doing great, honey!",
    "Senyum sayang itu obat capeknya Mpit ✨",
    "Mpit bangga punya Etin ❤️",
  ];

  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      const bubble = document.createElement("div");
      bubble.className = "compliment-bubble";
      bubble.innerText =
        sweetWords[Math.floor(Math.random() * sweetWords.length)];

      // RANDOM RANGE AMAN: 10% sampe 90% lebar layar
      // Biar gak ada yang nyelip terlalu ke pinggir
      bubble.style.left = Math.random() * 80 + 10 + "vw";

      const randomDelay = Math.random() * 2;
      bubble.style.animationDelay = `${randomDelay}s`;

      document.body.appendChild(bubble);

      setTimeout(() => {
        if (bubble) bubble.remove();
      }, 9000);
    }, i * 400);
  }
}

// --- 5. FULL SYNCED MUSIC PLAYER (Spotify Style) ---
const songs = [
  {
    title: "Understand",
    artist: "Keshi",
    src: "music/understand.mp3",
    lrc: [
      { time: 0, text: "•••" },
      { time: 11, text: "Very best for you" },
      { time: 14, text: "Everything I do" },
      { time: 17, text: "I just want to get it right for you" },
      { time: 21, text: "And every night I let you know" },
      { time: 24, text: "I'll never let you go" },
      { time: 27, text: "Once in a lifetime" },
      { time: 30, text: "You were the lifeline" },
    ],
  },
  {
    title: "Open Arms",
    artist: "SZA",
    src: "music/open-arms.mp3",
    lrc: [
      { time: 0, text: "•••" },
      { time: 5, text: "Runnin' away from where I'm from" },
      { time: 9, text: "Never can stay with no one for long" },
      { time: 13, text: "You're the only satu that keeps me around" },
      { time: 17, text: "You're the only satu who didn't let me down" },
    ],
  },
  {
    title: "Saturn",
    artist: "SZA",
    src: "music/saturn.mp3",
    lrc: [
      { time: 0, text: "•••" },
      { time: 12, text: "If there's another universe" },
      { time: 16, text: "Please let me be in that one" },
      { time: 20, text: "There's got to be a better place" },
      { time: 23, text: "Than this place" },
    ],
  },
  {
    title: "Cinnamon Girl",
    artist: "Lana Del Rey",
    src: "music/cinnamon-girl.mp3",
    lrc: [
      { time: 0, text: "•••" },
      { time: 15, text: "Cinnamon in my teeth" },
      { time: 18, text: "From your kiss, you're touching me" },
      { time: 22, text: "All the pills that you take" },
      { time: 26, text: "Violet, blue, green, red to keep me alert" },
    ],
  },
  {
    title: "Wildflower",
    artist: "Billie Eilish",
    src: "music/wildflower.mp3",
    lrc: [
      { time: 0, text: "•••" },
      { time: 10, text: "Things as simple as a wildflower" },
      { time: 14, text: "Things as simple as the moon" },
      { time: 18, text: "I see myself in you" },
      { time: 22, text: "Did I cross the line?" },
    ],
  },
];

let currentSongIndex = 0;
const audio = document.getElementById("bg-music");
const disk = document.getElementById("disk-icon");
const playBtnIcon = document.getElementById("play-icon");
const lyricsWrapper = document.getElementById("lyrics-wrapper");
const lyricsContent = document.getElementById("lyrics-content");
const progressBar = document.getElementById("music-progress");
const timeCurrent = document.getElementById("time-current");
const timeTotal = document.getElementById("time-total");

function renderLyrics(index) {
  if (!lyricsContent) return;
  lyricsContent.innerHTML = "";
  songs[index].lrc.forEach((line, i) => {
    const p = document.createElement("p");
    p.className = "lyric-line";
    p.id = `line-${i}`;
    p.innerText = line.text;
    lyricsContent.appendChild(p);
  });
}

function toggleMusic() {
  if (audio.paused) audio.play();
  else audio.pause();
}

audio.onplay = () => {
  disk.classList.add("playing");
  playBtnIcon.classList.replace("fa-play", "fa-pause");
};
audio.onpause = () => {
  disk.classList.remove("playing");
  playBtnIcon.classList.replace("fa-pause", "fa-play");
};

audio.ontimeupdate = () => {
  if (audio.duration) {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
    timeCurrent.innerText = formatTime(audio.currentTime);
    timeTotal.innerText = formatTime(audio.duration);
  }
  const lrc = songs[currentSongIndex].lrc;
  for (let i = 0; i < lrc.length; i++) {
    if (
      audio.currentTime >= lrc[i].time &&
      (!lrc[i + 1] || audio.currentTime < lrc[i + 1].time)
    ) {
      document
        .querySelectorAll(".lyric-line")
        .forEach((el) => el.classList.remove("active"));
      const activeLine = document.getElementById(`line-${i}`);
      if (activeLine) {
        activeLine.classList.add("active");
        // Center the active line
        const offset =
          activeLine.offsetTop -
          lyricsWrapper.offsetHeight / 2 +
          activeLine.offsetHeight / 2;
        lyricsWrapper.scrollTo({ top: offset, behavior: "smooth" });
      }
      break;
    }
  }
};

progressBar.oninput = () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
};

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec < 10 ? "0" + sec : sec}`;
}

function changeSong(index) {
  currentSongIndex = index;
  document.getElementById("current-title").innerText = songs[index].title;
  document.getElementById("current-artist").innerText = songs[index].artist;
  renderLyrics(index);
  audio.src = songs[index].src;
  audio.play();
  document
    .querySelectorAll(".playlist-item")
    .forEach((item, i) => item.classList.toggle("active", i === index));
}

audio.onended = () => changeSong((currentSongIndex + 1) % songs.length);
renderLyrics(0);

// --- 6. GAMES LOGIC (Quiz & Memory Match) ---
const modal = document.getElementById("game-modal");
const modalBody = document.getElementById("modal-body");

function closeGame() {
  modal.style.display = "none";
}

function openGame(gameType) {
  modal.style.display = "flex";
  if (gameType === "quiz") loadQuiz();
  if (gameType === "memory") loadMemory();
  if (gameType === "tictactoe") loadTicTacToe();
  if (gameType === "catch") loadCatchHeart();
  if (gameType === "puzzle") loadPuzzle();
  if (gameType === "binary") loadBinaryGame();
}

// Game 1: Love Quiz
const questions = [
  {
    q: "Apa yang Mpit lakuin kalo sayang lagi gelisah?",
    opts: ["Ngasih kodingan error", "Menenangkan & Selalu Menyayangi", "Diemin aja"],
    ans: 1,
  },
  {
    q: "Bagi Mpit, walau kita lagi LDR-an, Etin itu orang yang...",
    opts: ["Biasa aja", "Paling sabar, spesial & selalu di hati", "Sering ngilang"],
    ans: 1,
  },
  {
    q: "Kalau Mpit lagi sibuk ngoding, sebenernya pikiran Mpit lagi ke mana?",
    opts: ["Pusing mikirin error doang", "Mikirin Etin sambil senyum-senyum sendiri", "Mikirin project lain"],
    ans: 1,
  },
  {
    q: "Udah berapa lama Mpit sayang banget sama Etin?",
    opts: ["Baru sebulan", "Setahun aja", "Udah lebih dari 3 tahun dong! ❤️"],
    ans: 2,
  },
  {
    q: "Kalo Mpit lagi laper banget, makanan apa yang paling sering dicari?",
    opts: ["Ayam Geprek", "Gorengan", "Roti Tawar"],
    ans: 0,
  },
  {
    q: "Mpit sayang Etin berapa persen?",
    opts: ["100%", "999999%", "Tak terhingga"],
    ans: 2,
  },
];

let currentQ = 0;
let quizLives = 3; // Nyawa awal

// --- Audio Effects buat Quiz ---
const quizAudioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playCorrectSound() {
  if (quizAudioCtx.state === "suspended") quizAudioCtx.resume();
  const osc = quizAudioCtx.createOscillator();
  const gain = quizAudioCtx.createGain();
  osc.type = "sine";
  // Nada naik "Ting-Ting"
  osc.frequency.setValueAtTime(523.25, quizAudioCtx.currentTime); // C5
  osc.frequency.setValueAtTime(659.25, quizAudioCtx.currentTime + 0.1); // E5
  osc.frequency.setValueAtTime(783.99, quizAudioCtx.currentTime + 0.2); // G5
  gain.gain.setValueAtTime(0.5, quizAudioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, quizAudioCtx.currentTime + 0.5);
  osc.connect(gain);
  gain.connect(quizAudioCtx.destination);
  osc.start();
  osc.stop(quizAudioCtx.currentTime + 0.5);
}

function playWrongSound() {
  if (quizAudioCtx.state === "suspended") quizAudioCtx.resume();
  const osc = quizAudioCtx.createOscillator();
  const gain = quizAudioCtx.createGain();
  osc.type = "triangle";
  // Nada "Teett" salah
  osc.frequency.setValueAtTime(200, quizAudioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(150, quizAudioCtx.currentTime + 0.3);
  gain.gain.setValueAtTime(0.5, quizAudioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, quizAudioCtx.currentTime + 0.3);
  osc.connect(gain);
  gain.connect(quizAudioCtx.destination);
  osc.start();
  osc.stop(quizAudioCtx.currentTime + 0.3);
}
// ------------------------------

function loadQuiz() {
  // Kalau nyawa abis, Game Over
  if (quizLives <= 0) {
    modalBody.innerHTML = `
      <h3 style="color:var(--primary); text-align:center;">Yah, Nyawanya Habis 🥺</h3>
      <p style="text-align:center; margin-top:10px;">Coba inget-inget lagi tentang Mpit ya, sayang. Jangan nyerah!</p>
      <button class="btn-primary" onclick="quizLives=3; currentQ=0; loadQuiz();" style="margin-top:15px;">Ulang dari Awal</button>
    `;
    return;
  }

  // Kalau pertanyaan udah abis, Menang
  if (currentQ >= questions.length) {
    modalBody.innerHTML = `
      <h3 style="color:var(--primary); text-align:center;">Kuis Selesai! 🎉</h3>
      <p style="text-align:center; margin-top:10px;">Pinter banget! Etin emang segalanya buat Mpit. Love you!</p>
      <button class="btn-primary" onclick="quizLives=3; currentQ=0; closeGame();" style="margin-top:15px;">Tutup</button>
    `;
    return;
  }

  const q = questions[currentQ];
  let hearts = "❤️".repeat(quizLives) + "🖤".repeat(3 - quizLives);

  let html = `
    <div style="text-align:center; margin-bottom:10px; font-size:1.2em;">Nyawa: ${hearts}</div>
    <h3 style="margin-bottom:15px; color:var(--primary); text-align:center; font-size:1.1em;">${q.q}</h3>
    <div id="quiz-feedback" style="text-align:center; min-height: 24px; margin-bottom: 10px; font-weight:600; transition: 0.3s;"></div>
    <div class="quiz-options-container" style="display:flex; flex-direction:column; gap:10px;">
  `;

  q.opts.forEach((opt, idx) => {
    html += `<button class="quiz-opt" style="padding:10px; border-radius:8px; transition:0.3s;" onclick="answerQuiz(${idx}, ${q.ans}, this)">${opt}</button>`;
  });
  html += `</div>`;
  modalBody.innerHTML = html;
}

function answerQuiz(selected, correct, btnEl) {
  const feedback = document.getElementById("quiz-feedback");
  const allBtns = document.querySelectorAll(".quiz-opt");

  // Kunci semua tombol biar nggak di-spam klik
  allBtns.forEach(b => {
    b.disabled = true;
    b.style.pointerEvents = "none";
  });

  if (selected === correct) {
    playCorrectSound();
    btnEl.style.backgroundColor = "#2ecc71"; // Ijo bener
    btnEl.style.color = "#fff";
    btnEl.style.borderColor = "#2ecc71";
    feedback.innerText = "Pinter banget sayangku! ✨";
    feedback.style.color = "#2ecc71";

    setTimeout(() => {
      currentQ++;
      loadQuiz();
    }, 1200);
  } else {
    playWrongSound();
    quizLives--;
    btnEl.style.backgroundColor = "#e74c3c"; // Merah salah
    btnEl.style.color = "#fff";
    btnEl.style.borderColor = "#e74c3c";
    feedback.innerText = "Yah salah.. Nyawa Sayang berkurang 🥺";
    feedback.style.color = "#e74c3c";

    // Kasih unjuk jawaban yang bener sebentar
    allBtns[correct].style.backgroundColor = "#2ecc71";
    allBtns[correct].style.color = "#fff";

    setTimeout(() => {
      loadQuiz();
    }, 1500);
  }
}

// Game 2: Memory Match
const emojis = ["💖", "💖", "🍒", "🍒", "🐶", "🐶", "💍", "💍"];
let flippedCards = [];
let matchedPairs = 0;
let memoryMoves = 0; // Tambahan fitur penghitung langkah

function loadMemory() {
  matchedPairs = 0;
  flippedCards = [];
  memoryMoves = 0;
  const shuffled = [...emojis].sort(() => Math.random() - 0.5);

  let html = `
    <h3 style="color:var(--primary); text-align:center; margin-bottom: 5px;">Cocokin Hatinya Mpit</h3>
    <p style="text-align:center; font-size:0.9rem; color:var(--text-muted); margin-bottom:15px;">Langkah: <span id="move-counter">0</span></p>
    <div class="memory-grid">
  `;

  shuffled.forEach((em) => {
    // HTML-nya kita bikin ada front & back biar 3D-nya mulus
    html += `
      <div class="mem-card" data-val="${em}" onclick="flipCard(this)">
        <div class="mem-card-inner">
          <div class="mem-card-front"><i class="fa-solid fa-question"></i></div>
          <div class="mem-card-back">${em}</div>
        </div>
      </div>`;
  });
  html += `</div>`;
  modalBody.innerHTML = html;
}

function flipCard(cardEl) {
  if (
    flippedCards.length < 2 &&
    !cardEl.classList.contains("flipped") &&
    !cardEl.classList.contains("matched")
  ) {
    cardEl.classList.add("flipped");
    flippedCards.push(cardEl);

    // Suara flip tipis (minjem suara quiz)
    if (typeof playCorrectSound === "function") {
      const osc = quizAudioCtx.createOscillator();
      osc.frequency.setValueAtTime(400, quizAudioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, quizAudioCtx.currentTime + 0.1);
      osc.connect(quizAudioCtx.destination);
      osc.start(); osc.stop(quizAudioCtx.currentTime + 0.05);
    }

    if (flippedCards.length === 2) {
      memoryMoves++;
      document.getElementById("move-counter").innerText = memoryMoves;
      setTimeout(checkMatch, 800); // Kasih waktu biar dia liat emojinya
    }
  }
}

function checkMatch() {
  const [c1, c2] = flippedCards;
  if (c1.dataset.val === c2.dataset.val) {
    c1.classList.add("matched");
    c2.classList.add("matched");
    matchedPairs++;

    // Panggil suara TING bener dari kuis
    if (typeof playCorrectSound === "function") playCorrectSound();

    if (matchedPairs === 4) {
      setTimeout(() => {
        modalBody.innerHTML = `
          <h3 style="color:var(--primary); text-align:center;">Yey Berhasil! 🎉</h3>
          <p style="text-align:center; margin-top:10px;">Semua kepingan hati ketemu dalam <b>${memoryMoves}</b> langkah!</p>
          <button class="btn-primary" onclick="closeGame()" style="margin-top:15px">Tutup</button>
        `;
      }, 600);
    }
  } else {
    c1.classList.remove("flipped");
    c2.classList.remove("flipped");

    // Panggil suara TEET salah dari kuis
    if (typeof playWrongSound === "function") playWrongSound();
  }
  flippedCards = [];
}

// --- GAME 3: TIC TAC TOE ---
let boardTTT = ["", "", "", "", "", "", "", "", ""];
let gameOverTTT = false;

function loadTicTacToe() {
  boardTTT = ["", "", "", "", "", "", "", "", ""];
  gameOverTTT = false;

  let html = `
    <h3 style="color:var(--primary); text-align:center;">Tic-Tac-Love</h3>
    <p id="ttt-status" style="text-align:center; font-size:0.9rem; color:var(--text-muted); margin-bottom:10px; height:20px;">Giliran Etin dulu (💖)</p>
    <div class="tictac-grid">
  `;

  // Tambahin ID biar gampang nargetin per-kotaknya
  boardTTT.forEach((_, i) => {
    html += `<div class="tictac-cell" id="ttt-cell-${i}" onclick="playTTT(${i})"></div>`;
  });

  html += `</div><button class="btn-primary" onclick="loadTicTacToe()" style="margin-top:15px">Reset Board</button>`;
  modalBody.innerHTML = html;
}

// Fungsi ngecek kombinasi menang
function checkWinTTT(player) {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Baris
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Kolom
    [0, 4, 8], [2, 4, 6]             // Diagonal
  ];

  for (let pattern of winPatterns) {
    if (
      boardTTT[pattern[0]] === player &&
      boardTTT[pattern[1]] === player &&
      boardTTT[pattern[2]] === player
    ) {
      return pattern; // Balikin posisi kotaknya kalau menang
    }
  }
  return null;
}

function getBestMove() {
  // 1. INSTA-KILL: Cek apakah AI bisa menang sekarang juga
  for (let i = 0; i < 9; i++) {
    if (boardTTT[i] === "") {
      boardTTT[i] = "✨"; // Coba jalan
      if (checkWinTTT("✨")) { boardTTT[i] = ""; return i; } // Kalau menang, ambil posisi ini
      boardTTT[i] = ""; // Balikin lagi
    }
  }

  // 2. DEFENSE: Cek apakah Etin mau menang di langkah berikutnya (Blokir!)
  for (let i = 0; i < 9; i++) {
    if (boardTTT[i] === "") {
      boardTTT[i] = "💖"; // Simulasiin kalau Etin jalan di sini
      if (checkWinTTT("💖")) { boardTTT[i] = ""; return i; } // Kalau Etin bakal menang, BLOKIR!
      boardTTT[i] = "";
    }
  }

  // 3. KEKUASAAN: Ambil kotak tengah kalau masih kosong (Posisi paling OP)
  if (boardTTT[4] === "") return 4;

  // 4. STRATEGI: Ambil pojokan secara acak kalau tengah udah keisi
  const corners = [0, 2, 6, 8];
  let availableCorners = corners.filter(c => boardTTT[c] === "");
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }

  // 5. SISA: Kalau pojok habis, ambil pinggiran (atas, bawah, kiri, kanan)
  const edges = [1, 3, 5, 7];
  let availableEdges = edges.filter(e => boardTTT[e] === "");
  if (availableEdges.length > 0) {
    return availableEdges[Math.floor(Math.random() * availableEdges.length)];
  }

  return -1;
}


// TERUS, ganti bagian setTimeout AI lu di fungsi playTTT jadi kayak gini:
function playTTT(i) {
  // ... (kode bagian giliran Etin tetep sama persis kayak yang sebelumnya) ...

  // 2. Giliran Mpit (AI Dewa) - Kasih delay biar kerasa kayak mikir
  document.getElementById("ttt-status").innerText = "Mpit lagi mikir...";
  gameOverTTT = true;

  setTimeout(() => {
    // 👇 PANGGIL FUNGSI OTAKNYA DI SINI 👇
    let aiMove = getBestMove();

    if (aiMove !== -1) {
      boardTTT[aiMove] = "✨";
      document.getElementById(`ttt-cell-${aiMove}`).innerText = "✨";

      let aiWin = checkWinTTT("✨");
      if (aiWin) {
        document.getElementById("ttt-status").innerText = "Mpit Menang! Wlee 😜";
        document.getElementById("ttt-status").style.color = "#e74c3c";
        highlightWin(aiWin, "#e74c3c");
        if (typeof playWrongSound === "function") playWrongSound();
        return;
      }

      if (!boardTTT.includes("")) {
        document.getElementById("ttt-status").innerText = "Yah Seri deh.. Coba lagi!";
      } else {
        document.getElementById("ttt-status").innerText = "Giliran Etin lagi (💖)";
        gameOverTTT = false;
      }
    }
  }, 600);
}

function playTTT(i) {
  // Kalau kotak udah keisi atau game udah beres/lagi mikir, stop
  if (gameOverTTT || boardTTT[i] !== "") return;

  // 1. Giliran Etin (💖)
  boardTTT[i] = "💖";
  document.getElementById(`ttt-cell-${i}`).innerText = "💖";

  // Cek Etin menang nggak?
  let etinWin = checkWinTTT("💖");
  if (etinWin) {
    gameOverTTT = true;
    document.getElementById("ttt-status").innerText = "Yeyy Etin Menang! 🎉";
    document.getElementById("ttt-status").style.color = "#2ecc71";
    highlightWin(etinWin, "#2ecc71"); // Glow Ijo
    if (typeof playCorrectSound === "function") playCorrectSound();
    return;
  }

  // Cek Seri
  if (!boardTTT.includes("")) {
    gameOverTTT = true;
    document.getElementById("ttt-status").innerText = "Yah Seri deh.. Coba lagi!";
    return;
  }

  // 2. Giliran Mpit (AI) - Kasih delay biar kerasa kayak mikir
  document.getElementById("ttt-status").innerText = "Mpit lagi mikir...";
  gameOverTTT = true; // Kunci layar sebentar biar Etin gak nyerobot jalan

  setTimeout(() => {
    let empty = boardTTT.map((v, idx) => (v === "" ? idx : null)).filter(v => v !== null);

    if (empty.length > 0) {
      // AI milih random dari kotak yang kosong
      let aiMove = empty[Math.floor(Math.random() * empty.length)];

      boardTTT[aiMove] = "✨";
      document.getElementById(`ttt-cell-${aiMove}`).innerText = "✨";

      // Cek AI menang nggak?
      let aiWin = checkWinTTT("✨");
      if (aiWin) {
        document.getElementById("ttt-status").innerText = "Mpit Menang! Wlee 😜";
        document.getElementById("ttt-status").style.color = "#e74c3c";
        highlightWin(aiWin, "#e74c3c"); // Glow Merah
        if (typeof playWrongSound === "function") playWrongSound();
        return;
      }

      // Cek Seri setelah AI jalan
      if (!boardTTT.includes("")) {
        document.getElementById("ttt-status").innerText = "Yah Seri deh.. Coba lagi!";
      } else {
        document.getElementById("ttt-status").innerText = "Giliran Etin lagi (💖)";
        gameOverTTT = false; // Buka kunci layar
      }
    }
  }, 600);
}

// Fungsi buat ngasih efek nyala di kotak yang menang
function highlightWin(pattern, color) {
  pattern.forEach(idx => {
    let cell = document.getElementById(`ttt-cell-${idx}`);
    cell.style.backgroundColor = color === "#2ecc71" ? "rgba(46, 204, 113, 0.2)" : "rgba(231, 76, 60, 0.2)";
    cell.style.boxShadow = `0 0 15px ${color}`;
    cell.style.borderColor = color;
  });
}

// --- GAME 4: CATCH THE HEART ---
let catchScore = 0;
let missedHearts = 0;
let spawnInterval;
let activeFalls = []; // Buat nyimpen pergerakan item biar bisa distop pas Game Over

function loadCatchHeart() {
  catchScore = 0;
  missedHearts = 0;
  activeFalls = [];

  modalBody.innerHTML = `
    <h3 style="color:var(--primary); text-align:center; margin-bottom:5px;">Catch The Love</h3>
    <div style="display:flex; justify-content:space-between; margin-bottom:10px; font-weight:bold; font-size:0.9rem;">
      <span>Skor: <span id="score" style="color:var(--primary);">0</span></span>
      <span style="color:#e74c3c">Lolos: <span id="missed">0</span>/3</span>
    </div>
    <div id="catch-game-area" style="position:relative; width:100%; height:300px; background:rgba(0,0,0,0.1); border-radius:15px; overflow:hidden;">
      <div id="basket" style="position:absolute; bottom:10px; font-size:2.5rem; transform:translateX(-50%); z-index:10;">🧺</div>
    </div>
    <p style="text-align:center; font-size:0.8rem; color:var(--text-muted); margin-top:10px;">Tangkap 💖. Hindari 💣. Lolos 3 Hati = Kalah!</p>
  `;

  const area = document.getElementById("catch-game-area");
  const basket = document.getElementById("basket");

  // Fungsi pergerakan keranjang biar mulus dan gak keluar batas
  function moveBasket(clientX) {
    let rect = area.getBoundingClientRect();
    let x = clientX - rect.left;
    if (x < 20) x = 20; // Mentok kiri
    if (x > rect.width - 20) x = rect.width - 20; // Mentok kanan
    basket.style.left = x + "px";
  }

  area.onmousemove = (e) => moveBasket(e.clientX);
  area.ontouchmove = (e) => {
    e.preventDefault();
    moveBasket(e.touches[0].clientX);
  };

  // Mulai munculin barang dari atas
  spawnInterval = setInterval(() => {
    // Kalau modal ditutup, stop semua proses gamenya
    if (document.getElementById("game-modal").style.display === "none") {
      stopCatchGame();
      return;
    }

    const isBomb = Math.random() < 0.25; // 25% kemungkinan muncul Bom
    const item = document.createElement("div");
    item.className = "falling-heart";
    item.innerText = isBomb ? "💣" : "💖";
    item.style.position = "absolute";
    item.style.fontSize = "1.5rem";
    item.style.left = Math.random() * 85 + 5 + "%"; // Biar gak terlalu mepet tembok
    item.style.top = "-30px";
    area.appendChild(item);

    let pos = -30;
    // Makin gede skor, makin ngebut jatuhnya (Maksimal nambah speed +5)
    let speed = 3 + Math.min(catchScore * 0.15, 5);

    let fall = setInterval(() => {
      pos += speed;
      item.style.top = pos + "px";

      let bRect = basket.getBoundingClientRect();
      let iRect = item.getBoundingClientRect();

      // LOGIKA TABRAKAN (Collision Detection)
      if (
        iRect.bottom >= bRect.top + 10 &&
        iRect.bottom <= bRect.bottom &&
        iRect.left >= bRect.left - 15 &&
        iRect.right <= bRect.right + 15
      ) {
        clearInterval(fall);
        item.remove();

        if (isBomb) {
          // Kena Bom -> MODAR
          if (typeof playWrongSound === "function") playWrongSound();
          gameOverCatch("Kena Bom! Meledak deh cintanya 💥");
        } else {
          // Nangkep Hati -> Point Plus!
          catchScore++;
          document.getElementById("score").innerText = catchScore;
          if (typeof playCorrectSound === "function") playCorrectSound();
        }
      }
      // Kalau item gak ketangkep dan nyentuh dasar area
      else if (pos > area.offsetHeight - 10) {
        clearInterval(fall);
        item.remove();

        if (!isBomb) {
          // Hati disia-siakan -> Nyawa ngurang
          missedHearts++;
          document.getElementById("missed").innerText = missedHearts;
          if (typeof playWrongSound === "function") playWrongSound();

          if (missedHearts >= 3) {
            gameOverCatch("Hatinya Mpit dibiarin jatuh 3x 💔");
          }
        }
      }
    }, 20);

    activeFalls.push(fall);
  }, 1000);
}

// Fungsi buat ngebersihin layar pas Game Over
function stopCatchGame() {
  clearInterval(spawnInterval);
  activeFalls.forEach(f => clearInterval(f));
  activeFalls = [];
}

// Layar Game Over
function gameOverCatch(alasan) {
  stopCatchGame();
  modalBody.innerHTML = `
    <h3 style="color:#e74c3c; text-align:center;">Game Over!</h3>
    <p style="text-align:center; margin-top:10px; font-size:0.9rem;">${alasan}</p>
    <div style="background:var(--primary-glow); padding:15px; border-radius:15px; margin:15px 0; text-align:center;">
      <p style="font-size:0.9rem; color:var(--text-muted); margin-bottom:5px;">Skor Akhir Sayang</p>
      <h2 style="color:var(--primary); font-size:2.5rem; margin:0;">${catchScore}</h2>
    </div>
    <button class="btn-primary" onclick="loadCatchHeart()">Main Lagi</button>
  `;
}

// --- GAME 5: PUZZLE SURAT CINTA ---
let puzzleBoard = [];
let emptyIdx = 8;
let puzzleImg = null; // Buat nyimpen URL foto yang diupload

function loadPuzzle() {
  if (!puzzleImg) {
    // Kalau belum ada foto, suruh upload dulu
    modalBody.innerHTML = `
      <h3 style="color:var(--primary); text-align:center;">Puzzle Cinta</h3>
      <div style="text-align:center; padding:30px;">
        <i class="fa-solid fa-image" style="font-size:3rem; color:var(--primary-glow); margin-bottom:15px;"></i>
        <p style="font-size:0.9rem; color:var(--text-muted); margin-bottom:20px;">Pilih foto paling manis buat Etin susun!</p>
        <button class="btn-primary" onclick="document.getElementById('puzzle-upload').click()">Pilih Foto</button>
      </div>
    `;
    return;
  }

  // Kalau foto udah ada, baru acak puzzle
  puzzleBoard = [0, 1, 2, 3, 4, 5, 6, 7, ""];
  emptyIdx = 8;

  // Acak puzzle
  for (let i = 0; i < 100; i++) {
    let moves = [];
    if (emptyIdx % 3 !== 0) moves.push(emptyIdx - 1);
    if ((emptyIdx + 1) % 3 !== 0) moves.push(emptyIdx + 1);
    if (emptyIdx >= 3) moves.push(emptyIdx - 3);
    if (emptyIdx <= 5) moves.push(emptyIdx + 3);
    let move = moves[Math.floor(Math.random() * moves.length)];
    puzzleBoard[emptyIdx] = puzzleBoard[move];
    puzzleBoard[move] = "";
    emptyIdx = move;
  }
  renderPuzzle();
}

function handlePuzzleUpload(input) {
  const file = input.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      puzzleImg = e.target.result;
      loadPuzzle(); // Langsung mainin setelah upload
    };
    reader.readAsDataURL(file);
  }
}

function renderPuzzle() {
  let html = `
    <h3 style="color:var(--primary); text-align:center; margin-bottom:5px;">Puzzle Cinta</h3>
    <p style="text-align:center; font-size:0.8rem; color:var(--text-muted); margin-bottom:15px;">Susun foto kita ya sayang!</p>
    <div class="puzzle-grid">
  `;

  puzzleBoard.forEach((val, i) => {
    if (val === "") {
      html += `<div class="puzzle-tile empty"></div>`;
    } else {
      // Itung posisi background (0, 50, 100) berdasarkan urutan asli (0-7)
      let x = (val % 3) * 50;
      let y = Math.floor(val / 3) * 50;
      html += `
        <div class="puzzle-tile" 
             onclick="movePuzzle(${i})" 
             style="background-image:url('${puzzleImg}'); background-position: ${x}% ${y}%; background-size: 300% 300%;">
        </div>`;
    }
  });

  html += `</div>
    <div style="display:flex; gap:10px; margin-top:15px;">
      <button class="btn-outline" style="flex:1" onclick="document.getElementById('puzzle-upload').click()">Ganti Foto</button>
      <button class="btn-primary" style="flex:1" onclick="loadPuzzle()">Acak Lagi</button>
    </div>`;
  modalBody.innerHTML = html;
}

function movePuzzle(i) {
  let neighbors = [emptyIdx - 1, emptyIdx + 1, emptyIdx - 3, emptyIdx + 3];
  // Cek validitas pindah (nggak boleh tembus baris)
  let canMove = neighbors.includes(i) &&
    !(i === emptyIdx - 1 && emptyIdx % 3 === 0) &&
    !(i === emptyIdx + 1 && i % 3 === 0);

  if (canMove) {
    if (typeof playTick === "function") playTick();
    puzzleBoard[emptyIdx] = puzzleBoard[i];
    puzzleBoard[i] = "";
    emptyIdx = i;
    renderPuzzle();
    checkWinPuzzle();
  }
}

function checkWinPuzzle() {
  if (JSON.stringify(puzzleBoard) === JSON.stringify([0, 1, 2, 3, 4, 5, 6, 7, ""])) {
    if (typeof playCorrectSound === "function") playCorrectSound();
    setTimeout(() => {
      modalBody.innerHTML = `
        <h3 style="color:var(--primary); text-align:center;">Sempurna! ❤️</h3>
        <div style="width:200px; height:200px; margin:15px auto; border-radius:15px; background-image:url('${puzzleImg}'); background-size:cover; border:3px solid var(--primary);"></div>
        <p style="text-align:center; font-style:italic;">"Foto ini emang bagus, tapi kebersamaan kita jauh lebih indah. Love you!"</p>
        <button class="btn-primary" onclick="closeGame()" style="margin-top:15px">Tutup</button>
      `;
    }, 500);
  }
}

// --- GAME 6: BINARY LOVE DECRYPTOR ---
const secretMessages = [
  { text: "I LOVE YOU", binary: "01001001 00100000 01001100 01001111 01010110 01000101 00100000 01011001 01001111 01010101" },
  { text: "KAMU CANTIK", binary: "01001011 01000001 01001101 01010101 00100000 01000011 01000001 01001110 01010100 01001001 01001011" },
  { text: "MPIT SAYANG ETIN", binary: "01001101 01010000 01001001 01010100 00100000 01010011 01000001 01011001 01000001 01001110 01000111" }
];

let currentBinaryIdx = 0;

function loadBinaryGame() {
  currentBinaryIdx = Math.floor(Math.random() * secretMessages.length);
  const msg = secretMessages[currentBinaryIdx];

  modalBody.innerHTML = `
        <h3 style="color:var(--primary); text-align:center;">Binary Decryptor v1.0</h3>
        <p style="text-align:center; font-size:0.8rem; color:var(--text-muted); margin-bottom:15px;">System Detect: Encrypted Message Found!</p>
        
        <div id="binary-terminal" style="background:#1a1a1a; color:#00ff00; font-family:'Courier New', monospace; padding:15px; border-radius:10px; font-size:0.8rem; line-height:1.5; margin-bottom:15px; border: 1px solid #333; overflow-wrap: break-word;">
            <span style="color:#ff80ab;">[SYSTEM]:</span> Awaiting decryption...<br><br>
            <span id="binary-code" style="color:#00ff00; letter-spacing:1px;">${msg.binary}</span>
        </div>

        <div id="decrypt-area" style="text-align:center;">
            <button class="btn-primary" id="decrypt-btn" onclick="startDecrypting()" style="background:#2ecc71; border:none; box-shadow: 0 0 15px rgba(46, 204, 113, 0.4);">
                RUN DECRYPT_LOGIC.EXE
            </button>
        </div>
        <div id="binary-result" style="margin-top:15px; text-align:center; font-weight:bold; color:var(--primary); font-size:1.2rem; min-height:30px;"></div>
    `;
}

function startDecrypting() {
  const btn = document.getElementById("decrypt-btn");
  const codeEl = document.getElementById("binary-code");
  const resultEl = document.getElementById("binary-result");
  const msg = secretMessages[currentBinaryIdx];

  btn.disabled = true;
  btn.style.opacity = "0.5";

  if (typeof playTick === "function") playTick();

  // Animasi "Matrix" acak sebelum muncul teks asli
  let iterations = 0;
  const interval = setInterval(() => {
    codeEl.innerText = msg.binary.split('').map(() => Math.round(Math.random())).join('');
    iterations++;

    if (iterations > 20) {
      clearInterval(interval);
      codeEl.innerText = msg.binary;
      codeEl.style.color = "#ff80ab";

      // Munculin hasil teks aslinya
      resultEl.innerHTML = `
                <div class="prize-pop">
                    <span style="font-size:0.8rem; color:var(--text-muted); display:block; margin-bottom:5px;">Message Decrypted:</span>
                    "${msg.text}"
                </div>
            `;

      if (typeof playCorrectSound === "function") playCorrectSound();

      btn.innerText = "ACCESS GRANTED";
      btn.style.background = "var(--primary)";
      btn.style.opacity = "1";
      btn.onclick = loadBinaryGame; // Klik lagi buat pesan lain
      btn.disabled = false;
    }
  }, 80);
}

/* =========================================
   7. LOVE DOODLE LOGIC (CANVAS API)
   ========================================= */
const canvas = document.getElementById("doodle-canvas");
const ctx = canvas ? canvas.getContext("2d") : null;
let isDrawing = false;
let currentColor = "#000000"; // Default warna item
let lineWidth = 3; // Ketebalan garis
let undoStack = [];
const MAX_UNDO = 20;
let isEraser = false;

// Variabel buat nyimpen posisi terakhir (buat gambar mulus)
let lastX = 0;
let lastY = 0;

function initDoodleCanvas() {
  if (!canvas || !ctx) return;

  // Set ukuran internal canvas sesuai container (buat High DPI)
  const container = canvas.parentElement;
  canvas.width = container.offsetWidth;
  canvas.height = container.offsetHeight;

  // Set style garis
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = currentColor;
}

// --- PHOTO UPLOAD LOGIC ---
function triggerPhotoUpload() {
  // Klik input file hidden via tombol aesthetic
  document.getElementById("photo-upload").click();
}

function handlePhotoUpload(input) {
  const file = input.files[0];
  if (!file) return;

  // 1. Simpan State SEBELUM gambar masuk buat Undo
  saveState();

  const reader = new FileReader();
  reader.onload = function (event) {
    const img = new Image();
    img.onload = function () {
      if (!ctx || !canvas) return;

      // 2. Hapus canvas total dulu biar bersih
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 3. LOGIC SAKTI: Center & Contain Scaling (Biar gak gepeng)
      // Hitung ratio skala agar gambar muat di canvas
      let scale = Math.min(
        canvas.width / img.width,
        canvas.height / img.height,
      );

      // Hitung posisi koordinat biar di tengah (x, y)
      let x = canvas.width / 2 - (img.width / 2) * scale;
      let y = canvas.height / 2 - (img.height / 2) * scale;

      // 4. Gambar fotonya ke Canvas
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

      // 5. Reset tool ke Spidol Item setelah upload
      isEraser = false;
      ctx.globalCompositeOperation = "source-over";
      ctx.lineWidth = 3;
      if (document.getElementById("eraser-btn"))
        document.getElementById("eraser-btn").classList.remove("active");

      // Reset input value biar bisa upload foto yang sama berturut-turut
      input.value = "";
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

// Fungsi ganti warna
function setColor(color, btnEl) {
  isEraser = false;
  currentColor = color;
  if (ctx) {
    ctx.strokeStyle = currentColor;
    ctx.globalCompositeOperation = "source-over";
    ctx.lineWidth = 3;
  }
  document
    .querySelectorAll(".color-btn")
    .forEach((btn) => btn.classList.remove("active"));
  const eraserBtn = document.getElementById("eraser-btn");
  if (eraserBtn) eraserBtn.classList.remove("active");
  btnEl.classList.add("active");
}

// Fungsi hapus canvas
function clearCanvas() {
  if (ctx && canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

// --- MAXIMIZE & RESTORE DOODLE LOGIC (FIXED) ---
function toggleMaximizeDoodle() {
  const card = document.querySelector(".doodle-card");
  const icon = document.querySelector("#resize-doodle-btn i");

  // Tangkap elemen Top Bar dan Menu Bawah
  const topBar = document.querySelector(".top-bar");
  const bottomNav = document.querySelector(".bottom-nav");

  const tempImgData = canvas.toDataURL();

  if (card.classList.contains("maximized")) {
    card.classList.remove("maximized");
    icon.classList.replace("fa-compress", "fa-expand");

    // Munculin lagi menunya pas balik ke ukuran normal
    if (topBar) topBar.style.display = "flex";
    if (bottomNav) bottomNav.style.display = "flex";
  } else {
    card.classList.add("maximized");
    icon.classList.replace("fa-expand", "fa-compress");

    // Sembunyiin menu biar bener-bener Full Screen tanpa gangguan
    if (topBar) topBar.style.display = "none";
    if (bottomNav) bottomNav.style.display = "none";
  }

  setTimeout(() => {
    initDoodleCanvas();

    let img = new Image();
    img.src = tempImgData;
    img.onload = () => {
      let scale = Math.min(
        canvas.width / img.width,
        canvas.height / img.height,
      );
      let x = canvas.width / 2 - (img.width / 2) * scale;
      let y = canvas.height / 2 - (img.height / 2) * scale;
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };
  }, 150);
}

// --- Fungsi Bantuan Undo & Eraser ---
function saveState() {
  if (undoStack.length >= MAX_UNDO) undoStack.shift();
  undoStack.push(canvas.toDataURL());
}

function undoLast() {
  if (undoStack.length === 0) return;
  let previousState = undoStack.pop();
  let img = new Image();
  img.src = previousState;
  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  };
}

function toggleEraser(btnEl) {
  isEraser = !isEraser;
  if (isEraser) {
    ctx.globalCompositeOperation = "destination-out"; // Mode Hapus
    ctx.lineWidth = 25; // Ukuran penghapus manual
    btnEl.classList.add("active");
    document
      .querySelectorAll(".color-btn")
      .forEach((btn) => btn.classList.remove("active"));
  } else {
    ctx.globalCompositeOperation = "source-over"; // Balik nggambar
    ctx.lineWidth = 3;
    btnEl.classList.remove("active");
  }
}

// --- CORE DRAWING LOGIC (PC & Mobile) ---
function startDrawing(e) {
  if (!canvas || !ctx) return;
  saveState(); // Simpan state sebelum mulai gambar (buat undo)
  isDrawing = true;

  const rect = canvas.getBoundingClientRect();
  // Dapetin posisi awal (handle mouse & touch)
  lastX = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
  lastY = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

  // Mulai path baru
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
}

function draw(e) {
  if (!isDrawing || !canvas || !ctx) return;

  const rect = canvas.getBoundingClientRect();
  const curX = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
  const curY = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

  // Gambar garis dari posisi terakhir ke posisi sekarang
  ctx.lineTo(curX, curY);
  ctx.stroke();

  // Update posisi terakhir
  lastX = curX;
  lastY = curY;
}

function stopDrawing() {
  isDrawing = false;
  if (ctx) ctx.closePath();
}

// --- AKSI: SAVE & SHARE ---
function saveDoodle() {
  if (!canvas) return;

  // Convert canvas jadi data URL (Image PNG)
  const image = canvas.toDataURL("image/png");

  // Trik simpan file di browser (pake link gaib)
  const link = document.createElement("a");
  link.href = image;
  link.download = `doodle-Etin-${Date.now()}.png`; // Nama file
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  alert("Gambarnya udah kesimpan di HP/Laptop Sayang ya, sayang! ❤️");
}

function shareDoodle() {
  if (!canvas) return;

  // 1. Simpan gambar otomatis dulu (biar ada di gallery dia)
  saveDoodle();

  // 2. Trik Buka WhatsApp (Convert base64 -> Image gak bisa langsung via wa.me di web)
  // Workflow: Buka WA -> Minta dia attach gambar yang barusan kesimpan
  const phoneNumber = "6281410266561"; // GANTI SAMA NOMOR MPIT (Pake 62)
  const message = encodeURIComponent(
    "Aku abis gambar ini!!!",
  );

  window.open(`https://wa.me/${phoneNumber}?text=${message}`);
}

// --- EVENT LISTENERS ---
if (canvas) {
  // Mouse Events (PC)
  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mousemove", draw);
  window.addEventListener("mouseup", stopDrawing);

  // Touch Events (Mobile) - {passive: false} biar gak scrolling
  canvas.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      startDrawing(e);
    },
    { passive: false },
  );
  canvas.addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault();
      draw(e);
    },
    { passive: false },
  );
  canvas.addEventListener("touchend", stopDrawing);
}

// Inisialisasi pas web pertama load
window.addEventListener("load", initDoodleCanvas);
// Re-inisialisasi kalau dia pindah tab (buat nyesuain lebar canvas)
document.querySelectorAll(".nav-item").forEach((nav) => {
  nav.addEventListener("click", () => setTimeout(initDoodleCanvas, 100));
});

/* =========================================
   NAVBAR & BURGER MENU LOGIC
   ========================================= */
function toggleMobileMenu() {
  document.getElementById("nav-menu").classList.toggle("active");
  // Ganti icon burger jadi X (close)
  const icon = document.querySelector(".burger-icon i");
  if (icon.classList.contains("fa-bars")) {
    icon.classList.replace("fa-bars", "fa-xmark");
  } else {
    icon.classList.replace("fa-xmark", "fa-bars");
  }
}

function closeMobileMenu() {
  document.getElementById("nav-menu").classList.remove("active");
  const icon = document.querySelector(".burger-icon i");
  if (icon) icon.classList.replace("fa-xmark", "fa-bars");
}

// Fungsi sakti: Buka tab Tenang, langsung scroll ke fiturnya
function goToFeature(tabId, cardId) {
  switchTab(tabId); // Pindah tab
  closeMobileMenu(); // Tutup menu kalau di HP

  // Kasih jeda dikit biar tabnya kelar ngerender, baru scroll
  setTimeout(() => {
    const targetCard = document.getElementById(cardId);
    if (targetCard) {
      targetCard.scrollIntoView({ behavior: "smooth", block: "center" });

      // Efek glow dikit biar dia tau yang mana yang dituju
      targetCard.style.boxShadow = "0 0 20px var(--primary)";
      setTimeout(() => {
        targetCard.style.boxShadow = "none";
      }, 1500);
    }
  }, 300);
}

// Fungsi sakti: Langsung buka game dari Navbar
function openGameMenu(gameId) {
  closeMobileMenu();
  // Kalau mau langsung buka modal game dari menu manapun:
  openGame(gameId);
}

// --- FUNGSI SCROLL MENU Safe Space ---
function goToFeature(tabId, cardId) {
  switchTab(tabId); // Buka tab calm

  // Cek apakah fungsi tutup menu HP ada
  if (typeof closeMobileMenu === "function") {
    closeMobileMenu();
  }

  setTimeout(() => {
    const targetCard = document.getElementById(cardId);

    if (targetCard) {
      targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
      const originalShadow = targetCard.style.boxShadow;
      targetCard.style.boxShadow = "0 0 20px var(--primary)";
      setTimeout(() => {
        targetCard.style.boxShadow = originalShadow;
      }, 1500);
    } else {
      // ALARM: Kalau ID gak ketemu, dia bakal munculin popup ini!
      alert(
        "⚠️ Waduh Bang! ID '" +
        cardId +
        "' gak ketemu di HTML lu. Pastiin ID-nya udah ditulis di <div class='card...'> ya!",
      );
    }
  }, 300);
}

// --- FUNGSI ANIMASI PANAH MENU MOBILE ---
function togglePanah(elemen) {
  if (window.innerWidth <= 768) {
    const liParent = elemen.parentElement;
    const isMuka = liParent.classList.contains('menu-buka');

    document.querySelectorAll('.nav-item-top.dropdown').forEach(item => {
      item.classList.remove('menu-buka');
    });

    if (!isMuka) {
      liParent.classList.add('menu-buka');
    }
  }
}

// Fungsi utama buat nampilin SATU fitur aja
function bukaFitur(tabUtama, idFitur) {
  // Pindah ke tab utama dulu (calm atau games)
  switchTab(tabUtama);

  // Sembunyiin semua card yang punya class 'sub-fitur'
  const semuaFitur = document.querySelectorAll('.sub-fitur');
  semuaFitur.forEach(fitur => {
    fitur.style.display = 'none';
  });

  // Tampilin cuma card yang diklik dari dropdown
  const fiturPilihan = document.getElementById(idFitur);
  if (fiturPilihan) {
    fiturPilihan.style.display = 'block';
    // Catatan: Kalau layout asli lu berantakan pas pake 'block', 
    // ganti kata 'block' di atas jadi 'flex' ya!
  }

  // Tutup menu dropdown mobile otomatis
  document.querySelectorAll('.nav-item-top.dropdown').forEach(item => {
    item.classList.remove('menu-buka');
  });

  // 👇 --- INI OBATNYA BANG --- 👇
  // Panggil initScratch() pas card-scratch-nya beneran udah kebuka di layar
  if (idFitur === 'card-scratch') {
    setTimeout(() => {
      initScratch();
    }, 100); // Jeda dikit biar ukuran layarnya ke-render dulu
  }

  if (idFitur === 'card-doodle') {
    setTimeout(() => {
      initDoodleCanvas(); // Biar canvas-nya sadar ukuran pas baru dibuka
    }, 100);
  }
}