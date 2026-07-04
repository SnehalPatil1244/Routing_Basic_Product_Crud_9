import { Component, OnInit } from '@angular/core';
import { Iuser } from '../../model/users';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmationComponent } from '../get-confirmation/get-confirmation.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  UsersDetails !: Iuser
  userId !: string
  constructor(private userservice: UsersService,
    private snackbar: SnackbarService,
    private matdialog: MatDialog,
    private Routes: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.Routes.params.subscribe(param => {
      this.userId = param['userId']
      if (this.userId) {
        this.userservice.fetchusersById(this.userId)
          .subscribe({
            next: data => {
              this.UsersDetails = data
            },
            error: err => {
              console.log(err);

            }
          })
      }
    })

  }

  onremove() {
    let config = new MatDialogConfig()
    config.width = '300px'
    config.disableClose = true
    config.data = `Are You Sure ? You Want To Remove This Id ${this.userId}`
    let matref = this.matdialog.open(GetConfirmationComponent, config)
    matref.afterClosed().subscribe(res => {
      if (res) {
        this.userservice.onremoveuser(this.UsersDetails.userId)
          .subscribe(res => {
            this.snackbar.opensanckbar(res.msg)
            this.userservice.fetchusers().subscribe({
              next: res => {
                this.router.navigate(['/users', res[0].userId])
              }
            })
          })
      }
    })

  }

}
