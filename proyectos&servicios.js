document.addEventListener("DOMContentLoaded", function () {
  // ─── Animación de entrada ─────────────────────────────
  requestAnimationFrame(() => {
    document.body.classList.add('loaded');
  });

  // ─── Configuración de transiciones ────────────────────
  const TRANSITION_CONFIG = {
    duration: 300, // Duración de la animación en milisegundos
    easing: 'ease-in-out',
    yOffset: '-15px',
    properties: 'opacity, transform',
  };

  // ─── Función para alternar contenido ──────────────────
  const toggleContent = (button, content) => {
    const isVisible = content.classList.contains('visible');
    if (isVisible) {
      content.style.maxHeight = null; // Oculta el contenido
      content.classList.remove('visible');
      button.textContent = button.textContent.replace('▲', '▼'); // Cambia el ícono
    } else {
      content.style.maxHeight = content.scrollHeight + 'px'; // Muestra el contenido
      content.classList.add('visible');
      button.textContent = button.textContent.replace('▼', '▲'); // Cambia el ícono
    }
  };

  // ─── Inicialización de botones de contenido ───────────
  const toggleButtons = document.querySelectorAll('.toggle-button');
  toggleButtons.forEach((button) => {
    const content = button.nextElementSibling; // El contenido asociado está justo después del botón
    if (content && content.classList.contains('toggle-content')) {
      button.addEventListener('click', () => toggleContent(button, content));
    }
  });

  // ─── Función para manejar clics en las categorías ─────
  const handleCategoryClick = (category) => {
    const categoryCards = document.querySelectorAll(`.project-card[data-categoria="${category}"]`);
    const allCards = document.querySelectorAll('.project-card');

    // Ocultar todas las tarjetas
    allCards.forEach((card) => {
      card.classList.remove('visible');
    });

    // Mostrar solo las tarjetas de la categoría seleccionada
    categoryCards.forEach((card) => {
      card.classList.add('visible');
    });
  };

  // ─── Inicialización de artículos de categorías ────────
  const categoryCards = document.querySelectorAll('.certificate-card');
  categoryCards.forEach((card) => {
    card.addEventListener('click', () => {
      const category = card.dataset.categoria;
      handleCategoryClick(category);
    });
  });

  // ─── Animación de salida en enlaces internos ───────────
  document.querySelectorAll('a[href]:not([target="_blank"])').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      document.body.classList.add('fade-out');
      setTimeout(() => {
        window.location.href = href;
      }, TRANSITION_CONFIG.duration);
    });
  });

  // ─── Polyfill para requestAnimationFrame ───────────────
  (function () {
    const vendors = ['ms', 'moz', 'webkit', 'o'];
    for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
      window.cancelAnimationFrame =
        window[vendors[x] + 'CancelAnimationFrame'] ||
        window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function (callback) {
        const currTime = new Date().getTime();
        const timeToCall = Math.max(0, 16 - (currTime - lastTime));
        const id = window.setTimeout(function () {
          callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }

    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function (id) {
        clearTimeout(id);
      };
    }
  })();
});