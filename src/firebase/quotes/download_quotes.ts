import app from '../config';
import {getDownloadURL, getStorage, ref} from 'firebase/storage';
import localforage from 'localforage';
import {Quotes} from './types';

export async function downloadQuotes(lang: AvailableLangs): Promise<Quotes> {
  const storage = getStorage(app, 'gs://type-speed-test-v2.appspot.com');
  const selectedQuotesRef = ref(storage, `quotes/${lang}_quotes.json`);
  const url = await getDownloadURL(selectedQuotesRef);
  const response = await fetch(url);
  return await response.json();
}

export async function memoizedDownloadQuotes(lang: AvailableLangs) {
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
