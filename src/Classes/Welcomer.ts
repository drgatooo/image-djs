import { createCanvas, Image, loadImage } from 'canvas';
import { MessageAttachment } from 'discord.js';
import cover from 'canvas-image-cover';

interface WelcomerOptions {
	background: Buffer | string;
	avatarURL: string;
	username: string;
	borderColor?: string;
	subtitle?: string;
	font?: string;
}

class Welcomer {
	/**
	 * Crea una nueva tarjeta de bienvenida
	 */
	constructor(private options?: WelcomerOptions) {
		if (options) this.setup(options);
	}

	private background: Image;
	private avatar: Image;
	private username: string;
	private borderColor: string;
	private subtitle: string;
	private font: string;

	/**
	 * Configura todos los parametros pasados en el constructor
	 */
	private async setup(options: WelcomerOptions): Promise<void> {
		if ('background' in options) {
			if (typeof options.background != 'string' && !Buffer.isBuffer(options.background))
				throw new TypeError('El "background" debe ser un string o un Buffer');

			this.background = await loadImage(options.background);
		}

		if ('avatarURL' in options) {
			if (typeof options.avatarURL != 'string')
				throw new TypeError('El "avatarURL" debe ser una URL string');

			this.avatar = await loadImage(options.avatarURL);
		}

		if ('username' in options) {
			if (typeof options.username != 'string')
				throw new TypeError('El "username" debe ser un string');
			this.username = options.username;
		}

		if ('borderColor' in options) {
			if (typeof options.borderColor != 'string')
				throw new TypeError('El "borderColor" debe ser un string');

			if (/^#[0-9a-f]{6}$/i.test(options.borderColor))
				throw new Error('El "borderColor" debe ser un color HEX (por ejemplo: "#acb221")');

			this.borderColor = options.borderColor;
		}

		if ('subtitle' in options) {
			if (typeof options.subtitle != 'string')
				throw new TypeError('El "subtitle" debe ser un string');

			this.subtitle = options.subtitle;
		} else this.subtitle = '¡Bienvenido al servidor!';

		if ('font' in options) {
			if (typeof options.font != 'string')
				throw new Error(
					'El "font" debe ser un string. Debes importar la fuente previamente con canvas (npm i canvas)'
				);

			this.font = options.font;
		} else
			this.font = 'bold 52px "DejaVu Sans Condensed", "Arial Unicode MS", segoe-ui-emoji, Sans';
	}

	/**
	 * Cambia el fondo de la tarjeta de bienvenida
	 * @param {string|Buffer} background Una URL o un Buffer de una imagen. Solo PNG/JPG
	 * @returns {Welcomer}
	 */
	public setBackground(background: string | Buffer): Welcomer {
		if (!background) throw new Error('Falta el parámetro "background"');

		if (typeof background != 'string' && !Buffer.isBuffer(background))
			throw new TypeError('El "background" debe ser un string o un Buffer');

		loadImage(background).then(img => (this.background = img));
		return this;
	}

	/**
	 * Cambia el avatar del usuario
	 * @param {string|Buffer} avatar Una URL o un Buffer de una imagen. Solo PNG/JPG
	 * @returns {Welcomer}
	 */
	public setAvatar(avatar: string | Buffer): Welcomer {
		if (!avatar) throw new Error('Falta el parámetro "avatar"');

		if (typeof avatar != 'string' && !Buffer.isBuffer(avatar))
			throw new TypeError('El "avatar" debe ser un string o un Buffer');

		loadImage(avatar).then(img => (this.avatar = img));
		return this;
	}

	/**
	 * Cambia el nombre del usuario
	 * @param {string} username El nombre de usuario. Puede ser también el TAG
	 * @returns {Welcomer}
	 */
	public setUsername(username: string): Welcomer {
		if (!username) throw new Error('Falta el parámetro "username"');

		if (typeof username != 'string') throw new TypeError('El "avatar" debe ser un string');
		this.username = username;
		return this;
	}

	/**
	 * Cambia el borde de la imagen
	 * @param {`#${string}`} hex Color hex para el borde
	 * @returns {Welcomer}
	 */
	public setBorderColor(hex: `#${string}`): Welcomer {
		if (!hex) throw new Error('Falta el parámetro "hex"');

		if (typeof hex != 'string') throw new TypeError('El "hex" debe ser un string');

		if (/^#[0-9a-f]{6}$/i.test(hex))
			throw new Error('El "hex" debe ser un color HEX (por ejemplo: "#acb221")');

		this.borderColor = hex;
		return this;
	}

	/**
	 * Cambia el subtítulo de la tarjeta
	 * @param {string} text El subtítulo xd
	 * @returns {Welcomer}
	 */
	public setSubtitle(text: string): Welcomer {
		if (!text) throw new Error('Falta el parámetro "text"');

		if (typeof text != 'string') throw new TypeError('El "text" debe ser un string');

		this.subtitle = text;
		return this;
	}

	/**
	 * Cambia la fuente de la tarjeta. Importala previamente con canvas
	 * @param {string} fontName Escribe el nombre de una fuente. Ej: "bold 18px 'Segoe UI'"
	 * @returns {Welcomer}
	 */
	public setFont(fontName: string): Welcomer {
		if (!fontName) throw new Error('Falta el parámetro "fontName"');

		if (typeof fontName != 'string') throw new TypeError('El "fontName" debe ser un string');

		this.font = fontName;
		return this;
	}

	/**
	 * Construye la tarjeta de bienvenida
	 * @param {boolean} [toAttachment] Retorna un MessageAttachment o un Buffer
	 * @param {string} [attachmentName] Cambia el nombre del MessageAttachment
	 * @returns {Promise<MessageAttachment | Buffer>}
	 */
	public async build(
		toAttachment: boolean = true,
		attachmentName: string = 'welcomecard-drgato'
	): Promise<MessageAttachment | Buffer> {
		if (!this.avatar) {
			if (typeof this.options.avatarURL != 'string' && !Buffer.isBuffer(this.options.avatarURL))
				throw new TypeError('El "avatar" debe ser un string o un Buffer');

			this.avatar = await loadImage(this.options.avatarURL);
		}
		if (!this.background) throw new Error('Falta un background. Usa Welcomer.setBackground(url)');
		if (!this.subtitle) throw new Error('Falta un subtitle. Usa Welcomer.setSubtitle(str)');
		if (!this.username) throw new Error('Falta un username. Usa Welcomer.setUsername(str)');

		const canvas = createCanvas(750, 400);
		const ctx = canvas.getContext('2d');

		cover(this.background, 0, 0, 750, 400).render(ctx);

		ctx.fillStyle = '#00000055';
		ctx.textAlign = 'center';
		ctx.fillRect(0, 0, 750, 400);

		ctx.save();
		ctx.beginPath();
		ctx.arc(375, 140, 95, 0, Math.PI * 2, false);
		ctx.fillStyle = '#ffffff';
		ctx.fill();
		ctx.clip();
		ctx.restore();

		if (this.borderColor) {
			ctx.fillStyle = this.borderColor;
			ctx.globalAlpha = 0.5;
			ctx.fillRect(0, 0, 25, canvas.height);
			ctx.fillRect(canvas.width - 25, 0, 25, canvas.height);
			ctx.fillRect(25, 0, canvas.width - 50, 25);
			ctx.fillRect(25, canvas.height - 25, canvas.width - 50, 25);
			ctx.globalAlpha = 1;
			ctx.fillStyle = '#ffffff';
		}

		ctx.save();
		ctx.beginPath();
		ctx.arc(375, 140, 90, 0, Math.PI * 2, false);
		ctx.clip();
		ctx.drawImage(this.avatar, 275, 50, 200, 200);
		ctx.restore();

		ctx.font = this.font;
		ctx.fillStyle = 'white';
		ctx.fillText(`${this.username}`, 375, 300, 500);
		ctx.fillText(`Bienvenido al servidor`, 375, 345, 500);

		if (toAttachment) return new MessageAttachment(canvas.toBuffer(), attachmentName);
		else return canvas.toBuffer();
	}
}

export { Welcomer };
