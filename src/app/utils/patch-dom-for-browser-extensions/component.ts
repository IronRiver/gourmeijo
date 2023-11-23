"use client";

import { useEffect, useRef } from "react";

import patchDOMForBrowserExtensions from ".";

export function PatchDOMForBrowserExtensionsScript() {
  const ref = useRef(false);

  useEffect(() => {
    if (!ref.current) {
      patchDOMForBrowserExtensions();
      ref.current = true;
    }
  }, []);

  return null;
}
