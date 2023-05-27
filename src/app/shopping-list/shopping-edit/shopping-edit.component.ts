import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import {Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', {static:false}) slForm : NgForm;
  subscription:Subscription;
  editMode=false;
  editedItemIndex:number;
  editedItem:Ingredient

  constructor(private shoppingListService:ShoppingListService) {

   }


  ngOnInit(): void {
this.subscription = this.shoppingListService.startedEditing.subscribe(
  index=> {
    this.editMode=true;
    this.editedItemIndex=index;
    this.editedItem=this.shoppingListService.getIngredient(index);
    this.slForm.setValue({
      name:this.editedItem.name,
      amount:this.editedItem.amount
    })
  }
)
  }

  onAddItem(form:NgForm){
  const value=form.value;
const newIngredient = new Ingredient(value?.name, value?.amount)
if(this.editMode){
  this.shoppingListService.updateIngredient(this.editedItemIndex,newIngredient);
}else{
this.shoppingListService.addIngredient(newIngredient);
this.editMode=false;
}

form.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
onClear(){
this.slForm.reset();
this.editMode=false;

}

onDelete(){
  console.log(this.editedItemIndex)
 console.log(  this.shoppingListService.getIngredients())
this.shoppingListService.deleteIngredient(this.editedItemIndex);
this.onClear();
}


}
