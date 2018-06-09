import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Company } from '../../models/company';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css'],
  providers: [ UserService,CompanyService ]
})

export class CompanyDetailComponent implements OnInit {

  title:string;
  company:Company;
  users:Array<User>;
  token;
  identity;

  constructor(private _route: ActivatedRoute, 
              private _router:Router, 
              private _userService:UserService,
              private _companyService:CompanyService){
      this.company = new Company(1,"","","","");
      this.title = 'DETALLE DE EMPRESA';
      this.token = this._userService.getToken();
      this.identity = this._userService.getIdentity();
    }

  ngOnInit() {
    this.getCompany();
  }

  getCompany(){
    this._companyService.getCompany(this.identity.id_Company).subscribe(
      response => {
          if(response.status == "success"){
            this.company = response.company;
            this.getAllUsersCompany(this.company.id);
          }
      },
      error => {
          console.log(<any>error);
      }
    );
  }

  getAllUsersCompany(id_Company){
    this._userService.getAllUsersCompany(id_Company).subscribe(

      response => {
        if(response.status == "success"){
          this.users = response.users;
        }
      },

      error => {
        console.log(<any>error);
      }
    );
    
  }

}