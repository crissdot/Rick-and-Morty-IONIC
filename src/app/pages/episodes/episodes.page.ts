import { Component, OnInit } from '@angular/core';
import { EpisodesService } from '../../services/episodes.service';
import { ActivatedRoute } from '@angular/router';
import { CharactersService } from '../../services/characters.service';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.page.html',
  styleUrls: ['./episodes.page.scss'],
})
export class EpisodesPage implements OnInit {

  Episodes: any = [];
  chars: any = [];
  Characters: any = [];

  constructor(private epiService: EpisodesService, private routeActive: ActivatedRoute, private charService: CharactersService) { }

  ngOnInit() {
    const id = this.routeActive.snapshot.paramMap.get('id');
    this.epiService.getEpisode(id).subscribe((ep: any) => {
      this.Episodes = ep;

      ep.characters.forEach((ep: string) => {
        ep = ep.slice(ep.lastIndexOf('/')+1);
        this.chars.push(ep);

        this.getInfoCharacters(ep);
      })
    });
  }

  getInfoCharacters(charId){
    this.charService.getCharacter(charId).subscribe(char => {
      this.Characters.push(char);
    })
  }

}
