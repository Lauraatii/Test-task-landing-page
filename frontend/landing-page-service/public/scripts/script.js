const video = document.getElementById('promo-video');
const cards = document.querySelectorAll('.card');

//Automatic activation based on currentTime + manual click jump 
video.addEventListener('timeupdate', () => {
  const currentTime = video.currentTime;

  cards.forEach((card) => {
    const timestamp = parseInt(card.dataset.timestamp, 10);
    if (currentTime >= timestamp) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });
});

cards.forEach((card) => {
  card.addEventListener('click', () => {
    const timestamp = parseInt(card.dataset.timestamp, 10);
    video.currentTime = timestamp;
    video.play();
  });
});

//Analytics
async function logEvent(eventType) {
  const event = {
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
