import { Country } from './country';
import { Stock } from './stock';
import { Score } from './score';

export interface IndexType {
  indexId?: number,
  name?: string,
  description?: string,
  country?: Country,
  realStocks?: Stock[],
  scores?: Score[]
}
