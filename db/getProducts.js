const fetch = require('node-fetch');
const fs = require('fs');

fetch('https://fakestoreapi.com/products')
	.then((res) => res.json())
	.then((success) => {
		let stringified = JSON.stringify(success);
		fs.writeFile(__dirname + '/products.json', stringified, 'utf8', (err) => {
			if (err) {
				console.error(err);
			} else {
				console.log(`yay`);
			}
		});
	});
