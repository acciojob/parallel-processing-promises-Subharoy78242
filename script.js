// Your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to download an image and return a promise
function downloadImage(image) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = image.url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image's URL: ${image.url}`));
  });
}

// Function to handle the button click event
btn.addEventListener('click', () => {
  const imagePromises = images.map(downloadImage);

  Promise.all(imagePromises)
    .then((downloadedImages) => {
      // Clear the output div before adding images
      output.innerHTML = '';

      // Append all downloaded images to the output div
      downloadedImages.forEach((img) => {
        output.appendChild(img);
      });
    })
    .catch((error) => {
      // Handle any errors that occurred during image download
      console.error(error);
      output.innerHTML = `<p style="color: red;">${error.message}</p>`;
    });
});