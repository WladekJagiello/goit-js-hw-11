import throttle from 'lodash.throttle';

export function cardHover() {
  const soundEl = document.querySelector('.sound');
  soundEl.volume = 0.5;
  const isSoundPlayed = new Map();

  document.addEventListener(
    'mousemove',
    throttle(event => {
      const cardEls = document.querySelectorAll('.photo-card');
      let mouseX = event.clientX;
      let mouseY = event.clientY;

      cardEls.forEach(cardEl => {
        let elementRect = cardEl.getBoundingClientRect();
        let elementX = elementRect.left;
        let elementY = elementRect.top;
        let elementWidth = elementRect.width;
        let elementHeight = elementRect.height;

        if (
          mouseX >= elementX &&
          mouseX <= elementX + elementWidth &&
          mouseY >= elementY &&
          mouseY <= elementY + elementHeight
        ) {
          setTimeout(() => {
            cardEl.classList.add('hovered');
          }, 200);
          if (!isSoundPlayed.has(cardEl)) {
            soundEl.play();
            isSoundPlayed.set(cardEl, true);
          }
        } else {
          if (isSoundPlayed.has(cardEl)) {
            isSoundPlayed.delete(cardEl);
          }
          cardEl.classList.remove('hovered');
        }
      });
    }, 200)
  );
}
