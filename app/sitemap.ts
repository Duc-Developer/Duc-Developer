import { getBlogInfo, getPosts } from '@/services/blogs';
import { SlugConverter } from '@/utilities';
import type { MetadataRoute } from 'next'

const JUMP_PAGE = 499;
export async function generateSitemaps() {
    const blog = await getBlogInfo({ view: 'READER' }, { http2: false }) ?? [];
    const totalItems = blog.posts?.totalItems ?? 0;
    const results = [
        { id: 'sitemap-0' },
        ...Array.from({ length: Math.ceil(totalItems / JUMP_PAGE) }, (_, i) => i + 1)
            .map((id) => ({ id: `sitemap-${id}` }))
    ];
    return results;
}

const STATIC_PAGES = [
    {
        url: `${process.env.DOMAIN}/`,
        changeFrequency: 'yearly' as 'yearly',
        priority: 1
    }
];

let pageToken: string | null | undefined = null;
export default async function sitemap({
    id
}: {
    id: string
}): Promise<MetadataRoute.Sitemap> {
    // // Google's limit is 50,000 URLs per sitemap
    // const start = id * 50000
    // const end = start + 50000

    // generate sitemap for static pages
    if (id === 'sitemap-0') {
        return STATIC_PAGES.map((item) => {
            return {
                ...item,
                lastModified: new Date().toISOString()
            };
        });
    }

    // generate sitemap for blog posts
    const params = {
        fetchImages: false,
        fetchBodies: false,
        view: 'READER',
        maxResults: JUMP_PAGE
    } as Parameters<typeof getPosts>[0];

    let siteIndex: any = /^sitemap-([0-9]+)$/.exec(id)?.[1];
    siteIndex = siteIndex ? parseInt(siteIndex) : null;
    if (params && pageToken) {
        params.pageToken = pageToken;
    }
    const { posts, nextPageToken } = await getPosts(params, { http2: false }) ?? []
    pageToken = nextPageToken;
    return posts.map((item) => {
        const slug = `blogs/${SlugConverter.toPostSlug(item.url)}`;
        const newUrl = `${process.env.DOMAIN}/${slug}`;
        return {
            url: newUrl,
            lastModified: item.updated ?? item.published ?? new Date().toISOString(),
            changeFrequency: 'weekly' as 'weekly',
            priority: 0.5
        };
    })
}