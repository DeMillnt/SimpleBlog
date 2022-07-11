import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessagesService {

  errors: { [id: string]: string } = {};

  constructor() {
    this.errors['required'] = "You must enter a value";
    this.errors['notEquivalent'] = "Password not equivalent";
  }

  getErrorMessage(form: FormGroup, controlName: string): string {
    let control = form.get(controlName);

    if (control?.invalid) {
      let controlErrors = control?.errors as { [key: string]: boolean };
      let keys = Object.keys(controlErrors);

      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (controlErrors[key]) {
          return this.getError(key);
        }
      }
    }

    return '';
  }

  private getError(key: string): string {
    let errorMessage = this.errors[key];
    return !!errorMessage ? errorMessage : key;
  }
}