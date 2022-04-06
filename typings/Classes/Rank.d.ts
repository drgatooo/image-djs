export = RankCard;
declare class RankCard {
    /**
     * Crea una tarjeta de niveles
     * @param {RankOptions} [options]
     */
    constructor(options?: RankOptions);
    /**
     * Configura la tarjeta usando un objeto
     * @param {RankOptions} options
     * @private
     */
    private setup;
    avatar: string;
    avatarRound: number;
    background: string;
    barRadius: number;
    boxColor: string;
    level: number;
    levelBarBackground: string;
    levelBarFill: string;
    rank: number;
    requiredXP: number;
    textXPNeeded: string;
    username: string;
    xp: number;
    /**
     * Sets the user's avatar to the given URL.
     * @param {string} url - the URL of the avatar to set.
     * @returns {RankCard}
     */
    setAvatar(url: string): RankCard;
    /**
     * Sets the username of the user.
     * @param {string} username - the username to set the user to.
     * @returns {RankCard}
     */
    setUsername(username: string): RankCard;
    /**
     * Sets the avatar round type.
     * @param {'circle'|'rounded square'|'square'|number} avatarRoundType - the avatar round type to set.
     * @returns {RankCard}
     */
    setAvatarRoundType(avatarRoundType: 'circle' | 'rounded square' | 'square' | number): RankCard;
    /**
     * Sets the background of the card to the given URL.
     * @param {string} url - the URL of the image to set as the background.
     * @returns {RankCard}
     */
    setBackground(url: string): RankCard;
    /**
     * Sets the color of the XP & level box to the given hex value.
     * @param {string} hex - the hex value to set the box color to.
     * @returns {RankCard}
     */
    setBoxColor(hex: string): RankCard;
    /**
     * Sets the fill of the level bar to the given hex color.
     * @param {string} hex - the hex color to set the fill to.
     * @returns {RankCard}
     */
    setLevelBarFill(hex: string): RankCard;
    /**
     * Sets the background color of the level bar.
     * @param {string} hex - the hex color to set the background to.
     * @returns {RankCard}
     */
    setLevelBarBackground(hex: string): RankCard;
    /**
     * Sets the rank of the user.
     * @param {number} position - the position of the user in the leaderboard.
     * @returns {RankCard}
     */
    setRank(position: number): RankCard;
    /**
     * Sets the XP of the user.
     * @param {number} xp - the amount of XP to set the user's XP to.
     * @returns {RankCard}
     */
    setXP(xp: number): RankCard;
    /**
     * Sets the required XP for the next level.
     * @param {number} requiredXp - the required XP for the next level.
     * @returns {RankCard}
     */
    setRequiredXP(requiredXp: number): RankCard;
    /**
     * Sets the level of the user
     * @param {number} level - the level of the user
     * @returns {RankCard}
     */
    setLevel(level: number): RankCard;
    /**
     * Sets the radius of the level bar.
     * @param {number} radius - the radius of the level bar.
     * @returns {RankCard}
     */
    setlevelBarRadius(radius: number): RankCard;
    /**
     * Sets the XP text template
     * @param {string} template - the template to use
     * @returns {RankCard}
     */
    setTextXPNeeded(template: string): RankCard;
    /**
     * Takes in a function that takes in a message attachment and a name for the attachment,
     * and returns a promise that resolves to a message attachment.
     * @param {boolean} toMessageAttachment - the function that takes in a message attachment and
     * returns a promise that resolves to a message attachment.
     * @param {string} [attachmentName='level.png'] - the name of the attachment.
     * @returns {Promise<MessageAttachment|Buffer>} - a promise that resolves to a message attachment.
     */
    buildImage(toMessageAttachment: boolean, attachmentName?: string): Promise<MessageAttachment | Buffer>;
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
    private roundedBox;
    /**
     * Takes in a number and returns a string with the number abbreviated.
     * @param {number} num - the number to abbreviate
     * @returns {string|number} - the abbreviated number
     * @private
     */
    private abbreviateNumber;
}
declare namespace RankCard {
    export { RankOptions };
}
import { MessageAttachment } from "discord.js";
type RankOptions = {
    /**
     * El fondo de la tarjeta
     */
    background?: string;
    /**
     * El nombre de usuario
     */
    username?: string;
    /**
     * La forma del avatar
     */
    avatarRoundType?: 'circle' | 'rounded square' | 'square' | number;
    /**
     * El avatar de usuario (JPG/PNG)
     */
    avatar?: string;
    /**
     * El color de los cuadros de nivel y XP
     */
    boxColor?: `#${string}`;
    /**
     * El relleno de la barra de XP
     */
    levelBarFill?: `#${string}`;
    /**
     * El fondo de la barra de XP
     */
    levelBarBackground?: `#${string}`;
    /**
     * La posición del usuario en la tabla de clasificación
     */
    rank?: number;
    /**
     * Los puntos de experiencia del usuario
     */
    xp?: number;
    /**
     * La XP que necesita para subir de nivel
     */
    requiredXP?: number;
    /**
     * El nivel del usuario
     */
    level?: number;
    /**
     * El redondeo de la barra de XP
     */
    barRadius?: number;
    /**
     * La plantilla del texto de XP: {current}/{needed}
     */
    textXPNeeded?: string;
};
