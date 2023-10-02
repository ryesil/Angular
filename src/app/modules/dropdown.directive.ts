import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  color:boolean = false;
@Input('appDropdown') cssClass:string;


  constructor(private elementRef:ElementRef, private renderer:Renderer2) { }

@HostListener('click') onClick(eventData:Event){
  console.log(this.cssClass);
this.color = !this.color;
if(this.color){

this.renderer.addClass(this.renderer.nextSibling(this.elementRef.nativeElement),this.cssClass);
}
else{

this.renderer.removeClass(this.renderer.nextSibling(this.elementRef.nativeElement),this.cssClass);
}
}



}
