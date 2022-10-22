import { createCanvas, loadImage } from 'canvas';
import { AttachmentBuilder } from 'discord.js';
import { join } from 'path';

export class Ping {
	icon!: string | Buffer;

	public constructor(options?: PingOptions) {
		if (options) this.setup(options);
	}

	private setup(options: Partial<PingOptions>) {
		if (!options) throw new Error('No options provided.');

		if ('icon' in options) {
			this.setIcon(options.icon!);
		}
	}

	private setIcon(icon: string | Buffer) {
		if (typeof icon != 'string' && !Buffer.isBuffer(icon))
			throw new TypeError('Icon must be a string or a buffer.');
		this.icon = icon;

		return this;
	}

	public async render(toAttachment: true, attachmentName?: string): Promise<AttachmentBuilder>;
	public async render(toAttachment: false, attachmentName?: string): Promise<Buffer>;
	public async render(toAttachment: boolean, attachmentName?: string) {
		if (!this.icon) throw new Error('Falta un icon. Usa Ping.setIcon(url)');

		const canvas = createCanvas(800, 800);
		const ctx = canvas.getContext('2d');

		const icon = await loadImage(this.icon);
		const ping = await loadImage(join(__dirname, '..', '..', 'assets', 'ping.png'));

		ctx.drawImage(icon, 0, 0, canvas.width, canvas.height);

		ctx.save();
		ctx.globalCompositeOperation = 'destination-out';
		ctx.beginPath();
		ctx.arc(615, 615, 200, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.restore();

		ctx.save();
		ctx.drawImage(ping, 475, 475, 270, 270);

		if (toAttachment == true)
			return new AttachmentBuilder(canvas.toBuffer(), { name: attachmentName || 'ping.png' });
		else return canvas.toBuffer();
	}
}

interface PingOptions {
	icon: string | Buffer;
}
