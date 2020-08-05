import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharactersService } from '../../services/characters.service';
import { EpisodesService } from '../../services/episodes.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
})
export class CharactersPage implements OnInit {

  Character: any = [];
  originId: any;
  locationId: any;
  episode: any = [];
  Episodes: any = [];

  constructor(private routeActive: ActivatedRoute, private charService: CharactersService, private EpiService: EpisodesService) { }

  ngOnInit() {
    const id = this.routeActive.snapshot.paramMap.get('id');
    this.charService.getCharacter(id).subscribe((char: any) => {
      this.Character = char;

      this.originId = char.origin.url;
      this.originId = this.originId.slice(this.originId.lastIndexOf('/')+1);

      this.locationId = char.location.url;
      this.locationId = this.locationId.slice(this.locationId.lastIndexOf('/')+1);
      
      char.episode.forEach((ep: string) => {
        ep = ep.slice(ep.lastIndexOf('/')+1);
        this.episode.push(ep);

        this.getInfoEpisode(ep);
      })
    });
  }

  getInfoEpisode(epId){
    this.EpiService.getEpisode(epId).subscribe(ep => {
      this.Episodes.push(ep);
    })
  }

}
