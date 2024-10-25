import { Entry } from '@/pages/api/blogs/davidBlogSummary';
import { getBlogInfo, getSummary } from '@/services/blogs';
import { SlugConverter } from '@/utilities';
import type { MetadataRoute } from 'next';

const JUMP_PAGE = 500;
const BASE_SITEMAP_ID = 'index';
const domain = process.env.DOMAIN || 'https://david.id.vn';
export async function generateSitemaps() {
    const blog = await getBlogInfo({ view: 'READER' }) ?? [];
    const totalItems = blog.posts?.totalItems ?? 0;
    const results = [
        { id: BASE_SITEMAP_ID },
        ...Array.from({ length: Math.ceil(totalItems / JUMP_PAGE) }, (_, i) => i + 1)
            .map((id) => ({ id: `sitemap-${id}` }))
    ];
    return results;
}

const STATIC_PAGES = [
    {
        url: `${domain}/`,
        changeFrequency: 'yearly' as 'yearly',
        priority: 1
    },
    {
        url: `${domain}/blogs`,
        changeFrequency: 'yearly' as 'yearly',
        priority: 1
    }
];

const mapToSlugPath = (item: Entry): MetadataRoute.Sitemap[0] | null => {
    const originLinkItem = item?.link?.find(link => link.rel === 'alternate');
    const originLink = originLinkItem?.href ?? '';
    const slug = `blogs/${SlugConverter.toPostSlug(originLink)}`;
    const newUrl = `${domain}/${slug}`;
    if(!newUrl) return null;
    return {
        url: newUrl,
        lastModified: item.updated?.$t ?? item.published?.$t ?? new Date().toISOString(),
        changeFrequency: 'weekly' as 'weekly',
        priority: 0.5
    };
};

export default async function sitemap({
    id
}: {
    id: string
}): Promise<MetadataRoute.Sitemap> {
    // // Google's limit is 50,000 URLs per sitemap
    // const start = id * 50000
    // const end = start + 50000

    // generate sitemap for static pages
    if (id === BASE_SITEMAP_ID) {

        const sitemaps = await generateSitemaps();
        return [
            ...STATIC_PAGES.map((item) => ({
                ...item,
                lastModified: new Date().toISOString()
            })),
            ...sitemaps.filter(sitemap => sitemap.id !== BASE_SITEMAP_ID).
                map((sitemap) => ({
                    url: `${domain}/${sitemap.id}.xml`,
                    lastModified: new Date().toISOString(),
                    changeFrequency: 'monthly' as 'monthly',
                    priority: 0.8,
                }))
        ];
    }

    // generate sitemap for blog posts
    const responses = await getSummary({ limit: JUMP_PAGE});
    const entries = responses?.data?.feed?.entry ?? [];
    return entries.map(mapToSlugPath).filter(Boolean) as MetadataRoute.Sitemap;
}