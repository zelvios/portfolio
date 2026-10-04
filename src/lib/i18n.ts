import { localizeHref, type Locale } from '#lib/paraglide/runtime.js';

export function href(path: string, locale?: Locale): string {
	const out = localizeHref(path, locale ? { locale } : undefined);
	return out.length > 1 ? out.replace(/\/$/, '') : out;
}
