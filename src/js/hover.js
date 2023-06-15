import throttle from 'lodash.throttle';

export function cardHover() {
  const soundEl = document.querySelector('.sound');
  soundEl.volume = 0.6;
  const hoverTimeoutMap = new Map();

  document.addEventListener(
    'mousemove',
    throttle(event => {
      const cardEls = document.querySelectorAll('.photo-card');
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      let isHovering = false;

      cardEls.forEach(cardEl => {
        const elementRect = cardEl.getBoundingClientRect();
        const elementX = elementRect.left;
        const elementY = elementRect.top;
        const elementWidth = elementRect.width;
        const elementHeight = elementRect.height;

        if (
          mouseX >= elementX &&
          mouseX <= elementX + elementWidth &&
          mouseY >= elementY &&
          mouseY <= elementY + elementHeight
        ) {
          isHovering = true;
          if (!cardEl.classList.contains('hovered')) {
            setTimeout(() => {
              cardEl.classList.add('hovered');
            }, 100);
            if (!hoverTimeoutMap.has(cardEl)) {
              const hoverTimeoutId = setTimeout(() => {
                soundEl.play();
              }, 500);
              hoverTimeoutMap.set(cardEl, hoverTimeoutId);
            }
          }
        } else {
          cardEl.classList.remove('hovered');
          if (hoverTimeoutMap.has(cardEl)) {
            const hoverTimeoutId = hoverTimeoutMap.get(cardEl);
            clearTimeout(hoverTimeoutId);
            hoverTimeoutMap.delete(cardEl);
            soundEl.pause();
            soundEl.currentTime = 0;
          }
        }
      });
    }, 200)
  );
}
