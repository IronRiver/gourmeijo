"use client";

import createCache from "@emotion/cache";
import { CacheProvider as DefaultCacheProvider } from "@emotion/react";
import { useServerInsertedHTML } from "next/navigation";
import { ReactNode, useState } from "react";

import type {
  EmotionCache,
  Options as EmotionCacheOptions,
} from "@emotion/cache";
import type { ProviderProps } from "react";

export interface EmotionRegistryProps {
  options?: Partial<EmotionCacheOptions> & { enableCssLayer?: boolean };
  CacheProvider?: (props: ProviderProps<EmotionCache>) => ReactNode;
  children?: ReactNode;
}

function createEmotionRegistry(
  options: Partial<EmotionCacheOptions> & { enableCssLayer?: boolean }
) {
  const { enableCssLayer, key = "mui", ...rest } = options;
  const cache = createCache({ key, ...rest });
  cache.compat = true;

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const prevInsert = cache.insert;
  let inserted: { name: string; isGlobal: boolean }[] = [];
  cache.insert = function (...args) {
    if (enableCssLayer) {
      args[1].styles = `@layer mui {${args[1].styles}}`;
    }
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

export default function EmotionRegistry(props: EmotionRegistryProps) {
  const {
    options = {},
    CacheProvider = DefaultCacheProvider,
    children,
  } = props;

  const [registry] = useState(() => createEmotionRegistry(options));

  useServerInsertedHTML(() => {
    const inserted = registry.flush();
    if (inserted.length === 0) {
      return null;
    }

    let styles = "";
    let dataEmotionAttribute = registry.cache.key;
    const globals: {
      name: string;
      style: string;
    }[] = [];

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
