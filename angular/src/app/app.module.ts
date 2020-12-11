import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';

import { AuthGuard } from 'src/app/guard/auth.guard';
import { AuthTokenService } from 'src/app/service/auth-token.service';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from './service/user.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { IndexComponent } from './page/index/index.component';
import { LoginComponent } from './page/login/login.component';
import { UserCreateComponent } from './page/user-create/user-create.component';
import { MainComponent } from './page/main/main.component';
import { UserLoginComponent } from './component/user-login/user-login.component';
import { TweetCreateComponent } from './component/tweet-create/tweet-create.component';
import { TweetGetListComponent } from './component/tweet-get-list/tweet-get-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    IndexComponent,
    LoginComponent,
    UserCreateComponent,
    IndexComponent,
    MainComponent,
    UserLoginComponent,
    TweetCreateComponent,
    TweetGetListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    AuthService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
