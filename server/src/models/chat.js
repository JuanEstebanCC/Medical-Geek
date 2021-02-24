const { Schema, model } = require('mongoose');

const chatSchema = new Schema({

  messages: {
	{
	  author:{ type: String, required: true},
		message:{ type: String, required: true, minLength: 255}
	}
  },
  participants: [
	{
	  type: String,
	  required: true,
	}
  ]
})

module.exports = model('Chat', chatSchema);
