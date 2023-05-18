import { Component, ElementRef,  ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar</h5>
    <input
      #txtTagInput
      type="text"
      class="form-control"
      placeholder="buscar gifs..."
      (keyup.enter)="searchTag()"
    >
  `
})

export class SearchBoxComponent{

  @ViewChild("txtTagInput")
  public tagInput!:ElementRef<HTMLInputElement>;

  constructor( private gifsService: GifsService) { }

  searchTag():void{
    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(newTag);
    this.tagInput.nativeElement.value = "";
  }

}
