import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
  providers: [ UserService,OrderService ]
})
export class OrderDetailComponent implements OnInit {

  private title:string;
  private order:Order;
  private days:number;
  token;

  constructor(private _route: ActivatedRoute, 
    private _router:Router, 
    private _userService:UserService,
    private _orderService:OrderService){
      this.title = 'DETALLE DE LA ORDEN';
      this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.getOrder();
  }

  getOrder(){
    this._route.params.subscribe(params =>{
      let id = +params['id'];//le llega por la url.
      this._orderService.getOrder(id).subscribe(
        response => {
          if(response.status == 'success'){
            this.order = response.order;
          }else{
            this._router.navigate(['']);
          }
        },
        error => {
          console.log(<any>error);
        }
      )
    });
  }

  completeOrder(id){
    
    this._orderService.completeOrder(id).subscribe(
        response => {
          this._router.navigate(['']);
        },
        error => {
          console.log(<any>error);
        }
    );
    
  }

}
