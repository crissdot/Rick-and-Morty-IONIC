import { Component, ViewChild } from '@angular/core';
import { CharactersService } from '../services/characters.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  Characters: Array<any> = [];
  private chars: Array<any> = [];
  private nextURL: string = " ";

  constructor(private charService: CharactersService) { }

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters(nextURL?: string) {
    if((!this.chars || this.chars.length < 15) && this.nextURL) return this.getAPICharacters(nextURL);
    console.log('HIIII');
    this.showCharacters();
  }

  private showCharacters(){
    this.Characters.push(...this.chars.splice(0, 12));
  }

  private getAPICharacters(nextURL?: string){
    return this.charService.getCharacters(nextURL).subscribe((characters: any) => {
      console.log(characters);
      this.chars.push(...characters.results);
      this.nextURL = characters.info.next;

      this.showCharacters();
    });
  }

  loadData(event) {
    if (!this.chars.length && !this.nextURL) {
      return event.target.disabled = true;
    }
    setTimeout(() => {
      this.getCharacters(this.nextURL);
      event.target.complete();
    }, 500);
  }
}
