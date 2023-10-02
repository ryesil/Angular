import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';
import { ShoppingEditComponent } from '../shopping-list/shopping-edit/shopping-edit.component';
import { FormsModule } from '@angular/forms';

const routes=[
    {path:'shopping-list', component:ShoppingListComponent}
]

@NgModule({
    declarations:[ShoppingListComponent, ShoppingEditComponent],
    imports:[CommonModule, FormsModule,
        RouterModule.forChild(routes)],
})
export class ShoppingListRoutingModule{}