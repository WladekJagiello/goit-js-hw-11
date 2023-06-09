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
    // behavior: 'auto',
    behavior: 'smooth',
  });
}

export function galleryScrollAll(direction) {
  if (direction === 'up') {
    window.scrollTo({
      top: 0,
      // behavior: 'instant',
      behavior: 'smooth',
    });
  } else {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      // behavior: 'instant',
      behavior: 'smooth',
    });
  }
}
