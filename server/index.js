// server.js
const express = require("express");
const bodyParser = require("body-parser");
const pickle = require("pickle");
const fs = require("fs");

const app = express();
const port = 3001;

// Load the chatbot model from the pickle file
// Load the chatbot model from the pickle file
const chatbotModelBuffer = fs.readFileSync(
  "../medisearch/src/data/recommendSimilarMedicines.pkl"
);
const chatbotModelString = chatbotModelBuffer.toString();
const chatbotModel = pickle.loads(chatbotModelString, {
  pythonBinary: "path/to/python",
});

app.use(bodyParser.json());

app.post("/api/chatbot", (req, res) => {
  const userInput = req.body.user_input;

  // Use the chatbot model to get a response
  const chatbotResponse = chatbotModel.getResponse(userInput);

  // Return the response as JSON
  res.json({ response: chatbotResponse });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
