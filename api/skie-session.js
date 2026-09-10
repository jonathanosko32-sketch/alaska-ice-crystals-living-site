export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST required' });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(503).json({ error: 'SKIE server is not activated yet.' });

  const sessionConfig = {
    session: {
      type: 'realtime',
      model: 'gpt-realtime-2.1',
      instructions: 'You are SKIE, the voice assistant inside Jonathan Osko\'s Alaska Ice Crystals CB radio on Channel 27. Speak naturally, clearly, practically, and concisely unless Osko asks for detail. Help with the Alaska Ice Crystals ecosystem, school, mechanics, trucking, robots, Layover, and project planning. Never claim access to private files or prior ChatGPT conversations unless that context is actually supplied in the current session.',
      audio: {
        output: { voice: 'marin' }
      }
    }
  };

  try {
    const r = await fetch('https://api.openai.com/v1/realtime/client_secrets', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'OpenAI-Safety-Identifier': 'osko-skie-cb-owner'
      },
      body: JSON.stringify(sessionConfig)
    });

    const text = await r.text();
    res.status(r.status);
    res.setHeader('Content-Type', r.headers.get('content-type') || 'application/json');
    return res.send(text);
  } catch (error) {
    console.error('SKIE realtime token error', error);
    return res.status(500).json({ error: 'Could not create SKIE realtime session.' });
  }
}
