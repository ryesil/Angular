import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { ShoppingListService } from './shopping-list/shopping-list.service';



import { AppComponent } from './app.component';
import { HeaderComponent } from "./header/header.component";
import { AppRoutingModule } from './app-routing/app-routing.module';
import { RecipeService } from './recipes/recipe.service';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AlertComponent } from './shared/alert/alert/alert.component';
import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';
import { RecipesModule } from './recipes/recipes.module';
import { RecipesRoutingModule } from './app-routing/recipes-routing.module';
import { ShoppingListRoutingModule } from './app-routing/shopping-list.module';
import { DirectiveModule } from './modules/directive.module';

@NgModule({
    declarations: [// like components, custom directives, custom pipes 
        AppComponent,
        HeaderComponent,
        AuthComponent,
        LoadingSpinnerComponent,
        AlertComponent,
        PlaceholderDirective
    ],
    providers:[ShoppingListService, RecipeService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi:true}],// services, 
    bootstrap: [AppComponent],// this tells what component is avaialble in the idex.html
    imports: [// what other modules we want to use go into this imports. well.
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        RecipesModule,
        RecipesRoutingModule,
        DirectiveModule,
        ShoppingListRoutingModule
    ],
})
export class AppModule { }
