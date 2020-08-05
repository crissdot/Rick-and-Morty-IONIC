import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationsService } from '../../services/locations.service';
import { CharactersService } from '../../services/characters.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.page.html',
  styleUrls: ['./locations.page.scss'],
})
export class LocationsPage implements OnInit {

  Location: any = [];
  resId: any = [];
  Residents: any = [];

  constructor(private routeActive: ActivatedRoute, private LocService: LocationsService, private charService: CharactersService) { }

  ngOnInit() {
    const id = this.routeActive.snapshot.paramMap.get('id');
    this.LocService.getLocation(id).subscribe((loc: any) => {
      this.Location = loc;

      loc.residents.forEach(res => {
          res = res.slice(res.lastIndexOf('/')+1);
          this.resId.push(res);

          this.getInfoResidents(res);
        });      
    });
  }

  getInfoResidents(id){
    this.charService.getCharacter(id).subscribe(res => {
      this.Residents.push(res);
    })
  }

}
