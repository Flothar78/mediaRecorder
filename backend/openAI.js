const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const completion = openai.createCompletion({
  model: "text-davinci-002",
  prompt: "Hello world",
});
console.log("d'accord");
