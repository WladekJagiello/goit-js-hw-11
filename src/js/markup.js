import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function createGallery(images) {
  const galleryEl = document.querySelector('.gallery');
  const photoCards = images
    .filter(image => image !== null)
    .map(image => {
      return `<div class="photo-card">
                <a class="gallery-link" href="${image.largeImageURL}">
                  <img class="gallery-img" src="${image.webformatURL}" alt="${image.tags}" loading="lazy"/>  

                  <div class="info">
                    <p class="info-item"><b>Likes: </b> ${image.likes}</p>
                    <p class="info-item"><b>Views: </b> ${image.views}</p>
                    <p class="info-item"><b>Comments: </b> ${image.comments}</p>
                    <p class="info-item"><b>Downloads: </b> ${image.downloads}</p>
                  </div>
                </a>
              </div>`;
    })
    .join('');

  galleryEl.innerHTML += photoCards;

  // const photoCardEls = document.querySelectorAll('.photo-card');

  // photoCardEls.forEach(cardEl => {
  //   const mouseEnterEvent = new Event('mouseenter', {
  //     bubbles: true,
  //     cancelable: true,
  //   });

  //   cardEl.dispatchEvent(mouseEnterEvent);

  //   const mouseLeaveEvent = new Event('mouseleave', {
  //     bubbles: true,
  //     cancelable: true,
  //   });

  //   cardEl.dispatchEvent(mouseLeaveEvent);
  // });

  // hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh

  // const photoCardEls = document.querySelectorAll('.photo-card');

  // photoCardEls.forEach(cardEl => {
  //   cardEl.addEventListener('mouseenter', () => {
  //     cardEl.classList.add('hovered');
  //   });

  //   cardEl.addEventListener('mouseleave', () => {
  //     cardEl.classList.remove('hovered');
  //   });
  // });

  new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  }).refresh();
}
