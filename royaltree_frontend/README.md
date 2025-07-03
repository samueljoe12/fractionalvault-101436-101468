# Lightweight React Template for KAVIA

This project provides a minimal React template with a clean, modern UI and minimal dependencies.

## Features

- **Lightweight**: No heavy UI frameworks - uses only vanilla CSS and React
- **Modern UI**: Clean, responsive design with KAVIA brand styling
- **Fast**: Minimal dependencies for quick loading times
- **Simple**: Easy to understand and modify

## Getting Started

### Configuration

> **IMPORTANT**: Set your backend API endpoint!
>
> Add a `.env` file at the project root with:
>
> ```
> REACT_APP_BACKEND_BASE_URL=http://localhost:3001
> ```
> Adjust the host, protocol (http or https!), and port if running in a non-localhost environment.
>
> **Troubleshooting "Failed to fetch":**
>
> 1. The API URL (including protocol, host, AND port) MUST match your backend server location and be reachable from your browser. If running locally, both frontend and backend must use compatible hosts (localhost or 127.0.0.1).
> 2. If deployed (cloud/devbox), use the *external* or proxy URL provided by your platform. Do **not** use "localhost" in `.env` for cloud previews!
> 3. You may override by setting `window._API_BASE_URL` in `public/index.html` (insert `<script>window._API_BASE_URL = "..."></script>`).
> 4. Check backend is running and listening on the expected URL and port.
> 5. If you see CORS errors, ensure your backend's CORS settings allow requests from your frontend origin (e.g., http://localhost:3000).
>
> This config makes frontend API calls target your backend.

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Customization

### Colors

The main brand colors are defined as CSS variables in `src/App.css`:

```css
:root {
  --kavia-orange: #E87A41;
  --kavia-dark: #1A1A1A;
  --text-color: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --border-color: rgba(255, 255, 255, 0.1);
}
```

### Components

This template uses pure HTML/CSS components instead of a UI framework. You can find component styles in `src/App.css`. 

Common components include:
- Buttons (`.btn`, `.btn-large`)
- Container (`.container`)
- Navigation (`.navbar`)
- Typography (`.title`, `.subtitle`, `.description`)

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


---

# Diagnostic Results for 'Failed to fetch' (Network/API Error)

> This section is temporarily used to record diagnostic output for debugging API connectivity between frontend and backend as part of the troubleshooting effort.

## Steps to follow & results will be filled here:

- [ ] Checked for `.env` file and its REACT_APP_BACKEND_BASE_URL value.
- [ ] Output of `ls -al` for project root and frontend directory.
- [ ] Output of `curl` (or similar) to target backend health endpoint.
- [ ] Captured common ports process listing.
- [ ] Any error details from browser/dev tools or network logs.
- [ ] Any next steps and findings will be summarized here.

REMOVE THIS SECTION when diagnostics/bridging is no longer needed.

