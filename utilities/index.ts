import { blogger_v3 } from 'googleapis';
import DOMPurify from 'isomorphic-dompurify';

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


export const setupDOMPurify = () => {
    return new Promise<void>((resolve) => {
        DOMPurify.addHook('afterSanitizeAttributes', (node) => {
            if (node.tagName === 'A' && node.getAttribute('href')) {
                const href = node.getAttribute('href');
                if (href && href.startsWith('https://codecungdavid.blogspot.com/')) {
                    const newUrl = `blogs/${SlugConverter.toPostSlug(href)}`;
                    node.setAttribute('href', `${window.location.origin}/${newUrl}`);
                }
            }
        });
        resolve();
    });
};

export const sanitizeDescription = (data?: blogger_v3.Schema$Post, limit?: number) => {
    if (!data?.content) return '';
    const sanitizedContent = DOMPurify.sanitize(data.content ?? '', { ALLOWED_TAGS: [] });
    const cleanedContent = sanitizedContent.replaceAll(/\n\s+/g, ' ').replaceAll(/&nbsp;/g, ' ');
    if (limit) {
        return cleanedContent.substring(0, limit) + '...';
    }
    return cleanedContent;
};