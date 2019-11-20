import { Component, Input } from '@angular/core';
import { CondicionesModel } from './models/conditions.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Input() playerOne;
  @Input() playerTwo;
  @Input() condiciones: CondicionesModel[];
  formShow = true;
  showFirstStage = false;
  constructor() {

    // llamar a la funcion que se encarga de rellenar los combos
    this.getConditions();
  }



  /**
   * Metodo encargado de obtener las condiciones al comienzo del juego
   * las cuales pueden cambiar al recargar la pagina, pero no al haber
   * comenzado un juego
   */
  getConditions() {
    this.condiciones = [
      new CondicionesModel('paper', 'rock'),
      new CondicionesModel('rock', 'scissors'),
      new CondicionesModel('scissors', 'paper')
    ];
  }

  onSubmit() {
    this.formShow = false;
    this.showFirstStage = true;
  }

}
