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

const LanguageWhiteList = ['javascript', 'java', 'json', 'xml'];
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
            if (node.tagName === 'CODE') {
                const className = node.getAttribute('class');
                const notExistHighlight = !className || !LanguageWhiteList.some(lang => className === `language-${lang}`);
                if (notExistHighlight) {
                    // add default language for highlight.js
                    node.setAttribute('class', (className ?? '') + ' language-javascript');
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

export const throttle = (func: Function, limit: number = 500) => {
    let inThrottle: boolean;
    return function (this: any) {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
};

export const debounce = (func: Function, delay: number = 500) => {
    let timeoutId: ReturnType<typeof setTimeout> | null;
    return function (this: any) {
        const args = arguments;
        const context = this;
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    }
};

export const uuid = (): string => {
    const timestamp = Date.now().toString(16);
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c, i) => {
        const r = (parseInt(timestamp[i % timestamp.length], 16) + Math.random() * 16) % 16 | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

export const formatDate = (dateString: string | null | undefined): string | null => {
    if (!dateString) return null;
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return null;
    }
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};