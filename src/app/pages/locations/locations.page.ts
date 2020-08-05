import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationsService } from '../../services/locations.service';
import { CharactersService } from '../../services/characters.service';
import { getId } from '../getId';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.page.html',
  styleUrls: ['./locations.page.scss'],
})
export class LocationsPage implements OnInit {

  Location: any = [];
  Residents: any = [];

  constructor(private routeActive: ActivatedRoute, private LocService: LocationsService, private charService: CharactersService) { }

  ngOnInit() {
    const id = this.routeActive.snapshot.paramMap.get('id');
    this.LocService.getLocation(id).subscribe((loc: any) => {
      this.Location = loc;

      loc.residents.forEach(res => {
          res = getId(res);

          this.charService.getCharacter(res).subscribe(res => {
            this.Residents.push(res);
          })
        });      
    });
  }

}
