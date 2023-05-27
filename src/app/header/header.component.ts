import { Component} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

constructor(private datastorageService:DataStorageService){}


  onSaveDate(){
    this.datastorageService.storeRecipes();
  }

  onFetchData(){
    this.datastorageService.fetchRecipes().subscribe();
  }

}
