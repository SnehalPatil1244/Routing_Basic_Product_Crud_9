import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private matsanckbar : MatSnackBar) { }
  opensanckbar(msg : string){
    this.matsanckbar.open(msg , "close",{
      duration : 300,
      horizontalPosition : 'left',
      verticalPosition : 'top'

    })
  }
}
