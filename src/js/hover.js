export function cardHover() {
  const audio = document.getElementById('audio');
  audio.volume = 0.3;
  let isAudioPlaying = false;
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
        setTimeout(() => {
          if (!isAudioPlaying) {
            audio.play();
            isAudioPlaying = true;
          }
          cardEl.classList.add('hovered');
        }, 100);
      } else {
        cardEl.classList.remove('hovered');
      }
    });
  });
  document.addEventListener('mouseout', () => {
    isAudioPlaying = false;
  });
}
