//const dotenv = require("dotenv");
//dotenv.config({ path: "../.env" });
//
//const { Configuration, OpenAIApi } = require("openai");
//
//const configuration = new Configuration({
//  apiKey: process.env.OPENAI_API_KEY,
//});
//const openai = new OpenAIApi(configuration);
//
//const completion =  openai.createCompletion({
//  model: "text-davinci-002",
//  prompt: "Hello world",
//});
//console.log(completion.data.choices[0].text);

const { exec } = require("child_process");

exec(
  "/home/flothar78/.local/bin/whisper ./sounds_learners/318a61f280d8fa8d92da42dc338b7e20 --language French -o sounds_learners",
  (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  }
);
