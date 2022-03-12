export = Ping;
declare class Ping {
    /**
     * Configura la imagen con las opciones del constructor
     * @param {PingOptions} [options]
     */
    constructor(options?: PingOptions);
    /**
     * Configura la imagen con las opciones del constructor
     * @param {PingOptions} options
     * @private
     */
    private _setup;
    icon: string | Buffer;
    /**
     * Cambia el ícono del ping
     * @param {string|Buffer} icon El ícono de servidor o avatar de usuario (PNG/JPG)
     * @returns {Ping}
     */
    setIcon(icon: string | Buffer): Ping;
    /**
     * Construye la imagen final
     * @param {boolean} [toAttachment] Retorna un MessageAttachment o un Buffer
     * @param {string} [attachmentName] Cambia el nombre del MessageAttachment
     * @returns
     */
    build(toAttachment?: boolean, attachmentName?: string): Promise<Buffer | MessageAttachment>;
}
declare namespace Ping {
    export { PingOptions };
}
import { MessageAttachment } from "discord.js";
type PingOptions = {
    /**
     * El ícono del servidor o un avatar (PNG/JPG)
     */
    icon: string | Buffer;
};
