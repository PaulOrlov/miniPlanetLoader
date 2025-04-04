<template>
  <div class="container">
    <h1>MiniPlanet (LoLin Board) Firmware Uploader</h1>

    <div class="firmware-info">
      <h2>Firmware Information</h2>
      <p>Pre-loaded firmware: <strong>miniplanet.ino.bin</strong></p>
      <p>Last updated: {{ currentDate }}</p>
      <p>Version: 1.0.0</p>
    </div>

    <div class="board-connection">
      <h2>Connect your MiniPlanet device</h2>
      <p>Connect your MiniPlanet device to your computer using a USB cable.</p>
      <esp-web-install-button v-if="manifestUrl" :manifest="manifestUrl">
        <button slot="activate">
          Upload Firmware
        </button>
        <span slot="unsupported">
          Your browser does not support Web Serial. Please use Chrome or Edge instead.
        </span>
        <span slot="not-allowed">
          This page must be loaded over HTTPS or from localhost to access Web Serial functionality.
        </span>
      </esp-web-install-button>
    </div>

    <div class="instructions">
      <h2>Instructions</h2>
      <ol>
        <li>Connect your MiniPlanet device to your computer via USB</li>
        <li>Click "Upload Firmware" and grant serial port access when prompted</li>
        <li>Wait for the upload to complete</li>
      </ol>
      <p><strong>Note:</strong> This tool requires Chrome or Edge browser on desktop.</p>
    </div>

    <footer>
      <p>Created by: {{ currentUser }} | Last updated: {{ currentDate }}</p>
    </footer>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'App',
  setup() {
    const manifestUrl = ref(null);
    const currentUser = "Dr Pavel A. Orlov";
    const currentDate = "2025-04-04 13:40:26";

    onMounted(async () => {
      // Import ESP Web Tools component
      await import('esp-web-tools/dist/install-button');

      // Get the base URL of the application
      const baseUrl = window.location.origin;
      const firmwarePath = `${baseUrl}/miniPlanetLoader/firmware/miniplanet.ino.bin`;

      console.log("Firmware URL:", firmwarePath);

      // Create a manifest with absolute URL
      const manifest = {
        name: "LoLin Board Firmware",
        version: "1.0.0",
        builds: [
          {
            chipFamily: "ESP32", // Change to match your LoLin board chip type
            parts: [
              { path: firmwarePath, offset: 0 }
            ]
          },
          {
            chipFamily: "ESP8266", // Include as fallback if needed
            parts: [
              { path: firmwarePath, offset: 0 }
            ]
          }
        ]
      };

      // Convert the manifest to a blob and create a URL
      const manifestBlob = new Blob([JSON.stringify(manifest)], { type: 'application/json' });
      manifestUrl.value = URL.createObjectURL(manifestBlob);
    });

    return {
      manifestUrl,
      currentUser,
      currentDate
    };
  }
}
</script>

<style>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

h2 {
  color: #555;
  margin-bottom: 15px;
}

.firmware-info,
.board-connection,
.instructions {
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 8px;
  background-color: #f5f5f5;
}

esp-web-install-button {
  display: block;
  margin-top: 20px;
}

button {
  padding: 12px 24px;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #3367d6;
}

ol {
  padding-left: 20px;
}

li {
  margin-bottom: 10px;
}

footer {
  margin-top: 40px;
  text-align: center;
  color: #777;
  font-size: 14px;
}
</style>