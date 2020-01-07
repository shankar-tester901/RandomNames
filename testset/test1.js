var express = require('express');
const app = express();
var request = require('request');

var axios = require('axios');

app.get('/', (req, res) => {

	url = 'https://randomnames-698833516.development.zohocatalyst.com/baas/v1/project/3296000000009001/function/random_names/execute';

	try {
		request(url, function (err, response, body) {
			if (err) {
				console.log(err);

			} else {
				let rand_Name = JSON.parse(body);
				if (rand_Name == undefined) {
					console.log(err);
				} else {
					console.log(rand_Name.output);
					res.json(rand_Name.output);

				}
			}
		});
	} catch (err) {
		console.log(err);
	}
})

app.listen('8902');