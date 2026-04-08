import 'server-only';

import type { Document, Filter } from 'mongodb';
import type { ObjectId } from 'mongodb';
import { getDb } from '@/lib/mongodb';

export type WatchDoc = Document & {
  _id: ObjectId;
  brand?: string;
  collection?: string;
  model?: string;
  slug?: string;
};

export type BrandDoc = Document & {
  _id: ObjectId;
  name?: string;
  slug?: string;
};

function makeCollection<T extends Document>(name: string) {
  async function collection() {
    const db = await getDb();
    return db.collection<T>(name);
  }

  return {
    collection,
    find(filter: Filter<T> = {} as Filter<T>) {
      return collection().then((c) => c.find(filter).toArray());
    },
    findOne(filter: Filter<T>) {
      return collection().then((c) => c.findOne(filter));
    },
  };
}

export const Watches = makeCollection<WatchDoc>('watches');
export const Brands = makeCollection<BrandDoc>('brands');
