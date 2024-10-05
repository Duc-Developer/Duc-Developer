export const MY_BLOG_URL = 'https://codecungdavid.blogspot.com';
export class SlugConverter {
    static toPostSlug(href?: string | null): string | null {
        if (!href) return null;
        const pattern = /https?:\/\/codecungdavid\.blogspot\.com\/([0-9]+)\/([0-9]+)\/(.*).html$/g;
        const match = pattern.exec(href);
        if (!match) return null;
        return match[1] + '_' + match[2] + '_' + match[3]
    }

    static toOriginPostUrl(slug?: string | null): string | null {
        if (!slug) return null;
        const pattern = /([0-9]+)_([0-9]+)_(.*$)/g;
        const match = pattern.exec(slug);
        if (!match) return null;
        return MY_BLOG_URL + '/' + match[1] + '/' + match[2] + '/' + match[3] + '.html';
    }
}