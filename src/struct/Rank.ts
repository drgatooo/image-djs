import { createCanvas, loadImage } from 'canvas';
import { AttachmentBuilder } from 'discord.js';
import cover from 'canvas-image-cover';
import { join } from 'path';

export class Rank {
	avatar: string = join(__dirname, '..', '..', 'assets', 'avatar.png');
	avatarRoundStyle: number = 50;
	background: string = join(__dirname, '..', '..', 'assets', 'RankBG.jpg');
	barRadius: number = 15;
	boxColor: `#${string}` = '#323740';
	level!: number;
	levelBarBackground: `#${string}` = '#ffffff';
	levelBarFill: `#${string}` = '#ffffff';
	nextLevelTemplate: string = 'Next Level: {nextLevel}';
	rank!: number;
	requiredXP!: number;
	textXpTemplate: string = 'XP: {current}/{needed}';
	username!: string;
	xp!: number;

	public constructor(options?: Partial<RankOptions>) {
		if (options) this.setup(options);
	}

	private setup(options: Partial<RankOptions>) {
		if (!options) throw new Error('No options provided.');
		if (options.avatar) {
			this.setAvatar(options.avatar);
		}
		if (options.avatarRoundStyle) {
			this.setAvatarRoundStyle(options.avatarRoundStyle);
		}
		if (options.background) {
			this.setBackground(options.background);
		}
		if (options.barRadius) {
			this.setLevelBarRadius(options.barRadius);
		}
		if (options.boxColor) {
			this.setBoxColor(options.boxColor);
		}
		if (options.level) {
			this.setLevel(options.level);
		}
		if (options.levelBarBackground) {
			this.setLevelBarBackground(options.levelBarBackground);
		}
		if (options.levelBarFill) {
			this.setLevelBarFill(options.levelBarFill);
		}
		if (options.nextLevelTemplate) {
			this.setNextLevelTemplate(options.nextLevelTemplate);
		}
		if (options.rank) {
			this.setRank(options.rank);
		}
		if (options.requiredXP) {
			this.setRequiredXP(options.requiredXP);
		}
		if (options.textXpTemplate) {
			this.setTextXpTemplate(options.textXpTemplate);
		}
		if (options.username) {
			this.setUsername(options.username);
		}
		if (options.xp) {
			this.setXp(options.xp);
		}
	}

	public setAvatar(avatar: string) {
		if (typeof avatar != 'string') throw new TypeError('Avatar must be a string.');
		this.avatar = avatar;
		return this;
	}

	public setAvatarRoundStyle(avatarRoundStyle: AvatarRoundStyle) {
		if (typeof avatarRoundStyle != 'string' && typeof avatarRoundStyle != 'number')
			throw new TypeError('AvatarRoundStyle must be a string or number.');

		const validAvatarRoundStyles = ['circle', 'rounded', 'square'];
		if (typeof avatarRoundStyle == 'string' && !validAvatarRoundStyles.includes(avatarRoundStyle))
			throw new TypeError('AvatarRoundStyle must be a valid AvatarRoundStyle.');

		switch (avatarRoundStyle) {
			case 'circle':
				this.avatarRoundStyle = 50;
				break;

			case 'roundedSquare':
				this.avatarRoundStyle = 30;
				break;

			case 'square':
				this.avatarRoundStyle = 0;
				break;

			default: {
				if (typeof avatarRoundStyle != 'number')
					throw new TypeError('AvatarRoundStyle must be a valid round style or number.');

				this.avatarRoundStyle = avatarRoundStyle;
			}
		}

		return this;
	}

	public setBackground(url: string) {
		if (typeof url != 'string') throw new TypeError('URL must be a string.');
		this.background = url;
		return this;
	}

	public setLevelBarRadius(radius: number) {
		if (typeof radius != 'number') throw new TypeError('Radius must be a number.');
		this.barRadius = radius;
		return this;
	}

	public setBoxColor(color: `#${string}`) {
		if (typeof color != 'string') throw new TypeError('Color must be a string.');
		if (!color.startsWith('#') || color.length != 7)
			throw new TypeError('Color must be a valid HEX color.');
		this.boxColor = color;
		return this;
	}

	public setLevel(level: number) {
		if (typeof level != 'number') throw new TypeError('Level must be a number.');
		this.level = level;
		return this;
	}

	public setLevelBarBackground(color: `#${string}`) {
		if (typeof color != 'string') throw new TypeError('Color must be a string.');
		if (!color.startsWith('#') || color.length != 7)
			throw new TypeError('Color must be a valid HEX color.');
		this.levelBarBackground = color;
		return this;
	}

	public setLevelBarFill(color: `#${string}`) {
		if (typeof color != 'string') throw new TypeError('Color must be a string.');
		if (!color.startsWith('#') || color.length != 7)
			throw new TypeError('Color must be a valid HEX color.');
		this.levelBarFill = color;
		return this;
	}

	public setNextLevelTemplate(template: string) {
		if (typeof template != 'string') throw new TypeError('Template must be a string.');
		if (!template.includes('{rqeuiredXP}'))
			throw new TypeError('Template must include {rqeuiredXP}.');
		this.nextLevelTemplate = template;
		return this;
	}

	public setRank(rank: number) {
		if (typeof rank != 'number') throw new TypeError('Rank must be a number.');
		this.rank = rank;
		return this;
	}

	public setRequiredXP(requiredXP: number) {
		if (typeof requiredXP != 'number') throw new TypeError('RequiredXP must be a number.');
		this.requiredXP = requiredXP;
		return this;
	}

	public setTextXpTemplate(template: string) {
		if (typeof template != 'string') throw new TypeError('Template must be a string.');
		if (!template.includes('{current}') || !template.includes('{needed}'))
			throw new TypeError('Template must include {requiredXP} and {needed}.');
		this.textXpTemplate = template;
		return this;
	}

	public setUsername(username: string) {
		if (typeof username != 'string') throw new TypeError('Username must be a string.');
		this.username = username;
		return this;
	}

	public setXp(xp: number) {
		if (typeof xp != 'number') throw new TypeError('XP must be a number.');
		this.xp = xp;
		return this;
	}

	public async render(toAttachment: true, attachmentName?: string): Promise<AttachmentBuilder>;
	public async render(toAttachment: false, attachmentName?: string): Promise<Buffer>;
	public async render(toAttachment: boolean, attachmentName?: string) {
		if (!this.level) throw new Error('Level is not set.');
		if (!this.rank) throw new Error('Rank is not set.');
		if (!this.requiredXP) throw new Error('RequiredXP is not set.');
		if (!this.username) throw new Error('Username is not set.');
		if (!this.xp) throw new Error('XP is not set.');

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
		this.roundedBox(ctx, 70, 30, 180, 180, this.avatarRoundStyle);
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

		const nextLevelText = this.nextLevelTemplate.replaceAll(
			/{requiredXP}/g,
			`${this.abbreviateNumber(this.requiredXP - this.xp)} xp`
		);

		ctx.save();
		ctx.textAlign = 'left';
		ctx.fillStyle = '#ffffff';
		ctx.globalAlpha = 0.8;
		ctx.font = 'bold 30px "DejaVu Sans Condensed", "Arial Unicode MS", segoe-ui-emoji, Sans';
		ctx.fillText(nextLevelText, 390, 330 - 50);
		ctx.restore();

		const latestXP = this.xp - this.requiredXP;
		const textXPEdited = this.textXpTemplate
			.replace(/{needed}/g, `${this.abbreviateNumber(this.requiredXP)}`)
			.replace(/{current}/g, `${this.abbreviateNumber(this.xp)}`)
			.replace(/{latest}/g, `${this.abbreviateNumber(latestXP)}`);

		ctx.textAlign = 'center';
		ctx.fillStyle = '#313338';
		ctx.globalAlpha = 1;
		ctx.font = 'bold 30px "DejaVu Sans Condensed", "Arial Unicode MS", segoe-ui-emoji, Sans';
		ctx.fillText(textXPEdited, 730, 280 - 50);

		if (toAttachment == true)
			return new AttachmentBuilder(canvas.toBuffer(), { name: attachmentName || 'ping.png' });
		else return canvas.toBuffer();
	}

	private roundedBox(
		ctx: CanvasRenderingContext2D,
		x: number,
		y: number,
		width: number,
		height: number,
		radius: number
	) {
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

	private abbreviateNumber(num: number) {
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
}

interface RankOptions {
	/** Card Background */
	background: string;
	/** The user's username */
	username: string;
	/** Avatar round style */
	avatarRoundStyle: AvatarRoundStyle;
	/** User's avatar */
	avatar: string;
	/** User box fill color */
	boxColor: `#${string}`;
	/** Level progress bar foreground */
	levelBarFill: `#${string}`;
	/** Level progress bar background */
	levelBarBackground: `#${string}`;
	/** User rank in leaderboard */
	rank: number;
	/** User's level */
	level: number;
	/** User's XP */
	xp: number;
	/** Required XP to reach new level */
	requiredXP: number;
	/** Progress bar radius */
	barRadius: number;
	/** Progress bar text template. Example: {current}/{needed} */
	textXpTemplate: string;
	/** Next level text template. Example: "Next level: {requiredXP}" */
	nextLevelTemplate: string;
}

type AvatarRoundStyle = 'circle' | 'square' | 'roundedSquare' | number;
