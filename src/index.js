import Notiflix from 'notiflix';
import throttle from 'lodash.throttle';
import { fetchImages } from './js/fetch';
import { createGallery } from './js/markup';
import { galleryScroll, galleryScrollAll } from './js/scroll';

const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const toUpEl = document.querySelector('.to-up');
const toDownEl = document.querySelector('.to-down');
const toBeginningEl = document.querySelector('.to-beginning');
const toEndEl = document.querySelector('.to-end');
let submittingForm;
const perPage = 40;
let totalHits = 0;
let page;
let q;

formEl.addEventListener('submit', elem => {
  elem.preventDefault();
  submittingForm = true;
  q = elem.target.searchQuery.value.trim();
  galleryEl.innerHTML = '';
  page = 1;
  if (q === '') {
    toUpEl.style.opacity = '0';
    toDownEl.style.opacity = '0';
    toEndEl.style.opacity = '0';
    toBeginningEl.style.opacity = '0';
    return Notiflix.Notify.warning('Треба щось вписати!');
  }
  fetchImages(q, page, perPage)
    .then(({ data }) => {
      if (data.total === 0) {
        toUpEl.style.opacity = '0';
        toDownEl.style.opacity = '0';
        toEndEl.style.opacity = '0';
        toBeginningEl.style.opacity = '0';
        Notiflix.Notify.failure('Ой, лишенько! Такого не знайшлося(');
      } else {
        createGallery(data.hits);
        Notiflix.Notify.success(`Знайшлось ${data.total} зображень)`);
        totalHits = data.totalHits;
        toUpEl.style.opacity = '1';
        toDownEl.style.opacity = '1';
        toEndEl.style.opacity = '1';
        toBeginningEl.style.opacity = '1';
        const lastCardEl = document.querySelector('.photo-card:last-child');
        if (lastCardEl) {
          scrollObserver.observe(lastCardEl);
        }
      }
    })
    .catch(() => {
      Notiflix.Notify.failure('Ой, лишенько! Щось пішло не так..');
    })
    .finally(() => {
      formEl.reset();
      submittingForm = false;
    });
});

const scrollObserver = new IntersectionObserver(([entry], observer) => {
  if (entry.isIntersecting && galleryEl.childElementCount < totalHits) {
    observer.unobserve(entry.target);
    page += 1;
    fetchImages(q, page, perPage)
      .then(({ data }) => {
        createGallery(data.hits);
        const lastCardEl = document.querySelector('.photo-card:last-child');
        if (lastCardEl) {
          scrollObserver.observe(lastCardEl);
        }
      })
      .catch(() => {
        Notiflix.Notify.failure('Ой, лишенько! Щось пішло не так..');
      });
  }
});

window.addEventListener(
  'scroll',
  throttle(() => {
    if (!submittingForm) {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (
        scrollTop + clientHeight >= scrollHeight &&
        galleryEl.childElementCount >= totalHits
      ) {
        Notiflix.Notify.warning('Ой, лишенько! Це кінець..');
      }
    }
  }, 200)
);

toUpEl.addEventListener('click', () => {
  galleryScroll('up');
});

toDownEl.addEventListener('click', () => {
  galleryScroll('down');
});

toBeginningEl.addEventListener('click', () => {
  galleryScrollAll('up');
});

toEndEl.addEventListener('click', () => {
  galleryScrollAll('down');
});
