import { AttachmentBuilder } from 'discord.js';
import { createCanvas, loadImage } from 'canvas';
import { cover } from './Cover';
import { join } from 'path';

export class Welcomer {
	avatar: string | Buffer = join(__dirname, '..', '..', 'assets', 'avatar.png');
	avatarBorderColor: string = '#ffffff';
	background: string | Buffer = join(__dirname, '..', '..', 'assets', 'RankBG.jpg');
	borderColor: string | undefined;
	fonts: { title: string; subtitle: string } = {
		title: 'bold 52px Poppins, "DejaVu Sans Condensed", "Arial Unicode MS", segoe-ui-emoji, Sans',
		subtitle: '28px Poppins, "DejaVu Sans Condensed", "Arial Unicode MS", segoe-ui-emoji, Sans'
	};
	subtitle: string = 'Welcome to the server!';
	username!: string;
	borderAlpha: number = 1;
	public constructor(options?: WelcomerOptions) {
		if (options) this.setup(options);
	}

	private setup(options: Partial<WelcomerOptions>) {
		if (!options) throw new Error('No options provided.');

		if (options.avatar) {
			this.setAvatar(options.avatar);
		}
		if (options.avatarBorderColor) {
			this.setAvatarBorderColor(options.avatarBorderColor);
		}
		if (options.background) {
			this.setBackground(options.background);
		}
		if (options.borderColor) {
			this.setBorderColor(options.borderColor);
		}
		if (options.fonts) {
			this.setFonts(options.fonts);
		}
		if (options.subtitle) {
			this.setSubtitle(options.subtitle);
		}
		if (options.username) {
			this.setUsername(options.username);
		}
	}

	public setAvatar(avatar: string | Buffer) {
		if (typeof avatar != 'string' && !Buffer.isBuffer(avatar))
			throw new TypeError('Avatar must be a string or a buffer.');
		this.avatar = avatar;
		return this;
	}

	public setAvatarBorderColor(avatarBorderColor: `#${string}`) {
		if (typeof avatarBorderColor != 'string')
			throw new TypeError('Avatar border color must be a string.');

		if (!/^#[0-9a-f]{6}$/i.test(avatarBorderColor)) {
			throw new TypeError('Avatar border color must be a valid hex color.');
		}

		this.avatarBorderColor = avatarBorderColor;
		return this;
	}

	public setBackground(background: string | Buffer) {
		if (typeof background != 'string' && !Buffer.isBuffer(background))
			throw new TypeError('Background must be a string or a buffer.');

		this.background = background;
		return this;
	}

	public setBorderColor(borderColor: `#${string}`, borderAlpha: number = 1) {
		if (typeof borderColor != 'string') throw new TypeError('Border color must be a string.');
		if (typeof borderAlpha != 'number') throw new TypeError('Border alpha must be a number.');

		if (!/^#[0-9a-f]{6}$/i.test(borderColor)) {
			throw new TypeError('Border color must be a valid hex color.');
		}

		if (borderAlpha < 0 || borderAlpha > 1) {
			throw new RangeError('Border alpha must be between 0 and 1.');
		}

		this.borderColor = borderColor;
		this.borderAlpha = borderAlpha;
		return this;
	}

	public setFonts(fonts: { title?: string; subtitle: string }) {
		if (typeof fonts != 'object') throw new TypeError('Fonts must be an object.');

		if (fonts.title) {
			if (typeof fonts.title != 'string') throw new TypeError('Title font must be a string.');
			this.fonts.title = fonts.title;
		}

		if (fonts.subtitle) {
			if (typeof fonts.subtitle != 'string') throw new TypeError('Subtitle font must be a string.');
			this.fonts.subtitle = fonts.subtitle;
		}

		return this;
	}

	public setSubtitle(subtitle: string) {
		if (typeof subtitle != 'string') throw new TypeError('Subtitle must be a string.');
		this.subtitle = subtitle;
		return this;
	}

	public setUsername(username: string) {
		if (typeof username != 'string') throw new TypeError('Username must be a string.');
		this.username = username;
		return this;
	}

	public async render(toAttachment: true, attachmentName?: string): Promise<AttachmentBuilder>;
	public async render(toAttachment: false, attachmentName?: string): Promise<Buffer>;
	public async render(toAttachment: boolean, attachmentName?: string) {
		if (!this.username) throw new Error('Username is not set.');

		const avatar = await loadImage(this.avatar);
		const bg = await loadImage(this.background);

		const canvas = createCanvas(750, 400);
		const ctx = canvas.getContext('2d');

		cover(bg, 0, 0, 750, 400).render(ctx);

		ctx.fillStyle = '#00000055';
		ctx.textAlign = 'center';
		ctx.fillRect(0, 0, 750, 400);

		ctx.save();
		ctx.beginPath();
		ctx.arc(375, 140, 95, 0, Math.PI * 2, false);
		ctx.fillStyle = this.avatarBorderColor || '#ffffff';
		ctx.fill();
		ctx.clip();
		ctx.restore();
		ctx.fillStyle = '#ffffff';

		if (this.borderColor) {
			ctx.fillStyle = this.borderColor;
			ctx.globalAlpha = this.borderAlpha;
			ctx.fillRect(0, 0, 20, canvas.height);
			ctx.fillRect(canvas.width - 20, 0, 20, canvas.height);
			ctx.fillRect(20, 0, canvas.width - 40, 25);
			ctx.fillRect(20, canvas.height - 20, canvas.width - 40, 20);
			ctx.globalAlpha = 1;
		} else ctx.fillStyle = '#ffffff';

		ctx.save();
		ctx.beginPath();
		ctx.arc(375, 140, 90, 0, Math.PI * 2, false);
		ctx.clip();
		ctx.drawImage(avatar, 285, 50, 180, 180);
		ctx.restore();

		ctx.font = this.fonts.title;
		ctx.fillStyle = 'white';
		ctx.fillText(this.username, 375, 300, 500);

		ctx.font = this.fonts.subtitle;
		ctx.fillText(this.subtitle || 'Welcome to the server!', 375, 345, 500);

		if (toAttachment == true)
			return new AttachmentBuilder(canvas.toBuffer(), { name: attachmentName || 'ping.png' });
		else return canvas.toBuffer();
	}
}

interface WelcomerOptions {
	avatar: string;
	background: string | Buffer;
	avatarBorderColor: `#${string}`;
	borderColor: `#${string}`;
	subtitle: string;
	username: string;
	fonts: {
		title: string;
		subtitle: string;
	};
}
