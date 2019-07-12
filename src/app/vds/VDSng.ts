import { Inject } from "@angular/core";
import {
    Headers as AngularHeaders,
    Request, RequestMethod as RequestMethods,
    Response,
    URLSearchParams,
} from "@angular/http";

import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map'

/**
* Angular 2 VDSng class.
*
* @class VDSng
* @constructor
*/
export class VDSng {
    url: string = "http://192.168.18.210:8070/QueryService-war/services/query/generic";
    public constructor( @Inject(HttpClient) protected http: HttpClient) {
    }

    protected getBaseUrl(): string {
        return this.url;
    };

    protected getDefaultHeaders(): Object {
        return null;
    };

    /**
    * Request Interceptor
    *
    * @method requestInterceptor
    * @param {Request} req - request object
    */
    protected requestInterceptor(req: Request) {
        //
    }

    /**
    * Response Interceptor
    *
    * @method responseInterceptor
    * @param {Response} res - response object
    * @returns {Response} res - transformed response object
    */
    protected responseInterceptor(res: Observable<any>): Observable<any> {
        return res;
    }

}

/**
 * Set the base URL of REST resource
 * @param {String} url - base URL
 */
export function BaseUrl(url: string) {
    return function <TFunction extends Function>(Target: TFunction): TFunction {
        Target.prototype.getBaseUrl = function () {
            return url;
        };
        return Target;
    };
}

/**
 * Set default headers for every method of the VDSng
 * @param {Object} headers - deafult headers in a key-value pair
 */
export function DefaultHeaders(headers: any) {
    return function <TFunction extends Function>(Target: TFunction): TFunction {
        Target.prototype.getDefaultHeaders = function () {
            return headers;
        };
        return Target;
    };
}

function paramBuilder(paramName: string) {
    return function (key: string) {
        return function (target: VDSng, propertyKey: string | symbol, parameterIndex: number) {
            var metadataKey = `${propertyKey}_${paramName}_parameters`;
            var paramObj: any = {
                key: key,
                parameterIndex: parameterIndex
            };
            if (Array.isArray(target[metadataKey])) {
                target[metadataKey].push(paramObj);
            } else {
                target[metadataKey] = [paramObj];
            }
        };
    };
}

/**
 * Field Property variable of a method, type: string
 * @param {string} FP JSON - FP Json value
 */
export var FP = paramBuilder("FP");


/**
 * Set custom headers for a REST method
 * @param {Object} headersDef - custom headers in a key-value pair
 */
export function Headers(headersDef: any) {
    return function (target: VDSng, propertyKey: string, descriptor: any) {
        descriptor.headers = headersDef;
        return descriptor;
    };
}


/**
 * Defines the media type(s) that the methods can produce
 * @param MediaType producesDef - mediaType to be parsed
 */
export function Produces(producesDef: MediaType) {
    return function (target: VDSng, propertyKey: string, descriptor: any) {
        descriptor.isJSON = producesDef === MediaType.JSON;
        return descriptor;
    };
}


/**
 * Supported @Produces media types
 */
export enum MediaType {
    JSON
}


function methodBuilder() {
    return function (servicename: string, tenant: string) {
        return function (target: VDSng, propertyKey: string, descriptor: any) {
            var pFP = target[`${propertyKey}_FP_parameters`];
            descriptor.value = function (...args: any[]) {
                var fpList = [];
                // Body
                var body = {};
                if (pFP) {
                    for (var k in pFP) {
                        var FP = JSON.parse(pFP[k].key);
                        FP["field"] = FP["name"];
                        FP["value"] = args[pFP[k].parameterIndex];
                        fpList.push(FP);
                        delete FP["name"];
                    }
                    body = fpList;
                    console.log(JSON.stringify(body));
                } else {
                    body = args[0];
                    console.log(JSON.stringify(body));
                }
                console.log('resUrl >> ' + this.getBaseUrl());
                var datamodel = {};
                datamodel["servicename"] = servicename;
                datamodel["tenant"] = tenant;
                datamodel["values"] = body;
                console.log(JSON.stringify(datamodel));
                console.log("VDS execution initiated for servicename :" + servicename)
                var observable: Observable<Response> = this.http.post(this.getBaseUrl(), datamodel);
                // transform the obserable in accordance to the @Produces decorator
                if (descriptor.isJSON) {
                    observable = observable.map(res => res.json());
                }
                // intercept the response
                observable = this.responseInterceptor(observable);

                return observable;
            };

            return descriptor;
        };
    };
}

/**
 * VDS method
 * @param {string} servicename - resource url of the method
 * @param {string} tenant - resource url of the method
 */
export var VDS = methodBuilder();
