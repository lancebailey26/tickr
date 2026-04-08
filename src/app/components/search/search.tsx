"use client";
import styles from "./search.module.css";
import { useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  SimpleInput,
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from "@lancebailey26/skyforge-ui";
import type { Brand, Watch } from "@/lib/types";

function clearBrand(
  setSelectedBrand: (v: string) => void,
  setSelectedWatch: (v: string) => void,
) {
  setSelectedBrand("");
  setSelectedWatch("");
}

export default function Search(props: {
  brands: Brand[];
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  selectedWatch: string;
  setSelectedWatch: (watch: string) => void;
  watches: Watch[];
}) {
  const [brandsOpen, setBrandsOpen] = useState(false);
  const [watchesOpen, setWatchesOpen] = useState(false);

  const hasBrand = props.selectedBrand.trim() !== "";
  const hasWatch = props.selectedWatch.trim() !== "";

  return (
    <div className={styles.search}>
      <div className={styles.field}>
        <div className={styles.fieldRow}>
          <div className={styles.dropdownSlot}>
            <Dropdown open={brandsOpen} onOpenChange={setBrandsOpen}>
              <DropdownTrigger>
                <SimpleInput
                  type="text"
                  placeholder="Choose a brand"
                  value={props.selectedBrand}
                  onChange={(e) => props.setSelectedBrand(e.target.value)}
                />
              </DropdownTrigger>
              <DropdownContent>
                <DropdownItem
                  onSelect={() => {
                    clearBrand(
                      props.setSelectedBrand,
                      props.setSelectedWatch,
                    );
                    setBrandsOpen(false);
                  }}
                >
                  Select brand
                </DropdownItem>
                {props.brands.map((b) => (
                  <DropdownItem
                    key={b.id}
                    onSelect={() => {
                      props.setSelectedBrand(b.name);
                      setBrandsOpen(false);
                    }}
                  >
                    {b.name}
                  </DropdownItem>
                ))}
              </DropdownContent>
            </Dropdown>
          </div>
          {props.selectedBrand.trim() !== "" && (
          <Button
            icon={faXmark}
            size="small"
            color="secondary"
            shape="circle"
            subColor="outline"
            className={styles.clearBtn}
            disabled={!hasBrand}
            onClick={() =>
              clearBrand(props.setSelectedBrand, props.setSelectedWatch)
            }
            attributes={{ "aria-label": "Clear brand" }}
          />
          )}
        </div>
      </div>
      <div className={styles.field}>
        <div className={styles.fieldRow}>
          <div className={styles.dropdownSlot}>
            <Dropdown open={watchesOpen} onOpenChange={setWatchesOpen}>
              <DropdownTrigger>
                <SimpleInput
                  type="text"
                  placeholder="Choose a watch"
                  value={props.selectedWatch}
                  onChange={(e) => props.setSelectedWatch(e.target.value)}
                />
              </DropdownTrigger>
              <DropdownContent>
                <DropdownItem
                  onSelect={() => {
                    props.setSelectedWatch("");
                    setWatchesOpen(false);
                  }}
                >
                  Select watch
                </DropdownItem>
                {props.watches.map((w) => (
                  <DropdownItem
                    key={w.id}
                    onSelect={() => {
                      props.setSelectedWatch(
                        `${w.brand} ${w.model}`.trim(),
                      );
                      setWatchesOpen(false);
                    }}
                  >
                    {w.brand} {w.model}
                  </DropdownItem>
                ))}
              </DropdownContent>
            </Dropdown>
          </div>
          {props.selectedWatch.trim() !== "" && (
          <Button
            icon={faXmark}
            size="small"
            color="secondary"
            shape="circle"
            subColor="outline"
            className={styles.clearBtn}
            disabled={!hasWatch}
            onClick={() => props.setSelectedWatch("")}
            attributes={{ "aria-label": "Clear watch" }}
          />
          )}
        </div>
      </div>
    </div>
  );
}
