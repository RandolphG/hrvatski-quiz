export class BrowserInfoService {
  constructor() {
    this.popover = document.getElementById("browserInfoPopover");
    this.browserData = document.getElementById("browserData");
    this.data = this.collectBrowserData();
  }

  collectBrowserData() {
    return {
      Browser: navigator.userAgent,
      Platform: navigator.platform,
      Processors: navigator.hardwareConcurrency,
      Language: navigator.language,
      Cookies: navigator.cookieEnabled,
      Vendor: navigator.vendor,
      Online: navigator.onLine ? "Yes" : "No",
    };
  }

  async getLocalIPs() {
    const ipAddresses = [];
    const rtcConnection = new RTCPeerConnection();
    rtcConnection.createDataChannel("");

    return new Promise((resolve) => {
      rtcConnection.onicecandidate = (event) => {
        if (event.candidate) {
          const ipRegex = /([0-9]{1,3}\.){3}[0-9]{1,3}/;
          const ip = event.candidate.candidate.match(ipRegex);
          if (ip && !ipAddresses.includes(ip[0])) {
            ipAddresses.push(ip[0]);
          }
        } else {
          resolve(ipAddresses);
        }
      };

      rtcConnection
        .createOffer()
        .then((offer) => rtcConnection.setLocalDescription(offer));
    });
  }

  displayBrowserInfo() {
    this.browserData.innerHTML = `
      <strong>Platform:</strong> ${this.data.Platform}<br>     
      <strong>Logical Processors:</strong> ${this.data.Processors}<br>
      <strong>Language:</strong> ${this.data.Language}<br>
      <strong>Cookies:</strong> ${this.data.Cookies}<br>
      <strong>Vendor:</strong> ${this.data.Vendor}<br>
      <strong>Online:</strong> ${this.data.Online}
    `;
  }

  async getGeolocation() {
    if (!("geolocation" in navigator)) {
      this.browserData.innerHTML += `
        <br><strong>Location:</strong> Geolocation not supported by this browser
      `;
      return;
    }

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      this.browserData.innerHTML += `
        <br><strong>Location:</strong> Lat: ${latitude.toFixed(2)}, Long: ${longitude.toFixed(2)}
      `;
    } catch (error) {
      this.browserData.innerHTML += `
        <br><strong>Location:</strong> Unable to retrieve location (${error.message})
      `;
    }
  }

  show() {
    this.popover.style.display = "block";
  }
}
