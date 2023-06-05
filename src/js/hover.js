export function cardHover() {
  document.addEventListener('mousemove', event => {
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
        cardEl.classList.add('hovered');
      } else {
        cardEl.classList.remove('hovered');
      }
    });
  });
}
