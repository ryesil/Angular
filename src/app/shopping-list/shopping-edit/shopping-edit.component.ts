import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @Output() 
  onAdd2 = new EventEmitter<Ingredient>();


  constructor() { }

  ngOnInit(): void {
  }

  onAdd(name, amount){
    if(name.length>0 && amount>0)
    this.onAdd2.emit(new Ingredient(name=name,amount=amount))
  }


  
}
