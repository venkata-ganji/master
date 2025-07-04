export interface Transaction {
  id: string;
  userId: string;
  type: 'payment' | 'redemption';
  amount: number;
  truePointsEarned?: number;
  truePointsUsed?: number;
  description: string;
  date: Date;
  cardIds?: string[];
  rewardItem?: string;
}

export interface RewardsResponse {
  currentBalance: number;
  transactions: Transaction[];
}

export interface CredStoreItem {
  id: string;
  name: string;
  pointsCost: number;
  category: 'food' | 'retail' | 'bill-credit';
  image: string;
  description: string;
  popular?: boolean;
}

export interface RedeemRequest {
  rewardId: string;
}

export interface RedeemResponse {
  message: string;
  reward: string;
  pointsUsed: number;
  newTruePointsBalance: number;
  transactionId: string;
}

export interface CoachRequest {
  message: string;
}

export interface CoachResponse {
  message: string;
  timestamp: string;
}