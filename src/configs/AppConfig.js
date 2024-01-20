import { env } from './EnvironmentConfig'

export const APP_NAME = 'My Notes';
const fn = () => {
	if (import.meta.env.VITE_BASE_PATH) return import.meta.env.VITE_BASE_PATH
	else return ''
}
export const APP_BASE_URL = fn();
export const API_BASE_URL = env.API_ENDPOINT_URL
export const APP_PREFIX_PATH = '/';
export const AUTH_PREFIX_PATH = '/auth';
