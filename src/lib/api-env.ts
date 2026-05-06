import { DEFAULT_API_BASE_URL, normalizeApiBaseUrl } from "./api-base-url";

type EnvSource = Record<string, string | undefined>;

function readTrimmedEnv(env: EnvSource, name: string): string | null {
  const value = env[name]?.trim();
  return value && value.length > 0 ? value : null;
}

function isProductionEnv(env: EnvSource): boolean {
  return env.NODE_ENV === "production";
}

function readApiBaseUrlWithContract(
  env: EnvSource,
  envName: string,
  contractLabel: string,
): string {
  const configuredValue = readTrimmedEnv(env, envName);

  if (configuredValue) {
    return normalizeApiBaseUrl(configuredValue);
  }

  if (!isProductionEnv(env)) {
    return DEFAULT_API_BASE_URL;
  }

  throw new Error(
    `${contractLabel} is required in production. Set ${envName} to the upstream API origin.`,
  );
}

export function readServerApiBaseUrlFromEnv(env: EnvSource): string {
  return readApiBaseUrlWithContract(env, "API_BASE_URL", "Server API base URL");
}

export function readPublicApiBaseUrlFromEnv(env: EnvSource): string {
  return readApiBaseUrlWithContract(
    env,
    "NEXT_PUBLIC_API_BASE_URL",
    "Public API base URL",
  );
}
