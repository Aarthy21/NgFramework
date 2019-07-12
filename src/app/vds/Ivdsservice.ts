import { BaseUrl, VDSng, VDS, FP } from './VDSng';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { $ } from 'protractor';

@Injectable()
export class Ivdsservice extends VDSng {

    @VDS("getusermodules", "svm")
    public getusermodules( @FP('{"name":"loginname","condition":"=","operator":"and"}') groupcode: String): Observable<any> { return null; };

    @VDS("countrydetails", "svm")
    public getcountry(): Observable<any> { return null; };

    @VDS("getcitydetails", "svm")
    public getcity( @FP('{"name":"countryname","condition":"=","operator":"and"}') countrycode: String): Observable<any> { return null; };

    @VDS("getuserdetails", "svm")
    public getuserdetails(): Observable<any> { return null; };

    @VDS("setuserdetails", "svm")
    public setuserdetails(catalog: any): Observable<any> { return null; };

    @VDS("updateuserdetails", "svm")
    public updateuserdetails(catalog: any): Observable<any> { return null; };

    @VDS("getuserencryptedpassword", "svm")
    public getuserencryptedpassword(catalog: any): Observable<any> { return null; };

    @VDS("getvalidationconstraints", "svm")
    public getvalidationconstraints(): Observable<any> { return null; };

    @VDS("getpwddetails", "svm")
    public getpwddetails( @FP('{"name":"loginname","condition":"=","operator":"and"}') usercode: String): Observable<any> { return null; };

    @VDS("getencryptedpassword", "svm")
    public getencryptedpassword(catalog: any): Observable<any> { return null; };

    @VDS("setpwd", "svm")
    public setpwd(catalog: any): Observable<any> { return null; };

    @VDS("getpwdcount", "svm")
    public getpwdcount( @FP('{"name":"loginname","condition":"=","operator":"and"}') usercode: String): Observable<any> { return null; };

    @VDS("getnewpassword", "svm")
    public getnewpassword( @FP('{"name":"loginname","condition":"=","operator":"and"}') usercode: String): Observable<any> { return null; };

    @VDS("gethistorydetails", "svm")
    public gethistorydetails( @FP('{"name":"loginname","condition":"=","operator":"and"}') usercode: String): Observable<any> { return null; };

    @VDS("updatepassword", "svm")
    public updatepassword(catalog: any): Observable<any> { return null; };

    @VDS("getlogindetails", "svm")
    public getlogindetails( @FP('{"name":"loginname","condition":"=","operator":"and"}') usercode: String): Observable<any> { return null; };

    @VDS("pwdhistorydetails", "svm")
    public pwdhistorydetails( @FP('{"name":"loginname","condition":"=","operator":"and"}') usercode: String): Observable<any> { return null; };

    @VDS("getusergroupdetails", "svm")
    public getusergroupdetails(): Observable<any> { return null; };

    @VDS("setusergroupdetail", "svm")
    public setusergroupdetail(catalog: any): Observable<any> { return null; };

    @VDS("deleteusergroupdetail", "svm")
    public deleteusergroupdetail(catalog: any): Observable<any> { return null; };

    @VDS("getmodules", "svm")
    public getmodules(): Observable<any> { return null; };

    @VDS("setusergroupmasterdetails", "svm")
    public setusergroupmasterdetails(catalog: any): Observable<any> { return null; };

    @VDS("setprofilemappingdetails", "svm")
    public setprofilemappingdetails(catalog: any): Observable<any> { return null; };

    @VDS("getusergroupmasterdetails", "svm")
    public getusergroupmasterdetails(): Observable<any> { return null; };

    @VDS("getprofilemodules", "svm")
    public getprofilemodules( @FP('{"name":"grpcode","condition":"=","operator":"and"}') groupcode: String): Observable<any> { return null; };

    // @VDS("deleteprofiledetails", "svm")     
    // public deleteprofiledetails(catalog: any): Observable<any> { return null; };

    @VDS("deleteugroupmasterdetails", "svm")
    public deleteugroupmasterdetails(catalog: any): Observable<any> { return null; };

    @VDS("getuserdetailsappinfo", "svm")
    public getuserdetailsappinfo(): Observable<any> { return null; };

    @VDS("getloginusertype", "svm")
    public getloginusertype( @FP('{"name":"loginname","condition":"=","operator":"and"}') loginname: String): Observable<any> { return null; };

    @VDS("getaccessusertypelist", "svm")
    public getaccessusertypelist( @FP('{"name":"usertype","condition":"=","operator":"and"}') usertype: String): Observable<any> { return null; };

    @VDS("getaccesstimezone", "svm")
    public getaccesstimezone(): Observable<any> { return null; };

    @VDS("getaccesssystemtype", "svm")
    public getaccesssystemtype(): Observable<any> { return null; };

    @VDS("getaccesscarriercode", "svm")
    public getaccesscarriercode(): Observable<any> { return null; };

    @VDS("getaccessdesignation", "svm")
    public getaccessdesignation(): Observable<any> { return null; };

    @VDS("getaccessdepartment", "svm")
    public getaccessdepartment( @FP('{"name":"usertype","condition":"=","operator":"and"}') usertype: String): Observable<any> { return null; };

    @VDS("getusergroupdetailinfo", "svm")
    public getusergroupdetailinfo(catalog: any): Observable<any> { return null; };

    @VDS("updateprofilemappingdetails", "svm")
    public updateprofilemappingdetails(catalog: any): Observable<any> { return null; };

    @VDS("updateusergroupmaster", "svm")
    public updateusergroupmaster(catalog: any): Observable<any> { return null; };

    @VDS("updateusermappingdetails", "svm")
    public updateusermappingdetails(catalog: any): Observable<any> { return null; };

    @VDS("getumusersbytype", "svm")
    public getusertype( @FP('{"name":"grpcode","condition":"=","operator":"and"}') groupcode: String, @FP('{"name":"status","condition":"=","operator":"and"}') groupcode1: String, @FP('{"name":"grptype","condition":"=","operator":"and"}') groupcode2: String): Observable<any> { return null; };

    @VDS("getumagencytype", "svm")
    public getagencytype( @FP('{"name":"grpcode","condition":"=","operator":"and"}') groupcode: String, @FP('{"name":"status","condition":"=","operator":"and"}') groupcode1: String, @FP('{"name":"grptype","condition":"=","operator":"and"}') groupcode2: String): Observable<any> { return null; };

    @VDS("getumregiontype", "svm")
    public getregiontype( @FP('{"name":"grpcode","condition":"=","operator":"and"}') groupcode: String, @FP('{"name":"status","condition":"=","operator":"and"}') groupcode1: String, @FP('{"name":"grptype","condition":"=","operator":"and"}') groupcode2: String): Observable<any> { return null; };

    @VDS("getumglobaltype", "svm")
    public getglobaltype( @FP('{"name":"grpcode","condition":"=","operator":"and"}') groupcode: String, @FP('{"name":"status","condition":"=","operator":"and"}') groupcode1: String, @FP('{"name":"grptype","condition":"=","operator":"and"}') groupcode2: String): Observable<any> { return null; };





}
