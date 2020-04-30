const request = require("request");
const axios = require("axios");
const catalyst = require("zcatalyst-sdk-node");
/**
 * This function generates a random German name and sends an email to the specified person 
 * 
 */
module.exports = (context, basicIO) => {
	const app = catalyst.initialize(context);

        let url = "http://names.drycodes.com/1";
	const response = await axios.get(url);
	const answer = await response.data[0];

					basicIO.write(answer);
					dispatchEmail(answer);
					context.close();
	}

	function dispatchEmail(name) {
		console.log('in dispatch email ');
		//Create a config object with the email configuration
		let config = {
			from_email: 'shankarr+1002@zohocorp.com',
			to_email: 'shankarr+1002@zohocorp.com',
			subject: 'Random Name Generated',
			content: name 
		};

		//Send the mail by passing the config object to the method which in turn returns a promise
		let email = app.email();
		let mailPromise = email.sendMail(config);
		mailPromise.then((mailObject) => {
			console.log(mailObject);
		});
	}
