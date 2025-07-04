import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { LoadingService } from '../../services/loading.service';
import { ToastService } from '../../services/toast.service';
import { User } from '../../models/user.model';
import { CreditCard } from '../../models/credit-card.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentUser$: Observable<User | null>;
  creditCards: CreditCard[] = [];
  totalBalance = 0;
  nextDueDate = '';
  greeting = '';

  quickActions = [
    { 
      title: 'Link New Card', 
      subtitle: 'Add credit card', 
      icon: '➕', 
      route: '/link-card',
      color: 'bg-primary-500'
    },
    { 
      title: 'SmartPay™', 
      subtitle: 'Intelligent payments', 
      icon: '🧠', 
      route: '/smart-pay',
      color: 'bg-success-500'
    },
    { 
      title: 'PayTogether™', 
      subtitle: 'Multi-card payments', 
      icon: '🤝', 
      route: '/pay-together',
      color: 'bg-warning-500'
    },
    { 
      title: 'AI Coach', 
      subtitle: 'Get advice', 
      icon: '🤖', 
      route: '/ai-coach',
      color: 'bg-purple-500'
    }
  ];

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit(): void {
    this.setGreeting();
    this.loadUserData();
  }

  private setGreeting(): void {
    const hour = new Date().getHours();
    if (hour < 12) {
      this.greeting = 'Good morning';
    } else if (hour < 17) {
      this.greeting = 'Good afternoon';
    } else {
      this.greeting = 'Good evening';
    }
  }

  private loadUserData(): void {
    const userId = this.authService.getCurrentUserId();
    if (!userId) return;

    this.loadingService.show();
    
    this.apiService.getUserCards(userId).subscribe({
      next: (cards) => {
        this.creditCards = cards;
        this.calculateTotals();
        this.loadingService.hide();
      },
      error: (error) => {
        console.error('Error loading cards:', error);
        this.toastService.showError('Failed to load your cards');
        this.loadingService.hide();
      }
    });
  }

  private calculateTotals(): void {
    this.totalBalance = this.creditCards.reduce((sum, card) => sum + card.balance, 0);
    
    // Find next due date
    const sortedByDate = this.creditCards
      .filter(card => card.dueDate)
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    
    if (sortedByDate.length > 0) {
      const nextDue = new Date(sortedByDate[0].dueDate);
      this.nextDueDate = nextDue.toLocaleDateString('en-CA', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  refreshData(): void {
    this.loadUserData();
  }
}