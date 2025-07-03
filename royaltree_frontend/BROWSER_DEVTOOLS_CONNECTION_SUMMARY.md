# Royaltree Frontend/Backend Connectivity - Browser DevTools Diagnostics

When troubleshooting persistent "Failed to fetch" or CORS/network issues, always examine the browser's Developer Tools
(Network tab and Console). This document provides a template for copying and summarizing the precise error details for registration
or login attempts.

---

## Step 1: Attempt Registration or Login in the UI

- Go to `/register` or `/login`, attempt to submit the form.

## Step 2: Open Browser DevTools

- Open Chrome/Firefox DevTools (F12 or right-click, Inspect)
- Go to the "Network" tab **before** submitting the form.

## Step 3: Submit the Form and Analyze the Failed Request

1. In the Network tab, find the failed request (likely `/auth/register` or `/auth/login`)
2. Click on the failed request and record the following details:

### Request Details

- **Endpoint:**  
  e.g. `POST /auth/register`
- **Full Request URL:**  
  e.g. `https://vscode-internal-8323-beta.beta01.cloud.kavia.ai:3001/auth/register`
- **Request Headers:**  
  Copy all headers, especially:
    - `Origin`
    - `Content-Type`
    - Authentication/Cookie headers (if present)

### Response Details

- **Status Code:**  
  e.g. `0`, `403`, `502`, etc.
- **Response Headers:**  
  Copy all, especially:
    - `access-control-allow-origin`
    - `access-control-allow-credentials`
    - `vary`
    - `content-type`
- **Body/Response:**  
  Paste the raw response (if any).

### CORS and Preflight

- **If there was a preflight (OPTIONS) request:**  
  - Record status code, preflight request/response headers.
- **Console Error(s):**
  - Copy the **exact** error message seen in the browser console (e.g. CORS, network, mixed content, protocol problem).

---

## Example (fill in after attempting registration):

- **Protocol:**  
  (HTTPS/HTTP)
- **Endpoint:**  
  (e.g. `/auth/register`)
- **Status Code:**  
  (`0` if no HTTP response, else real code)
- **Request Headers:**  
  ```
    Origin: https://vscode-internal-8323-beta.beta01.cloud.kavia.ai:3000
    Content-Type: application/json
    ...
  ```
- **Response Headers:**  
  ```
    access-control-allow-origin: https://vscode-internal-8323-beta.beta01.cloud.kavia.ai:3000
    access-control-allow-credentials: true
    ...
  ```
- **Console Error:**  
  `Access to fetch at 'https://vscode-...:3001/auth/register' from origin 'https://vscode-...:3000' has been blocked by CORS policy: ...`

---

> **Tip:**  
> - Status code `0` usually means the browser (not the server) blocked the request—most likely for CORS or protocol (mixed HTTPS/HTTP) reasons.
> - A response with status 403/400 and CORS error in Console means server CORS config or allowed origins is to blame.
> - If *preflight* (OPTIONS) fails, check both the preflight and actual request's CORS headers.

---

## ADD YOUR RESULTS BELOW (copy after browser test):

```
Endpoint: 
Full URL: 
Protocol: 
Status Code: 
Request Headers: 
Response Headers: 
Body: 
Console Error: 
Preflight (OPTIONS): 
```

---

_Fill out this form and update `NETWORK_DIAGNOSTICS.md` and/or share with the engineering team for rapid debugging of cross-origin and connection issues._
