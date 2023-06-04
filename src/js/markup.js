import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function createGallery(images) {
  const galleryEl = document.querySelector('.gallery');
  const card = images
    .filter(image => image !== null)
    .map(image => {
      return `<div class="photo-card">
                <a class="gallery-link" href="${image.largeImageURL}">
                  <img class="gallery-img" src="${image.webformatURL}" alt="${image.tags}" loading="lazy"/>  

                  <div class="info">
                    <p class="info-item"><b>Лайки: </b> ${image.likes}</p>
                    <p class="info-item"><b>Перегляди: </b> ${image.views}</p>
                    <p class="info-item"><b>Коментарі: </b> ${image.comments}</p>
                    <p class="info-item"><b>Завантаження: </b> ${image.downloads}</p>
                  </div>
                </a>
              </div>`;
    })
    .join('');

  galleryEl.innerHTML += card;

  document.addEventListener('mousemove', function (event) {
    const cardEls = document.querySelectorAll('.photo-card');
    var mouseX = event.clientX;
    var mouseY = event.clientY;

    cardEls.forEach(cardEl => {
      var elementRect = cardEl.getBoundingClientRect();
      var elementX = elementRect.left;
      var elementY = elementRect.top;
      var elementWidth = elementRect.width;
      var elementHeight = elementRect.height;

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

  new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  }).refresh();
}