export class Order{
      constructor(
            public id:number,
            public title:string,
            public description:string,
            public difficulty:string,
            public dateInit:Date,
            public dateFinish:Date,
            public id_Users:number,
            public id_Company:number
      ){}
}