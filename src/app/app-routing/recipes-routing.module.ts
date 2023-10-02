import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeDetailComponent } from '../recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from '../recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from '../recipes/recipe-start/recipe-start.component';
import { RecipesResolverService } from '../recipes/recipes-resolver.service';
import { RecipesComponent } from '../recipes/recipes.component';

const routes: Routes = [
  { path: 'recipes',
   component: RecipesComponent,
//this guard below will check if the user logged in.
canActivate:[AuthGuard],
children:[
  {path:'', component:RecipeStartComponent},
  {path:'new', component:RecipeEditComponent},
  {path:':id', component:RecipeDetailComponent, resolve:[RecipesResolverService]},
  {path:':id/edit', component:RecipeEditComponent, resolve:[RecipesResolverService]},
] },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
})
export class RecipesRoutingModule { }
