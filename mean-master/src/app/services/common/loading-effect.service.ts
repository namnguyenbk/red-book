import { Injectable } from '@angular/core';
import { TdLoadingService, LoadingMode, LoadingType } from '@covalent/core/loading';


@Injectable({
  providedIn: 'root'
})
export class LoadingEffectService {
  constructor(private loadingService: TdLoadingService,
    private loadingSerice2 : TdLoadingService) {
    this.loadingService.create({
      name: 'loading',
      mode: LoadingMode.Indeterminate,
      type: LoadingType.Linear,
      color: 'primary',
    });
    this.loadingSerice2.create({
      name: 'loading2',
      mode: LoadingMode.Indeterminate,
      type: LoadingType.Circular,
      color: 'primary',
    });
   }

  showLoading(){
    this.loadingService.register('loading');
  }
  
  stopLoading(){
    this.loadingService.resolve('loading');
  }

  showLoading2(){
    this.loadingSerice2.register('loading2');
  }
  
  stopLoading2(){
    this.loadingSerice2.resolve('loading2');
  }
}
