"use client";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { useServerInsertedHTML } from "next/navigation";
import React from "react";

import type { Options as EmotionCacheOptions } from "@emotion/cache";

function createEmotionCache(options: EmotionCacheOptions) {
  const cache = createCache(options);
  cache.compat = true;

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const prevInsert = cache.insert;
  let inserted: string[] = [];
  cache.insert = function (...args) {
    const [, serialized] = args;
    if (cache.inserted[serialized.name] === undefined) {
      inserted.push(serialized.name);
    }
    return prevInsert.apply(this, args);
  };

  const flush = () => {
    const prevInserted = inserted;
    inserted = [];
    return prevInserted;
  };

  return { cache, flush };
}

export interface NextAppDirEmotionCacheProviderProps {
  /** This is the options passed to createCache() from 'import createCache from "@emotion/cache"' */
  options: Omit<EmotionCacheOptions, "insertionPoint">;
  children: React.ReactNode;
}

export default function EmotionRegistry(
  props: NextAppDirEmotionCacheProviderProps
) {
  const { options, children } = props;

  const [registry] = React.useState(() => createEmotionCache(options));

  useServerInsertedHTML(() => {
    const names = registry.flush();
    if (names.length === 0) {
      return null;
    }
    let styles = "";
    for (const name of names) {
      styles += registry.cache.inserted[name];
    }
    return (
      <style
        key={registry.cache.key}
        data-emotion={`${registry.cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return <CacheProvider value={registry.cache}>{children}</CacheProvider>;
}
