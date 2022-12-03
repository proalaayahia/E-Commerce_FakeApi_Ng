import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { delay, map, Observable } from "rxjs";
import { ajax } from "rxjs/ajax";

export function AsyncValidator(url: string, prop: any): AsyncValidatorFn {//{[key:string]:boolean}===validationerrors instead of boolean => any
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return checkControl(url).pipe(map(res => {
      return res[prop] == control.value ? { controlExist: true } : null
    }))
  };
  function checkControl(url: string): Observable<any> {
    return ajax.getJSON(url).pipe(delay(1000))
  }
}
