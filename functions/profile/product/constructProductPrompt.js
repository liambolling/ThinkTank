const constructProductPrompt = (Links, Description) => {
  // layer on any links to the prompt
  let linkPrompt = "";
  if (Links && Array.isArray(Links) && Links.length > 0) {
    linkPrompt += `
          \n\nHere are some links to give you more context of the product I need advice for:
      ${Links.join('\n')}
      `;
  }

  return [{
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
        "text": "The Topic: I need feedback about my product idea"
      }
    ]
  },
  {
    "role": "user",
    "content": [
      { 
        type: "text", text: `Additional Context: Information about the product can be found here: ` 
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
        "text": "Output Format: The output should conform to the format of this JSON schema: ```{ personas: {type: “array”, [{ “name”: <A fictitious human name of the person.>, “description”: <A couple sentences about the person, where they are from, what they care about, their motivations, etc.>, “thought”: <Why would this persona be good to have in the room for this discussion?>}]}}```"
      }
    ]
  }];
};

module.exports = {
  constructProductPrompt
};