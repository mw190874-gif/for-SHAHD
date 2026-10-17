/* =========================================
   1. إدارة الشاشات (Transitions)
   ========================================= */
const screens = document.querySelectorAll('.screen');
function showScreen(id) {
  screens.forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

/* =========================================
   2. التحقق من الاسم والباسورد (القفل)
   ========================================= */
document.getElementById('btnUnlock').addEventListener('click', () => {
  // بناخد اللي اتكتب ونشيل المسافات
  const name = document.getElementById('lockName').value.trim().toLowerCase();
  const pass = document.getElementById('lockPass').value.trim();
  const error = document.getElementById('lockError');
  
  // التحقق: الاسم يكون شهد أو shahd (بحروف كبيرة أو صغيرة) والباسورد 1810
  if ((name === 'شهد' || name === 'shahd') && pass === '1810') {
    error.classList.add('hidden'); // اخفاء رسالة الخطأ
    showScreen('s1'); // فتح الشاشة التالية
  } else {
    error.classList.remove('hidden'); // اظهار رسالة الخطأ لو غلط
    document.getElementById('lockPass').value = ''; // مسح الباسورد
  }
});

// زرار بداية السحر
document.getElementById('btnStart').addEventListener('click', () => showScreen('s2'));

/* =========================================
   3. التورتة والشمع
   ========================================= */
const btnBlow = document.getElementById('btnBlow');
const btnNextCake = document.getElementById('btnNextCake');
const candles = document.querySelectorAll('.candle-number'); // تم التعديل لشمعة الـ 19
const cakeMsg = document.getElementById('cakeMsg');

btnBlow.addEventListener('click', () => {
  candles.forEach(c => c.classList.add('out'));
  cakeMsg.classList.remove('hidden');
  btnBlow.classList.add('hidden');
  btnNextCake.classList.remove('hidden');
  
  // انفجار ألعاب نارية احتفالي
  for(let i=0; i<10; i++) {
    setTimeout(() => {
      createFirework(window.innerWidth/2 + (Math.random()-0.5)*300, window.innerHeight/2 + (Math.random()-0.5)*300);
    }, i * 100);
  }
});

btnNextCake.addEventListener('click', () => showScreen('s3'));
document.getElementById('btnNextPhotos').addEventListener('click', () => showScreen('s4'));

/* =========================================
   4. الهدية
   ========================================= */
const giftBox = document.getElementById('giftBox');
const giftMsg = document.getElementById('giftMsg');
const giftInstruction = document.getElementById('giftInstruction');

giftBox.addEventListener('click', () => {
  if (!giftBox.classList.contains('open')) {
    giftBox.classList.add('open');
    setTimeout(() => {
      giftBox.style.display = 'none';
      giftInstruction.style.display = 'none';
      giftMsg.classList.remove('hidden');
      
      // ألعاب نارية وقت فتح الهدية
      for(let i=0; i<15; i++) {
        setTimeout(() => createFirework(Math.random()*window.innerWidth, Math.random()*window.innerHeight), i*80);
      }
    }, 500);
  }
});

document.getElementById('btnNextGift').addEventListener('click', () => {
  showScreen('s5');
  // احتفال كبير في النهاية
  let count = 0;
  const interval = setInterval(() => {
    createFirework(Math.random()*window.innerWidth, Math.random()*window.innerHeight);
    if (++count > 30) clearInterval(interval);
  }, 200);
});

/* =========================================
   5. الموسيقى
   ========================================= */
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
music.volume = 0.6;
let isPlaying = false;

musicBtn.addEventListener('click', () => {
  if (isPlaying) {
    music.pause();
    musicBtn.classList.remove('playing');
    musicBtn.textContent = '🔇';
  } else {
    music.play().then(() => {
      musicBtn.classList.add('playing');
      musicBtn.textContent = '🎵';
    }).catch(e => console.log('Audio error:', e));
  }
  isPlaying = !isPlaying;
});

/* =========================================
   6. محرك الألعاب النارية (Canvas)
   ========================================= */
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
window.addEventListener('resize', resize);
resize();

const colors = ['#d4af37', '#b76e79', '#ffffff', '#ffdd00', '#ff4d88'];

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 5 + 2;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.life = 1;
    this.decay = Math.random() * 0.015 + 0.01;
    this.gravity = 0.05;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.vx *= 0.98;
    this.vy *= 0.98;
    this.life -= this.decay;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, Math.random() * 2 + 1, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.life;
    ctx.fill();
  }
}

function createFirework(x, y) {
  const color = colors[Math.floor(Math.random() * colors.length)];
  const particleCount = 50 + Math.random() * 50;
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(x, y, color));
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = 'rgba(5, 5, 5, 0.2)'; // تأثير الـ Trail
  ctx.fillRect(0, 0, width, height);
  
  ctx.globalCompositeOperation = 'lighter';
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.update();
    p.draw();
    if (p.life <= 0) particles.splice(i, 1);
  }
}
animate();