(function () {
  var els = document.querySelectorAll('[data-vid]');
  if (!els.length) return;
  var conn = navigator.connection || {};
  // Respeta 'reducir movimiento' y el ahorro de datos: queda solo la imagen de póster.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || conn.saveData) return;
  var small = window.matchMedia('(max-width: 700px)').matches;
  var noop = function () {};
  Array.prototype.forEach.call(els, function (el) {
    var v = document.createElement('video');
    v.className = 'vbg-video';
    v.muted = true; v.loop = true; v.playsInline = true; v.preload = 'none'; v.tabIndex = -1;
    v.setAttribute('playsinline', ''); v.setAttribute('aria-hidden', 'true');
    v.src = 'video/' + el.getAttribute('data-vid') + (small ? '-480' : '-720') + '.mp4';
    v.addEventListener('playing', function () { v.classList.add('on'); });
    el.insertBefore(v, el.firstChild);

    // Arranque directo si ya está a la vista; el observador lo pausa/reanuda al hacer scroll.
    if (el.getBoundingClientRect().top < window.innerHeight) v.play().catch(noop);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) v.play().catch(noop); else v.pause();
        });
      }).observe(el);
    } else { v.play().catch(noop); }
  });
})();
