import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Iuser } from '../../model/users';
import { UsersService } from '../../services/users.service';
import { SnackbarService } from '../../services/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FocusMonitor } from '@angular/cdk/a11y';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  UserForm !: FormGroup
  isinEditMode: boolean = false
  edituser !: Iuser
  userId !: string

  constructor(private userserive: UsersService,
    private snackbar: SnackbarService,
    private Routes: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createUserForm()
    this.addskillscontrol()
    this.isPermenamtAddHandler()
    this.isAddSameHandler()
    this.patchvalueinform()
  }

  isPermenamtAddHandler() {
    this.formcontrols['address'].get('current')?.valueChanges
      .subscribe(val => {
        if (this.formcontrols['address'].get('current')?.valid) {
          this.formcontrols['isAddSame'].enable()
        } else {
          this.formcontrols['isAddSame'].reset()
          this.formcontrols['isAddSame'].disable()
        }
      })
  }

  isAddSameHandler() {
    this.formcontrols['isAddSame'].valueChanges
      .subscribe(val => {
        console.log(this.UserForm);

        if (val) {
          let currentAdd = this.formcontrols['address'].get('current')?.value;
          this.formcontrols['address'].get('permanent')?.patchValue(currentAdd)
          this.formcontrols['address'].get('permanent')?.disable()
        }
        else if (this.isinEditMode && !val) {
          this.formcontrols['address'].get('permanent')?.patchValue(this.edituser.address.permanent)
          this.formcontrols['address'].get('permanent')?.enable()
        }
        else {
          this.formcontrols['address'].get('permanent')?.reset()
          this.formcontrols['address'].get('permanent')?.enable()
        }
      })
  }

  createUserForm() {
    this.UserForm = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      userRole: new FormControl('Candidate'),
      profileDescription: new FormControl(null, Validators.required),
      profileImage: new FormControl(null, [Validators.required]),
      experienceYears: new FormControl(null, [Validators.required]),
      isActive: new FormControl(null, [Validators.required]),
      isAddSame: new FormControl({ value: null, disabled: true }),
      skills: new FormArray([]),

      address: new FormGroup({
        current: new FormGroup({
          city: new FormControl(null, [Validators.required]),
          state: new FormControl(null, [Validators.required]),
          country: new FormControl('India'),
          zipcode: new FormControl(null, [Validators.required])
        }),
        permanent: new FormGroup({
          city: new FormControl(null, [Validators.required]),
          state: new FormControl(null, [Validators.required]),
          country: new FormControl('India'),
          zipcode: new FormControl(null, [Validators.required])
        })
      })
    })
  }

  addskillscontrol() {
    let formcontrol = new FormControl(null, [Validators.required])
    this.skillsArr.push(formcontrol)
  }

  get formcontrols() {
    return this.UserForm.controls
  }
  get skillsArr() {
    return this.formcontrols['skills'] as FormArray
  }

  onuserAdd() {
    if (this.UserForm.invalid) {
      this.UserForm.markAllAsTouched()
    } else {
      let UserDetails = { ...this.UserForm.getRawValue(), userId: Date.now().toString() }
      this.userserive.onaddusers(UserDetails)
        .subscribe({
          next: res => {
            this.snackbar.opensanckbar(res.msg)
            this.router.navigate(['/users', res.data.userId])
          },
          error: err => {
            this.snackbar.opensanckbar(err.msg)
          }
        })
    }
  }

  patchvalueinform() {
    this.userId = this.Routes.snapshot.paramMap.get('userId')!
    if (this.userId) {
      this.userserive.fetchusersById(this.userId).subscribe({
        next: res => {
          this.edituser = res
          this.isinEditMode = true
          this.UserForm.patchValue(this.edituser)
          if (res.userRole === 'Candidate') {
            this.UserForm.disable()
          }
          this.skillsArr.clear()
          this.edituser.skills.forEach(ele => {
            let control = new FormControl(ele)
            this.skillsArr.push(control)
          })

        }
      })
    }
  }

  onUpdate() {
    if (this.UserForm.invalid) {
      this.UserForm.markAllAsTouched()
    } else {
      let updatedobj = { ...this.UserForm.getRawValue(), userId: this.userId }
      this.userserive.onupdateuser(updatedobj)
        .subscribe({
          next: res => {
            this.snackbar.opensanckbar(res.msg)
            this.router.navigate(['/users', res.data.userId])
          },
          error: err => {
            console.log(err);

          }
        })
    }

  }

}
