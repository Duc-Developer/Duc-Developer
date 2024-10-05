import { blogger_v3, google } from 'googleapis';

const credentials = {
    project_id: process.env.GOOGLE_BLOG_PROJECT_ID,
    private_key_id: process.env.GOOGLE_BLOG_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_BLOG_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_id: process.env.GOOGLE_BLOG_CLIENT_ID,
    client_email: process.env.GOOGLE_BLOG_CLIENT_EMAIL,
};

class GoogleAuth {
    ctx;
    constructor(scopes: string[]) {
        this.ctx = new google.auth.GoogleAuth({
            credentials: credentials,
            scopes,
        })
    }

    blogger(options?: Omit<blogger_v3.Options, 'version' | 'auth'>) {
        return google.blogger({
            ...options,
            version: 'v3',
            auth: this.ctx
        });
    }
}

export default GoogleAuth;