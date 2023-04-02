import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';


@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  constructor(private shoppingListService:ShoppingListService) {}

  private recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'What else you need to say?',
      'https://toriavey.com/images/2020/02/TOA20_03.jpeg',
      [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
    ),

    new Recipe(
      'Big Fat Burger',
      'What else do you want to add?',
      'https://p1.pxfuel.com/preview/804/456/49/burger-food-foodie-hamburger-cheeseburger-burgers.jpg',
      [new Ingredient('Buns',2), new Ingredient('Meat',1)]
    ),
  ];

  getRecipes() {
    //This is important. We don't want to directly access to the recipes.
    //JavaScript reference thing.
    //That is why we
    //need a copy of the recipes. Slice will do a copy of the recipe.
    return this.recipes.slice();
  }

addIngredientsToShoppingList(ingredients:Ingredient[]){
this.shoppingListService.addIngredients(ingredients);
}


}
