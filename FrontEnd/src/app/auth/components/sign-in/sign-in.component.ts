import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorMessagesService } from 'src/app/shared/services/error-messages.service';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { SignInRequest } from '../../models/sign-in-request';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;
  hide = true;

  constructor(
    public errorMessageService: ErrorMessagesService, 
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router,
    formBuilder: FormBuilder) { 
      this.signInForm = formBuilder.group({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
      });
    }

  ngOnInit(): void {
  }

  signIn(): void {

    let rowValue = this.signInForm.getRawValue();
    
    this.authService.signIn(rowValue as SignInRequest).subscribe(res => {
      this.profileService.token = res;
      this.router.navigate(['/']);
    });
  }

}
