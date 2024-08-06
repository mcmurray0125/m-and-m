function getImagePositions(images) {
  let masterCenter = { x: 0, y: 0 };
  let imagePositions = [];

  function updateCenterAndPositions() {
    if (images.length > 0) {
      // Get position of 1st image
      const masterImage = images[0];
      const masterRect = masterImage.getBoundingClientRect();
      const masterCenterX = masterRect.left + masterRect.width / 2 + window.scrollX;
      const masterCenterY = masterRect.top + masterRect.height / 2 + window.scrollY;
      masterCenter = { x: masterCenterX, y: masterCenterY };

      // Get positions of all other images
      imagePositions = images.slice(1).map((image, index) => {
        const rect = image.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2 + window.scrollX;
        const centerY = rect.top + rect.height / 2 + window.scrollY;
        console.log(`IMAGE ${index}`, `x ${centerX}`, `y ${centerY}`);
        image.setAttribute('center-x', centerX);
        image.setAttribute('center-y', centerY);
        return { x: centerX, y: centerY };
      });

      console.log('MASTER', masterCenter);
    }
  }

  function translateImages() {
    images.slice(1).forEach((image, index) => {
      image.style.transform = `translate(-${image.getAttribute('center-x') - masterCenter.x}px, -${image.getAttribute('center-y') - masterCenter.y}px)`
      image.style.rotate = `${Math.floor(Math.random() * (6 - -6 + 1)) - 6}deg`;
    });
  }

  function render() {
    updateCenterAndPositions();
    translateImages();
  }

  if (images.length) {
    render()

    window.addEventListener('resize', () => {
        render();
    });

    return () => {
      window.removeEventListener('resize', render);
    };
  }

  return { masterCenter, imagePositions };
}

export default getImagePositions;
