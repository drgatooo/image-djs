export = Welcomer;
declare class Welcomer {
    /**
     * Crea una nueva tarjeta de bienvenida
     * @param {WelcomerOptions} options
     */
    constructor(options: WelcomerOptions);
    /**
     * Configura todos los parametros pasados en el constructor
     * @param {WelcomerOptions} options
     */
    _setup(options: WelcomerOptions): Promise<void>;
    background: string | Buffer;
    avatar: string | Buffer;
    username: string;
    borderColor: string;
    subtitle: string;
    font: string;
    /**
     * Cambia el fondo de la tarjeta de bienvenida
     * @param {string|Buffer} background Una URL o un Buffer de una imagen. Solo PNG/JPG
     * @returns {Welcomer}
     */
    setBackground(background: string | Buffer): Welcomer;
    /**
     * Cambia el avatar del usuario
     * @param {string|Buffer} avatar Una URL o un Buffer de una imagen. Solo PNG/JPG
     * @returns {Welcomer}
     */
    setAvatar(avatar: string | Buffer): Welcomer;
    /**
     * Cambia el nombre del usuario
     * @param {string} username El nombre de usuario. Puede ser también el TAG
     * @returns {Welcomer}
     */
    setUsername(username: string): Welcomer;
    /**
     * Cambia el borde de la imagen
     * @param {`#${string}`} hex Color hex para el borde
     * @returns {Welcomer}
     */
    setBorderColor(hex: `#${string}`): Welcomer;
    /**
     * Cambia el subtítulo de la tarjeta
     * @param {string} text El subtítulo xd
     * @returns {Welcomer}
     */
    setSubtitle(text: string): Welcomer;
    /**
     * Cambia la fuente de la tarjeta. Importala previamente con canvas
     * @param {string} fontName Escribe el nombre de una fuente. Ej: "bold 18px 'Segoe UI'"
     * @returns {Welcomer}
     */
    setFont(fontName: string): Welcomer;
    /**
     * Construye la tarjeta de bienvenida
     * @param {boolean} [toAttachment] Retorna un MessageAttachment o un Buffer
     * @param {string} [attachmentName] Cambia el nombre del MessageAttachment
     * @returns {Promise<MessageAttachment | Buffer>}
     */
    build(toAttachment?: boolean, attachmentName?: string): Promise<MessageAttachment | Buffer>;
}
declare namespace Welcomer {
    export { WelcomerOptions };
}
type WelcomerOptions = {
    background: string | Buffer;
    avatarURL: string;
    username: string;
    borderColor?: string;
    subtitle?: string;
    font?: string;
};
import { MessageAttachment } from "discord.js";
