import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes:Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply test','https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjaG2cfLMIULCNfKLV82l_8K1f7iX_Go-85M_5eCTDxvExQpgNl4s7UWq4YMrsJmI3SURRuGhV7Luu9uHFB53QAu2WnW9E-FN0ollJHgNMMBEjJz2FGuzfFQfBKV5LFWzPztxjgSM9DtPpKrr-qrPlMQJrGwkvEcMxEXeUZSLMBW3_WIR73p-UO4gU30Q/s16000/cheese-garlic-bread-min.jpg')
  ];
  

  constructor() {
   }

  ngOnInit(): void {
  }

}
