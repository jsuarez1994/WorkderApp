import { Injectable } from '@angular/core'; //Permite que no instanciemos servicio, solo llamando accederemos a el
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Order } from '../models/order';

@Injectable()
export class OrderService{
      url:string;
      identity;
      token;

      constructor(public _http:HttpClient){this.url = GLOBAL.url;}

      //------------------METODOS------------------
      getOrder(id) : Observable<any>{
            let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
            return this._http.get(this.url + 'orders/' + id, {headers:headers});
      }

      getOrders(id) : Observable<any>{
            let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
            return this._http.get(this.url + 'getorders/' + id, {headers:headers});
      }

      completeOrder(id) : Observable<any>{
            let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
            return this._http.put(this.url + 'complete/' + id, {headers:headers});
      }

      store(token, order:Order) : Observable<any> {
            let json = JSON.stringify(order);
            let params = 'json='+json;
    
            let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                          .set('Authorization', token);
            
            return this._http.post(this.url + 'orders', params, {headers:headers});
      }

      ordersCompany(id_Company, completed) : Observable<any>{
            let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
            return this._http.get(this.url + 'ordersCompany/' + id_Company + "/" + completed, {headers:headers});
      }

      update(token, order, id) : Observable<any>{
            let json = JSON.stringify(order);
            let params = 'json='+json;

            let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                          .set('Authorization', token);
            return this._http.put(this.url + 'orders/'+ id , params , {headers:headers});
      }
}