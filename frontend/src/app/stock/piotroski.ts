export interface Piotroski {
  stockId?: number,
  netIncome?: number,
  cashOperations?: number,
  actualReturnOnAssets?: number,
  lastReturnOnAssets?: number,
  actualLongTermRatio?: number,
  lastLongTermRatio?: number,
  actualCurrentRatio?: number,
  lastCurrentRatio?: number,
  actualSharesOutstanding?: number,
  lastSharesOutstanding?: number,
  actualAssetTurnover?: number,
  lastAssetTurnover?: number,
  marketCapitalization?: number
}