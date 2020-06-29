import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string): string {
    const words = value.split('-');
    console.log(words);
    let output = '';
    words.map( (word: string) => {
      output += word.substring(0, 1).toUpperCase()
          .concat(word.substring(1)).concat(' ');
    });
    return output.trim();
  }

}
