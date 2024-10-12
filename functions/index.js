
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const  OpenAIApi  = require('openai');
const { ERROR_STATUS_CODE, BAD_REQUEST_STATUS_CODE, SUCCESS_STATUS_CODE, TANK_TYPES } = require("./util/constants");
const { constructTankPrompt } = require("./profile/constructTankPrompt");

const OPENAI_API_KEY = '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';
const OPENAI_MODEL = 'chatgpt-4o-latest';
const OPENAI_SYSTEM_ROLE = 'system';
const OPENAI_USER_ROLE = 'user';


const { createScript } = require('./createScript.js');
exports.createScript = createScript;


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
            temperature: 1,
            response_format: {
                "type": "json_object"
            },
            messages: [
                {
                  "role": "user",
                  "content": [
                    {
                      "type": "text",
                      "text": "We're going to have a conversation between multiple people in a focus group discussing the Topic. Our goal is to bring together many backgrounds and opinions and perspectives on the Topic. You need return the profiles of who you think would be the best to have a fruitful conversation about the Topic."
                    }
                  ]
                },
                {
                  "role": "user",
                  "content": [
                    {
                      "type": "text",
                      "text": "The Topic: Should we hire this candidate for our company?"
                    }
                  ]
                },
                {
                  "role": "user",
                  "content": [
                    {
                      "type": "text",
                      "text": "Additional Context: The candidates resume and additional information about them."
                    }
                  ]
                },
                {
                  "role": "user",
                  "content": [
                    {
                      "type": "text",
                      "text": "The Job Description: Overview\nMicrosoft Silicon, Cloud Hardware, and Infrastructure Engineering (SCHIE) is the team behind Microsoft’s expanding Cloud Infrastructure and responsible for powering Microsoft’s “Intelligent Cloud” mission. SCHIE delivers the core infrastructure and foundational technologies for Microsoft's over 200 online businesses including Bing, MSN, Office 365, Xbox Live, Teams, OneDrive, and the Microsoft Azure platform. Central to SCHIE’s mission is a highly programmable Data Processing Unit chip (DPU), which powers key aspects of the infrastructure. The DPU team is seeking a Principal Hardware Engineer, who will be responsible for delivering cutting-edge, high performance, low power, scalable and programmable silicon.\n \nMicrosoft’s mission is to empower every person and every organization on the planet to achieve more. As employees we come together with a growth mindset, innovate to empower others, and collaborate to realize our shared goals. Each day we build on our values of respect, integrity, and accountability to create a culture of inclusion where everyone can thrive at work and beyond.\n \n \nQualifications\nRequired Qualifications:\n9+ years of related technical engineering experience\nOR Bachelor's degree in Electrical Engineering, Computer Engineering, Computer Science, or related field AND 6+ years technical engineering experience or internship experience\nOR Master's degree in Electrical Engineering, Computer Engineering, Computer Science, or related field AND 4+ years technical engineering experience or internship experience\nOR Doctorate degree in Electrical Engineering, Computer Engineering, Computer Science, or related field AND 3+ years technical engineering experience.\n9+ years of experience in ASIC/SoC Architecture, Design or Verification\nOther Requirements:\nAbility to meet Microsoft, customer and/or government security screening requirements are required for this role. These requirements include but are not limited to the following specialized security screenings: Microsoft Cloud Background Check: This position will be required to pass the Microsoft Cloud Background Check upon hire/transfer and every two years thereafter.\n \nPreferred Qualifications:\nUnderstanding of network protocols and applications\nKnowledge of CPU, Cache Hierarchy, & SoC architecture/design\nTeam player with excellent communication skills and the desire to take on diverse challenges\nExperience in Ethernet, TCP/IP, RDMA, MAC/PCS, Networking blocks\n \nHardware Engineering IC5 - The typical base pay range for this role across the U.S. is USD $137,600 - $267,000 per year. There is a different range applicable to specific work locations, within the San Francisco Bay area and New York City metropolitan area, and the base pay range for this role in those locations is USD $180,400 - $294,000 per year. Certain roles may be eligible for benefits and other compensation. Find additional benefits and pay information here: US corporate pay information | Microsoft Careers Microsoft will accept applications for the role until Oct 8, 2024.\n \n\n \n#AHSI\n#SHPE24MSFT\n#SCHIE"
                    }
                  ]
                },
                {
                  "role": "user",
                  "content": [
                    {
                      "type": "text",
                      "text": "Output Format: The output should conform to the format of this JSON schema: ```{ personas: {type: “array”, [{ “name”: <The name of the persona.>, “description”: <A brief description of the personas.>, “thought”: <Why would this personas be good to have in the room for this discussion?>}]}}```"
                    }
                  ]
                },
                {
                  "role": "assistant",
                  "content": [
                    {
                      "text": "{\n  \"personas\": [\n    {\n      \"name\": \"Technical Hiring Manager\",\n      \"description\": \"An experienced hiring manager specializing in technical roles within the technology sector.\",\n      \"thought\": \"This persona can evaluate whether the candidate's technical skills and experience align with the job requirements for a Principal Hardware Engineer.\"\n    },\n    {\n      \"name\": \"Art Director from Marketing Department\",\n      \"description\": \"A senior figure in the marketing department familiar with creative leadership and team dynamics.\",\n      \"thought\": \"This persona can provide insights into the candidate’s experience and how their creative leadership might translate into a technical environment.\"\n    },\n    {\n      \"name\": \"Senior Hardware Engineer\",\n      \"description\": \"A seasoned engineer within the company who understands the specific technical requirements and standards the role demands.\",\n      \"thought\": \"This persona can assess the candidate’s technical expertise and experience in ASIC/SoC architecture, crucial for the role.\"\n    },\n    {\n      \"name\": \"HR Manager\",\n      \"description\": \"Human resources expert who understands the company's culture and hiring processes.\",\n      \"thought\": \"This persona can discuss the candidate’s potential fit within the company culture and ensure they meet all HR and security screening requirements.\"\n    },\n    {\n      \"name\": \"Diversity and Inclusion Officer\",\n      \"description\": \"An expert in fostering inclusive talent acquisition strategies and company culture.\",\n      \"thought\": \"This persona can ensure that hiring practices are inclusive and that the candidate brings diverse perspectives to the team.\"\n    },\n    {\n      \"name\": \"Current Team Member\",\n      \"description\": \"A member of the existing team who will work directly with the new hire.\",\n      \"thought\": \"This persona can offer insights into team dynamics and how well the candidate might integrate with the current team.\"\n    }\n  ]\n}",
                      "type": "text"
                    }
                  ]
                }
              ],
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