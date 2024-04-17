chrome.storage.local.get(null, (data) => {
  const images = Object.keys(data).filter(key => key.startsWith("capturedImage_")).sort();
  let currentIndex = 0;

  function updateImage() {
      const image = document.getElementById("capturedImage");
      if (images.length > 0) {
          const currentImage = images[currentIndex];
          image.src = data[currentImage];
      } else {
          image.src = "";
      }
  }

  updateImage();

  document.getElementById("prevButton").addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateImage();
  });

  document.getElementById("nextButton").addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateImage();
  });
});
