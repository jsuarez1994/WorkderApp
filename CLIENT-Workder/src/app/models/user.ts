export class User{
      constructor(
            public id:number,
            public rol:string,
            public email:string,
            public password:string,
            public name:string,
            public surname:string,
            public age:number,
            public sex:string,
            public id_Company:number,
            public id_Orders:number
      ){}
}