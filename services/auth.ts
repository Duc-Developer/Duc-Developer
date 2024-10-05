import { blogger_v3, google } from 'googleapis';
import * as path from 'path';

const credentialsPath = path.join(process.cwd(), 'my-cerf.json');

class GoogleAuth {
    ctx;
    constructor(scopes: string[]) {
        this.ctx = new google.auth.GoogleAuth({
            keyFile: credentialsPath,
            scopes,
        });
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
