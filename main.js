// Display a quick loading message while waiting for the network response
document.querySelector("#app").innerHTML = "<h1>Loading the Stars via Vite...</h1>";

// This tells Vite to securely grab the key out of your hidden .env file
const API_KEY = import.meta.env.VITE_NASA_API_KEY; 

document.querySelector("#app").innerHTML = "<p class='loading-pulse'>SYNCING WITH COSMIC STREAM...</p>";

fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
  .then(response => response.json())
  .then(data => {
    document.querySelector("#app").innerHTML = `
      <h1>${data.title}</h1>
      <div class="space-image-frame">
        <img src="${data.url}" alt="NASA APOD">
      </div>
      <p>${data.explanation}</p>
    `;
  })
  .catch(err => {
    document.querySelector("#app").innerHTML = `<h1>System calibration failure.</h1>`;
  });
 

// Sending a request to NASA's server API pipeline
fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Failed to sync with space servers: ${response.status}`);
    }
    return response.json(); // Open up the digital data envelope
  })
  .then(data => {
    // Inject the real-time title, cosmic image, and description into our layout
    document.querySelector("#app").innerHTML = `
      <h1>${data.title}</h1>
      <img src="${data.url}" alt="NASA APOD" style="max-width: 100%; height: auto; border-radius: 8px;">
      <p style="max-width: 700px; line-height: 1.6; font-size: 1.1rem;">${data.explanation}</p>
    `;
  })
  .catch(err => {
    // If the internet disconnects or the API keys fail, catch the error gracefully
    document.querySelector("#app").innerHTML = `<h1>Error alignment failed: ${err.message}</h1>`;
  });