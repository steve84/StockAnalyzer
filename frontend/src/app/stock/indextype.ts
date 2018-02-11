import { Country } from './country';
import { Stock } from './stock';
import { StockIndexImpl } from './stockindex';
import { Score } from './score';

export interface IndexType {
  indexId?: number,
  name?: string,
  description?: string,
  country?: Country,
  stocks?: StockIndexImpl[],
  scores?: Score[],
  createdAt?: string,
  totalStocks?: number,
  countryStats: any,
  branchStats: any
}
