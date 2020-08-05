import { Component } from '@angular/core';
import { LocationsService } from '../services/locations.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  Locations: Array<any> = [];
  private locs: Array<any> = [];
  private nextURL: string = " ";

  constructor(private LocService: LocationsService) {}

  ngOnInit(): void{
    this.getLocations();
  }

  getLocations(nextURL?: string){
    if((!this.locs || this.locs.length < 18) && this.nextURL) return this.getAPILocations(nextURL);
    this.showLocations();
  }

  getAPILocations(nextURL?: string){
    return this.LocService.getLocations(nextURL).subscribe((loc: any) => {
      this.locs.push(...loc.results);
      this.nextURL = loc.info.next;

      this.showLocations();
    });
  }

  showLocations(){
    this.Locations.push(...this.locs.splice(0,12));
  }

  loadData(event) {
    if (!this.locs.length && !this.nextURL) {
      return event.target.disabled = true;
    }
    setTimeout(() => {
      this.getLocations(this.nextURL);
      event.target.complete();
    }, 500);
  }
}
