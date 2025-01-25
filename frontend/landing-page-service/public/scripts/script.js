const video = document.getElementById('promo-video');
const cards = document.querySelectorAll('.card');
const progressFill = document.getElementById('progress-fill');

// Generate or retrieve userId in localStorage
if (!localStorage.getItem('userId')) {
  localStorage.setItem('userId', 'user_' + Date.now());
}
const userId = localStorage.getItem('userId');

// Update active cards + progress fill
video.addEventListener('timeupdate', () => {
  const currentTime = video.currentTime;
  const duration = video.duration;

  cards.forEach((card) => {
    const timestamp = parseInt(card.dataset.timestamp, 10);
    if (currentTime >= timestamp) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });

  if (!isNaN(duration) && duration > 0) {
    const fraction = currentTime / duration;
    progressFill.style.height = (fraction * 100) + '%';
  }
});

// Clicking a card jumps to that timestamp
cards.forEach((card) => {
  card.addEventListener('click', () => {
    const timestamp = parseInt(card.dataset.timestamp, 10);
    video.currentTime = timestamp;
    video.play();
  });
});

// Log analytics events
async function logEvent(eventType) {
  const event = {
    userId: userId,
    type: eventType,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    pageURL: window.location.href,
  };

  await fetch('http://localhost:4000/log-event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event),
  });
}

document.addEventListener('DOMContentLoaded', () => logEvent('Page View'));
video.addEventListener('ended', () => logEvent('Full Video Watch'));
