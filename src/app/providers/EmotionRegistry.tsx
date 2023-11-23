"use client";

import createCache from "@emotion/cache";
import { CacheProvider as DefaultCacheProvider } from "@emotion/react";
import { useServerInsertedHTML } from "next/navigation";
import React from "react";

import type {
  EmotionCache,
  Options as EmotionCacheOptions,
} from "@emotion/cache";

function createEmotionCache(options: EmotionCacheOptions) {
  const cache = createCache(options);
  cache.compat = true;

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const prevInsert = cache.insert;
  let inserted: { name: string; isGlobal: boolean }[] = [];
  cache.insert = function (...args) {
    const [selector, serialized] = args;
    if (cache.inserted[serialized.name] === undefined) {
      inserted.push({
        name: serialized.name,
        isGlobal: !selector,
      });
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
  /** By default <CacheProvider /> from 'import { CacheProvider } from "@emotion/react"' */
  CacheProvider?: (props: {
    value: EmotionCache;
    children: React.ReactNode;
  }) => React.JSX.Element | null;
  children: React.ReactNode;
}

export default function EmotionRegistry(
  props: NextAppDirEmotionCacheProviderProps
) {
  const { options, CacheProvider = DefaultCacheProvider, children } = props;

  const [registry] = React.useState(() => createEmotionCache(options));

  useServerInsertedHTML(() => {
    const inserted = registry.flush();
    if (inserted.length === 0) {
      return null;
    }

    const globals: {
      name: string;
      style: string;
    }[] = [];
    let styles = "";
    let dataEmotionAttribute = registry.cache.key;

    for (const { name, isGlobal } of inserted) {
      const style = registry.cache.inserted[name];

      if (typeof style !== "boolean") {
        if (isGlobal) {
          globals.push({ name, style });
        } else {
          styles += style;
          dataEmotionAttribute += ` ${name}`;
        }
      }
    }

    return (
      <>
        {globals.map(({ name, style }) => (
          <style
            key={name}
            data-emotion={`${registry.cache.key}-global ${name}`}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: style }}
          />
        ))}
        {styles && (
          <style
            data-emotion={dataEmotionAttribute}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: styles }}
          />
        )}
      </>
    );
  });

  return <CacheProvider value={registry.cache}>{children}</CacheProvider>;
}
