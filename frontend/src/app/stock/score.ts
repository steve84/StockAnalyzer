import { ScoreType } from './scoretype';
import { Stock } from './stock';
import { IndexType } from './indextype';

export interface Score {
  scoreId?: number,
  scoreType?: ScoreType,
  stock?: Stock,
  index?: IndexType,
  scoreValue?: number,
  modifiedAt?: string
}