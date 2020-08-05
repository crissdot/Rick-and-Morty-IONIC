import { Component, OnInit } from '@angular/core';
import { EpisodesService } from '../../services/episodes.service';
import { ActivatedRoute } from '@angular/router';
import { CharactersService } from '../../services/characters.service';
import { getId } from '../getId';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.page.html',
  styleUrls: ['./episodes.page.scss'],
})
export class EpisodesPage implements OnInit {

  Episodes: any = [];
  Characters: any = [];

  constructor(private epiService: EpisodesService, private routeActive: ActivatedRoute, private charService: CharactersService) { }

  ngOnInit() {
    const id = this.routeActive.snapshot.paramMap.get('id');
    this.epiService.getEpisode(id).subscribe((ep: any) => {
      this.Episodes = ep;

      ep.characters.forEach((chars: string) => {
        chars = getId(chars);

        this.charService.getCharacter(chars).subscribe(char => {
          this.Characters.push(char);
        })
      })
    });
  }

}
