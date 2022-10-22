import { join } from 'path';
import { registerFont } from 'canvas';

function main() {
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
}

main();

export * from './struct/Ping';
export * from './struct/Rank';
export * from './struct/Welcomer';
export const amazingFunction = () => {
	console.log('bye');
	process.exit(0);
};
