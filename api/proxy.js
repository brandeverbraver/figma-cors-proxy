
export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Image fetch failed' });
    }

    const contentType = response.headers.get('content-type');
    const arrayBuffer = await response.arrayBuffer();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', contentType);
    res.send(Buffer.from(arrayBuffer));
  } catch (error) {
    res.status(500).json({ error: 'Proxy error: ' + error.message });
  }
}
