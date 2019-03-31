import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { LoadingEffectService } from '../services/common/loading-effect.service';
import { DialogService } from '../services/common/dialog.service';
import { Injectable } from '@angular/core';
import { TokenStorage } from '../auth/token.storage';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {

	constructor(private loader: LoadingEffectService, 
		private dialogService : DialogService) { }
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		this.loader.showLoading();
		const token = new TokenStorage();
		const tokenVal = token.getToken();
		const clonedRequest = req.clone({
		headers: req
			.headers
			.set('Authorization', tokenVal ? `Bearer ${ tokenVal}` : '')
	});
		return next.handle(clonedRequest)
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
	// intercept(req : HttpRequest <any>, next : HttpHandler) : Observable <HttpEvent<any>> {
	// 	// Clone the request to add the new header
	// 	const token = new TokenStorage();
	// 	const tokenVal = token.getToken();
	// 	const clonedRequest = req.clone({
	// 	headers: req
	// 		.headers
	// 		.set('Authorization', tokenVal ? `Bearer ${ tokenVal}` : '')
	// });

	// Pass the cloned request instead of the original request to the next handle
	// return next.handle(clonedRequest);

	handleAuthError(error: any): any {
		this.loader.stopLoading();
		if (error.status == '401') {
			this.dialogService.openAlert('Kiểm tra lại mật khẩu và email đang đăng nhập!')
		}
	}
}