const fetch = require('node-fetch');

module.exports = async function (context, req) {
  const userMessage = req.body?.message;
  
  if (!userMessage) {
    context.res = {
      status: 400,
      body: { error: 'Message is required' }
    };
    return;
  }

  const openaiKey = process.env.OPENAI_API_KEY;
  if (!openaiKey) {
    context.res = {
      status: 500,
      body: { error: 'OpenAI API key not configured' }
    };
    return;
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'Je bent een opvoedkundige assistent die ouders helpt met opvoedvragen.' },
          { role: 'user', content: userMessage }
        ]
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      context.res = {
        status: response.status,
        body: { error: data.error?.message || 'OpenAI API error' }
      };
      return;
    }

    context.res = {
      status: 200,
      body: {
        message: data.choices[0].message.content
      }
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: { error: error.message }
    };
  }
};
