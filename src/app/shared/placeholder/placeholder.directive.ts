import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]'
})
export class PlaceholderDirective {



  //viewContainerRef gives access to the place where this directive is used.
  //We make it public so that we can use it outside the class
  constructor(public viewContainerRef:ViewContainerRef) {

  }

}
