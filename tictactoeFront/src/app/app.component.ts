import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  playerOne;
  playerTwo;
  formShow = true;
  showFirstStage = false;
  constructor() {

  }


  onSubmit() {
    this.formShow = false;
    this.showFirstStage = true;
  }

}
