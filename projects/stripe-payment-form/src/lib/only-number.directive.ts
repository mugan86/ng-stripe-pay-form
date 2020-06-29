import { Directive, ElementRef, HostListener, Input } from '@angular/core';
// Información útil para saber los códigos ascii
// https://www.ascii-code.com/
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[appOnlyNumber]',
})
export class OnlyNumberDirective {
  constructor(private el: ElementRef) {}

  @Input() OnlyNumber: boolean;
  @Input() NoDecimals: boolean;

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    const e = event as KeyboardEvent;
    if (this.OnlyNumber) {
      // Available no numbers keys ("." , "Back Space", "Horizontal tab", "Escape", "Return", "
      const allow = [46, 8, 9, 27, 13, 110];
      if (!this.NoDecimals) {
        allow.push(190);
      }
      if (
          // tslint:disable-next-line: deprecation
        allow.indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A
        // tslint:disable-next-line: deprecation
        (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+C
        // tslint:disable-next-line: deprecation
        (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+V
        // tslint:disable-next-line: deprecation
        (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+X
        // tslint:disable-next-line: deprecation
        (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
        // Allow: home, end, left, right
        // tslint:disable-next-line: deprecation
        (e.keyCode >= 35 && e.keyCode <= 39)
      ) {
        // let it happen, don't do anything
        return;
      }
      // Ensure that it is a number and stop the keypress (NO NUMBERS)
      // tslint:disable-next-line: deprecation
      if (
        // tslint:disable-next-line: deprecation
        (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
        // tslint:disable-next-line: deprecation
        (e.keyCode < 96 || e.keyCode > 105)
      ) {
        e.preventDefault();
      }
    }
  }
}
