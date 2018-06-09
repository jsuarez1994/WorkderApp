import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DefaultComponent } from './components/default/default.component';
import { OrderNewComponent } from './components/order-new/order-new.component';
import { OrderEditComponent } from './components/order-edit/order-edit.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { DetailUserComponent } from './components/detail-user/detail-user.component';
import { ShowOrdersComponent } from './components/show-orders/show-orders.component';
import { CompanyDetailComponent } from './components/company-detail/company-detail.component';

const appRoutes : Routes = [
    {path:'', component:DefaultComponent},
    {path:'login', component:LoginComponent},
    {path:'logout/:sure', component:LoginComponent},
    {path:'registro', component:RegisterComponent},
    {path:'user/:id', component:DetailUserComponent},
    {path:'orderNew', component:OrderNewComponent},
    {path:'showOrders/:id_Company/:completed', component:ShowOrdersComponent},
    {path:'orderEdit/:id', component:OrderEditComponent},
    {path:'order/:id', component:OrderDetailComponent},
    {path:'company/:id', component:CompanyDetailComponent},
]

export const appRoutingProviders:any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);






