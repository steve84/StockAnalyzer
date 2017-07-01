import { Country } from './country';
import { Stock } from './stock';

export interface IndexType {
  indexId?: number,
  name?: string,
  description?: string,
  stocks?: Stock[],
  numberOfStocks?: number
}
