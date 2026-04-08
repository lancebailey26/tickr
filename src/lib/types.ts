/** API + UI shape for brand dropdowns (`GET /api/brands`) */
export type Brand  = {
  id: string;
  name: string;
  slug: string;
};

/** API + UI shape for watches (`GET /api/watches`, catalog cards) */
export type Watch = {
  id: string;
  brand: string;
  collection: string;
  model: string;
  slug: string;
  /** Watch photo URL; omit, empty, or invalid → catalog shows model as text subject. */
  image?: string;
};
