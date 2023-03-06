import { parse } from 'path';

export const isObject = (d: unknown) => typeof d === 'object' && d !== null;

export function basename(path: string, ext?: string) {
	const res = parse(path);
	return ext && res.ext.startsWith(ext) ? res.name : res.base.split('?')[0] || res.name;
}

export function flatten(obj: object, ...props: Array<Record<string, boolean | string>>) {
	const res: Record<string, unknown> = {};
	for (const [key, value] of Object.entries(obj)) {
		if (isObject(value)) {
			Object.assign(res, flatten(value as Record<string, unknown>, ...props));
		} else {
			res[key] = value;
		}
	}
	for (const prop of props) {
		Object.assign(res, prop);
	}
	return res;
}
