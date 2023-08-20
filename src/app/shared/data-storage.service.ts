import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs';
import { Ingredient } from './ingredient.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
//Token must be attached. So that server knows about it
  constructor(private http:HttpClient, private recipeService:RecipeService, private authService: AuthService) { }


storeRecipes(){
  const recipes = this.recipeService.getRecipes();
  //put overrides the existing data
  this.http.put('https://recipe-book-8a862-default-rtdb.firebaseio.com/recipes.json',recipes).subscribe(response=>{
    //console.log(response)
  })
}

//Here we subscribed to user first and then we subscribed again gor recipes.
//To handle two subscriptions we userd exaustMap==> it will be done with the first subscription
//Then it will pass its value to the second subscription
//This is important
fetchRecipes(){
  //So here we want to get the latest user and then unsubscribe.
  //take(1)==> get the user once. Then be done with it.
 return this.authService.user.pipe(take(1), 
  exhaustMap(user=>{
    //here we get the token from the user.
    //For FireBase we add the token as a query parameter, in other servers. We add the token in the header of the request.
    //There are two ways to add token. We can add the token in the url as below or as a second argument (params) in the get method.
    //return this.http.get<Recipe[]>('https://recipe-book-8a862-default-rtdb.firebaseio.com/recipes.json?auth=+user.token');
    return this.http.get<Recipe[]>('https://recipe-book-8a862-default-rtdb.firebaseio.com/recipes.json',
    {
      params:new HttpParams().set('auth', user.token)
    }
    );
    
  }),
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
  );
   
}

}
