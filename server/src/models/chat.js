const { Schema, model } = require('mongoose');

const chatSchema = new Schema({

  messages: [
	{
	  	author:{ type: String },
		message:{ type: String,  minLength: 255}
	}

  ],

  participants: [
	{
	  type: String,
	  required: true,
	}
  ]
})

module.exports = model('chat', chatSchema);
