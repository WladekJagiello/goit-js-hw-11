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
                    <p class="info-item"><b>Likes: </b> ${image.likes}</p>
                    <p class="info-item"><b>Views: </b> ${image.views}</p>
                    <p class="info-item"><b>Comments: </b> ${image.comments}</p>
                    <p class="info-item"><b>Downloads: </b> ${image.downloads}</p>
                  </div>
                </a>
                
              </div>`;
    })
    .join('');

  galleryEl.innerHTML += card;

  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  }).refresh();

  lightbox.on('show.simplelightbox', () => {
    const soundEl = document.querySelector('.sound');
    setTimeout(() => {
      soundEl.volume = 0;
    }, 1000);
  });

  lightbox.on('close.simplelightbox', () => {
    const soundEl = document.querySelector('.sound');
    soundEl.volume = 0.6;
  });

  cardHover();
}
