import { error } from '@sveltejs/kit';
import { work } from '#lib/work/index.js';
import type { PageLoad } from './$types';

export const entries = () => work.map((entry) => ({ slug: entry.slug }));

export const load: PageLoad = ({ params }) => {
	if (!work.some((entry) => entry.slug === params.slug)) error(404, 'Not found');
	return { slug: params.slug };
};
