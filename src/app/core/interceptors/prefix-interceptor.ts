import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { APIRoutes } from "../interfaces/api.interface";

@Injectable()
export class PrefixInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let request = req;
        if (req.url.includes(APIRoutes.login)) {
            request = req.clone({
                headers: req.headers.set('Content-Type', 'application/json'),
                url: environment.serverURL + req.url
            });
        } else {
            const userInfo = localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info') || '{}') : {};
            request = req.clone({
                headers: req.headers.set('Content-Type', 'application/json').set('Authorization', 'Token ' + userInfo.token),
                url: environment.serverURL + req.url
            });
        }
        return next.handle(request);
    }
}