import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharactersService } from '../../services/characters.service';
import { EpisodesService } from '../../services/episodes.service';
import { getId } from '../getId';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
})
export class CharactersPage implements OnInit {

  Character: any = [];
  originId: string;
  locationId: string;
  Episodes: any = [];

  constructor(private routeActive: ActivatedRoute, private charService: CharactersService, private EpiService: EpisodesService) { }

  ngOnInit() {
    const id = this.routeActive.snapshot.paramMap.get('id');
    this.charService.getCharacter(id).subscribe((char: any) => {
      this.Character = char;
      this.originId = getId(char.origin.url);
      this.locationId = getId(char.location.url);
      
      char.episode.forEach((ep: string) => {
        ep = getId(ep);

        this.EpiService.getEpisode(ep).subscribe(ep => {
          this.Episodes.push(ep);
        })
      })
    });
  }

}
