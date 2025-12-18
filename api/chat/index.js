const OpenAI = require('openai');

module.exports = async function (context, req) {
  const userMessage = req.body?.message;
  const threadId = req.body?.threadId;

  if (!userMessage) {
    context.res = {
      status: 400,
      body: { error: 'Message is required' }
    };
    return;
  }

  const openaiKey = process.env.OPENAI_API_KEY;
  const assistantId = process.env.OPENAI_ASSISTANT_ID;

  if (!openaiKey) {
    context.res = {
      status: 500,
      body: { error: 'OpenAI API key not configured' }
    };
    return;
  }

  if (!assistantId) {
    context.res = {
      status: 500,
      body: { error: 'OpenAI Assistant ID not configured' }
    };
    return;
  }

  try {
    const openai = new OpenAI({ apiKey: openaiKey });

    // Create or use existing thread
    let currentThreadId = threadId;
    if (!currentThreadId) {
      const thread = await openai.beta.threads.create();
      currentThreadId = thread.id;
    }

    // Add user message to thread
    await openai.beta.threads.messages.create(currentThreadId, {
      role: 'user',
      content: userMessage
    });

    // Run the assistant
    const run = await openai.beta.threads.runs.create(currentThreadId, {
      assistant_id: assistantId
    });

    // Wait for completion
        const MAX_WAIT_TIME = 30000; // 30 seconden timeout
        const startTime = Date.now();
    let runStatus = await openai.beta.threads.runs.retrieve(
      currentThreadId,
      run.id
    );

    while (runStatus.status !== 'completed') {
            // Check voor timeout
            if (Date.now() - startTime > MAX_WAIT_TIME) {
                      throw new Error('Assistant response duurde te lang. Probeer het opnieuw.');
                    }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(
        currentThreadId,
        run.id
      );

      if (runStatus.status === 'failed' || runStatus.status === 'cancelled' || runStatus.status === 'expired') {        throw new Error(`Run ${runStatus.status}`);
      }
    }

    // Get assistant's response
    const messages = await openai.beta.threads.messages.list(currentThreadId);
    const assistantMessage = messages.data.find(
      msg => msg.role === 'assistant'    );

    if (!assistantMessage || !assistantMessage.content[0]) {
      throw new Error('No response from assistant');
    }

    const responseText = assistantMessage.content[0].text.value;

    context.res = {
      status: 200,
      body: {
        message: responseText,
        threadId: currentThreadId
      }
    };
  } catch (error) {
    context.log.error('Error:', error);
    context.res = {
      status: 500,
      body: { error: error.message }
    };
  }
};
