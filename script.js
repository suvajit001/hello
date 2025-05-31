// Balloons
const balloonColors = ["#f66d9b", "#fdd692", "#7ec6ff", "#ffe67c", "#b6eea6", "#ae7bff"];
function randomBetween(a, b) { return a + Math.random() * (b - a); }
function createBalloon() {
  const balloon = document.createElement('div');
  balloon.className = 'balloon';
  const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
  balloon.style.background = color;
  if (Math.random() > 0.6) {
    balloon.style.boxShadow = `0 0 30px 6px ${color}66`;
  }
  balloon.style.left = `${randomBetween(0, 95)}vw`;
  balloon.style.animationDuration = `${randomBetween(6, 13)}s`;
  balloon.style.width = `${randomBetween(30, 48)}px`;
  balloon.style.height = `${randomBetween(40, 62)}px`;
  balloon.style.zIndex = 0;
  return balloon;
}
function launchBalloons() {
  const balloonsDiv = document.getElementById('balloons');
  setInterval(() => {
    if (balloonsDiv.childNodes.length > 20) {
      balloonsDiv.removeChild(balloonsDiv.firstChild);
    }
    const balloon = createBalloon();
    balloonsDiv.appendChild(balloon);
    setTimeout(() => {
      if (balloon.parentNode) balloon.parentNode.removeChild(balloon);
    }, 14000);
  }, 700);
}
launchBalloons();

// Fireworks
const fireworksCanvas = document.getElementById('fireworks');
const fwCtx = fireworksCanvas.getContext('2d');
let fireworksActive = false, fireworksParticles = [];
function resizeFireworksCanvas() {
  fireworksCanvas.width = fireworksCanvas.offsetWidth;
  fireworksCanvas.height = fireworksCanvas.offsetHeight;
}
resizeFireworksCanvas();
window.addEventListener('resize', resizeFireworksCanvas);

function launchFireworksBurst() {
  const colors = ["#ffec27","#ff6f61","#7ec6ff","#fdd692","#ae7bff","#fff","#ff8fab"];
  const x = Math.random() * fireworksCanvas.width * 0.7 + fireworksCanvas.width * 0.15;
  const y = Math.random() * fireworksCanvas.height * 0.4 + fireworksCanvas.height * 0.10;
  const count = 20 + Math.floor(Math.random()*8);
  for (let i=0; i<count; i++) {
    const angle = (Math.PI*2) * i/count;
    const speed = 2 + Math.random()*1.6;
    fireworksParticles.push({
      x, y,
      vx: Math.cos(angle)*speed,
      vy: Math.sin(angle)*speed,
      alpha: 1,
      color: colors[Math.floor(Math.random()*colors.length)],
      size: 2.5 + Math.random()*1.6
    });
  }
}
function animateFireworks() {
  fwCtx.clearRect(0,0,fireworksCanvas.width,fireworksCanvas.height);
  for (let p of fireworksParticles) {
    fwCtx.save();
    fwCtx.globalAlpha = p.alpha;
    fwCtx.beginPath();
    fwCtx.arc(p.x, p.y, p.size, 0, Math.PI*2);
    fwCtx.fillStyle = p.color;
    fwCtx.shadowColor = p.color;
    fwCtx.shadowBlur = 16;
    fwCtx.fill();
    fwCtx.restore();
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 0.018 + Math.random()*0.01;
    p.size *= 0.98;
  }
  fireworksParticles = fireworksParticles.filter(p => p.alpha > 0.07);
  if (fireworksActive && (fireworksParticles.length > 0)) {
    requestAnimationFrame(animateFireworks);
  }
}
function startFireworks() {
  fireworksActive = true;
  resizeFireworksCanvas();
  fireworksParticles = [];
  for (let i=0; i<5; i++) setTimeout(launchFireworksBurst, i*400);
  animateFireworks();
  setTimeout(() => {fireworksActive = false;}, 2800);
}

// Cake Candle logic (+ firecracker video)
const cakeCandle = document.getElementById('cakeCandle');
const candleFlame = document.getElementById('candleFlame');
const cakeLabel = document.getElementById('cakeLabel');
const firecrackerVideo = document.getElementById('firecrackerVideo');
let candleBlown = false;
cakeCandle.addEventListener('click', () => {
  if (candleBlown) return;
  candleFlame.classList.add('blown');
  candleBlown = true;
  cakeLabel.textContent = "Make a wish...";

  // Show and play firecracker video as a fullscreen mask background
  firecrackerVideo.style.display = 'block';
  firecrackerVideo.currentTime = 0;
  firecrackerVideo.play();

  // Hide the video after 4.5 seconds (forced), and pause
  setTimeout(() => {
    firecrackerVideo.pause();
    firecrackerVideo.style.display = 'none';
  }, 4500);

  // Optionally, also run fireworks animation for more effect
  startFireworks();

  setTimeout(() => {
    cakeLabel.textContent = "Happy Birthday! 🎂";
    openGallery.style.display = "";
  }, 1300);
});

// Name input logic
const namePrompt = document.getElementById('namePrompt');
const wishPage = document.getElementById('wishPage');
const submitName = document.getElementById('submitName');
const nameInput = document.getElementById('nameInput');
const wishMessage = document.getElementById('wishMessage');
const openGallery = document.getElementById('openGallery');

submitName.addEventListener('click', () => {
  const name = nameInput.value.trim();
  if(name.length === 0) {
    nameInput.focus();
    nameInput.style.borderColor = "#ff8fab";
    return;
  }
  namePrompt.style.display = 'none';
  wishPage.style.display = 'flex';
  wishMessage.textContent = `Happy Birthday, ${name}! Wishing you a day filled with joy and sweet moments!`;
});
nameInput.addEventListener('keypress', (e) => {
  if (e.key === "Enter") submitName.click();
});

// 3D Gallery Carousel
const galleryModal = document.getElementById('galleryModal');
const closeGallery = document.getElementById('closeGallery');
const photoIndicator = document.getElementById('photoIndicator');
const openCard = document.getElementById('openCard');

const photos = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=400&q=80"
];

let currentPhoto = 0;
let autoCarouselInterval = null;
let carousel3d, carouselImgs;
const total = photos.length;
let angle = 0;
const theta = 360 / total;

openGallery.addEventListener('click', () => {
  if (!document.querySelector('.carousel-3d')) {
    make3DCarousel();
  }
  galleryModal.style.display = 'flex';
  setup3DCarousel();
  startAutoCarousel();
});
function make3DCarousel() {
  const wrapper = document.querySelector('.carousel-3d-wrapper');
  wrapper.innerHTML = '';
  const carouselDiv = document.createElement('div');
  carouselDiv.className = 'carousel-3d';
  photos.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'carousel-img';
    img.setAttribute('data-index', i);
    if (i === currentPhoto) img.classList.add('selected');
    carouselDiv.appendChild(img);
  });
  wrapper.appendChild(carouselDiv);
}
function setup3DCarousel() {
  carousel3d = document.querySelector('.carousel-3d');
  carouselImgs = document.querySelectorAll('.carousel-img');
  for (let i = 0; i < total; i++) {
    const img = carouselImgs[i];
    const rotate = i * theta;
    img.style.transform = `rotateY(${rotate}deg) translateZ(260px)`;
    img.classList.toggle('selected', i === currentPhoto);
  }
  updateCarousel();
  carouselImgs.forEach(img => {
    img.onclick = (e) => {
      const idx = Number(img.getAttribute('data-index'));
      currentPhoto = idx;
      updateCarousel();
      resetAutoCarousel();
    }
  });
}
function updateCarousel(animate=true) {
  angle = -currentPhoto * theta;
  if (carousel3d) {
    if (animate) {
      carousel3d.style.transition = "transform 1.1s cubic-bezier(.45,.05,.55,.95)";
    } else {
      carousel3d.style.transition = "none";
    }
    carousel3d.style.transform = `translateZ(-180px) rotateY(${angle}deg)`;
    for (let i = 0; i < total; i++) {
      carouselImgs[i].classList.toggle('selected', i === currentPhoto);
    }
    photoIndicator.textContent = `Photo ${currentPhoto+1} of ${total}`;
  }
}
document.getElementById('prevPhoto').addEventListener('click', () => {
  currentPhoto = (currentPhoto - 1 + total) % total;
  updateCarousel();
  resetAutoCarousel();
});
document.getElementById('nextPhoto').addEventListener('click', () => {
  currentPhoto = (currentPhoto + 1) % total;
  updateCarousel();
  resetAutoCarousel();
});
closeGallery.addEventListener('click', () => {
  galleryModal.style.display = 'none';
  stopAutoCarousel();
});
galleryModal.addEventListener('click', (e) => {
  if (e.target === galleryModal) {
    galleryModal.style.display = 'none';
    stopAutoCarousel();
  }
});
function startAutoCarousel() {
  if (autoCarouselInterval) clearInterval(autoCarouselInterval);
  autoCarouselInterval = setInterval(() => {
    currentPhoto = (currentPhoto + 1) % total;
    updateCarousel();
  }, 2200);
}
function stopAutoCarousel() {
  if (autoCarouselInterval) clearInterval(autoCarouselInterval);
  autoCarouselInterval = null;
}
function resetAutoCarousel() {
  stopAutoCarousel();
  startAutoCarousel();
}
window.addEventListener('keydown', (e) => {
  if (e.key === "Escape" && galleryModal.style.display === 'flex') {
    galleryModal.style.display = 'none';
    stopAutoCarousel();
  }
});

// Greeting Card
const greetingCardPage = document.getElementById('greetingCardPage');
const greetingCardMessage = document.getElementById('greetingCardMessage');
openCard.addEventListener('click', () => {
  galleryModal.style.display = 'none';
  stopAutoCarousel();
  greetingCardPage.style.display = 'flex';
  let name = nameInput.value.trim() ? nameInput.value.trim() : "You";
  greetingCardMessage.innerHTML = `
    Dear <b>${name}</b>,<br><br>
    On this special day, I wish you a birthday as amazing as you are!<br>
    May your year be filled with laughter, adventure, sweet surprises, and
    beautiful moments.<br><br>
    Always keep that lovely smile on your face and know that you are cherished.<br>
    Happy Birthday to the most wonderful person!<br>
  `;
});
greetingCardPage.addEventListener('click', () => {
  greetingCardPage.style.display = 'none';
});