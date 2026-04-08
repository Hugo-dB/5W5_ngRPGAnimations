import { Component } from '@angular/core';
import {transition, trigger, useAnimation} from "@angular/animations";
import { pulse, shakeX, wobble } from 'ng-animate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
  trigger("death", [transition(":increment", useAnimation(shakeX, { params: { timing: 0.5 } })),]),
  trigger("attack", [transition(":increment", [useAnimation(pulse, {params: { timing: 0.5, scale: 0.5}}), useAnimation(pulse, {params: { timing: 0.3, scale: 4.5}})])]),
  trigger("hit", [transition(":increment", useAnimation(wobble)),]),
]
})
export class AppComponent {
  slimeIsPresent = false;

  ng_death = 0;
  ng_attack = 0;
  css_hit = false;

  constructor() {
  }

  spawn() {
    this.slimeIsPresent = true;
    // TODO Animation angular avec forwards
    var element = document.getElementById("slimeyId");
    element?.classList.remove("fadeOut");
    element?.classList.add("fadeIn");

  }

  death(){
    this.slimeIsPresent = false;
    // TODO Animation angular avec forwards
    var element = document.getElementById("slimeyId");
    element?.classList.add("fadeOut");
    element?.classList.remove("fadeIn");

    // TODO 2e animation angular en même temps
    this.ng_death++;
  }

  attack(){
    // TODO Jouer une animation et augmenter l'intensité du mouvement avec scale
    this.ng_attack++;
    
    // TODO Jouer une autre animation avant
  }

  hit(){
    // TODO Utilisé Animista pour faire une animation différente avec css (wobble)
    this.css_hit = true;
    setTimeout(() => {this.css_hit = false;}, 1000);
  }
}
