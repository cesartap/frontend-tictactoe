import { Component, OnInit, Input, Output } from '@angular/core';
import { CondicionesModel } from '../models/conditions.model';
import { EventEmitter } from '@angular/core';
import { GamesService } from '../services/gamesService/games.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  @Input() playerOne;
  @Input() playerTwo;
  @Input() condiciones;
  condicionesP1;
  condicionesP2;
  resultado;
  winsP1 = 0;
  winsP2 = 0;
  @Output() notifyP1: EventEmitter<number> = new EventEmitter<number>();
  @Output() notifyP2: EventEmitter<number> = new EventEmitter<number>();
  // ronda
  round = 1;

  // condiciones de quien juega
  p1Playing = true;
  playing = true;

  // valores de seleccion de usuario
  p1Seleccion = '';
  p2Seleccion = '';

  // score
  score: any[] = [];
  playerScore = 0;
  ganador: string;
  constructor(public gamesService: GamesService) { }

  ngOnInit() {
    this.condicionesP1 = this.condiciones;
    this.condicionesP2 = this.condiciones;
  }

  toNextRound() {
    this.resultado = '';
    // si el p1 estaba jugando
    if (this.p1Playing) {
      // le toca al segundo jugador
      this.p1Playing = false;
    } else {
      // si estaba jugando el p2 avanzamos en la ronda
      this.p1Playing = true;

      // se verifica quien gano este match
      this.resultado = this.validaGanador();

      this.round++;

      this.p1Seleccion = '';
      this.p2Seleccion = '';
    }

    // se termina el juego cuando algun jugador llega a la condicion

    if (this.winsP1 === 3 || this.winsP2 === 3) {
      this.playing = false;
      this.condicionesP1 = this.condiciones;
      this.condicionesP2 = this.condiciones;

      // se llama al servicio para guardar al jugador y detectamos quien gano
      
      if (this.winsP1 === 3) {
        this.ganador = this.playerOne;
      } else {
        this.ganador = this.playerTwo;
      }

      this.gamesService.addPlayerWins(this.ganador).subscribe((result) => {
        console.log('Registro correcto');

        // se obtiene los juegos ganados
        this.gamesService.getPlayerGames(this.ganador).subscribe((data) => {
          console.log(data);
          if (data !== null) {
            // se obtiene la informacion de los juegos del usuario
            this.playerScore = data[0].gamesWon;
          }
        });
      }, (err) => {
        console.log(err);
      });
    }
  }


  /**
   * Metodo que se encarga de validar quien es el ganador de la jugada
   */
  validaGanador() {
    let resultado: string;

    // se obtiene el elemento que elimina
    this.condicionesP1.forEach(element => {
      if (this.p1Seleccion === element.move) {
        if (this.p1Seleccion === this.p2Seleccion) {
          resultado = 'NO WINNER, TIE!!';
        } else if
          // si el elemento mata a la seleccion del p2
          (element.kills === this.p2Seleccion) {
          resultado = 'PLAYER 1 ( ' + this.playerOne + ' ) WINS!';
          this.winsP1++;
          this.notifyP1.emit(this.winsP1);
        } else {
          resultado = 'PLAYER 2 ( ' + this.playerTwo + ' ) WINS!';
          this.winsP2++;
          this.notifyP2.emit(this.winsP2);
        }
      }
    });



    // se agrega al score final
    this.score.push({ id: this.round, value: resultado });
    return resultado;
  }

  /**
   * Metodo que reinicia la partida
   */
  Again() {
    this.resultado = '';
    this.score = [];
    this.condicionesP1 = this.condiciones;
    this.condicionesP2 = this.condiciones;
    this.playing = true;
    this.p1Playing = true;
    this.p1Seleccion = '';
    this.p2Seleccion = '';
    this.round = 1;
    this.winsP1 = 0;
    this.winsP2 = 0;
    this.notifyP1.emit(this.winsP1);
    this.notifyP2.emit(this.winsP2);
    this.playerScore = 0;
    this.ganador = '';
  }
}


