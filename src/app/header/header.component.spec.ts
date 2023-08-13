// import { ComponentFixture, TestBed, async } from '@angular/core/testing'; 
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { HeaderComponent } from "./header.component";
// import { DataStorageService } from "../shared/data-storage.service";
// import { Observable, of } from 'rxjs';
// import { Recipe } from '../recipes/recipe.model';
// import { Ingredient } from '../shared/ingredient.model';



// describe('HeaderComponent',()=>{
//     let component:HeaderComponent;
//     let fixture:ComponentFixture<HeaderComponent>;
//     let datastorageService:DataStorageService;

//     beforeEach(async()=>{
// await TestBed.configureTestingModule({
//     declarations:[HeaderComponent],
//     imports:[HttpClientTestingModule],
//     providers:[DataStorageService]
// }).compileComponents();
//     });

// beforeEach(()=>{
//     fixture = TestBed.createComponent(HeaderComponent);
//     component = fixture.componentInstance;
//     datastorageService = TestBed.inject(DataStorageService);
//     fixture.detectChanges();
// });

// it('should make ',()=>{
//     expect(component).toBeTruthy();
// })

// it('should call dataStorageService.storeRecipes when onSaveData is called',()=>{
//   spyOn(datastorageService,'storeRecipes');
//   component.onSaveDate();
//   expect(datastorageService.storeRecipes).toHaveBeenCalled();
// })

// it('should call dataStorageService.fetchRecipes when onFetch is called', ()=>{
//     //we used of because of() converts the arguments to an observable sequence.
// spyOn(datastorageService,'fetchRecipes').and.returnValue(of([ { ingredients: [new Ingredient('mockIngredient1', 1), new Ingredient('mockIngredient2', 2)], name: 'mockName1', description: 'mockDesc1', imagePath: 'mockPath1' }, { ingredients: [new Ingredient('mockIngredient3', 3), new Ingredient('mockIngredient4', 4)], name: 'mockName2', description: 'mockDesc2', imagePath: 'mockPath2' } ]) );
// //spyOn(datastorageService,'fetchRecipes').and.returnValue(of([]));
// component.onFetchData();
// expect(datastorageService.fetchRecipes).toHaveBeenCalled();
// })





// })