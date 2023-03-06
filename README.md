# 🎨 Image DJS

¡Un generador de imágenes para discord.js!

> ADVERTENCIA: Si va a usar este módulo para versiones de discord.js inferiores a la v14 recuerde cambiar los parámetros de la función .render

## Welcome

```javascript
const { Welcomer } = require('image-djs');
// typescript: import { Welcomer } from 'image-djs';
const wlc = await new Welcomer()
	.setAvatar(
		'https://cdn.discordapp.com/avatars/742460533818654791/6464bafb21a43c243867fa090642dacb.png?size=4096'
	)
	.setBackground('https://i.pinimg.com/736x/33/75/00/33750046310a78fc55914a621c7e0991.jpg')
	.setBorderColor('#bce784', 0.5)
	.setAvatarBorderColor('#ff4546')
	// .setUserFont('52px "Segoe UI"') | Debes cargar una fuente personalizada con canvas
	// .setSubtitleFont('32px "Segoe UI"') | Debes cargar una fuente personalizada con canvas
	.setSubtitle('👋 Bienvenido al servidor')
	.setUsername('drgato#0001');

// para discord.js v14
const attachment = await wlc.render(true, `welcomer-${user.id}.png`);
channel.send({ files: [attachment] });

// para discord.js v13
const buffer = await wlc.render(false);
const attachment = new MessageAttachment(buffer, `welcomer-${user.id}.png`);

channel.send({ files: [attachment] });

channel.send({ files: [file] });
```

### Ejemplo:

<img src="https://i.imgur.com/zpXMBfC.png" height="200px"/>

## Rank card

```javascript
const { Rank } = require('image-djs');
// typescript: import { Rank } from 'image-djs';

const rank = new Rank()
	.setBackground(
		'https://cdn.discordapp.com/banners/742460533818654791/2d15dbfefbabcc7dcc6d022eb6406522.png?size=4096'
	)
	.setAvatar(
		'https://cdn.discordapp.com/avatars/742460533818654791/6464bafb21a43c243867fa090642dacb.png?size=4096'
	)
	.setAvatarRoundStyle('roundedSquare')
	.setBoxColor('#9c89b8')
	.setLevelBarFill('#ffd166')
	.setLevelBarBackground('#466a91')
	.setLevelBarRadius(15)
	.setLevel(2)
	.setRank(1)
	.setRequiredXP(11150)
	.setTextXpTemplate('{current}/{needed} xp')
	.setNextLevelTemplate('Next level: {requiredXP}')
	.setUsername('drgato#0001')
	.setXp(1240)
	.setBadges(['HypeSquadBravery', 'ActiveDeveloper', 'Nitro', 'Booster24']);

// para discord.js v14
const attachment = await rank.render(true, `rank-${user.id}.png`);
channel.send({ files: [attachment] });

// para discord.js v13
const buffer = await rank.render(false);
const attachment = new MessageAttachment(buffer, `rank-${user.id}.png`);

channel.send({ files: [attachment] });
```

### Ejemplo:

<img src="https://i.imgur.com/c6UD4xU.png" height="200px"/>

## Ping

```javascript
const { Ping } = require('image-djs');
// typescript: import { Ping } from 'image-djs';
const file = await new Ping()
	.setIcon('https://i1.sndcdn.com/avatars-twM1pq6gSk4YzN4F-N4zKuw-t500x500.jpg')
	.build(true, 'ping.png');

channel.send({ files: [file] });
```

### Ejemplo:

<img src="https://i.imgur.com/zkqoQ3w.png" height="200px"/>

> ⚠️ Próximamente más clases... Reporta los bugs en el [GitHub](https://github.com/drgatoxd/image-djs/issues) del npm.
