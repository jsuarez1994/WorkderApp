import { Component, OnInit, DoCheck } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css'],
  providers: [UserService, OrderService]
})
export class DefaultComponent implements OnInit {

  title:string;
  orders:Array<Order>;
  token;
  identity;

  constructor(private _route: ActivatedRoute, 
    private _router:Router, 
    private _userService:UserService,
    private _orderService:OrderService){
      this.title = 'Inicio';
      this.token = this._userService.getToken();
      this.identity = this._userService.getIdentity();
  }

  ngOnInit() {
    if(this.identity)
      this.getOrders();
  }

  getOrders(){
    this._orderService.getOrders(this.identity.sub).subscribe(
      response =>{
        if(response.status == "success"){
            this.orders = response.orders;
        }
      },
      error =>{
          console.log(<any>error);
      });
  }

  completeOrder(id){
    console.log();
    this._orderService.completeOrder(id).subscribe(
        response => {
          this.getOrders();
        },
        error => {
          console.log(<any>error);
        }
    );
  }

}
