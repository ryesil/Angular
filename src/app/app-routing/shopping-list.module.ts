import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';
import { AuthComponent } from '../auth/auth.component';

const routes=[
    {path:'shopping-list', component:ShoppingListComponent}
]

@NgModule({
    declarations:[],
    imports:[CommonModule,
        RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class ShoppingListRoutingModule{}