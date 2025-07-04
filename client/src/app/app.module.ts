import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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

// Shared Components
import { CreditCardComponent } from './components/shared/credit-card/credit-card.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { BottomNavComponent } from './components/shared/bottom-nav/bottom-nav.component';

// Services
import { AuthService } from './services/auth.service';
import { ApiService } from './services/api.service';
import { ToastService } from './services/toast.service';
import { LoadingService } from './services/loading.service';

@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    LinkCardComponent,
    SmartPayComponent,
    PayTogetherComponent,
    RewardsComponent,
    CredStoreComponent,
    AiCoachComponent,
    CreditCardComponent,
    LoadingComponent,
    HeaderComponent,
    BottomNavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    ApiService,
    ToastService,
    LoadingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }