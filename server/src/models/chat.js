const { Schema, model } = require('mongoose');

const chatSchema = new Schema({

  messages: {
	{
	  author:{ type: String, required: true},
		message:{ type: String, required: true}
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
