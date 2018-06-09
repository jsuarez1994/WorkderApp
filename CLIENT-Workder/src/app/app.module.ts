import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';
import { HttpClientModule } from '@angular/common/http';

//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DefaultComponent } from './components/default/default.component';
import { OrderNewComponent } from './components/order-new/order-new.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderEditComponent } from './components/order-edit/order-edit.component';
import { DetailUserComponent } from './components/detail-user/detail-user.component';
import { ShowOrdersComponent } from './components/show-orders/show-orders.component';
import { CompanyDetailComponent } from './components/company-detail/company-detail.component';

//Componentes NPM-EXTRAS
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DefaultComponent,
    OrderNewComponent,
    OrderDetailComponent,
    OrderEditComponent,
    DetailUserComponent,
    ShowOrdersComponent,
    CompanyDetailComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
