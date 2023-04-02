import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  private ingredients:Ingredient[]=[ new Ingredient('Apples', 5),
  new Ingredient('Tomatos', 10)];


  
  constructor() { }


  //this returns a copy of the ingredients
  //If we add a new ingredient, it will not be added to the original ingredients
  //So look at the addIngredinet
public getShoppingList(){
return this.ingredients.slice();
}

//When we add an ingredient we also inform Angular about it with an emiter
//Simply we emit a new copy of the addded ingredients.
public addIngredient(ingredient){
this.ingredients.push(ingredient);
this.ingredientsChanged.emit(this.ingredients.slice());
}

addIngredients(ingredients:Ingredient[]){
// for(let ingredient of ingredients){
//   this.addIngredient(ingredient);
// }
this.ingredients.push(...ingredients);
this.ingredientsChanged.emit(this.ingredients.slice())

}


}
