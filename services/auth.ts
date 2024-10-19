import { blogger_v3, google } from 'googleapis';
import * as path from 'path';

const credentialsPath = path.join(process.cwd(), 'my-cerf.json');

class GoogleAuth {
    ctx;
    clientCtx;
    _scopes: string[];
    constructor(scopes: string[]) {
        this.ctx = new google.auth.GoogleAuth({
            keyFile: credentialsPath,
            scopes,
        });
        this.clientCtx = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            `${process.env.DOMAIN}/admin/oauth`
        );
        this._scopes = scopes;
    }

    blogger(options?: Omit<blogger_v3.Options, 'version' | 'auth'>) {
        return google.blogger({
            ...options,
            version: 'v3',
            auth: this.ctx
        });
    }

    clientRequest(access?: 'offline' | 'online' ): string {
        const params = {
            access_type: 'online',
            scope: this._scopes
        };
        if (access) {
            params['access_type'] = access;
        }
        return this.clientCtx.generateAuthUrl(params);
    }

    clientGetToken(code: string) {
        return this.clientCtx.getToken(code);
    }

    clientVerifyToken(token: string) {
        return this.clientCtx.getTokenInfo(token);
    }
}

export default GoogleAuth;
