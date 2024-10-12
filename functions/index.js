
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const  OpenAIApi  = require('openai');
const { ERROR_STATUS_CODE, BAD_REQUEST_STATUS_CODE, SUCCESS_STATUS_CODE } = require("./util/constants");

const tankTypes = ['PRODUCT', 'TALENT', 'PITCH'];

const OPENAI_API_KEY = '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';
const OPENAI_MODEL = 'chatgpt-4o-latest';
const OPENAI_SYSTEM_ROLE = 'system';
const OPENAI_USER_ROLE = 'user';

// Initialize OpenAI API client
const openaiClient = new OpenAIApi({
    apiKey: OPENAI_API_KEY,
});

const validateRequestBody = ({TankType, Message, res}) => {
    // Validate required fields
    if (!TankType) {
        return res.status(BAD_REQUEST_STATUS_CODE).send('Please select a tank to enter');
    }

    if (!tankTypes.includes(TankType)) {
        return res.status(BAD_REQUEST_STATUS_CODE).send(`Tank must be one of: ${validTankTypes.join(', ')}`);
    }

    if (!Message) {
        return res.status(BAD_REQUEST_STATUS_CODE).send('Please give some description of what you want to achieve today');
    }

    return null;
}

const constructMessage = ({Message, Links}) => {
  // Construct the complete message to send to OpenAI
  let formattedMessage = Message;
  if (Links && Array.isArray(Links) && Links.length > 0) {
      formattedMessage += '\n\nHere are some links for reference:\n' + Links.join('\n');
  }

  return formattedMessage;
}


exports.startTank = onRequest(async (req, res) => {
    // Ensure the function is only invoked with POST requests
    if (req.method !== 'POST') {
        return res.status(ERROR_STATUS_CODE).send('Method Not Allowed');
    }

    const { TankType, InputFiles, Links, Message } = req.body;

    // Validate required fields
    const validationResponse = validateRequestBody({TankType, Message, res});
    if (validationResponse) {
        return validationResponse;
    }

    // Construct the complete message to send to OpenAI
    const formattedMessage = constructMessage({Message, Links});
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
                        You are a helpful assistant that answers programming questions 
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
                      "text": formattedMessage,
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
        return res.status(ERROR_STATUS_CODE).send(`Failed to start ${TankType.toLowerCase()} tank`);
    }
});