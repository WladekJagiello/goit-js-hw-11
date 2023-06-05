import Notiflix from 'notiflix';
import throttle from 'lodash.throttle';
import { cardHover } from './js/hover';
import { fetchImages } from './js/fetch';
import { createGallery } from './js/markup';
import { galleryScroll } from './js/scroll';

const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const toUpEl = document.querySelector('.to-up');
const toDownEl = document.querySelector('.to-down');
const perPage = 40;
let page = 1;
let q;

formEl.addEventListener('submit', elem => {
  elem.preventDefault();
  q = elem.target.searchQuery.value.trim();
  galleryEl.innerHTML = '';
  if (q === '') {
    return Notiflix.Notify.warning('Треба щось вписати!');
  }
  fetchImages(q, page, perPage)
    .then(({ data }) => {
      if (data.total === 0) {
        Notiflix.Notify.failure('Ой, лишенько! Такого не знайшлося(');
      } else {
        createGallery(data.hits);
        Notiflix.Notify.success(`Знайшлось ${data.total} зображень)`);
      }
    })
    .catch(error => {
      Notiflix.Notify.failure('Ой, лишенько! Щось пішло не так..');
    })
    .finally(() => {
      formEl.reset();
    });
});

document.addEventListener(
  'scroll',
  throttle(() => {
    const toUpEl = document.querySelector('.to-up');
    const toDownEl = document.querySelector('.to-down');
    const documentRect = document.documentElement.getBoundingClientRect();

    if (documentRect.bottom < document.documentElement.clientHeight + 750) {
      page += 1;
      fetchImages(q, page, perPage).then(({ data }) => {
        createGallery(data.hits);
      });
    }
    if (window.pageYOffset < document.documentElement.clientHeight) {
      toUpEl.style.opacity = '0';
      toDownEl.style.opacity = '0';
    }
    if (window.pageYOffset > document.documentElement.clientHeight) {
      toUpEl.style.opacity = '1';
      toDownEl.style.opacity = '1';
    }
  }, 200)
);

cardHover();

toUpEl.addEventListener('click', () => {
  galleryScroll('up');
});

toDownEl.addEventListener('click', () => {
  galleryScroll('down');
});
