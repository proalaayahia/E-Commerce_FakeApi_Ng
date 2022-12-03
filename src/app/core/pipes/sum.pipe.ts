import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sum',
  // pure: false
})
export class SumPipe implements PipeTransform {

  transform(values: any[], prop: string): any[] {
    return values.reduce((a, b) => a + b[prop], 0);
  }

}
