"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/dictionary-types";
import type { Locale } from "@/i18n/locales";
import { primaryPageIds, routeFor, type PageId } from "@/i18n/routes";

export interface SiteNavigationProps {
  locale: Locale;
  currentPage: PageId;
  labels: Dictionary["navigation"];
  navigationLabel: string;
  openLabel: string;
  closeLabel: string;
}

export function SiteNavigation({ locale, currentPage, labels, navigationLabel, openLabel, closeLabel }: SiteNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const desktopRef = useRef<HTMLElement>(null);
  const mobileRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setIsOpen(false);
      toggleRef.current?.focus();
    };
    const desktop = window.matchMedia("(min-width: 64rem)");
    const isMobileControl = (element: Element | null) => element === toggleRef.current || !!(element && mobileRef.current?.contains(element));
    // Chromium can blur a link as its mobile ancestor becomes display:none,
    // before the media-query change callback runs. Remember actual focus while
    // open, and clear it when the visitor moves to the nonmodal background.
    let mobileFocus = isMobileControl(document.activeElement) ? document.activeElement : null;
    const onFocusIn = (event: FocusEvent) => {
      const element = event.target instanceof Element ? event.target : null;
      mobileFocus = isMobileControl(element) ? element : null;
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!(event.target instanceof Element) || !isMobileControl(event.target)) mobileFocus = null;
    };
    const onDesktop = (event: MediaQueryListEvent) => {
      if (!event.matches) return;
      const active = isMobileControl(document.activeElement) ? document.activeElement : mobileFocus;
      if (active) {
        const target = Array.from(desktopRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? [])
          .find((link) => link.getAttribute("href") === active?.getAttribute("href"))
          ?? desktopRef.current?.querySelector<HTMLAnchorElement>('[aria-current="page"]');
        target?.focus();
      }
      setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("pointerdown", onPointerDown);
    desktop.addEventListener("change", onDesktop);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("pointerdown", onPointerDown);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [isOpen]);

  const links = primaryPageIds.map((pageId) => (
    <li key={pageId}>
      <Link
        href={routeFor(locale, pageId)}
        aria-current={pageId === currentPage ? "page" : undefined}
        onClick={() => {
          setIsOpen(false);
          if (isOpen && pageId === currentPage) toggleRef.current?.focus();
        }}
        className={`block rounded-sm px-4 py-3 text-lg leading-6 lg:text-xl ${pageId === currentPage ? "bg-brand-deep font-semibold text-white underline decoration-gold decoration-2 underline-offset-8" : "text-brand-deep hover:bg-surface lg:text-white lg:hover:bg-brand-deep"}`}
      >
        {labels[pageId]}
      </Link>
    </li>
  ));

  return (
    <div className="navigation-band">
      <div className="mx-auto max-w-site px-4">
      <nav ref={desktopRef} aria-label={navigationLabel} className="hidden lg:block">
        <ul className="flex min-h-15 flex-wrap items-center gap-1">{links}</ul>
      </nav>
      <div className="py-3 lg:hidden">
        <button
          ref={toggleRef}
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((open) => !open)}
          className="min-h-11 rounded-sm border border-brand-deep px-4 py-2 font-semibold text-brand-deep hover:bg-surface"
        >
          {isOpen ? closeLabel : openLabel}
        </button>
        <nav ref={mobileRef} id="mobile-navigation" aria-label={navigationLabel} hidden={!isOpen} className="pt-3">
          <ul className="flex flex-col gap-1">{links}</ul>
        </nav>
      </div>
      </div>
    </div>
  );
}
