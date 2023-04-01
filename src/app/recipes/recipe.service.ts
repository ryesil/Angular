import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
recipeSelected= new EventEmitter<Recipe>();


  constructor() { }

  private recipes:Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply test','https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjaG2cfLMIULCNfKLV82l_8K1f7iX_Go-85M_5eCTDxvExQpgNl4s7UWq4YMrsJmI3SURRuGhV7Luu9uHFB53QAu2WnW9E-FN0ollJHgNMMBEjJz2FGuzfFQfBKV5LFWzPztxjgSM9DtPpKrr-qrPlMQJrGwkvEcMxEXeUZSLMBW3_WIR73p-UO4gU30Q/s16000/cheese-garlic-bread-min.jpg'),
    
    new Recipe('Another Test Recipe', 'This is simply test','https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjaG2cfLMIULCNfKLV82l_8K1f7iX_Go-85M_5eCTDxvExQpgNl4s7UWq4YMrsJmI3SURRuGhV7Luu9uHFB53QAu2WnW9E-FN0ollJHgNMMBEjJz2FGuzfFQfBKV5LFWzPztxjgSM9DtPpKrr-qrPlMQJrGwkvEcMxEXeUZSLMBW3_WIR73p-UO4gU30Q/s16000/cheese-garlic-bread-min.jpg')
  
  ];

getRecipes(){
  //This is important. We don't want to directly access to the recipes. 
  //JavaScript reference thing. 
  //That is why we 
  //need a copy of the recipes. Slice will do a copy of the recipe.
  return this.recipes.slice();
}



}
