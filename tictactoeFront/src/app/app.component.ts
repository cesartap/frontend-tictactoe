import { Component, Input } from '@angular/core';
import { CondicionesModel } from './models/conditions.model';
import { ConditionsService } from './services/conditionsService/conditions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Input() playerOne;
  @Input() playerTwo;
  @Input() condiciones: CondicionesModel[];

  // resultado
  winsP1 = 0;
  winsP2 = 0;

  formShow = true;
  showFirstStage = false;
  constructor(public conditionsService: ConditionsService) {

    // llamar a la funcion que se encarga de rellenar los combos
    this.getConditions();
  }



  /**
   * Metodo encargado de obtener las condiciones al comienzo del juego
   * las cuales pueden cambiar al recargar la pagina, pero no al haber
   * comenzado un juego
   */
  getConditions() {

    // se generan condiciones por defecto
    this.condiciones = [
      new CondicionesModel('paper', 'rock'),
      new CondicionesModel('rock', 'scissors'),
      new CondicionesModel('scissors', 'paper')
    ];

    this.conditionsService.getConditions().subscribe((data: CondicionesModel[]) => {
      console.log(data);
      if (data !== null && data.length !== 0) {
        // se limpia las reglas por defecto
        this.condiciones = [];
        data.forEach(value => {
          const condicion: CondicionesModel = new CondicionesModel(value.move, value.kills);
          this.condiciones.push(condicion);
        });
      }
    });


  }

  onSubmit() {
    this.formShow = false;
    this.showFirstStage = true;
  }

  getResultP1(winsP1: number): void {
    this.winsP1 = winsP1;
  }
  getResultP2(winsP2: number): void {
    this.winsP2 = winsP2;
  }

}
