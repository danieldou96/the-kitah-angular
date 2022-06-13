import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {
  transform(value: string, format: string): string {
    let replacedPhoneNumber = format;
    for (let index = 0; index < value.length; index++) {
      replacedPhoneNumber = replacedPhoneNumber.replace('0', value[index])
    }
    return replacedPhoneNumber;
  }
}
