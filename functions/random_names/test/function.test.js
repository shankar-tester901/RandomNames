const axios = require('axios');

it('check if we get random names', async () => {
	expect.assertions(1);
	let url = "http://names.drycodes.com/1";
	const response = await axios.get(url);
	const answer = await response.data[0];
	console.log('>>>>>>>>>>>>>   ' + answer);
	var myRegex = /[A - Za - z\_\A - Za - z]/;
	expect(answer).toMatch(myRegex); //This works too
	//expect(input).matcher(output)    //Jest allows us to do that easily by providing matchers to test our values:
});
