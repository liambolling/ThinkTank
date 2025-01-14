
const {onRequest} = require("firebase-functions/v2/https");
const  OpenAIApi  = require('openai');
const { ERROR_STATUS_CODE, BAD_REQUEST_STATUS_CODE, SUCCESS_STATUS_CODE, TANK_TYPES, PITCH_TANK_TYPE, TAlENT_TANK_TYPE, PRODUCT_TANK_TYPE } = require("./util/constants");
const { constructTankPrompt } = require("./profile/constructTankPrompt");

const OPENAI_API_KEY = '';
const OPENAI_MODEL = 'chatgpt-4o-latest';


const { createScript } = require('./createScript.js');
exports.createScript = createScript;


// Initialize OpenAI API client
const openaiClient = new OpenAIApi({
    apiKey: OPENAI_API_KEY,
});

const validateRequestBody = (request, response) => {
    const { Tank, JobDescription, Description, Links, VCList } = request.body.data;
    
    // Validate required fields
    if (!Tank) {
        return response.status(BAD_REQUEST_STATUS_CODE).send('Please choose a tank');
    }

    if (!TANK_TYPES.includes(Tank)) {
        return response.status(BAD_REQUEST_STATUS_CODE).send(`Tank must be one of: ${TANK_TYPES.join(', ')}`);
    }

    if (Tank === TAlENT_TANK_TYPE) {
        // requires JobDescription
        if (!JobDescription) {
            return response.status(BAD_REQUEST_STATUS_CODE).send('Job Description is required for Talent tank');
        }
    }

    if (Tank === PITCH_TANK_TYPE) {
        // requires VCList
        if (!VCList) {
            return response.status(BAD_REQUEST_STATUS_CODE).send('VC List is required for Pitch tank');
        }
    }

    if (Tank === PRODUCT_TANK_TYPE) {
        // requires Links
        if (!Links) {
            return response.status(BAD_REQUEST_STATUS_CODE).send('Links are required for Product tank');
        }

        if (!Description) {
            return response.status(BAD_REQUEST_STATUS_CODE).send('A Description is required for Product tank');
        }
    }

    return null;
}

const constructPrompt = (Tank, JobDescription, Description, Links, VCList) => {
    // get the initial prompt based on the tank type
    const tankPrompt = constructTankPrompt(Tank, JobDescription, Description, Links, VCList);
    
    console.log(`Finished constructing ${Tank} Tank Prompt`);
    return tankPrompt;
}

exports.createTeam = onRequest(async (req, res) => {
    console.log(`CREATE TEAM Request\n${JSON.stringify(req.body, null, 4)}`);
    
    // Ensure the function is only invoked with POST requests
    if (req.method !== 'POST') {
        return res.status(ERROR_STATUS_CODE).send('Method Not Allowed');
    }

    // Validate required fields
    const requestValidationResponse = validateRequestBody(req, res);
    if (requestValidationResponse) {
        return requestValidationResponse;
    }

    const { Tank, JobDescription, Description, Links, VCList } = req.body.data;
    
    // Construct the complete message to send to OpenAI
    const prompt = constructPrompt(Tank, JobDescription, Description, Links, VCList);
    console.log(prompt);
    try {
        const openAIResponse = await openaiClient.chat.completions.create({
            model: OPENAI_MODEL,
            temperature: 1,
            response_format: {
                "type": "json_object"
            },
            messages: prompt
        });

        // Extract the reply from OpenAI's response
        const reply = openAIResponse.choices[0].message;

        const result = {
            data: { 
                success: SUCCESS_STATUS_CODE, 
                message: reply
            }
        };

        res.status(SUCCESS_STATUS_CODE).send(result);
    } catch (error) {
        return res.status(ERROR_STATUS_CODE).send(`Failed to start ${Tank.toLowerCase()} tank: ${error}`);
    }
});