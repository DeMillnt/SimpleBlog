import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorMessagesService } from 'src/app/shared/services/error-messages.service';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { SignUpRequest } from '../../models/sing-up-request';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  hide = true;
  hideConfirm = true;

  constructor(
    public errorMessageService: ErrorMessagesService, 
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router,
    formBuilder: FormBuilder) {

    this.signUpForm = formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });
    this.signUpForm.setValidators(this.passwordEquivalent());
  }

  ngOnInit(): void {
  }

  signUp(): void {

    let rowValue = this.signUpForm.getRawValue();
    delete rowValue.confirmPassword;
    this.authService.signUp(rowValue as SignUpRequest).subscribe(res => {    
      this.profileService.token = res;
      this.router.navigate(['/']);
    });
  }

  passwordEquivalent(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let group = control as FormGroup;

      let password = group.controls['password'];
      let confirmPassword = group.controls['confirmPassword'];

      if (password.value != confirmPassword.value) {
        confirmPassword.setErrors({ notEquivalent: true });
      } else {
        confirmPassword.setErrors(null);        
      }

      return null;
    };
  }
}
