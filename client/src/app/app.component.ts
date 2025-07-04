import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LoadingService } from './services/loading.service';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'TrueCredit';
  isLoading$ = this.loadingService.loading$;
  showBottomNav = false;
  
  constructor(
    private router: Router,
    private loadingService: LoadingService,
    public toastService: ToastService
  ) {}

  ngOnInit() {
    // Listen to route changes to show/hide bottom navigation
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Show bottom nav on main app screens, hide on auth screens
        const hideNavRoutes = ['/', '/splash', '/login', '/register'];
        this.showBottomNav = !hideNavRoutes.includes(event.url);
      });
  }
}