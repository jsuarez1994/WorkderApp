import { Injectable } from '@angular/core'; //Permite que no instanciemos servicio, solo llamando accederemos a el
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { User } from '../models/user';

@Injectable()
export class UserService{
      url:string;
      identity;
      token;

      constructor(public _http:HttpClient){this.url = GLOBAL.url;}



      //------------------METODOS------------------



      register(user) : Observable<any>{
            let json = JSON.stringify(user);
            let params = 'json='+json;
            let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

            return this._http.post(this.url+'register', params, {headers:headers});
      }


      singup(user, getToken=null) : Observable<any>{

            if(getToken != null)
                  user.gettoken='true';

            let json = JSON.stringify(user);
            let params = 'json='+json;
            let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

            return this._http.post(this.url+'login', params, {headers:headers});
      }

      getIdentity(){
            let identity = JSON.parse(localStorage.getItem('identity'));

                  if(identity != "undefined")
                        this.identity = identity;
                  else
                        this.identity = null;
                  
            return this.identity;
      }

      getToken(){
            let token = localStorage.getItem('token');

                  if(token != "undefined")
                  this.token = token;
                  else
                  this.token = null;

            return this.token;
      }

      getUser(id) : Observable<any>{
            let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
            return this._http.get(this.url + 'user/' + id, {headers:headers});
      }

      getUserCompany(id_Company) : Observable<any>{
            let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
            return this._http.get(this.url + 'usersCompany/' + id_Company, {headers:headers});
      }

      getAllUsersCompany(id_Company) : Observable<any>{
            let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
            return this._http.get(this.url + 'allUsersCompany/' + id_Company, {headers:headers});
      }
}
