import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
@ViewChild('nameInput') nameInputRef: ElementRef;
@ViewChild('amountInput') amountInputRef: ElementRef;

@Output() ingrerientAdded = new EventEmitter<Ingredient>();


  constructor() { }

  ngOnInit(): void {
  }

  onAddItem(){
const ingName= this.nameInputRef.nativeElement.value;
const intAmount= this.amountInputRef.nativeElement.value;

const newIngredient = new Ingredient(ingName, intAmount)
this.ingrerientAdded.emit(newIngredient);
  }


  
}
