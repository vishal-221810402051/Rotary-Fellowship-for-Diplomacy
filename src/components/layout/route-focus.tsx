"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/** Keep client-side page transitions out of a disappearing navigation region. */
export function RouteFocus() {
  const pathname = usePathname();
  const previousPath = useRef(pathname);
  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    document.getElementById("main-content")?.focus();
  }, [pathname]);
  return null;
}
