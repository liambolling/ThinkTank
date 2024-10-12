const constructTalentPrompt = (jobDescription, Links) => {
      // layer on any links to the prompt
        let linkPrompt = "";
        if (Links && Array.isArray(Links) && Links.length > 0) {
            linkPrompt += `
                \n\nHere are some links to give you more context of the scenario and profiles I need advice for:
            ${Links.join('\n')}
            `;
        }
        
    return  {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": `
                We're going to have a meaningful and productive conversation between multiple people in a focus group discussing 
                the Topic. Our goal is to bring together many qualified backgrounds, diverse opinions, and perspectives on the Topic. 
                You need to return the profiles of who you think would be the best to have a fruitful conversation about the Topic.
            `
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
            "text": `Additional Context: Additional information about the candidate can be found here: ${linkPrompt}`
          }
        ]
      },
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": `The Job Description: ${jobDescription}`
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
      };
};

module.exports = {
    constructTalentPrompt
};