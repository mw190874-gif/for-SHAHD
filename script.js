// التنقل
const screens = document.querySelectorAll('.screen');
function showScreen(id) {
  screens.forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// التورتة
document.getElementById('btnStart').addEventListener('click', () => showScreen('s2'));
const btnBlow = document.getElementById('btnBlow');
const btnNextCake = document.getElementById('btnNextCake');

btnBlow.addEventListener('click', () => {
  document.querySelector('.candle').classList.add('out');
  btnBlow.classList.add('hidden');
  btnNextCake.classList.remove('hidden');
  for(let i=0; i<5; i++) setTimeout(() => createFirework(), i*200);
});

btnNextCake.addEventListener('click', () => showScreen('s3'));
document.getElementById('btnNextPhotos').addEventListener('click', () => showScreen('s4'));

// الهدية
const giftBox = document.getElementById('giftBox');
const giftHint = document.getElementById('giftHint');
const giftContainer = document.getElementById('giftContainer');
const messageBox = document.getElementById('messageBox');

giftBox.addEventListener('click', () => {
  if (!giftBox.classList.contains('open')) {
    giftBox.classList.add('open');
    setTimeout(() => {
      giftContainer.classList.add('hidden');
      messageBox.classList.remove('hidden');
      for(let i=0; i<10; i++) setTimeout(() => createFirework(), i*100);
    }, 400);
  }
});

document.getElementById('btnFinal').addEventListener('click', () => {
  showScreen('s5');
  for(let i=0; i<15; i++) setTimeout(() => createFirework(), i*150);
});

// الموسيقى
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
music.volume = 0.6;
let isPlaying = false;

musicBtn.addEventListener('click', () => {
  if (isPlaying) { music.pause(); musicBtn.classList.remove('playing'); musicBtn.textContent = '🔇'; }
  else { music.play().catch(e => console.log(e)); musicBtn.classList.add('playing'); musicBtn.textContent = '🎵'; }
  isPlaying = !isPlaying;
});

// الشماريخ
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
let width, height, particles = [];

function resize() { width = window.innerWidth; height = window.innerHeight; canvas.width = width; canvas.height = height; }
window.addEventListener('resize', resize); resize();

const colors = ['#d4af37', '#b76e79', '#ffffff', '#ffdd00'];

function createFirework() {
  const x = Math.random() * width;
  const y = Math.random() * (height * 0.6);
  const color = colors[Math.floor(Math.random() * colors.length)];
  for (let i = 0; i < 40; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 3 + 1;
    particles.push({
      x, y, vx: Math.cos(angle)*speed, vy: Math.sin(angle)*speed,
      life: 1, decay: Math.random()*0.02 + 0.015, color
    });
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = 'rgba(5, 5, 5, 0.3)'; // شفافية عشان الكلام يبان
  ctx.fillRect(0, 0, width, height);
  
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx; p.y += p.vy; p.vy += 0.05;
    p.vx *= 0.98; p.vy *= 0.98; p.life -= p.decay;
    
    ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = p.color; ctx.globalAlpha = Math.max(p.life, 0); ctx.fill();
    
    if (p.life <= 0) particles.splice(i, 1);
  }
}
animate();