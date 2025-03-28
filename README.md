# Solexys AI Chrome Extension

A Chrome extension that provides AI-powered assistance for users browsing [pump.fun](https://pump.fun) and [raydium.io](https://raydium.io).

## Features

- **Chat Assistant**: Interact with Solexys AI to get help and insights about the platform
- **Statistics Display**: View real-time statistics about platform usage and success rates
- **Targeted Activation**: Only appears on supported sites
- **Modern UI**: Clean, non-intrusive interface that complements the host website

## Installation

### For Development

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/solexys-ai-chrome-extension.git
   cd solexys-ai-chrome-extension
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Build the extension:
   ```
   npm run build
   ```

4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" by toggling the switch in the top right corner
   - Click "Load unpacked" and select the `build` folder from this project

### For Users

Once published to the Chrome Web Store:

1. Visit the [Solexys AI Extension page](https://chrome.google.com/webstore/detail/solexys-ai-extension/YOUR_EXTENSION_ID) in the Chrome Web Store
2. Click "Add to Chrome"
3. Follow the prompts to install the extension

## Development

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the extension for production

## Technical Architecture

This extension is built with:

- React with TypeScript
- TailwindCSS for styling
- React Query for data fetching
- Chrome Extension Manifest V3

The main components are:
- Content Script: Injects the UI into supported websites
- Interactive Bubbles: Main UI elements for user interaction
- Chat API Service: Handles communication with the Solexys AI API

## License

MIT

## Contact

For issues or feature requests, please open an issue on this repository.
