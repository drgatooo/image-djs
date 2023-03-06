import type { Stream } from 'stream';
import { basename, flatten } from './utils';

type BufferResolvable = Buffer | string;
interface AttachmentData {
	name: string;
	description?: string;
}

/**
 * Represents an attachment builder
 */
export class AttachmentBuilder {
	name: string;
	description: string | undefined;

	public constructor(public attachment: BufferResolvable | Stream, data: AttachmentData) {
		this.name = data.name;
		this.description = data.description;
	}

	public setDescription(description: string): AttachmentBuilder {
		this.description = description;
		return this;
	}

	public setFile(attachment: BufferResolvable | Stream): AttachmentBuilder {
		this.attachment = attachment;
		return this;
	}

	public setName(name: string): AttachmentBuilder {
		this.name = name;
		return this;
	}

	public setSpoiler(spoiler: boolean = true): AttachmentBuilder {
		if (spoiler === this.spoiler) return this;

		if (!spoiler) {
			while (this.spoiler) {
				this.name = this.name.slice('SPOILER_'.length);
			}
			return this;
		}
		this.name = `SPOILER_${this.name}`;
		return this;
	}

	public get spoiler() {
		return basename(this.name).startsWith('SPOILER_');
	}

	public toJSON() {
		return flatten(this);
	}

	static from(other: JSONEncodable<AttachmentPayload>): AttachmentBuilder {
		return new AttachmentBuilder(other.attachment, {
			name: other.name,
			description: other.description
		});
	}
}

type JSONEncodable<T> = T & {
	toJSON(): T;
};

export interface AttachmentPayload {
	name: string;
	description: string;
	attachment: BufferResolvable | Stream;
}
