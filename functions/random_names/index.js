const request = require("request");
const catalyst = require("zcatalyst-sdk-node");
/**
 * This function generates a random German name and sends an email to the specified person 
 * 
 */
module.exports = (context, basicIO) => {
	const app = catalyst.initialize(context);

	let url = "https://uinames.com/api/?region=germany";


	try {
		request(url, function (err, response, body) {
			if (err) {
				basicIO.write("Error occured in fetching a random name" + err);
				context.close();
			} else {
				let rand_Name = JSON.parse(body);
				if (rand_Name == undefined) {
					basicIO.write("Error occured in getting a random name");
					context.close();
				} else {
					basicIO.write(rand_Name.name + " " + rand_Name.surname + "... " + rand_Name.gender);
					dispatchEmail(rand_Name.name, rand_Name.surname);
					context.close();
				}
			}
		});
	} catch (err) {
		basicIOObj.write("Error in fetching name : " + err);
		context.close();
	}

	function dispatchEmail(firstname, lastname) {
		console.log('in dispatch email ');
		//Create a config object with the email configuration
		let config = {
			from_email: 'shankarr+1002@zohocorp.com',
			to_email: 'shankarr+1002@zohocorp.com',
			subject: 'German Random Name Generated',
			content: firstname + "-- " + lastname
		};

		//Send the mail by passing the config object to the method which in turn returns a promise
		let email = app.email();
		let mailPromise = email.sendMail(config);
		mailPromise.then((mailObject) => {
			console.log(mailObject);
		});
	}
};
