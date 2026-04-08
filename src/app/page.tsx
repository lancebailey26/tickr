"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import type { Brand, Watch } from "@/lib/types";
import Search from "./components/search/search";
import { WatchCatalog } from "./components/watchCatalog/watchCatalog";
export default function Home() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedWatch, setSelectedWatch] = useState<string>("");
  const [fetchedWatches, setFetchedWatches] = useState<Watch[]>([]);
  const brandKey = selectedBrand.trim();
  const watches = brandKey ? fetchedWatches : [];
  useEffect(() => {
    fetch("/api/brands")
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json() as Promise<Brand[]>;
      })
      .then(setBrands)
      .catch(console.error);
  }, []);
  useEffect(() => {
    if (!brandKey) return;
    fetch(`/api/watches?brand=${encodeURIComponent(brandKey)}`)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json() as Promise<Watch[]>;
      })
      .then((data) => {
        console.log(data);
        setFetchedWatches(data);
      })
      .catch(console.error);
  }, [brandKey]);
  return (
    <div className={`${styles.page} tickr-page`}>
      <main className={`${styles.main} tickr-main`}>
        <header className="tickr-hero">
          <p className="tickr-eyebrow">Reference catalog</p>
          <h1 className="tickr-hero-title">Tickr</h1>
          <p className="tickr-hero-lead">
            Browse brands and models in one place—filter by brand, then zero in on a
            specific watch.
          </p>
          <div className="tickr-search-wrap">
            <p className={styles.searchKicker}>Explore</p>
            <div className={styles.searchStage}>
              <Search
                brands={brands}
                selectedBrand={selectedBrand}
                setSelectedBrand={setSelectedBrand}
                selectedWatch={selectedWatch}
                setSelectedWatch={setSelectedWatch}
                watches={watches}
              />
            </div>
          </div>
        </header>
        {selectedBrand && (
        <section className="tickr-catalog-section" aria-labelledby="catalog-heading">
          <div className={styles.catalogHeader}>
            <p className={styles.catalogEyebrow}>{selectedBrand}</p>
            <h2 id="catalog-heading" className={styles.catalogTitle}>
              Current Catalog
            </h2>
          </div>
          <WatchCatalog watches={watches} selectedWatch={selectedWatch} />
        </section>
        )}
      </main>
    </div>
  );
}
