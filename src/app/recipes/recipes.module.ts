import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipesRoutingModule } from '../app-routing/recipes-routing.module';
import { ShoppingListRoutingModule } from '../app-routing/shopping-list.module';
import { DirectiveModule } from '../modules/directive.module';
//we add all the recipe related components to this module from app.module


@NgModule({
  declarations: [  
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  imports: [
    CommonModule,//for ngIf and ngFor
    RouterModule,
    RecipesRoutingModule,
    ReactiveFormsModule,
    ShoppingListRoutingModule,
    DirectiveModule
  ],
  //we are not using Recipe related compononents anywhere else in the app. So we don't need to export them.
  // exports:[ // we needed to add all the components into the exports array. Any module that imports RecipesModule can use these components
  //   RecipesComponent,
  //   RecipeListComponent,
  //   RecipeDetailComponent,
  //   RecipeItemComponent,
  //   RecipeStartComponent,
  //   RecipeEditComponent,
  // ]
})
export class RecipesModule { }
