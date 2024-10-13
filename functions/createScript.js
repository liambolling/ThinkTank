const { onRequest } = require("firebase-functions/v2/https");
const OpenAIApi = require('openai');

const OPENAI_API_KEY = '';

const openaiClient = new OpenAIApi({
    apiKey: OPENAI_API_KEY,
});

async function getChapters(topic, participants, imageUrl) {
    return await openaiClient.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "Imagine you are observing a conversation in a focus group room with Participants discussing the Topic. Your goal is to create the chapters of the discussion based on what you think this group's discussion would flow based on the Topic."
                    }
                ]
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": `The Topic: I need feedback about my product idea`
                    }
                ]
            },
            {
                "role": "user",
                "content": [
                    {
                        type: "text", text: `Additional Context: Additional information about the product can be found here`
                    },
                    {
                        type: "image_url",
                        image_url: { "url": "https://i.imgur.com/VP3XriC.png", "detail": "high" }
                    }
                ]
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": `Participants in the Room: ${JSON.stringify(participants)}`
                    }
                ]
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "Output Format: The output should conform to the format of this JSON schema: ```{ chapters: {type: \"array\", [{ \"chapter_title\": <A brief title of the chapter of the discussion.>, \"description\": <A few sentences about the chapter in the discussion.>, \"thought\": <Your thoughts on why this is an important chapter in the discussion.>}]}}``"
                    }
                ]
            }
        ],
        response_format: {
            "type": "json_object"
        },
    });
}



async function createChapterContent(chapter, description, participants, topic) {
    console.log(chapter);
    console.log(description);
    return await openaiClient.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "Imagine you are observing a conversation in a focus group Room with Participants discussing the Topic. Your goal is to create the full script for a Chapter in the conversation about the Topic. Make sure this conversation for this Chapter is comprehensive and thorough."
                    }
                ]
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "Principles for a good conversation script: Don’t sound too preachy. Make it very conversational, like people speaking around a room. Have someone naturally introduce the topic. Each participant should always have their own thoughts and opinions, which means they may or may not agree with each other. Don’t turn this into a conversation where everyone just agreed with each other, make it engaging and fun to listen to or read. Make it high energy. We want to get Participants true opinions in a very conversational way. Make sure the script is not too short in total content but you can have multiple speaking, interrupting each other or saying small human touches such brief agreements. Put human noises in the script where humans would make noises such as ums or hms."
                    }
                ]
            },
            {
                "role": "user",
                "content": [
                    {
                        type: "text", text: `Additional Context: Additional information about the product can be found here`
                    },
                    {
                        type: "image_url",
                        image_url: { "url": "https://i.imgur.com/VP3XriC.png", "detail": "high" }
                    }
                ]
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": `The Chapter: "${chapter}". Description of the Chapter: "${description}"`
                    }
                ]
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": `The Overall Topic of all Chapters: I need feedback about my product idea`
                    }
                ]
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": `Participants in the Room: ${JSON.stringify(participants)}`
                    }
                ]
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "Output Format: The output should conform to the format of this JSON schema: ```{ conversation_script: {type: “array”, [{ “participant”: <The name of the Participant speaking.>, “text”: <What this Participant has to say.>}]}}```"
                    }
                ]
            }
        ],
        response_format: {
            "type": "json_object"
        },
    });
}




exports.createScript = onRequest(async (req, res) => {
    try {
        const { topic, participants } = req.body.data;

        if (!topic || !participants || !Array.isArray(participants)) {
            return res.status(400).json({ error: 'Invalid input. Please provide topic, participants array, and imageUrl.' });
        }

        const response = await getChapters(topic, participants);
        console.log(response.choices[0].message.content);

        const contentObject = JSON.parse(response.choices[0].message.content);
        const chaptersArray = contentObject.chapters;
        console.log(chaptersArray);



        // DEBUG ONLY ONE OF THEM
        const chapter = chaptersArray[0];
        console.log(chapter);
        const chapterContent = await createChapterContent(
            chapter.chapter_title,
            chapter.description,
            participants,
            topic
        );
        const chapterContentReturn = JSON.parse(chapterContent.choices[0].message.content);
        const chapterContentArray = chapterContentReturn.conversation_script;
        console.log(chapterContentArray);


        // for (const chapter of chaptersArray) {
        //     const chapterContent = await createChapterContent(
        //         chapter.chapter_title,
        //         chapter.description,
        //         participants,
        //         topic
        //     );

        //     fullScript.push({
        //         chapter_title: chapter.chapter_title,
        //         description: chapter.description,
        //         thought: chapter.thought,
        //         conversation: JSON.parse(chapterContent.choices[0].message.content).conversation
        //     });
        // }


        res.status(200).json({
            success: true,
            data: chapterContentArray
        });


    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});