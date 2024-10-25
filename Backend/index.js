import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

const port = process.env.PORT || 5001;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MY_USERNAME,
    pass: process.env.MY_PASSWORD,
    // Use your own email and password
  },
});

app.post("/mail", (req, res) => {
  const { name, email, message } = req.body;
  console.log(req.query);
  const mailOptions = {
    from: process.env.MY_USERNAME, // put your sender email here
    to: email,
    subject: `Message from ${name}`,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json("Error sending email" + error);
    }
    res.status(200).json("Email sent successfully");
  });
});

app.listen(port, () => {
  console.log("Server Started at port :", port);
});