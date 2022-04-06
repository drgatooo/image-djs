// @ts-check
const { createCanvas, loadImage, CanvasRenderingContext2D } = require('canvas');
const { join } = require('path');
const cover = require('canvas-image-cover');
const { MessageAttachment } = require('discord.js');

module.exports = class RankCard {
	/**
	 * Crea una tarjeta de niveles
	 * @param {RankOptions} [options]
	 */
	constructor(options) {
		this.setup(options);
	}

	/**
	 * Configura la tarjeta usando un objeto
	 * @param {RankOptions} options
	 * @private
	 */
	setup(options) {
		if (!options) options = {};

		if (options.avatar) {
			if (typeof options.avatar != 'string') throw new TypeError('El avatar debe ser un string');
			this.avatar = options.avatar;
		} else this.avatar = join(__dirname, '..', '..', 'assets', 'avatar.png');

		if (options.avatarRoundType) {
			switch (options.avatarRoundType) {
				case 'circle':
					this.avatarRound = 50;
					break;

				case 'rounded square':
					this.avatarRound = 30;
					break;

				case 'square':
					this.avatarRound = 0;
					break;

				default: {
					if (typeof options.avatarRoundType != 'number')
						throw new TypeError('Debe escribir un tipo válido de redondeo');

					this.avatarRound = options.avatarRoundType;
				}
			}
		} else this.avatarRound = 50;

		if (options.background) {
			if (typeof options.background != 'string')
				throw new TypeError('El background debe ser un string');

			this.background = options.background;
		} else this.background = join(__dirname, '..', '..', 'assets', 'RankBG.jpg');

		if (options.barRadius) {
			if (typeof options.barRadius != 'number')
				throw new TypeError('El barRadius debe ser un number');

			this.barRadius = options.barRadius;
		} else this.barRadius = 15;

		if (options.boxColor) {
			if (typeof options.boxColor != 'string' || !/^#[0-9a-f]{6}$/i.test(options.boxColor))
				throw new TypeError('El boxColor debe ser un código HEX válido (ej: #ababab)');

			this.boxColor = options.boxColor;
		} else this.boxColor = '#323740';

		if (options.level) {
			if (typeof options.level != 'number') throw new TypeError('El level debe ser un número');
			this.level = options.level;
		}

		if (options.levelBarBackground) {
			if (
				typeof options.levelBarBackground != 'string' ||
				!/^#[0-9a-f]{6}$/i.test(options.levelBarBackground)
			)
				throw new TypeError('El levelBarBackground debe ser un código HEX válido (ej: #ababab)');

			this.levelBarBackground = options.levelBarBackground;
		} else this.levelBarBackground = '#ffffff';

		if (options.levelBarFill) {
			if (typeof options.levelBarFill != 'string' || !/^#[0-9a-f]{6}$/i.test(options.levelBarFill))
				throw new TypeError('El levelBarFill debe ser un código HEX válido (ej: #ababab)');

			this.levelBarFill = options.levelBarFill;
		} else this.levelBarFill = '#ffffff';

		if (options.rank) {
			if (typeof options.rank != 'number') throw new TypeError('El rank debe ser un número');
			this.rank = options.rank;
		}

		if (options.requiredXP) {
			if (typeof options.requiredXP != 'number')
				throw new TypeError('El requiredXP debe ser un número');

			if (options.xp && options.requiredXP > options.xp)
				throw new TypeError('El requiredXP debe ser mayor al XP');

			this.requiredXP = options.requiredXP;
		}

		if (options.textXPNeeded) {
			if (typeof options.textXPNeeded != 'string')
				throw new TypeError('El textXPNeeded debe ser un string');

			if (!options.textXPNeeded.includes('{current}') || !options.textXPNeeded.includes('{needed}'))
				throw new TypeError('El textXPNeeded debe tener las variables {current} y {needed}');

			this.textXPNeeded = options.textXPNeeded;
		} else this.textXPNeeded = '{current}/{needed}';

		if (options.username) {
			if (typeof options.username != 'string')
				throw new TypeError('El username debe ser un string');

			this.username = options.username;
		}

		if (options.xp) {
			if (typeof options.requiredXP != 'number')
				throw new TypeError('El requiredXP debe ser un número');

			if (this.requiredXP && this.requiredXP < options.xp)
				throw new TypeError('El XP debe ser menor al requiredXP');

			this.xp = options.xp;
		}

		return this;
	}

	/**
	 * Sets the user's avatar to the given URL.
	 * @param {string} url - the URL of the avatar to set.
	 * @returns {RankCard}
	 */
	setAvatar(url) {
		if (!url) throw new Error('Falta el parámetro "url"');

		if (typeof url != 'string') throw new TypeError('El url debe ser un string');
		this.avatar = url;

		return this;
	}

	/**
	 * Sets the username of the user.
	 * @param {string} username - the username to set the user to.
	 * @returns {RankCard}
	 */
	setUsername(username) {
		if (!username) throw new Error('Falta el parámetro "username"');

		if (typeof username != 'string') throw new TypeError('El username debe ser un string');
		this.username = username;

		return this;
	}

	/**
	 * Sets the avatar round type.
	 * @param {'circle'|'rounded square'|'square'|number} avatarRoundType - the avatar round type to set.
	 * @returns {RankCard}
	 */
	setAvatarRoundType(avatarRoundType) {
		if (!avatarRoundType) throw new Error('Falta el parámetro "avatarRoundType"');

		switch (avatarRoundType) {
			case 'circle':
				this.avatarRound = 50;
				break;

			case 'rounded square':
				this.avatarRound = 30;
				break;

			case 'square':
				this.avatarRound = 0;
				break;

			default: {
				if (typeof avatarRoundType != 'number')
					throw new TypeError('Debe escribir un tipo válido de redondeo');

				this.avatarRound = avatarRoundType;
			}
		}
		return this;
	}

	/**
	 * Sets the background of the card to the given URL.
	 * @param {string} url - the URL of the image to set as the background.
	 * @returns {RankCard}
	 */
	setBackground(url) {
		if (!url) throw new Error('Falta el parámetro "url"');

		if (typeof url != 'string') throw new TypeError('El url debe ser un string');
		this.background = url;

		return this;
	}

	/**
	 * Sets the color of the XP & level box to the given hex value.
	 * @param {string} hex - the hex value to set the box color to.
	 * @returns {RankCard}
	 */
	setBoxColor(hex) {
		if (!hex) throw new Error('Falta el parámetro "hex"');

		if (typeof hex != 'string' || !/^#[0-9a-f]{6}$/i.test(hex))
			throw new TypeError('El "hex" debe ser un código HEX válido (ej: #ababab)');

		this.boxColor = hex;
		return this;
	}

	/**
	 * Sets the fill of the level bar to the given hex color.
	 * @param {string} hex - the hex color to set the fill to.
	 * @returns {RankCard}
	 */
	setLevelBarFill(hex) {
		if (!hex) throw new Error('Falta el parámetro "hex"');

		if (typeof hex != 'string' || !/^#[0-9a-f]{6}$/i.test(hex))
			throw new TypeError('El "hex" debe ser un código HEX válido (ej: #ababab)');

		this.levelBarFill = hex;
		return this;
	}

	/**
	 * Sets the background color of the level bar.
	 * @param {string} hex - the hex color to set the background to.
	 * @returns {RankCard}
	 */
	setLevelBarBackground(hex) {
		if (!hex) throw new Error('Falta el parámetro "hex"');

		if (typeof hex != 'string' || !/^#[0-9a-f]{6}$/i.test(hex))
			throw new TypeError('El "hex" debe ser un código HEX válido (ej: #ababab)');

		this.levelBarBackground = hex;
		return this;
	}

	/**
	 * Sets the rank of the user.
	 * @param {number} position - the position of the user in the leaderboard.
	 * @returns {RankCard}
	 */
	setRank(position) {
		if (!position) throw new Error('Falta el parametro "position"');
		if (typeof position != 'number') throw new TypeError('"position" debe ser un número');

		this.rank = position;
		return this;
	}

	/**
	 * Sets the XP of the user.
	 * @param {number} xp - the amount of XP to set the user's XP to.
	 * @returns {RankCard}
	 */
	setXP(xp = 0) {
		if (xp == null || xp == undefined) throw new Error('Falta el parametro "xp"');
		if (typeof xp != 'number') throw new TypeError('"xp" debe ser un número');

		if (this.requiredXP && this.requiredXP < xp)
			throw new Error('La XP debe ser menor al requiredXP');

		this.xp = xp;
		return this;
	}

	/**
	 * Sets the required XP for the next level.
	 * @param {number} requiredXp - the required XP for the next level.
	 * @returns {RankCard}
	 */
	setRequiredXP(requiredXp) {
		if (requiredXp == null || requiredXp == undefined)
			throw new Error('Falta el parametro "requiredXp"');
		if (typeof requiredXp != 'number') throw new TypeError('"requiredXp" debe ser un número');

		if (this.xp && this.xp > requiredXp) throw new Error('La XP debe ser menor al "requiredXP"');

		this.requiredXP = requiredXp;
		return this;
	}

	/**
	 * Sets the level of the user
	 * @param {number} level - the level of the user
	 * @returns {RankCard}
	 */
	setLevel(level) {
		if (level == null || level == undefined) throw new Error('Falta el parametro "level"');
		if (typeof level != 'number') throw new TypeError('"level" debe ser un número');

		this.level = level;
		return this;
	}

	/**
	 * Sets the radius of the level bar.
	 * @param {number} radius - the radius of the level bar.
	 * @returns {RankCard}
	 */
	setlevelBarRadius(radius) {
		if (!radius) throw new Error('Falta el parametro "radius"');
		if (typeof radius != 'number') throw new TypeError('"radius" debe ser un número');

		this.barRadius = radius;
		return this;
	}

	/**
	 * Sets the XP text template
	 * @param {string} template - the template to use
	 * @returns {RankCard}
	 */
	setTextXPNeeded(template) {
		if (!template) throw new Error('Falta el parametro "template"');
		if (typeof template != 'string') throw new TypeError('El "template" debe ser un string');

		if (!template.includes('{current}') || !template.includes('{needed}'))
			throw new TypeError('"template" debe tener las variables {current} y {needed}');

		this.textXPNeeded = template;
		return this;
	}

	/**
	 * Takes in a function that takes in a message attachment and a name for the attachment,
	 * and returns a promise that resolves to a message attachment.
	 * @param {boolean} toMessageAttachment - the function that takes in a message attachment and
	 * returns a promise that resolves to a message attachment.
	 * @param {string} [attachmentName='level.png'] - the name of the attachment.
	 * @returns {Promise<MessageAttachment|Buffer>} - a promise that resolves to a message attachment.
	 */
	// @ts-ignore
	async buildImage(toMessageAttachment, attachmentName = 'level.png') {
		if (!this.avatar) throw new Error('Falta configurar el avatar');
		if (!this.background) throw new Error('Falta configurar el background');
		if (typeof this.level != 'number') throw new Error('Falta configurar el level');
		if (typeof this.rank != 'number') throw new Error('Falta configurar el rank');
		if (typeof this.requiredXP != 'number') throw new Error('Falta configurar el requiredXP');
		if (!this.username) throw new Error('Falta configurar el username');
		if (typeof this.xp != 'number') throw new Error('Falta configurar el xp');

		const canvas = createCanvas(1080, 400);
		const ctx = canvas.getContext('2d');

		const BG_RADIUS = 30;

		ctx.beginPath();
		ctx.moveTo(BG_RADIUS, 0);
		ctx.lineTo(1080 - BG_RADIUS, 0);
		ctx.quadraticCurveTo(1080, 0, 1080, BG_RADIUS);
		ctx.lineTo(1080, 400 - BG_RADIUS);
		ctx.quadraticCurveTo(1080, 400, 1080 - BG_RADIUS, 400);

		ctx.lineTo(BG_RADIUS, 400);
		ctx.quadraticCurveTo(0, 400, 0, 400 - BG_RADIUS);
		ctx.lineTo(0, BG_RADIUS);
		ctx.quadraticCurveTo(0, 0, BG_RADIUS, 0);
		ctx.closePath();
		ctx.clip();
		ctx.fillStyle = '#000000';
		ctx.fillRect(0, 0, 1080, 400);

		const background = await loadImage(this.background);
		cover(background, 0, 0, 1080, 400).render(ctx);

		ctx.fillStyle = '#00000066';
		ctx.textAlign = 'center';
		ctx.fillRect(0, 0, 1080, 400);

		ctx.restore();

		ctx.fillStyle = '#000000';
		ctx.globalAlpha = 0.4;
		ctx.fillRect(40, 0, 240, canvas.height);
		ctx.globalAlpha = 1;

		const avatar = await loadImage(this.avatar);
		ctx.save();
		this.roundedBox(ctx, 70, 30, 180, 180, this.avatarRound);
		ctx.strokeStyle = '#BFC85A22';
		ctx.stroke();
		ctx.clip();
		ctx.drawImage(avatar, 40 + 30, 30, 180, 180);
		ctx.restore();

		ctx.save();
		this.roundedBox(ctx, 40 + 30, 30 + 180 + 30, 180, 50, 10);
		ctx.strokeStyle = '#BFC85A22';
		ctx.stroke();
		ctx.clip();
		ctx.fillStyle = this.boxColor;
		ctx.globalAlpha = 1;
		ctx.fillRect(40 + 30, 30 + 180 + 30, 180, 50);
		ctx.globalAlpha = 1;
		ctx.fillStyle = '#ffffff';
		ctx.font = 'bold 32px "DejaVu Sans Condensed", "Arial Unicode MS", segoe-ui-emoji, Sans';
		ctx.textAlign = 'center';
		ctx.fillText(
			'Lvl: ' + this.abbreviateNumber(this.level),
			40 + 30 + 180 / 2,
			30 + 180 + 30 + 38
		);
		ctx.restore();

		ctx.save();
		this.roundedBox(ctx, 40 + 30, 30 + 180 + 30 + 50 + 30, 180, 50, 10);
		ctx.strokeStyle = '#BFC85A22';
		ctx.stroke();
		ctx.clip();
		ctx.fillStyle = this.boxColor;
		ctx.globalAlpha = 1;
		ctx.fillRect(40 + 30, 30 + 180 + 30 + 50 + 30, 180, 50);
		ctx.globalAlpha = 1;
		ctx.fillStyle = '#ffffff';
		ctx.font = 'bold 32px "DejaVu Sans Condensed", "Arial Unicode MS", segoe-ui-emoji, Sans';
		ctx.textAlign = 'center';
		ctx.fillText(
			'XP: ' + this.abbreviateNumber(this.xp),
			40 + 30 + 180 / 2,
			30 + 180 + 30 + 30 + 50 + 38
		);
		ctx.restore();

		ctx.save();
		ctx.textAlign = 'left';
		ctx.fillStyle = '#ffffff';
		ctx.shadowColor = '#000000dd';
		ctx.shadowBlur = 15;
		ctx.shadowOffsetX = 1;
		ctx.shadowOffsetY = 1;
		ctx.font = 'bold 40px "DejaVu Sans Condensed", "Arial Unicode MS", segoe-ui-emoji, Sans';
		ctx.fillText(this.username, 390, 180 - 10);
		ctx.restore();

		ctx.save();
		ctx.textAlign = 'right';
		ctx.fillStyle = '#ffffff';
		ctx.shadowColor = '#000000dd';
		ctx.shadowBlur = 15;
		ctx.shadowOffsetX = 1;
		ctx.shadowOffsetY = 1;
		ctx.font = 'bold 50px "DejaVu Sans Condensed", "Arial Unicode MS", segoe-ui-emoji, Sans';
		ctx.fillText('#' + this.rank, canvas.width - 50 - 5, 180 - 10);
		ctx.restore();

		ctx.save();
		this.roundedBox(ctx, 390, 245 - 50, 660, 50, this.barRadius);
		ctx.strokeStyle = '#BFC85A22';
		ctx.stroke();
		ctx.clip();
		ctx.fillStyle = this.levelBarBackground;
		ctx.globalAlpha = 0.2;
		ctx.fillRect(390, 245 - 50, 660, 50);
		ctx.restore();

		const percent = (100 * this.xp) / this.requiredXP;
		const progress = (percent * 660) / 100;

		ctx.save();
		this.roundedBox(ctx, 390, 245 - 50, progress, 50, this.barRadius);
		ctx.strokeStyle = '#BFC85A22';
		ctx.stroke();
		ctx.clip();
		ctx.fillStyle = this.levelBarFill;
		ctx.globalAlpha = 0.5;
		ctx.fillRect(390, 245 - 50, progress, 50);
		ctx.restore();

		ctx.save();
		ctx.textAlign = 'left';
		ctx.fillStyle = '#ffffff';
		ctx.globalAlpha = 0.8;
		ctx.font = 'bold 30px "DejaVu Sans Condensed", "Arial Unicode MS", segoe-ui-emoji, Sans';
		ctx.fillText('Siguiente nivel: ' + this.abbreviateNumber(this.requiredXP), 390, 330 - 50);
		ctx.restore();

		const latestXP = this.xp - this.requiredXP;
		const textXPEdited = this.textXPNeeded
			.replace(/{needed}/g, `${this.abbreviateNumber(this.requiredXP)}`)
			.replace(/{current}/g, `${this.abbreviateNumber(this.xp)}`)
			.replace(/{latest}/g, `${this.abbreviateNumber(latestXP)}`);
		ctx.textAlign = 'center';
		ctx.fillStyle = '#313338';
		ctx.globalAlpha = 1;
		ctx.font = 'bold 30px "DejaVu Sans Condensed", "Arial Unicode MS", segoe-ui-emoji, Sans';
		ctx.fillText(textXPEdited, 730, 280 - 50);

		const buffer = canvas.toBuffer();
		if (toMessageAttachment == true) return new MessageAttachment(buffer, attachmentName);
		else return buffer;
	}

	/**
	 * Draws a rounded box around the given area.
	 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
	 * @param {number} x - The x coordinate of the top left corner of the box.
	 * @param {number} y - The y coordinate of the top left corner of the box.
	 * @param {number} width - The width of the box.
	 * @param {number} height - The height of the box.
	 * @param {number} radius - The radius of the corners of the box.
	 * @returns None
	 * @private
	 */
	roundedBox(ctx, x, y, width, height, radius) {
		ctx.beginPath();
		ctx.moveTo(x + radius, y);
		ctx.lineTo(x + width - radius, y);
		ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
		ctx.lineTo(x + width, y + height - radius);
		ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
		ctx.lineTo(x + radius, y + height);
		ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
		ctx.lineTo(x, y + radius);
		ctx.quadraticCurveTo(x, y, x + radius, y);
		ctx.closePath();
	}

	/**
	 * Takes in a number and returns a string with the number abbreviated.
	 * @param {number} num - the number to abbreviate
	 * @returns {string|number} - the abbreviated number
	 * @private
	 */
	abbreviateNumber(num) {
		if (num >= 1000000000) {
			return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
		}
		if (num >= 1000000) {
			return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
		}
		if (num >= 1000) {
			return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
		}
		return num;
	}
};

/**
 * @typedef RankOptions
 * @prop {string} [background] El fondo de la tarjeta
 * @prop {string} [username] El nombre de usuario
 * @prop {'circle'|'rounded square'|'square'|number} [avatarRoundType] La forma del avatar
 * @prop {string} [avatar] El avatar de usuario (JPG/PNG)
 * @prop {`#${string}`} [boxColor] El color de los cuadros de nivel y XP
 * @prop {`#${string}`} [levelBarFill] El relleno de la barra de XP
 * @prop {`#${string}`} [levelBarBackground] El fondo de la barra de XP
 * @prop {number} [rank] La posición del usuario en la tabla de clasificación
 * @prop {number} [xp] Los puntos de experiencia del usuario
 * @prop {number} [requiredXP] La XP que necesita para subir de nivel
 * @prop {number} [level] El nivel del usuario
 * @prop {number} [barRadius] El redondeo de la barra de XP
 * @prop {string} [textXPNeeded] La plantilla del texto de XP: {current}/{needed}
 */
