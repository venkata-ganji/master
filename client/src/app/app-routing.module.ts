import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { SplashComponent } from './components/splash/splash.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LinkCardComponent } from './components/link-card/link-card.component';
import { SmartPayComponent } from './components/smart-pay/smart-pay.component';
import { PayTogetherComponent } from './components/pay-together/pay-together.component';
import { RewardsComponent } from './components/rewards/rewards.component';
import { CredStoreComponent } from './components/cred-store/cred-store.component';
import { AiCoachComponent } from './components/ai-coach/ai-coach.component';

// Guards
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/splash', pathMatch: 'full' },
  { path: 'splash', component: SplashComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'link-card', 
    component: LinkCardComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'smart-pay', 
    component: SmartPayComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'pay-together', 
    component: PayTogetherComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'rewards', 
    component: RewardsComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'cred-store', 
    component: CredStoreComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'ai-coach', 
    component: AiCoachComponent, 
    canActivate: [AuthGuard] 
  },
  { path: '**', redirectTo: '/splash' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false,
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }