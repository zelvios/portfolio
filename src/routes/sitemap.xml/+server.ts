import { locales, localizeHref } from '#lib/paraglide/runtime.js';

export const prerender = true;

const site = 'https://jacob-j.com';

const pages = ['/', '/about', '/projects', '/contact'];

export function GET() {
	const urls = pages
		.flatMap((path) =>
			locales.map((locale) => {
				const alternates = locales
					.map(
						(alt) =>
							`<xhtml:link rel="alternate" hreflang="${alt}" href="${site}${localizeHref(path, { locale: alt })}"/>`
					)
					.join('');
				return `<url><loc>${site}${localizeHref(path, { locale })}</loc>${alternates}</url>`;
			})
		)
		.join('');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`;

	return new Response(xml, {
		headers: { 'Content-Type': 'application/xml' }
	});
}
