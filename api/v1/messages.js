// Vercel Serverless Function: Anthropic API Proxy
// Path: /api/v1/messages.js
// Handles: POST /v1/messages

export default async function handler(req, res) {
  // CORS headers - allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, anthropic-version, x-api-key');
  
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only accept POST requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Extract API key from request headers
    const apiKey = req.headers['x-api-key'];
    
    if (!apiKey) {
      res.status(401).json({ error: 'Missing API key in x-api-key header' });
      return;
    }

    if (!apiKey.startsWith('sk-ant-')) {
      res.status(401).json({ error: 'Invalid API key format' });
      return;
    }

    // Get the request body
    const body = req.body;

    // Forward request to Anthropic API
    const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'anthropic-version': req.headers['anthropic-version'] || '2023-06-01',
        'x-api-key': apiKey
      },
      body: JSON.stringify(body)
    });

    // Get response data
    const data = await anthropicResponse.json();

    // Return Anthropic's response with appropriate status
    res.status(anthropicResponse.status).json(data);

  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      error: 'Proxy error', 
      message: error.message 
    });
  }
}
