import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIURL } from '../../environments/R&MAPI';

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {

  constructor(private http: HttpClient) { }

  getEpisodes(page = APIURL.episodes){
    return this.http.get(page);
  }

  getEpisode(id){
    return this.http.get(`${APIURL.episodes}/${id}`);
  }
}
