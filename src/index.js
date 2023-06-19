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
let observing;
const perPage = 40;
let totalHits;
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
    return Notiflix.Notify.warning('Please write what you want to find.');
  }
  fetchImages(q, page, perPage)
    .then(({ data }) => {
      if (data.total === 0) {
        toUpEl.style.opacity = '0';
        toDownEl.style.opacity = '0';
        toEndEl.style.opacity = '0';
        toBeginningEl.style.opacity = '0';
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        createGallery(data.hits);
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        totalHits = data.totalHits;
        if (galleryEl.scrollHeight >= window.innerHeight) {
          toUpEl.style.opacity = '1';
          toDownEl.style.opacity = '1';
          toEndEl.style.opacity = '1';
          toBeginningEl.style.opacity = '1';
        }
      }
    })
    .catch(() => {
      Notiflix.Notify.failure(
        'Unfortunately, an error occurred. Please try again.'
      );
    })
    .finally(() => {
      formEl.reset();
      submittingForm = false;
    });
});

const scrollObserver = new IntersectionObserver(
  ([entry], observer) => {
    if (entry.isIntersecting && galleryEl.childElementCount < totalHits) {
      observer.unobserve(entry.target);
      observing = true;
      page += 1;
      fetchImages(q, page, perPage)
        .then(({ data }) => {
          createGallery(data.hits);
        })
        .catch(() => {
          Notiflix.Notify.failure(
            'Unfortunately, an error occurred. Please try again.'
          );
        })
        .finally(() => {
          observing = false;
        });
    }
  },
  {
    root: null,
    rootMargin: '600px',
    threshold: 0.5,
  }
);

window.addEventListener(
  'scroll',
  throttle(() => {
    const lastCardEl = document.querySelector('.photo-card:last-child');
    if (!observing && lastCardEl) {
      scrollObserver.observe(lastCardEl);
    }
    if (!submittingForm) {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (
        scrollTop + clientHeight >= scrollHeight &&
        galleryEl.childElementCount >= totalHits &&
        galleryEl.scrollHeight > window.innerHeight &&
        galleryEl.innerHTML !== ''
      ) {
        Notiflix.Notify.warning(
          'We`re sorry, but you`ve reached the end of search results.'
        );
      }
    }
  }, 250)
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
