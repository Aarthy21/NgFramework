 import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'category' })
export class CategoryPipe implements PipeTransform {
  transform(usertype: any, code:any,name:any,args?:any): any {
      console.log(usertype);
      console.log(code.toLowerCase());
   if(code== null||name==null) return usertype;
   return usertype.filter(function(category){
      return (category[args.property].toLowerCase().indexOf(code.toLowerCase()) > -1)&&(category[args.property].toLowerCase().indexOf(name.toLowerCase()>-1));
   
    })
    
  }
}

// @Pipe({
//   name: 'category'
// })
// export class CategoryPipe implements PipeTransform {

//   transform(usertype: any, args:any[]):any {
//       return usertype.filter((value) => {
//           for (let i = 0; i < args.length; i++) {
//               if (value[args[i][0]] != args[i][1]) {
//                   return false;
//               }
//           }
//           return true;
//       });
//   }
// }