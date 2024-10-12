
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const  OpenAIApi  = require('openai');
const { ERROR_STATUS_CODE, BAD_REQUEST_STATUS_CODE, SUCCESS_STATUS_CODE, TANK_TYPES } = require("./util/constants");
const { constructTankPrompt } = require("./profile/constructTankPrompt");

const OPENAI_API_KEY = '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';
const OPENAI_MODEL = 'chatgpt-4o-latest';
const OPENAI_SYSTEM_ROLE = 'system';
const OPENAI_USER_ROLE = 'user';

// Initialize OpenAI API client
const openaiClient = new OpenAIApi({
    apiKey: OPENAI_API_KEY,
});

const validateRequestBody = ({Tank, Message, res}) => {
    // Validate required fields
    if (!Tank) {
        return res.status(BAD_REQUEST_STATUS_CODE).send('Please select a tank to enter');
    }

    if (!TANK_TYPES.includes(Tank)) {
        return res.status(BAD_REQUEST_STATUS_CODE).send(`Tank must be one of: ${TANK_TYPES.join(', ')}`);
    }

    if (!Message) {
        return res.status(BAD_REQUEST_STATUS_CODE).send('Please give some description of what you want to achieve today');
    }

    return null;
}

const constructPrompt = ({Tank, Message, Links}) => {
 // get the initial prompt based on the tank type
 const tankPrompt = constructTankPrompt({Tank});

  // layer on any links to the prompt
  let linkPrompt = "";
  if (Links && Array.isArray(Links) && Links.length > 0) {
      linkPrompt += `
        \n\nHere are some links to give you more context of the scenario and profiles I need advice for:
      ${Links.join('\n')}
      `;
  }

  // layer on any additional context provided by the user to the prompt
  const finalPrompt = `${tankPrompt}\n\n${linkPrompt}\n\n${Message}`;
  return finalPrompt;
}


exports.startTank = onRequest(async (req, res) => {
    // Ensure the function is only invoked with POST requests
    if (req.method !== 'POST') {
        return res.status(ERROR_STATUS_CODE).send('Method Not Allowed');
    }

    const { Tank, InputFiles, Links, Message } = req.body;

    // Validate required fields
    const requestValidationResponse = validateRequestBody({Tank, Message, res});
    if (requestValidationResponse) {
        return requestValidationResponse;
    }

    // Construct the complete message to send to OpenAI
    const prompt = constructPrompt({Tank, Message, Links});
    try {
        // TODO - ask Liam
        const openAIResponse = await openaiClient.chat.completions.create({
            model: OPENAI_MODEL,
            messages: [
                {
                  "role": OPENAI_SYSTEM_ROLE,
                  "content": [
                    {
                      "type": "text",
                      "text": `
                        You are a helpful assistant that answers questions 
                        in the style of a southern belle from the southeast United States.
                      `
                    }
                  ]
                },
                {
                  "role": OPENAI_USER_ROLE,
                  "content": [
                    {
                      "type": "text",
                      "text": prompt,
                    }
                  ]
                }
              ]
        });

        // Extract the reply from OpenAI's response
        const reply = openAIResponse.choices[0].message;

        // Send the response back to the client
        return res.status(SUCCESS_STATUS_CODE).json({ reply });
    } catch (error) {
        console.error("Error:", error);
        return res.status(ERROR_STATUS_CODE).send(`Failed to start ${Tank.toLowerCase()} tank`);
    }
});