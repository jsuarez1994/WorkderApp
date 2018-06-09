import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-edit',
  templateUrl: '../order-new/order-new.component.html',
  styleUrls: ['./order-edit.component.css'],
  providers: [ UserService,OrderService ]
})
export class OrderEditComponent implements OnInit {

  header:string;
  order:Order;
  users:Array<User>;
  token;
  identity;
  status:string;

  constructor(
    private _route: ActivatedRoute, 
    private _router:Router, 
    private _userService:UserService,
    private _orderService:OrderService){
      this.token = this._userService.getToken();
      this.identity = this._userService.getIdentity();
      this.header = "Actualizar orden ya asignada";
      this.order = new Order(0,"","","",new Date, new Date,0,0);
    }

    ngOnInit() {
      if(this.identity == null || this.identity.rol != 'Boss')
        this._router.navigate(['']);
      else{
        //Obtenemos la orden pasado por parametro y los usuarios de la empresa
        this.getOrder();
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
        this._orderService.update(this.token, this.order, this.order.id).subscribe(
          response => {
              this.status = 'success';
              this._router.navigate(['/showOrders', this.order.id_Company, 1]);
          },
          error => {
            console.log(<any>error);
            this.status = 'error';
          }
        )
      }
    } 

}
