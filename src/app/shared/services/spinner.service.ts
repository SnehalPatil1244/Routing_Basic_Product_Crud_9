import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
isLoading$ : BehaviorSubject<boolean> = new BehaviorSubject(false)
isLoadingobs$ = this.isLoading$.asObservable()
  constructor() { }

  emitisLoading$(flag : boolean){
    this.isLoading$.next(flag)
  }
}
