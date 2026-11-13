import type { Picture } from '@sveltejs/enhanced-img';
import * as m from '#lib/paraglide/messages.js';

const images = import.meta.glob<Picture>('/src/lib/assets/highlights/*.png', {
	eager: true,
	import: 'default',
	query: { enhanced: true, w: '1200;800;500' }
});
const image = (name: string) => {
	const found = images[`/src/lib/assets/highlights/${name}.png`];
	if (!found) throw new Error(`Missing work image: ${name}`);
	return found;
};

export interface WorkEntry {
	slug: string;
	kind: 'experience' | 'project';
	name: string;
	summary: () => string;
	tag: string;
	date: string;
	dateEnd?: string;
	image?: Picture;
	repo?: string;
}

export const work: WorkEntry[] = [
	{
		slug: 'pakkecenternord',
		kind: 'experience',
		name: 'PakkecenterNORD',
		summary: m.work_pcn_summary,
		tag: 'C# - Razor - Blazor - SQL Server',
		date: 'Nov 2025',
		dateEnd: 'Jan 2027'
	},
	{
		slug: 'sensecare',
		kind: 'project',
		name: 'SenseCare',
		summary: m.hl_1_title,
		tag: 'ESP32 - Rust - SvelteKit - PostgreSQL',
		date: '2026',
		image: image('sensecare-2'),
		repo: 'https://github.com/zelvios/sensecare'
	},
	{
		slug: 'portfolio',
		kind: 'project',
		name: 'jacob-j.com',
		summary: m.hl_2_title,
		tag: 'SvelteKit - Tailwind - Paraglide',
		date: '2026',
		image: image('portfolio-1'),
		repo: 'https://github.com/zelvios/portfolio'
	}
];
