//@ts-check
const { createCanvas, loadImage } = require('canvas');
const { MessageAttachment } = require('discord.js');
const { join } = require('path');

/**
 * @typedef PingOptions
 * @prop {string|Buffer} icon El ícono del servidor o un avatar (PNG/JPG)
 */

module.exports = class Ping {
	/**
	 * Configura la imagen con las opciones del constructor
	 * @param {PingOptions} [options]
	 */
	constructor(options) {
		if (options) this._setup(options);
	}

	/**
	 * Configura la imagen con las opciones del constructor
	 * @param {PingOptions} options
	 * @private
	 */
	_setup(options) {
		if ('icon' in options) {
			if (typeof options.icon != 'string' && !Buffer.isBuffer(options.icon))
				throw new TypeError('El "icon" debe ser un string|Buffer (PNG/JPG)');
			this.icon = options.icon;
		}
	}

	/**
	 * Cambia el ícono del ping
	 * @param {string|Buffer} icon El ícono de servidor o avatar de usuario (PNG/JPG)
	 * @returns {Ping}
	 */
	setIcon(icon) {
		if (typeof icon != 'string' && !Buffer.isBuffer(icon))
			throw new TypeError('El "icon" debe ser un string|Buffer (PNG/JPG)');
		this.icon = icon;

		return this;
	}

	/**
	 * Construye la imagen final
	 * @param {boolean} [toAttachment] Retorna un MessageAttachment o un Buffer
	 * @param {string} [attachmentName] Cambia el nombre del MessageAttachment
	 * @returns
	 */
	// @ts-ignore
	async build(toAttachment = true, attachmentName = 'ping-drgato.png') {
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

		if (toAttachment) return new MessageAttachment(canvas.toBuffer(), attachmentName);
		else return canvas.toBuffer();
	}
};
