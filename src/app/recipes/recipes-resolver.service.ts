import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Data, Resolve, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]>{

  constructor(private dataStorageService:DataStorageService, private recipeService:RecipeService) { }

  //we run fetchRecipes method through resolver whenever this route is loaded.
  //This also introduced another bug. Whenever this route is used like in add or edit or delete.
  // We are fetcing the data again. So we need to check whether we have recipes loaded before we fetch them again.
  // We can do that by checking the recipesService.
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this. recipeService.getRecipes();
    if(recipes.length === 0){
    return this.dataStorageService.fetchRecipes();
    } else {
      return recipes;
    }
  }
}
