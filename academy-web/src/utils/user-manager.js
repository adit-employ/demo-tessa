import Oidc from 'oidc-client';
import { APP } from "@/constants/app";

const mgr = new Oidc.UserManager({
    userStore: new Oidc.WebStorageStateStore({ store: window.localStorage }),
    authority: APP.AUTHORITY,
    client_id: APP.CLIENT_ID,
    redirect_uri: `${window.location.origin}/callback`,
    response_type: 'id_token token',
    scope: 'oauth.profile openid roles',
    post_logout_redirect_uri: `${window.location.origin}/home`,
    silent_redirect_uri: `${window.location.origin}/silent-renew`,
    accessTokenExpiringNotificationTime: APP.LIFE_TIME,
    automaticSilentRenew: true,
    filterProtocolClaims: true,
    loadUserInfo: true
})

Oidc.Log.logger = console;
Oidc.Log.level = Oidc.Log.INFO;

export default mgr;