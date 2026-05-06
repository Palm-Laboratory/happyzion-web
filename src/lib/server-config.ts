import "server-only";

import { readServerApiBaseUrlFromEnv } from "@/lib/api-env";

export const SERVER_API_BASE_URL = readServerApiBaseUrlFromEnv(process.env);
