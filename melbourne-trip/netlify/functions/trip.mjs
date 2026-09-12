// Optional cloud sync for the Melbourne itinerary.
// Stores the whole trip state as one JSON blob in one Airtable row.
// The app works fine without this — it just falls back to device storage.
//
// Required environment variables (Netlify > Site configuration > Environment variables):
//   AIRTABLE_TOKEN     Personal access token with data.records:read + data.records:write
//   AIRTABLE_BASE_ID   e.g. appXXXXXXXXXXXXXX
//   AIRTABLE_TABLE     Table name, defaults to "Trip"
//
// Airtable table needs exactly two fields:
//   Key   — Single line text
//   Data  — Long text

const BASE = process.env.AIRTABLE_BASE_ID;
const TOKEN = process.env.AIRTABLE_TOKEN;
const TABLE = process.env.AIRTABLE_TABLE || 'Trip';

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
  });

const api = (path, init = {}) =>
  fetch(`https://api.airtable.com/v0/${BASE}/${encodeURIComponent(TABLE)}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
      ...(init.headers || {})
    }
  });

async function findRow(key) {
  const formula = encodeURIComponent(`{Key}="${key.replace(/"/g, '')}"`);
  const res = await api(`?filterByFormula=${formula}&maxRecords=1`);
  if (!res.ok) throw new Error(`Airtable lookup failed: ${res.status}`);
  const body = await res.json();
  return body.records?.[0] || null;
}

export default async (request) => {
  if (!BASE || !TOKEN) {
    return json(503, { error: 'Airtable is not configured on this site yet.' });
  }

  const url = new URL(request.url);

  if (request.method === 'GET') {
    const key = url.searchParams.get('key') || 'westy';
    try {
      const row = await findRow(key);
      if (!row) return json(200, { key, data: {} });
      let data = {};
      try { data = JSON.parse(row.fields.Data || '{}'); } catch { data = {}; }
      return json(200, { key, data, updated: row.fields.Updated || null });
    } catch (err) {
      return json(502, { error: err.message });
    }
  }

  if (request.method === 'POST') {
    let payload;
    try { payload = await request.json(); }
    catch { return json(400, { error: 'Body must be JSON.' }); }

    const key = payload.key || 'westy';
    const data = JSON.stringify(payload.data ?? {});
    if (data.length > 90000) return json(413, { error: 'Trip data is too large to store.' });

    try {
      const row = await findRow(key);
      const fields = { Key: key, Data: data };

      const res = row
        ? await api(`/${row.id}`, { method: 'PATCH', body: JSON.stringify({ fields }) })
        : await api('', { method: 'POST', body: JSON.stringify({ records: [{ fields }] }) });

      if (!res.ok) {
        const text = await res.text();
        return json(502, { error: `Airtable write failed: ${res.status} ${text}` });
      }
      return json(200, { ok: true, key });
    } catch (err) {
      return json(502, { error: err.message });
    }
  }

  return json(405, { error: 'Use GET to load or POST to save.' });
};

export const config = { path: '/.netlify/functions/trip' };
