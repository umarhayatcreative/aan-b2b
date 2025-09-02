// ===== Config =====
  const INTERVAL = 3000; // 3s auto slide

  // ===== State =====
  let idx = 0;
  let timer = null;

  // ===== Elements =====
  const slides = Array.from(document.querySelectorAll('.hs-slide'));
  const thumbs = Array.from(document.querySelectorAll('.hs-thumb'));
  const caption = document.getElementById('hsCaption');

  function setActive(newIndex) {
    // bounds
    if (newIndex < 0) newIndex = slides.length - 1;
    if (newIndex >= slides.length) newIndex = 0;

    // update slides
    slides.forEach(s => s.classList.remove('is-active'));
    slides[newIndex].classList.add('is-active');

    // update thumbs
    thumbs.forEach(t => t.classList.remove('is-active'));
    thumbs[newIndex].classList.add('is-active');

    // update caption
    const alt = slides[newIndex].querySelector('img').alt || '';
    caption.textContent = alt;

    idx = newIndex;
  }

  function next() { setActive(idx + 1); }
  function prev() { setActive(idx - 1); }

  function startAuto() {
    stopAuto();
    timer = setInterval(next, INTERVAL);
  }
  function stopAuto() {
    if (timer) clearInterval(timer);
    timer = null;
  }
  function resetAuto() {
    stopAuto();
    startAuto();
  }

  // init
  setActive(0);
  startAuto();

  // controls
  document.querySelector('.hs-arrow--next').addEventListener('click', () => { next(); resetAuto(); });
  document.querySelector('.hs-arrow--prev').addEventListener('click', () => { prev(); resetAuto(); });

  // thumbs click
  thumbs.forEach((t, i) => {
    t.addEventListener('click', () => { setActive(i); resetAuto(); });
  });

  // pause on hover (optional)
  const slider = document.getElementById('hsSlider');
  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);