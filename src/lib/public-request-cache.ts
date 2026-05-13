import "server-only";

import { AsyncLocalStorage } from "node:async_hooks";
import { cache } from "react";

const getPublicRequestCacheStore = cache(() => new Map<string, Promise<unknown>>());
const publicRequestCacheScope = new AsyncLocalStorage<Map<string, Promise<unknown>>>();

export async function runWithPublicRequestCache<T>(loader: () => Promise<T>): Promise<T> {
  if (publicRequestCacheScope.getStore()) {
    return loader();
  }

  return publicRequestCacheScope.run(getPublicRequestCacheStore(), loader);
}

export function getOrSetPublicRequestCache<T>(key: string, loader: () => Promise<T>): Promise<T> {
  const store = publicRequestCacheScope.getStore() ?? getPublicRequestCacheStore();

  const existing = store.get(key);
  if (existing) {
    return existing as Promise<T>;
  }

  const pending = loader().catch((error) => {
    store.delete(key);
    throw error;
  });
  store.set(key, pending);
  return pending;
}
