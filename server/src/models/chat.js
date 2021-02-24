const { Schema, model } = require('mongoose');

const chatSchema = new Schema({

  messages: [
	{
	  	author:{ type: String },
		message:{ type: String,  minLength: 255}
	}
<<<<<<< HEAD
  ],
=======
],
>>>>>>> 4b8dfc9121da071b4b133dec184cc4f2aceb815f
  participants: [
	{
	  type: String,
	  required: true,
	}
  ]
})

module.exports = model('chat', chatSchema);
