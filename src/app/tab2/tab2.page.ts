import { Component } from '@angular/core';
import { EpisodesService } from '../services/episodes.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  Episodes: Array<any> = [];
  private eps: Array<any> = [];
  private nextURL: string = " ";

  constructor(private EpiService: EpisodesService) {}

  ngOnInit(): void{
    this.getEpisodes();
  }

  getEpisodes(nextURL?: string){
    this.EpiService.getEpisodes(nextURL).subscribe((ep: any)  => {
      this.eps.push(...ep.results);
      this.nextURL = ep.info.next;

      this.Episodes.push(...this.eps.splice(0, 18));
    })
  }

  loadData(event) {
    if (!this.nextURL) {
      return event.target.disabled = true;
    }
    setTimeout(() => {
      this.getEpisodes(this.nextURL);
      event.target.complete();
    }, 500);
  }

}
