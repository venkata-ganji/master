import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// Models
import { 
  User, 
  AuthResponse, 
  LoginRequest, 
  RegisterRequest 
} from '../models/user.model';
import { 
  CreditCard, 
  AddCardRequest, 
  SmartPayRequest, 
  SmartPayResponse,
  PayTogetherRequest,
  PayTogetherResponse 
} from '../models/credit-card.model';
import { 
  RewardsResponse, 
  CredStoreItem, 
  RedeemRequest, 
  RedeemResponse,
  CoachRequest,
  CoachResponse 
} from '../models/rewards.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = environment.apiUrl || 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('truecredit_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // Health Check
  healthCheck(): Observable<any> {
    return this.http.get(`${this.baseUrl}/health`);
  }

  // Authentication APIs
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/login`, credentials);
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/register`, userData);
  }

  // User APIs
  getUserProfile(userId: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/user/${userId}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Credit Card APIs
  getUserCards(userId: string): Observable<CreditCard[]> {
    return this.http.get<CreditCard[]>(`${this.baseUrl}/cards/${userId}`, {
      headers: this.getAuthHeaders()
    });
  }

  addCreditCard(cardData: AddCardRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/cards/add`, cardData, {
      headers: this.getAuthHeaders()
    });
  }

  // Payment APIs
  getSmartPayAllocation(request: SmartPayRequest): Observable<SmartPayResponse> {
    return this.http.post<SmartPayResponse>(`${this.baseUrl}/pay/smartpay`, request, {
      headers: this.getAuthHeaders()
    });
  }

  processPayTogether(request: PayTogetherRequest): Observable<PayTogetherResponse> {
    return this.http.post<PayTogetherResponse>(`${this.baseUrl}/pay/paytogether`, request, {
      headers: this.getAuthHeaders()
    });
  }

  // Rewards APIs
  getRewards(userId: string): Observable<RewardsResponse> {
    return this.http.get<RewardsResponse>(`${this.baseUrl}/rewards/${userId}`, {
      headers: this.getAuthHeaders()
    });
  }

  // CredStore APIs
  getCredStoreCatalog(): Observable<CredStoreItem[]> {
    return this.http.get<CredStoreItem[]>(`${this.baseUrl}/credstore/catalog`, {
      headers: this.getAuthHeaders()
    });
  }

  redeemReward(request: RedeemRequest): Observable<RedeemResponse> {
    return this.http.post<RedeemResponse>(`${this.baseUrl}/credstore/redeem`, request, {
      headers: this.getAuthHeaders()
    });
  }

  // AI Coach API
  chatWithCoach(request: CoachRequest): Observable<CoachResponse> {
    return this.http.post<CoachResponse>(`${this.baseUrl}/coach`, request, {
      headers: this.getAuthHeaders()
    });
  }
}