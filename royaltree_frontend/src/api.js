//
// Royaltree frontend API helpers for REST endpoints
//
const API_BASE = ""; // Set to your API host root or leave '' for same-origin proxy

// PUBLIC_INTERFACE
export async function apiGet(path, params = {}, token = null) {
  let url = API_BASE + path;
  let query = [];
  for (const k in params) {
    if (params[k] !== undefined && params[k] !== null) query.push(`${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`);
  }
  if (token) query.push(`token=${encodeURIComponent(token)}`);
  if (query.length > 0) url += (url.includes("?") ? "&" : "?") + query.join("&");
  const resp = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
    credentials: "include"
  });
  if (!resp.ok) throw new Error((await resp.text())||resp.statusText);
  return await resp.json();
}

// PUBLIC_INTERFACE
export async function apiPost(path, data = {}, token = null, isForm = true) {
  let url = API_BASE + path;
  if (token) url += (url.includes("?") ? "&" : "?") + `token=${encodeURIComponent(token)}`;
  let body, headers = {};
  if (isForm) {
    body = new FormData();
    for (const k in data) if (data[k] !== undefined) body.append(k, data[k]);
  } else {
    body = JSON.stringify(data);
    headers["Content-Type"] = "application/json";
  }
  const resp = await fetch(url, {
    method: "POST",
    body,
    headers,
    credentials: "include"
  });
  if (!resp.ok) throw new Error((await resp.text())||resp.statusText);
  try {
    return await resp.json();
  } catch (e) {
    return {};
  }
}

// Helper for file upload (creator asset upload)
export async function apiPostFile(path, fields = {}, fileField, file, token = null) {
  let url = API_BASE + path;
  if (token) url += (url.includes("?") ? "&" : "?") + `token=${encodeURIComponent(token)}`;
  let body = new FormData();
  for (const k in fields) if (fields[k] !== undefined) body.append(k, fields[k]);
  if (file) body.append(fileField, file);
  const resp = await fetch(url, {
    method: "POST",
    body,
    credentials: "include"
  });
  if (!resp.ok) throw new Error((await resp.text())||resp.statusText);
  return await resp.json();
}
