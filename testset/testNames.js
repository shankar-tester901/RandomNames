var express = require('express');
const app = express();

var axios = require('axios');

app.get('/', (req, res) => {
	//console.log('------');
	axios.get('https://randomnames-698833516.development.zohocatalyst.com/baas/v1/project/3296000000009001/function/random_names/execute')
		.then(response => {
			console.log(response.data);
			res.json(' >>>>  ' + res.json(response.data));

		})
		.catch(error => {
			//console.error("Error is " + error)
		})


})



app.listen('8903');	