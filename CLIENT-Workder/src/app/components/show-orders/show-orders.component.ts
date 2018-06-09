import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@Component({
  selector: 'app-show-orders',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.css'],
  providers: [ UserService,OrderService ]
})
export class ShowOrdersComponent implements OnInit {

  token;
  identity;
  title:string;
  view:number;
  orders:Array<Order>;

  constructor(private _route: ActivatedRoute, 
              private _router:Router, 
              private _userService:UserService,
              private _orderService:OrderService){
      this.token = this._userService.getToken();
      this.identity = this._userService.getIdentity();
      }

  ngOnInit() {
    this.getOrdersIC();
  }


  getOrdersIC(){
    this._route.params.subscribe(params =>{

      let id_Company = +params['id_Company'];
      let completed = +params['completed'];

      if(completed == 0){
        this.title = "Listado de ordenes completadas";
        this.view = 0;
      }else{
        this.title="Listado de ordenes incompletas";
        this.view = 1;
      }

      this._orderService.ordersCompany(id_Company, completed).subscribe(
        response => {
            this.orders = response.orders;
        },
        error => {
          console.log(<any>error);
        }
      )
    });
  }

}
