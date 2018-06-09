import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from './services/user.service';
import { Company } from './models/company';
import { CompanyService } from './services/company.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ UserService, CompanyService ]
})

export class AppComponent implements OnInit, DoCheck{

  identity;
  token;

  constructor(private _userService:UserService, 
              private _companyService:CompanyService){
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
    }
    
  ngOnInit(){
    /*if(this.identity != null || this.token != null){
      this.getCompany();
    }*/
  }

  /*getCompany(){
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
  }*/

  //DoCheck se encarga de cada vez que hay un cambio a nivel de componente, ejecuta el código dentro
  //del método
  ngDoCheck(){
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
  }
}
