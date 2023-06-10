export function galleryScroll(direction) {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();
  let scrollByN = cardHeight * 4 + 40;
  if (direction === 'up') {
    scrollByN = -scrollByN;
  }
  window.scrollBy({
    top: scrollByN,
    behavior: 'smooth',
  });
}

export function galleryScrollAll(direction) {
  const gallery = document.querySelector('.gallery');
  const formEl = document.querySelector('.search-form');
  const beginning = formEl;
  const end = gallery.lastElementChild;

  if (direction === 'up') {
    beginning.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    end.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }
}
