import { Injectable, Input, Output, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { MDataModel} from './datamodel/mdata/mdatamodel'
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Ivdsservice } from './vds/Ivdsservice';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class Service {
  private baseUrl = 'http://192.168.18.94:8190/SMNGFramework-web/ngframework';
  private baseUrl1 = 'http://192.168.18.210:8070/smsearchservice/search';
  private obj;
  private responseobject;
  private endpoint;
  public userdetails;
  public indexarray;
  public itemarray;
  public mData:MDataModel;  
  @Output() completenode: EventEmitter<any> = new EventEmitter<any>();
  @Output() completeindex: EventEmitter<any> = new EventEmitter<any>();
  @Output() usernode: EventEmitter<any> = new EventEmitter<any>();
  @Output() userindex: EventEmitter<any> = new EventEmitter<any>();
  public array = [];
  constructor(private httpclient: HttpClient, private Ivdsservice: Ivdsservice) { }  
  vdsencryptservice(completemodel){
    this.obj= this.Ivdsservice.getencryptedpassword(completemodel)
     .catch((error: any) => Observable.throw(error.json().error || 'Server error')); 
      return this.obj;
  }

  private extractData(res: Response) {
        console.log(res);
        let body = res;
        console.log(body);           
        return body || {};
    }

  postjson(body: any) {
    this.endpoint = "setmodulestructure";
    this.obj = this.httpclient.post(`${this.baseUrl}/${this.endpoint}`, body).map(this.extractData)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    return this.obj;
  }

  getjson() {
    this.endpoint = "getmodulestructure";
    this.obj = this.httpclient.get(`${this.baseUrl}/${this.endpoint}`).map(this.extractData)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    return this.obj;
  }

  getdata() {
    return this.httpclient.get("./assets/data.json")
      .catch((error: any) => Observable.throw(error));

  }


  setusernode(item, index) {
    this.array[0] = item;
    this.array[1] = index;
    this.usernode.emit(this.array);
  }

  getusernode() {
    return this.usernode;
  }

  getusernode1() {
    return this.array;
  }

  setuserindex(indexarray) {
    console.log(indexarray);
    this.indexarray = indexarray;
    this.userindex.emit(indexarray);
  }

  getuserindex() {
    return this.userindex;
  }
  getuserindex1() {
    return this.indexarray;
  }

  setcompletenode(item, index) {
    console.log(item, index);
    this.array[0] = item;
    this.array[1] = index;
    this.completenode.emit(this.array);
  }

  getcompletenode() {
    return this.completenode;
  }

  setcompleteindex(indexarray) {
    console.log(indexarray);
    this.completeindex.emit(indexarray);
  }

  getcompleteindex() {
    return this.completeindex;
  }


  storeuserdetails(user) {
    console.log(user);
    this.userdetails = user;

  }

  retrieveuserdetails() {
    return this.userdetails;
  }

  storesystemdetails(user) {
    console.log(user);
    this.userdetails = user;

  }

  retrievesystemdetails() {
    return this.userdetails;
  }


  getitemdetails() {
    console.log(this.itemarray);
    return this.itemarray;
  }


  setitemdetails(itemarray) {
    console.log(itemarray);
    this.itemarray = itemarray;
  }

   saveusercredentials(user:any,userdetails:any){
     console.log(userdetails);
    this.mData=new MDataModel();
    this.mData.user=user;
    this.mData.userdetails=userdetails;
    console.log(this.mData);
  }

  retrieveusercredentials(){
    return this.mData;
  }


  getTwocolsearch(body: any) {
    console.log(JSON.stringify(body));
    var endpoint = "twocolumn";
    this.obj = this.httpclient.post(`${this.baseUrl1}/${endpoint}`, { "searchid": JSON.stringify(body) }).map(this.extractData)
      .catch((error: any) => Observable.throw(error));
    return this.obj;
  }

  getMulticolsearch(body: any) {
    console.log(JSON.stringify(body));
    var endpoint = "multicolumn";
    this.obj = this.httpclient.post(`${this.baseUrl1}/${endpoint}`, { "searchid": JSON.stringify(body) }).map(this.extractData)
      .catch((error: any) => Observable.throw(error));
    return this.obj;
  }
  
  getJdlgsearch(body: any) {
    console.log(JSON.stringify(body));
    var endpoint = "jdlg";
    this.obj = this.httpclient.post(`${this.baseUrl1}/${endpoint}`, { "searchid": JSON.stringify(body) }).map(this.extractData)
      .catch((error: any) => Observable.throw(error));
    return this.obj;
  }

}



