import {Injectable} from "@angular/core";
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {AppSettings,AUTH_PREFIX,AUTH_HEADER_KEY} from "../app.setting";

@Injectable()
export class InterceptedHttp extends Http {
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.get(url, this.getRequestOptionArgs(url,options))
                    .catch(
                        (error)=>{
                                console.log('testing');
                           // this.notifyService.popError();
                            return Observable.throw(error);
                        }
                    );
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.post(url, body, this.getRequestOptionArgs(url,options))
        .catch(
            (error)=>{
                    console.log('testing');
               // this.notifyService.popError();
                return Observable.throw(error);
            }
        );
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.put(url, body, this.getRequestOptionArgs(url,options))
        .catch(
            (error)=>{
                   
               // this.notifyService.popError();
                return Observable.throw(error);
            }
        );
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.delete(url, this.getRequestOptionArgs(url,options))
        .catch(
            (error)=>{
                    console.log('testing');
               // this.notifyService.popError();
                return Observable.throw(error);
            }
        );
    }
    
    private updateUrl(req: string) {
        return  req;
    }

    private getRequestOptionArgs(url:string,options?: RequestOptionsArgs) : RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
       // options.headers.append('Content-Type', 'application/json');
       
        if(!url.includes("oauth")){
            options.headers.append(AUTH_HEADER_KEY,AUTH_PREFIX+' '+AppSettings.token);
        }
        return options;
    }
}