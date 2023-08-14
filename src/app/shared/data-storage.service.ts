import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs';
import { Ingredient } from './ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http:HttpClient, private recipeService:RecipeService) { }


storeRecipes(){
  const recipes = this.recipeService.getRecipes();
  //put overrides the existing data
  this.http.put('https://recipe-book-8a862-default-rtdb.firebaseio.com/recipes.json',recipes).subscribe(response=>{
    //console.log(response)
  })
}


fetchRecipes(){
  return this.http.get<Recipe[]>('https://recipe-book-8a862-default-rtdb.firebaseio.com/recipes.json').pipe(
    map(
    recipes=>{
      console.log('recipes', recipes);
      return recipes.map(recipe=>{
        //If ingredients don't exist, then we add an empty array.
        const ingredients:Ingredient[] = recipe.ingredients ? recipe.ingredients : [];
        return {...recipe, ingredients }
      })
    }
  ),
  tap(recipes=>{
    this.recipeService.setRecipes(recipes);
  })
  )
}

}
