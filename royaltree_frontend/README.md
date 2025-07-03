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
> REACT_APP_BACKEND_BASE_URL=https://vscode-internal-8323-beta.beta01.cloud.kavia.ai:3001
> ```
> (If running on a cloud/dev platform, you must use the *external* or preview URL exactly as shown above - never "localhost" or "127.0.0.1" for production/previews!)
>
> **Troubleshooting "Failed to fetch":**
>
> 1. API URL must match backend's *external* protocol/host/port as seen by the browser. In the VSCode cloud preview use the provided external endpoint above!
> 2. If using HTTPS backend, always use HTTPS for the frontend and API base.
> 3. Check that both frontend and backend are deployed and accessible from your browser's network (review CORS console/network errors for precise cause).
> 4. When using "credentials: 'include'" in fetch, backend CORS must exactly match the frontend origin.
> 5. If you encounter "Failed to fetch," open browser devtools > Network tab, click the failed request, and inspect the *full* error including headers and status.
> 6. If encountering "blocked by CORS" or "Mixed Content," fix the protocol/host or backend CORS settings.
> 7. For advanced debugging: Run `curl` from within the frontend container/environment to the backend URL to confirm direct connectivity.
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

# Diagnostic Steps for Debugging "Failed to fetch" (Network/API Error)

**When troubleshooting frontend/backend connectivity, follow these steps and fill in results:**

1. **Verify `.env` contents and the value of `REACT_APP_BACKEND_BASE_URL`.**
    - This *must* be set to the full external URL (e.g., `https://vscode-internal-8323-beta.beta01.cloud.kavia.ai:3001`)
2. **Check the browser Network tab and paste the exact error details.**
    - Include status, headers, and network/console errors (especially for CORS or protocol mismatch).
3. **Test backend health with curl, both locally and from within the frontend environment:**
    - Example: `curl -v https://vscode-internal-8323-beta.beta01.cloud.kavia.ai:3001/health/db`
    - Check for successful response and correct SSL certificate handling.
4. **Check which protocol is used—for both frontend and backend.**
    - Never mix HTTPS frontend <-> HTTP backend in production/cloud.
5. **Are you running with credentials (cookies/session) enabled?**
    - If so, CORS "Access-Control-Allow-Origin" must *exactly match* the browser's loaded origin.
6. **Check NGINX/proxy logs (if any) and backend server logs for possible rejections or errors.**
    - Any 4xx or 5xx logs relevant?
7. **If using Docker or cloud preview, run an interactive shell and repeat curls for both external and internal targets.**
8. **Summarize findings for all steps above.**

> Remove this section when the fetch/CORS error is resolved.
