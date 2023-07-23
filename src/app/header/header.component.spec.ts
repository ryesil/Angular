import { ComponentFixture, TestBed } from '@angular/core/testing'; 
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeaderComponent } from "./header.component";
import { DataStorageService } from "../shared/data-storage.service";
import { of } from 'rxjs';


describe('HeaderComponent', () => {
     let component: HeaderComponent;
      let fixture: ComponentFixture<HeaderComponent>;
       let dataStorageService: DataStorageService;

beforeEach(async () =>
 { await TestBed.configureTestingModule({
     declarations: [ HeaderComponent ], 
     imports: [ HttpClientTestingModule ], 
     providers: [ DataStorageService ] }) .compileComponents(); 
    });

beforeEach(() => {
     fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
       dataStorageService = TestBed.inject(DataStorageService);
        fixture.detectChanges(); });

it('should create', () =>
 { expect(component).toBeTruthy(); });

it('should call dataStorageService.storeRecipes when onSaveDate is called', () =>
 { spyOn(dataStorageService, 'storeRecipes');
  component.onSaveDate();
   expect(dataStorageService.storeRecipes).toHaveBeenCalled();
 });

it('should call dataStorageService.fetchRecipes when onFetchData is called', () =>
 { spyOn(dataStorageService, 'fetchRecipes').and.returnValue(of([]));
  component.onFetchData();
   expect(dataStorageService.fetchRecipes).toHaveBeenCalled();
 }); });