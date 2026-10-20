import type { ReactNode } from "react";

export function PageIntro({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="max-w-readable border-l-4 border-gold pl-5 sm:pl-7">
      <h1 className="text-3xl leading-tight font-semibold tracking-tight text-brand-deep sm:text-4xl">{title}</h1>
      {children ? <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">{children}</div> : null}
    </div>
  );
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="max-w-readable border-y border-line py-8 sm:py-10" data-empty-state="true">
      <p className="text-xl font-medium leading-relaxed text-brand-deep">{title}</p>
      <p className="mt-3 max-w-prose leading-relaxed text-muted">{description}</p>
    </div>
  );
}
