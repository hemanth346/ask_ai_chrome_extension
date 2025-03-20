# Ask Gemini Chrome Extension

A Chrome extension that allows users to select text on any webpage and ask questions about it using Google's Gemini AI API.

## Features

- Select text on any webpage and ask questions about it
- Clean and responsive popup interface
- Secure API key management
- Loading animations and error handling
- Mobile-friendly design

## Installation

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory

## Setup

1. Get your Gemini API key:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create or select a project
   - Generate an API key

2. Configure the extension:
   - Click the extension icon in Chrome
   - Go to extension options (or right-click the icon and select "Options")
   - Enter your Gemini API key and save

## Usage

1. Select any text on a webpage
2. Right-click and select "Ask Gemini about [selected text]"
3. In the popup:
   - Review the selected text
   - Enter your question
   - Click "Ask Gemini"
4. Wait for the AI-generated response

## Security

- API keys are stored securely using Chrome's storage sync API
- All communication with Gemini API is done via HTTPS
- Minimal permissions required for functionality

## Development

The extension is built using:
- HTML, CSS, and JavaScript
- Chrome Extension Manifest V3
- Google's Gemini API

## File Structure

```
├── manifest.json           # Extension configuration
├── background/
│   └── background.js      # Context menu and message handling
├── popup/
│   ├── popup.html         # Popup interface
│   └── popup.js           # Popup functionality
├── options/
│   ├── options.html       # Options page
│   └── options.js         # Options functionality
├── styles/
│   └── styles.css         # Shared styles
└── icons/                 # Extension icons
```

## Contributing

Feel free to submit issues and pull requests.

## License

MIT License - feel free to use this code in your own projects. 
