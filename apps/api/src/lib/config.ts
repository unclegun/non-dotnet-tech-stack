/**
 * Configuration Module
 * 
 * Centralizes environment variable access and validation.
 * Fails fast on startup if required config is missing.
 * 
 * Why this matters:
 * - Catch config issues at startup, not at runtime
 * - Single source of truth for config
 * - Type-safe config access
 * - Easy to test with env overrides
 */

interface Config {
  nodeEnv: string;
  apiPort: number;
  databaseUrl: string;
  logLevel: string;
  jobsEnabled: boolean;
}

function getRequiredEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

function getOptionalEnv(key: string, defaultValue: string): string {
  return process.env[key] || defaultValue;
}

export const config: Config = {
  nodeEnv: getOptionalEnv('NODE_ENV', 'development'),
  apiPort: Number(getOptionalEnv('API_PORT', '3001')),
  databaseUrl: getRequiredEnv('DATABASE_URL'),
  logLevel: getOptionalEnv('LOG_LEVEL', 'info'),
  jobsEnabled: getOptionalEnv('JOBS_ENABLED', 'true') === 'true',
};
