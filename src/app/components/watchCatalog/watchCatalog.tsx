"use client";

import { Card, Container } from "@lancebailey26/skyforge-ui";
import type { Watch } from "@/lib/types";
import styles from "./watchCatalog.module.css";

function watchLabel(w: Watch): string {
  return `${w.brand} ${w.model}`.trim();
}

/** Card image mode requires a real URL; empty/undefined would render `<img src="">` and errors. */
function cardSubject(w: Watch): string | { src: string; alt?: string } {
  const url = (w.image ?? "").trim();
  if (url) return { src: url, alt: w.model };
  return w.model;
}

export type WatchCatalogProps = {
  watches: Watch[];
  /** Same label as Search uses when picking from the dropdown (`brand model`). */
  selectedWatch: string;
};

export function WatchCatalog({ watches, selectedWatch }: WatchCatalogProps) {
  const trimmed = selectedWatch.trim();
  const displayed =
    trimmed === ""
      ? watches
      : watches.filter((w) => watchLabel(w) === trimmed);

  if (watches.length === 0) {
    return (
      <div className={styles.catalogRoot}>
        <Container size="full" padding="md">
          <p className={styles.empty}>No watches in the database yet.</p>
        </Container>
      </div>
    );
  }

  if (displayed.length === 0) {
    return (
      <div className={styles.catalogRoot}>
        <Container size="full" padding="md">
          <p className={styles.empty}>No watch matches that selection.</p>
        </Container>
      </div>
    );
  }

  const selectionFocus = trimmed !== "";

  if (selectionFocus) {
    return (
      <div className={styles.catalogRoot}>
        <Container size="full" padding="md">
          <div className={styles.centerpiece}>
            {displayed.map((w) => (
              <Card
                key={w.id}
                title={w.brand}
                subject={cardSubject(w)}
                tagline={w.model}
                size="xlarge"
                type="glass"
              />
            ))}
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className={styles.catalogRoot}>
      <Container size="full" padding="md">
        <div className={styles.grid}>
          {displayed.map((w) => (
            <Card
              key={w.id}
              title={w.brand}
              subject={cardSubject(w)}
              tagline={w.model}
              size="medium"
              type="glass"
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
