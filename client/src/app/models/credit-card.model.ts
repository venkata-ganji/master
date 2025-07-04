export interface CreditCard {
  id: string;
  userId: string;
  cardName: string;
  lastFourDigits: string;
  balance: number;
  dueDate: string;
  minimumDue: number;
  brand: 'visa' | 'mastercard' | 'amex';
  color: string;
}

export interface AddCardRequest {
  cardName: string;
  lastFourDigits: string;
  balance: number;
  dueDate: string;
  minimumDue: number;
  brand: string;
}

export interface SmartPayAllocation {
  cardId: string;
  cardName: string;
  lastFourDigits: string;
  currentBalance: number;
  paymentAmount: number;
  newBalance: number;
  brand: string;
  color: string;
}

export interface SmartPayRequest {
  availableFunds: number;
}

export interface SmartPayResponse {
  message: string;
  availableFunds: number;
  allocation: SmartPayAllocation[];
  totalAllocated: number;
  truePointsToEarn: number;
}

export interface PayTogetherPayment {
  cardId: string;
  amount: number;
}

export interface PayTogetherRequest {
  payments: PayTogetherPayment[];
}

export interface PayTogetherResponse {
  message: string;
  totalAmount: number;
  truePointsEarned: number;
  newTruePointsBalance: number;
  transactionId: string;
}