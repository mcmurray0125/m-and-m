function getImagePositions(images) {
  let containerCenter = { x: 0, y: 0, top: 0 };
  let masterCenter = { x: 0, y: 0 };
  let imagePositions = [];
  let largestImageHeight = 0;
  let stackedViewCenter;

  function updateCenterAndPositions() {
    if (images.length > 0) {

      // 1st Image Position
      const masterImage = images[0];
      const masterRect = masterImage.getBoundingClientRect();
      const masterCenterX = (masterRect.left + masterRect.width / 2 + window.scrollX).toFixed(2);
      const masterCenterY = (masterRect.top + masterRect.height / 2 + window.scrollY).toFixed(2);
      masterCenter = { x: masterCenterX, y: masterCenterY };
      console.log('1st Image', masterCenter);
      
      // Container Position
      const container = masterImage.parentElement;
      const containerRect = container.getBoundingClientRect();
      const containerCenterX = (containerRect.left + containerRect.width / 2 + window.scrollX).toFixed(2);
      const containerCenterY = (containerRect.top + containerRect.height / 2 + window.scrollY).toFixed(2);
      containerCenter = { x: containerCenterX, y: containerCenterY, top: containerRect.top };
      

      // Other Images' positions
      imagePositions = images.map((image, index) => {
        const rect = image.getBoundingClientRect();
        const centerX = (rect.left + rect.width / 2 + window.scrollX).toFixed(2);
        const centerY = (rect.top + rect.height / 2 + window.scrollY).toFixed(2);

        if (rect.height > largestImageHeight) {
          largestImageHeight = rect.height;
          stackedViewCenter = containerCenter.top + (0.5 * largestImageHeight);
          console.log('stacked Center', stackedViewCenter);
        }

        console.log(`IMAGE ${index+2}`, {x: centerX, y: centerY});

        image.setAttribute('center-x', centerX);
        image.setAttribute('center-y', centerY);
        return { x: centerX, y: centerY };
      });

      console.log('container', containerCenter);

    }
  }

  function translateImages() {
    images.forEach((image, index) => {
      image.style.transform = `translate(${(image.getAttribute('center-x') - containerCenter.x) * -1 }px, ${(image.getAttribute('center-y') - stackedViewCenter) * -1}px)`
      image.style.rotate = `${Math.floor(Math.random() * (2.5 - -2.5 + 1)) - 2.5}deg`;
    });
  }

  function render() {
    updateCenterAndPositions();
    translateImages();
  }

  if (images.length) {
    render()
    document.querySelector('.photostack').classList.add('fade-in');

    // window.addEventListener('resize', () => {
    //     render();
    // });

    // return () => {
    //   window.removeEventListener('resize', render);
    // };
  }

  return { masterCenter, imagePositions };
}

export default getImagePositions;
