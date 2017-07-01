
export interface StockIndex {
  stockId?: number,
  indexId?: number,
  percentage?: number;
};

export class StockIndexImpl implements StockIndex {
  stockId: number;
  indexId: number;
  percentage: number;
  constructor() {
    this.stockId = 0;
    this.indexId = 0;
    this.percentage = 0;
  }
}
