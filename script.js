// ══════════════════════════════════════════════════
//  AUTOPLAY MUSIC — plays on first interaction
// ══════════════════════════════════════════════════
(function() {
  const audio = document.getElementById('bgMusic');
  const toggleBtn = document.getElementById('musicToggle');
  let hasStarted = false;

  // Set volume
  audio.volume = 0.4;

  // Try autoplay immediately
  function tryAutoplay() {
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        hasStarted = true;
        toggleBtn.classList.remove('muted');
      }).catch(() => {
        // Autoplay blocked — wait for first user interaction
        toggleBtn.classList.add('muted');
        document.addEventListener('click', startOnInteraction, { once: true });
        document.addEventListener('touchstart', startOnInteraction, { once: true });
        document.addEventListener('scroll', startOnInteraction, { once: true });
        document.addEventListener('keydown', startOnInteraction, { once: true });
      });
    }
  }

  function startOnInteraction(e) {
    // Don't start if it was the mute button being clicked
    if (e && e.target && e.target.closest('#musicToggle')) return;
    if (!hasStarted) {
      audio.play().then(() => {
        hasStarted = true;
        toggleBtn.classList.remove('muted');
      }).catch(() => {});
    }
    // Remove remaining listeners
    document.removeEventListener('click', startOnInteraction);
    document.removeEventListener('touchstart', startOnInteraction);
    document.removeEventListener('scroll', startOnInteraction);
    document.removeEventListener('keydown', startOnInteraction);
  }

  // Toggle button
  toggleBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    if (audio.paused) {
      audio.play().then(() => {
        hasStarted = true;
        toggleBtn.classList.remove('muted');
      }).catch(() => {});
    } else {
      audio.pause();
      toggleBtn.classList.add('muted');
    }
  });

  // Attempt autoplay on page load
  if (document.readyState === 'complete') {
    tryAutoplay();
  } else {
    window.addEventListener('load', tryAutoplay);
  }
})();

// ══════════════════════════════════════════════════
//  SCROLL REVEAL — About image + section elements
// ══════════════════════════════════════════════════
(function() {
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  // Observe the about image
  const aboutImg = document.getElementById('aboutImgWrap');
  if (aboutImg) observer.observe(aboutImg);

  // Observe scroll-reveal elements
  document.querySelectorAll('.scroll-reveal').forEach(function(el) {
    observer.observe(el);
  });
})();
