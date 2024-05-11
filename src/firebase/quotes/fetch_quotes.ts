import {
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  StorageReference,
} from 'firebase/storage';
import localforage from 'localforage';
import app from '../config';
import {Quotes} from './types';

const storage = getStorage(app, 'gs://type-speed-test-v2.appspot.com');

export async function downloadQuotes(lang: string): Promise<Quotes> {
  const selectedQuotesRef = ref(storage, `quotes/${lang}_quotes.json`);
  const url = await getDownloadURL(selectedQuotesRef);
  const response = await fetch(url);
  return await response.json();
}

export async function memoizedDownloadQuotes(lang: string) {
  const cachedQuotes = await localforage.getItem<Quotes>(lang);
  if (cachedQuotes) {
    return cachedQuotes;
  }

  const fetchedQuotes = await downloadQuotes(lang);
  if (fetchedQuotes) {
    localforage.setItem(lang, fetchedQuotes);
  }
  return fetchedQuotes;
}

function serializeAvailableLangsStorageRef(items: StorageReference[]) {
  const res = [];

  for (const item of items) {
    res.push(item.name.split('_')[0]);
  }

  return res;
}

export async function fetchListOfAllAvailableQuotes() {
  const quotesBucketRef = ref(storage, 'quotes');
  const {items} = await listAll(quotesBucketRef);
  return serializeAvailableLangsStorageRef(items);
}
