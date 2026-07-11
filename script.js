// ══════════════════════════════════════════════════
//  SPLASH SCREEN — Unlocks audio on deployed sites
// ══════════════════════════════════════════════════
(function() {
  const splash = document.getElementById('splashOverlay');
  const splashBtn = document.getElementById('splashBtn');
  const audio = document.getElementById('bgMusic');
  const toggleBtn = document.getElementById('musicToggle');

  // Set volume
  audio.volume = 0.4;

  function enterSite() {
    // Play music — this works because it's inside a user gesture
    audio.play().then(function() {
      toggleBtn.classList.remove('muted');
    }).catch(function() {
      // Fallback: still enter but mark as muted
      toggleBtn.classList.add('muted');
    });

    // Fade out splash
    splash.classList.add('hidden');

    // Remove from DOM after transition
    setTimeout(function() {
      splash.remove();
    }, 900);
  }

  // Listen on both the button and the whole overlay
  splashBtn.addEventListener('click', enterSite);
  splash.addEventListener('click', enterSite);

  // Also handle touch for mobile
  splashBtn.addEventListener('touchend', function(e) {
    e.preventDefault();
    enterSite();
  });

  // Toggle button for mute/unmute after entering
  toggleBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    if (audio.paused) {
      audio.play().then(function() {
        toggleBtn.classList.remove('muted');
      }).catch(function() {});
    } else {
      audio.pause();
      toggleBtn.classList.add('muted');
    }
  });
})();

// ══════════════════════════════════════════════════
//  SCROLL REVEAL — About image + section elements
// ══════════════════════════════════════════════════
(function() {
  var observer = new IntersectionObserver(function(entries) {
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
  var aboutImg = document.getElementById('aboutImgWrap');
  if (aboutImg) observer.observe(aboutImg);

  // Observe scroll-reveal elements
  document.querySelectorAll('.scroll-reveal').forEach(function(el) {
    observer.observe(el);
  });
})();
