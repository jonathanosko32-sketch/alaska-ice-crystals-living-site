// SKIE CB CH 27 — push-to-talk Realtime session
// SAFE TEST endpoint. The existing api/skie-session.js is intentionally untouched.

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST required' });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error: 'SKIE server is not activated yet. OPENAI_API_KEY is missing on the server.'
    });
  }

  // Push-to-talk must not auto-decide when Osko has finished speaking.
  // The client explicitly commits audio and requests a response on mic release.
  const sessionConfig = {
    session: {
      type: 'realtime',
      model: 'gpt-realtime-2.1',
      instructions:
        "You are SKIE, the voice assistant inside Osko's Alaska Ice Crystals CB radio on Channel 27. " +
        'Speak naturally, clearly, practically, and concisely unless Osko asks for detail. ' +
        'This CB is push-to-talk: wait for the user turn supplied by the radio controls. ' +
        'Help with the Alaska Ice Crystals ecosystem, school, mechanics, trucking, robots, Living Layover, and project planning. ' +
        'Never claim access to private files, devices, accounts, robots, or prior conversations unless that access or context is actually supplied in the current session.',
      audio: {
        input: {
          turn_detection: null
        },
        output: {
          voice: 'marin'
        }
      }
    }
  };

  try {
    const openai = await fetch('https://api.openai.com/v1/realtime/client_secrets', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'OpenAI-Safety-Identifier': 'osko-skie-cb-owner'
      },
      body: JSON.stringify(sessionConfig)
    });

    const body = await openai.text();
    res.status(openai.status);
    res.setHeader('Content-Type', openai.headers.get('content-type') || 'application/json');
    return res.send(body);
  } catch (error) {
    console.error('SKIE PTT realtime token error', error);
    return res.status(500).json({ error: 'Could not create SKIE push-to-talk realtime session.' });
  }
}
