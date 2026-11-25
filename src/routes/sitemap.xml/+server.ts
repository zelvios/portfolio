import { baseLocale, locales, localizeHref } from '#lib/paraglide/runtime.js';
import { work } from '#lib/work/index.js';

export const prerender = true;

const site = 'https://jacob-j.com';

const pages = ['/', '/about', '/work', '/contact', ...work.map((entry) => `/work/${entry.slug}`)];

const link = (hreflang: string, path: string) =>
	`<xhtml:link rel="alternate" hreflang="${hreflang}" href="${site}${path}"/>`;

export function GET() {
	const urls = pages
		.flatMap((path) => {
			const alternates = [
				...locales.map((locale) => link(locale, localizeHref(path, { locale }))),
				link('x-default', localizeHref(path, { locale: baseLocale }))
			].join('');
			return locales.map(
				(locale) => `<url><loc>${site}${localizeHref(path, { locale })}</loc>${alternates}</url>`
			);
		})
		.join('');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`;

	return new Response(xml, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' }
	});
}
