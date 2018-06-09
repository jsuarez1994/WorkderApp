import { Injectable } from '@angular/core'; //Permite que no instanciemos servicio, solo llamando accederemos a el
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Company } from '../models/company';

@Injectable()
export class CompanyService{
      url:string;
      identity;
      token;

      constructor(public _http:HttpClient){this.url = GLOBAL.url;}

      //------------------METODOS------------------
      getCompany(id) : Observable<any>{
            return this._http.get(this.url + 'company/' + id);
      }

      getCompanys() : Observable<any>{
            let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
            return this._http.get(this.url + 'company', {headers:headers});
      }
}