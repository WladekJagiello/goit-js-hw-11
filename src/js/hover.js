// import throttle from 'lodash.throttle';

// export function cardHover() {
//   const soundEl = document.querySelector('.sound');
//   soundEl.volume = 0.1;
//   const isSoundPlayed = new Map();
//   let hoverTimeout;

//   document.addEventListener(
//     'mousemove',
//     throttle(event => {
//       const cardEls = document.querySelectorAll('.photo-card');
//       let mouseX = event.clientX;
//       let mouseY = event.clientY;

//       cardEls.forEach(cardEl => {
//         let elementRect = cardEl.getBoundingClientRect();
//         let elementX = elementRect.left;
//         let elementY = elementRect.top;
//         let elementWidth = elementRect.width;
//         let elementHeight = elementRect.height;

//         if (
//           mouseX >= elementX &&
//           mouseX <= elementX + elementWidth &&
//           mouseY >= elementY &&
//           mouseY <= elementY + elementHeight
//         ) {
//           if (!isSoundPlayed.has(cardEl)) {
//             hoverTimeout = setTimeout(() => {
//               cardEl.classList.add('hovered');
//               soundEl.play();
//               isSoundPlayed.set(cardEl, true);
//             }, 750); // Затримка в 500 мілісекунд (пів секунди)
//           }
//         } else {
//           if (isSoundPlayed.has(cardEl)) {
//             clearTimeout(hoverTimeout);
//             isSoundPlayed.delete(cardEl);
//           }
//           cardEl.classList.remove('hovered');
//         }
//       });
//     }, 200)
//   );
// }

import throttle from 'lodash.throttle';

export function cardHover() {
  const soundEl = document.querySelector('.sound');
  soundEl.volume = 0.1;
  let hoverTimeoutId = null;

  document.addEventListener(
    'mousemove',
    throttle(event => {
      const cardEls = document.querySelectorAll('.photo-card');
      let mouseX = event.clientX;
      let mouseY = event.clientY;
      let isHovering = false;

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
          isHovering = true;
          if (!cardEl.classList.contains('hovered')) {
            cardEl.classList.add('hovered');
            hoverTimeoutId = setTimeout(() => {
              soundEl.play();
            }, 500);
          }
        } else {
          cardEl.classList.remove('hovered');
        }
      });

      if (!isHovering && hoverTimeoutId !== null) {
        clearTimeout(hoverTimeoutId);
        hoverTimeoutId = null;
        soundEl.pause();
        soundEl.currentTime = 0;
      }
    }, 200)
  );
}
