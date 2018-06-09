import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-new',
  templateUrl: './order-new.component.html',
  styleUrls: ['./order-new.component.css'],
  providers: [ UserService,OrderService ]
})
export class OrderNewComponent implements OnInit {

  header:string;
  users:Array<User>;
  order:Order;
  identity;
  token;
  status:string;

  constructor(private _route: ActivatedRoute, 
              private _router:Router, 
              private _userService:UserService,
              private _orderService:OrderService) {
        this.token = this._userService.getToken();
        this.identity = this._userService.getIdentity();
        this.order = new Order(1,"","","",new Date,new Date,0,0);
        this.header = "Asignar una nueva orden a un empleado";
        }

  ngOnInit() {
    if(this.identity == null || this.identity.rol != 'Boss')
      this._router.navigate(['']);
    else{
      this.getUserCompany();
    }
  }

  getUserCompany(){
    this._userService.getUserCompany(this.identity.id_Company).subscribe(
      response => {
        this.users = response.users;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  dateValid(){
    if(this.order.dateInit > this.order.dateFinish)
      return false;
    else
      return true;
  }

  onSubmit(form){

    if(!this.dateValid()){
      this.status = "error";
    }else{
      this._orderService.store(this.token, this.order).subscribe(
        response => {
          if(response.status == "success"){
            this.status = "success";
            this.order = response.order;
            this._router.navigate(['']);
          }else{
            this.status = "error";
          }
        },
        error => {
          console.log(<any>error);
        }
      )
    }
  }

}
