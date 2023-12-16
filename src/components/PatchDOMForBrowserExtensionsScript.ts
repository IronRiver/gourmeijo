"use client";

import { useEffect, useRef } from "react";

import patchDOMForBrowserExtensions from "@/utils/patchDOMForBrowserExtensions";

export default function PatchDOMForBrowserExtensionsScript() {
  const ref = useRef(false);

  useEffect(() => {
    if (!ref.current) {
      patchDOMForBrowserExtensions();
      ref.current = true;
    }
  }, []);

  return null;
}
