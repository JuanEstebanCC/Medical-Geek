const { Schema, model } = require('mongoose');

const chatSchema = new Schema({

  messages: [
	{
		email: {type: String},
	  	author:{ type: String },
		message:{ type: String,  minLength: 255}
	}

  ],

  participants: [
	{
	  name: {type: String, required:true},
	  email: {type: String, required:true}
	}
  ]
})

module.exports = model('chat', chatSchema);
