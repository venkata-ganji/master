import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss']
})
export class BottomNavComponent {
  currentRoute = '';

  navItems = [
    { route: '/dashboard', icon: '🏠', label: 'Home' },
    { route: '/smart-pay', icon: '💳', label: 'SmartPay' },
    { route: '/rewards', icon: '⭐', label: 'Rewards' },
    { route: '/cred-store', icon: '🛍️', label: 'Store' },
    { route: '/ai-coach', icon: '🤖', label: 'Coach' }
  ];

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
      });
  }

  navigate(route: string): void {
    this.router.navigate([route]);
  }

  isActive(route: string): boolean {
    return this.currentRoute === route;
  }
}