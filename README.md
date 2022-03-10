# 🎨 Image DJS

> ¡Un generador de imágenes para discord.js!

## Ejemplos

### Welcome

```javascript
const { Welcomer } = require('image-djs');
// typescript: import { Welcomer } from 'image-djs';
const file = new Welcomer()
	.setAvatar('https://c.tenor.com/bMJ1lh3r46gAAAAC/pfp.gif')
	.setBackground('https://i.pinimg.com/736x/33/75/00/33750046310a78fc55914a621c7e0991.jpg')
	.setBorderColor('#ababab')
	.setFont('32px "Segoe UI"')
	.setSubtitle('Bienvenido!')
	.setUsername('drgato')
	.build(true, 'welcomer-xd');

channel.send({ files: [file] });
```

> ⚠️ Próximamente más clases
