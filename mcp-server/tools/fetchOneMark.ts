// tools/randomText.ts

// 💡 We define a function that returns a tool object
export function getRandomTextTool() {
  return {
    // 🏷️ Unique name used by the LLM to refer to this tool
    name: "randomText",

    // 📖 A simple English description for the LLM to understand what this tool does
    description: "Returns a random funny text",

    // 📥 Describes what input this tool expects (none in this case)
    input_schema: {
      type: "object",     // The input is expected to be an object
      properties: {},     // No properties, because there are no inputs
      required: []        // Nothing is required (empty input)
    },

    // 📤 Describes the structure of the output
    output_schema: {
      type: "object",     // Output is an object
      properties: {
        text: { type: "string" }  // It will have a "text" field of type string
      },
      required: ["text"]  // "text" is mandatory in the response
    },

    // 🛠️ Function that runs when the tool is invoked
    invoke: async () => {
      // 🎲 List of random funny texts to choose from
      const responses = [
        "Why did the chicken cross the road? To get away from the LLM!",
        "I speak fluent JSON.",
        "404: Joke not found.",
        "Trust me, I’m stateless.",
        "Beep boop 🤖"
      ];

      // 🔄 Choose a random one from the list
      const random = responses[Math.floor(Math.random() * responses.length)];

      // 🧾 Return it as an object with key `text`
      return { text: random };
    }
  };
}
