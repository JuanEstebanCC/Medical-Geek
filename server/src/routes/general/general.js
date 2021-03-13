// Import all modules
const { Router } = require("express");
const router = Router();

const jwt = require("jsonwebtoken");
const config = require("../../config/config");

const verifyToken = require("./verifyToken");
const { validation_Register } = require("../../validations/validations");

const User = require("../../models/User");
const chat = require("../../models/chat");

/* ----------------------------- User's section ----------------------------- */

// End point to register a user
router.post("/register", async (req, res, next) => {
  const { email, full_name, password, specialization, usertype } = req.body;
  const validate = await validation_Register.validateAsync(req.body);
  let filter = { usertype: 3, specialization };
  User.findRandom(filter, {}, { limit: 1 }, async function (err, results) {
    if (!err) {
      if (usertype === 2) {
        try {
          const assignedDoctor = results[0].full_name;
          const newUser = new User({
            email,
            full_name,
            password,
            specialization,
            usertype,
            assignedDoctor,
          });
          newUser.password = await newUser.encryptPassword(newUser.password);
          await newUser.save();
          const id = newUser._id;
          const token = jwt.sign({ id: newUser._id }, config.secret, {
            expiresIn: 60 * 60 * 24,
          });
          res.json({ auth: true, token, email, id });
        } catch (err) {
          next(err);
        }
      } else if (usertype === 3) {
        try {
          const newUser = new User({
            email,
            full_name,
            password,
            specialization,
            usertype,
          });
          newUser.password = await newUser.encryptPassword(newUser.password);
          await newUser.save();
          const id = newUser._id;
          const token = jwt.sign({ id: newUser._id }, config.secret, {
            expiresIn: 60 * 60 * 24,
          });
          res.json({ auth: true, token, email, id });
        } catch (err) {
          next(err);
        }
      }
    }
  });
});

//Validate if an user exists inside the database

router.get("/login", async (req, res, next) => {
  try {
    const { email, password } = req.query;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json("The email doesn't exist");
    }
    const passwordIsValid = await user.validatePassword(password);
    console.log(passwordIsValid);
    if (!passwordIsValid) {
      return res.status(404).status({ auth: false, token: null });
    }
    const id = user._id;
    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 60 * 60 * 24,
    });
    res.json({ auth: true, token, message: "logged", id });
  } catch (error) {
    next(err);
  }
});

// Get user info

router.get("/user", verifyToken, async (req, res, next) => {
  const user = await User.findById(req.userId, { password: 0 });
  if (!user) {
    return res.status("404").send("No user found");
  }
  console.log("Youre in the dashboard");
  res.json(user);
});
/* -------------------------------------------------------------------------- */

/* ----------------------------- Chat's section ----------------------------- */
//  Get personal chats
router.get("/chats/:email", async (req, res, next) => {
  const email = req.params.email;

  try {
    const chats = await chat.find({ "participants.email": email });
    res.send(chats);
  } catch (err) {
    next(err);
  }
});

// End point to user login

//Create chat
router.post("/new_chat", async (req, res, next) => {
  const {
    email_participant1,
    name_participant1,
    name_participant2,
    email_participant2,
  } = req.body;

  try {
    const newChat = await new chat({
      messages: [],
      participants: [
        { email: email_participant1, name: name_participant1 },
        { email: email_participant2, name: name_participant2 },
      ],
    });
    await newChat.save();
    res.send("Chat created");
  } catch (err) {
    next(err);
  }
});

//Messaging
router.put("/new_message", async (req, res, next) => {
  const {
    email_participant1,
    email_participant2,
    author,
    email,
    message,
  } = req.body;

  try {
    const newChat = await chat.update(
      { "participants.email": email_participant1 && email_participant2 },
      {
        $push: { messages: { email: email, author: author, message: message } },
      }
    );

    res.send("message saved");
  } catch (err) {
    next(err);
  }
});
/* -------------------------------------------------------------------------- */

/* --------------------------- My information --------------------------- */

router.get("/my_information", async (req, res, next) => {
  const {id} = req.query

  try {
    const information = await User.find({ "_id":id });
    res.send(information);
  } catch (err) {
    console.log(err)
    next(err);
  }
});
/* -------------------------------------------------------------------------- */

/* --------------------------- Send notifications --------------------------- */

router.post("/notification_medicine", async (req, res, next) => {
  try {
    const { to, message } = req.body;
    // Your Account Sid and Auth Token from twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require("twilio")(accountSid, authToken);

    client.messages
      .create({
        from: "whatsapp:+14155238886",
        body: message,
        to: `whatsapp:+57${to}`,
      })
      .then((message) => console.log(message.sid));
  } catch (err) {
    next(err);
  }
});

/* -------------------------------------------------------------------------- */

//Export the module
module.exports = router;
