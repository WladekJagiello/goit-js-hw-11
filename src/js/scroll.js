export function galleryScroll(direction) {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  let scrollByN = cardHeight * 4;
  if (direction === 'up') {
    scrollByN = -scrollByN;
  }

  window.scrollBy({
    top: scrollByN,
    behavior: 'smooth',
  });
}
