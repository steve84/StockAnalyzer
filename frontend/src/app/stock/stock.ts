import { Country } from './country';
import { Branch } from './branch';
import { Levermann } from './levermann';

export interface Stock {
  stockId?: number,
  nsin?: string,
  isin?: string,
  wkn?: string,
  symbol?: string,
  url?: string,
  businessYearEnd?: string,
  country?: Country,
  branch?: Branch,
  name?: string,
  levermann?: Levermann,
  levermannScore?: number,
  stockCategory?: string
}
