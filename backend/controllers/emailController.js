const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const sendEmailController = async (req, res) => {
  const { phone, text } = req.body;

  if (!phone) {
    return res.status(400).send("Email address is required");
  }
  if (!text) {
    return res.status(400).send("Text is required");
  }

  try {
    const result = await client.messages.create({
      body: text || "Test message",
      from: "+14702357627",
      to: phone || "+639693341458",
    });

    res.send(result);
  } catch (error) {
    console.error("Error sending SMS:", error);
    res.status(500).send("Error sending SMS");
  }
};

module.exports = { sendEmailController };
