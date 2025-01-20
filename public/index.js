// index.js
import { initializeApp } from "./classes/Main.js";

document.addEventListener("DOMContentLoaded", () => {
  initializeApp();
  const popover = document.getElementById("browserInfoPopover");
  const browserData = document.getElementById("browserData");

  // Collect browser data
  const data = {
    Browser: navigator.userAgent,
    Platform: navigator.platform,
    Processors: navigator.hardwareConcurrency,
    Language: navigator.language,
    Cookies: navigator.cookieEnabled,
    Vendor: navigator.vendor,
    Online: navigator.onLine ? "Yes" : "No",
  };

  console.log("Location:", location);
  console.log("Navigator:", navigator);
  console.log("UserAgent:", navigator.userAgentData);

  // Format data as HTML
  browserData.innerHTML = `
    <strong>Platform:</strong> ${data.Platform}<br>     
    <strong>Logical Processors :</strong> ${data.Processors}<br>
    <strong>Language:</strong> ${data.Language}<br>
    <strong>Cookies:</strong> ${data.Cookies}<br>
    <strong>Vendor:</strong> ${data.Vendor}<br>
    <strong>Online:</strong> ${data.Online}
  `;

  // Retrieve location data
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        browserData.innerHTML = `
          <strong>Platform:</strong> ${data.Platform}<br>
          <strong>Logical Processors :</strong> ${data.Processors}<br>
          <strong>Language:</strong> ${data.Language}<br>
          <strong>Cookies:</strong> ${data.Cookies}<br>
          <strong>Vendor:</strong> ${data.Vendor}<br>
          <strong>Online:</strong> ${data.Online}<br>
          <strong>Location:</strong> Lat: ${latitude.toFixed(2)}, Long: ${longitude.toFixed(2)}
        `;
      },
      (error) => {
        browserData.innerHTML += `
          <br><strong>Location:</strong> Unable to retrieve location (${error.message})
        `;
      },
    );
  } else {
    browserData.innerHTML += `
      <br><strong>Location:</strong> Geolocation not supported by this browser
    `;
  }

  // Show the popover
  popover.style.display = "block";
});

// Get browser and system information
const browserInfo = {
  appName: navigator.appName,
  appVersion: navigator.appVersion,
  userAgent: navigator.userAgent,
  platform: navigator.platform,
  language: navigator.language,
};

async function getLocalIPs() {
  const ipAddresses = [];
  const rtcConnection = new RTCPeerConnection();
  rtcConnection.createDataChannel("");

  rtcConnection.onicecandidate = (event) => {
    if (event.candidate) {
      const ipRegex = /([0-9]{1,3}\.){3}[0-9]{1,3}/; // Matches IPv4 addresses
      const ip = event.candidate.candidate.match(ipRegex);
      if (ip && !ipAddresses.includes(ip[0])) {
        ipAddresses.push(ip[0]);
        console.log("IP Address:", ip[0]);
      }
    }
  };

  await rtcConnection
    .createOffer()
    .then((offer) => rtcConnection.setLocalDescription(offer));
}

getLocalIPs();
