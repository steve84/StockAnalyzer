import { Country } from './country';
import { Branch } from './branch';
import { StockIndex } from './stockindex';
import { IndexType } from './indextype';
import { Score } from './score';

import { Levermann } from './levermann';
import { MagicFormula } from './magicformula';
import { Piotroski } from './piotroski';

import { Balance } from './balance';
import { Cashflow } from './cashflow';
import { Forecast } from './forecast';
import { Income } from './income';

import { Performance } from './performance';
import { Analysts } from './analysts';


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
  magicFormula?: MagicFormula,
  piotroski?: Piotroski,
  scores?: Score[],
  stockCategory?: string,
  indices?: any[],
  stockIndex?: StockIndex[],
  indexParticipation?: any[],
  indexNames?: string,
  balance?: Balance[],
  cashflow?: Cashflow[],
  forecast?: Forecast[],
  income?: Income[],
  performance?: Performance,
  referenceCurrency?: string,
  shareCurrency?: string,
  marketCapitalization: any,
  latestPrice: any,
  createdAt?: string
}
