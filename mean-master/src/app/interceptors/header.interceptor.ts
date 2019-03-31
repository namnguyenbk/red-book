import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { LoadingEffectService } from '../services/common/loading-effect.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {

	constructor(private loader: LoadingEffectService) { }
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		this.loader.showLoading();
		return next.handle(req)
			// .pipe(catchError((error, caught) => {
			// 	this.handleAuthError(error);
			// 	return of(error);
			// }) as any);
			.pipe(tap((event: HttpEvent<any>) => { 
				if (event instanceof HttpResponse) {
					this.loader.stopLoading();
				}
			},
				(err: any) => {
					this.handleAuthError(err);
			}));
	}

	handleAuthError(error: any): any {
		this.loader.stopLoading();
		if (error.status == '401') {
			alert('Co loi khi dang hhap, kiem tra email va mat khau!');
		}
	}
}