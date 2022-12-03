import { AbstractControl, ValidatorFn } from "@angular/forms";

export function ValidatePassword(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let messageValidate = { pass: { notMatch: '' } }
    let regex: RegExp
    if (control.value !== '' && control.value.length > 5) {
      regex = new RegExp('[a-z]');
      if (!regex.test(control.value)) {
        messageValidate.pass.notMatch = 'PASSWORD_SMALL';
        return { validPass: true, message: messageValidate.pass.notMatch };
      }
      regex = new RegExp('[A-Z]');
      if (!regex.test(control.value)) {
        messageValidate.pass.notMatch = 'PASSWORD_CAPITAL';
        return { validPass: true, message: messageValidate.pass.notMatch };
      }
      regex = new RegExp('[~!@#$%^&*()+<>{}]');
      if (!regex.test(control.value)) {
        messageValidate.pass.notMatch = 'PASSWORD_UNIFIED';
        return { validPass: true, message: messageValidate.pass.notMatch };
      }
      regex = new RegExp('[0-9]');
      if (!regex.test(control.value)) {
        messageValidate.pass.notMatch = 'PASSWORD_NUM';
        return { validPass: true, message: messageValidate.pass.notMatch };
      }
    }
    return null;
  }
}
