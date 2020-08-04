import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIURL } from '../../environments/R&MAPI';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private http: HttpClient) { }

  getCharacters(url = APIURL.characters){
    return this.http.get(url);
  }

  getCharacter(id){
    return this.http.get(`${APIURL.characters}/${id}`);
  }
}
