import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIURL } from '../../environments/R&MAPI';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private http: HttpClient) { }

  getCharacters(){
    return this.http.get(APIURL.characters);
  }

  getCharacter(id){
    return this.http.get(`${APIURL.characters}/${id}`);
  }
}
