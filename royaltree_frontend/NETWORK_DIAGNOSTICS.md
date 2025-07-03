# Royaltree Frontend/Backend Connectivity Diagnostics

## 1. `.env` and API URL Verification

- `.env` contains:  
  `REACT_APP_BACKEND_BASE_URL=https://vscode-internal-8323-beta.beta01.cloud.kavia.ai:3001` ✔️
- Frontend preview URL protocol: **HTTPS**
- API URL protocol: **HTTPS** (**NO HTTP for backend API when frontend is on HTTPS!**)

## 2. cURL tests from host

#### Backend health:
```sh
curl -v https://vscode-internal-8323-beta.beta01.cloud.kavia.ai:3001/health/db
```
_Result (copy-pasted output)_:
<copy output here; expect HTTP 200 and {"status": "healthy"}>

#### Registration endpoint (POST as JSON):
```sh
curl -v -X POST https://vscode-internal-8323-beta.beta01.cloud.kavia.ai:3001/auth/register \
-H "Content-Type: application/json" \
-d '{"username":"testcurl","email":"test@curl.io","role":"creator","password":"curltest123"}'
```
_Result (copy-pasted output, include HTTP status, error, and full headers)_:
<copy output here>

## 3. cURL tests from frontend container/environment (if applicable)

- (If running inside Docker or VSCode cloud shell, repeat the exact curl commands above.)
- _If curl fails with SSL, connection refused, timeout, or 502—note exactly which._

## 4. Browser Network/Console Error Details

- Open DevTools (F12) → Network tab.
- Attempt registration or login.  
- Click failed request (`/auth/register`).  
- Copy exact error (status, headers, message, console output: mixed content, CORS, 502/504, etc.):
```
<copy network/console error here>
```
> Most common issues:
> - Mixed content (HTTPS/HTTP mismatch): Must be fixed via SSL everywhere.
> - CORS (wrong/missing allow-origin): Check backend CORS config.
> - 502/504/bad gateway: Proxy can't reach backend (check NGINX, firewall, or process).
> - Timeout: Backend is not reachable.
> - Connection refused: Wrong port or server not running.

## 5. NGINX/Proxy Configuration Review

- Check NGINX conf (if using): is `proxy_pass` pointing to the backend **with the protocol and port the app is actually running on**?
- If frontend is at https://...:3000 and backend proxy at :3001, proxy_pass should *translate HTTPS :3001 → backend HTTP :8000*, OR you must have SSL on backend as well.
- If you use Docker Compose, check exposed ports and network bridge.

## 6. Backend Logs

- Check Uvicorn/FastAPI logs:
  - Are requests from the proxy received for `/auth/register`?
  - If not: proxy or firewall issue.
  - If yes but error, check error message (invalid payload/CORS/etc.).

## 7. Recommendations

- **Always use HTTPS for frontend and backend when frontend is served on HTTPS (cloud/production).**
- **Never set frontend or backend URL to "localhost" or "127.0.0.1" in production/cloud!**
- **Backend must be healthy and have open firewall/NGINX routes from proxy to backend port.**
- **Check exact error sequence in browser and in curl—from both host and front-env.**
- If you see CORS errors, set backend CORS origins to match the HTTPS frontend origin (e.g., `https://vscode-internal-8323-beta.beta01.cloud.kavia.ai:3000`).

---

_Fill in every result above to diagnose the true cause of persistent 'Failed to fetch'—most likely causes:_
  - Protocol mismatch (HTTPS/HTTP, blocked by browser)
  - NGINX proxy not forwarding correctly (or configured to wrong backend port)
  - Firewall blocks between proxy/nginx and backend
  - CORS allow_origins misconfigured (especially when credentials or cookies are used)
  - Backend not listening on the right port/interface, or not running

---
