
const constructPitchPrompt = (VCList, Links) => {
         // layer on any links to the prompt
         let linkPrompt = "";
         if (Links && Array.isArray(Links) && Links.length > 0) {
             linkPrompt += `
                 \n\nHere are some links to give you more context of the scenario I need advice for:
             ${Links.join('\n')}
             `;
         }
         
     return  {
         "role": "user",
         "content": [
           {
             "type": "text",
             "text": `
                 We're going to have a podcast-like conversation between multiple people in a focus group discussing the Topic. Our goal is to bring together many backgrounds and opinions and perspectives to this discussion on the Topic. You need to return to create profiles of who you think would be the best to have a fruitful conversation about the Topic.
             `
           }
         ]
       },
       {
         "role": "user",
         "content": [
           {
             "type": "text",
             "text": "The Topic: Give me critical, meaningful, and actionable feedback about my pitch deck so that I can improve it and successfully raise capital"
           }
         ]
       },
       {
         "role": "user",
         "content": [
           {
             "type": "text",
             "text": `Additional Context: Additional information about the idea can be found here: ${linkPrompt}`
           }
         ]
       },
       {
         "role": "user",
         "content": [
           {
             "type": "text",
             "text": `Additional Context: Venture Capital firms I'd like to target for this pitch are: ${VCList}`
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
    constructPitchPrompt
};