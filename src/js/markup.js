import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { cardHover } from './hover';

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

  new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  }).refresh();

  cardHover();
}
