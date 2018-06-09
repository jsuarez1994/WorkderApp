import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Company } from '../../models/company';
import { CompanyService } from '../../services/company.service';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    providers: [UserService,CompanyService]
})

export class RegisterComponent implements OnInit{
    title:string;
    user:User;
    companys:any[];
    tam:number;
    status:string;

    constructor(private _route: ActivatedRoute, private _router:Router, private _userService:UserService,private _companyService:CompanyService){
        this.title = 'Registrate';
        this.user  = new User(1, 'Personal', '', '', '', '',0,'',0,0);
    }

    ngOnInit(){
        this.getCompanys();
        console.log(this.companys);
    }

    getCompanys(){

        this._companyService.getCompanys().subscribe(
            response => {
                if(response.status == 'success'){
                    this.companys = response.company;
                }
                
            },
            error => {console.log(<any>error);}
        );

    }

    onSubmit(form){

        this._userService.register(this.user).subscribe(
            response => {
                if(response.status == 'success'){
                    this.status = response.status;
                    //Vaciamos el formulario
                    this.user  = new User(1, 'Personal', '', '', '', '',0,'',0,0);
                    form.reset();
                }else{
                    this.status = 'error';
                }
            },

            error => {console.log(<any>error);}
        )
    }
}