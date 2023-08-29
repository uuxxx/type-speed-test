interface Quote {
  id: number;
  source: string;
  text: string;
  length: number;
}

export interface Quotes {
  language: string;
  quotes: Quote[];
}

export type AvailableLangs = 'russian' | 'english';
