import base from './base';

const { NODE_ENV } = process.env;
// todo: check for dev-specific config
const envConfig = {};

export default { ...envConfig, ...base };

export const isDevMode = (): boolean => !NODE_ENV || NODE_ENV === 'development';
export const isProdMode = (): boolean => NODE_ENV === 'production';
export const isTestMode = (): boolean => NODE_ENV === 'test';
