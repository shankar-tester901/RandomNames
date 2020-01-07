var express = require('express');
const app = express();

var axios = require('axios');

app.get('/', (req, res) => {

	console.log(' in get request ');
	const getNames = () => {

		try {
			console.log('in getNames ');
			return axios.get('https://randomnames-698833516.development.zohocatalyst.com/baas/v1/project/3296000000009001/function/random_names/execute')
		} catch (error) {
			console.error("Error is " + error)
		}
	}

	const some_random_names = getNames()
		.then(response => {
			res.json(response.data);
			console.log(response.data);
		})
		.catch(error => {
			console.log("Error here " + error)
		})

})

app.listen('8901');