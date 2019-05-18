import { Injectable } from '@angular/core';
import { TdLoadingService, LoadingMode, LoadingType } from '@covalent/core/loading';


@Injectable({
  providedIn: 'root'
})
export class LoadingEffectService {
  constructor(private loadingService: TdLoadingService) {
    this.loadingService.create({
      name: 'loading',
      mode: LoadingMode.Indeterminate,
      type: LoadingType.Linear,
      color: 'primary',
    });
   }

  showLoading(){
    this.loadingService.register('loading');
  }
  
  stopLoading(){
    this.loadingService.resolve('loading');
  }
}
