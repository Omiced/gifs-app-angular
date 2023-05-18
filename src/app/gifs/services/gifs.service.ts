import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http"
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifsList : Gif[] = [];

  private _gifsHistory: string[] = [];
  private apiKey : string= "Reel12s28spWkhIjaOKiLpzZnZxQaHvB";
  private serviceUrl : string = "https://api.giphy.com/v1/gifs";

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
   }

  get tagsHistory(): string[]{
    return [...this._gifsHistory];
  }

  private organizeHistory(tag:string){
    tag = tag.toLowerCase();

    if ( this._gifsHistory.includes( tag ) ) {
      this._gifsHistory = this._gifsHistory.filter( (oldTag) => oldTag !== tag )
    }

    this._gifsHistory.unshift( tag );
    this._gifsHistory = this._gifsHistory.splice(0,10);
    this.saveLocalStorage();
  }

  searchTag(tag: string): void{
    if(tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
    .set("api_key", this.apiKey)
    .set("limit", "10")
    .set("q", tag);

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params})
      .subscribe((resp) => {
        this.gifsList = resp.data;
      });
  }

  private saveLocalStorage(): void{
    localStorage.setItem("history", JSON.stringify(this._gifsHistory))
  }

  private loadLocalStorage(): void{
   if(!localStorage.getItem("history")) return;
   this._gifsHistory = JSON.parse(localStorage.getItem("history")!);
   if(this._gifsHistory.length === 0) return;
   this.searchTag(this._gifsHistory[0]);

  }
}
