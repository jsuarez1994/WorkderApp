import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';
import { Company } from '../../models/company';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css'],
  providers: [ UserService,OrderService ]
})
export class DetailUserComponent implements OnInit {

  title:string;
  user:User;
  orders:Array<Order>;
  company:Company;
  tam:number;
  token;
  identity;

  constructor(private _route: ActivatedRoute, 
              private _router:Router, 
              private _userService:UserService,
              private _orderService:OrderService,
              private _companyService:CompanyService){
      this.user = new User(1,"","","","","",0,"",0,0);
      this.company = new Company(1,"","","","");
      this.title = 'DETALLE DE USUARIO';
      this.token = this._userService.getToken();
      this.identity = this._userService.getIdentity();
  }

  ngOnInit() {
    this.getUser();
    this.getCompany();
  }

  getUser(){
    this._route.params.subscribe(params =>{
      let id = +params['id'];//le llega por la url.
      this._userService.getUser(id).subscribe(
        response => {
            this.user = response.user;
            this.getOrders(id);
        },
        error => {
          console.log(<any>error);
        }
      )
    });
  }

  getCompany(){
    this._companyService.getCompany(this.identity.id_Company).subscribe(
      response => {
          if(response.status == "success"){
            this.company = response.company;
          }
      },
      error => {
          console.log(<any>error);
      }
    );
}

  getOrders(id){
    this._orderService.getOrders(id).subscribe(
      response =>{
        if(response.status == "success"){
            this.orders = response.orders;
            this.tam = this.orders.length;
        }
      },
      error =>{
          console.log(<any>error);
      });
  }

}
