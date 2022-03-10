const Welcomer = require('./Classes/Welcomer');
const { registerFont } = require('canvas');
const { join } = require('path');

const owo = () => {
	registerFont(join(__dirname, '..', 'assets', 'DejaVuSansCondensed-Bold.ttf'), {
		family: 'DejaVu Sans',
		weight: 'bold',
		style: 'Condensed'
	});

	registerFont(join(__dirname, '..', 'assets', 'seguiemj.ttf'), {
		family: 'segoe-ui-emoji'
	});

	registerFont(join(__dirname, '..', 'assets', 'uni-sans-heavy.ttf'), {
		family: 'Uni Sans Heavy CAPS',
		weight: 'bold'
	});

	registerFont(join(__dirname, '..', 'assets', 'arial-unicode-ms.ttf'), {
		family: 'Arial Unicode MS'
	});
};

owo();
module.exports.Welcomer = Welcomer;
