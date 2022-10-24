// basicAuth
const svcBasicAuth = {
	username: `${import.meta.env.VITE_APP_OAUTH_CLIENT_ID}`,
	password: `${import.meta.env.VITE_APP_OAUTH_CLIENT_SECRET}`,
};

const OAUTH_CONFIG = {
	client_id: `${import.meta.env.VITE_APP_OAUTH_CLIENT_ID}`,
	client_secret: `${import.meta.env.VITE_APP_OAUTH_CLIENT_SECRET}`,
	redirect_uri: `${import.meta.env.VITE_APP_OAUTH_REDIRECT_URI}`,
	authorize: `${import.meta.env.VITE_APP_URL_OAUTH}/oauth/authorize`,
	token: `${import.meta.env.VITE_APP_URL_OAUTH}/oauth/token`,
	scope: 'phr.read phr.write',
	state: '',
};

const API_CONFIG = {
	baseUrl: `${import.meta.env.VITE_APP_URL_OPENAPI}`,
	client_id: `${import.meta.env.VITE_APP_OAUTH_CLIENT_ID}`,
	client_secret: `${import.meta.env.VITE_APP_OAUTH_CLIENT_SECRET}`,
};

export { svcBasicAuth, OAUTH_CONFIG, API_CONFIG };
