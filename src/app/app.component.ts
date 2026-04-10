import { Component } from '@angular/core';
import {transition, trigger, useAnimation} from "@angular/animations";
import { bounce, flip, pulse, shakeX, wobble } from 'ng-animate';
import { lastValueFrom, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
  trigger("death", [transition(":increment", useAnimation(shakeX, { params: { timing: 0.5 } })),]),
  trigger("attack", [transition(":increment", [useAnimation(pulse, {params: { timing: 0.5, scale: 0.5}}), useAnimation(pulse, {params: { timing: 0.3, scale: 4.5}})])]),
  trigger("hit", [transition(":increment", useAnimation(wobble)),]),
  trigger("bounce", [transition(":increment", useAnimation(bounce, { params: { timing: 1 } })),]),
  trigger("shake", [transition(":increment", useAnimation(shakeX, { params: { timing: 0.75 } })),]),
  trigger("flip", [transition(":increment", useAnimation(flip, { params: { timing: 0.75 } })),]),
]
})
export class AppComponent {
  slimeIsPresent = false;

  ng_death = 0;
  ng_attack = 0;
  css_hit = false;

  ng_bounce = 0;
  ng_shake = 0;
  ng_flip = 0;
  css_doubleFlip = false;
  css_topFlip = false;

  constructor() {
  }

  spawn() {
    this.slimeIsPresent = true;

    var element = document.getElementById("slimeyId");
    element?.classList.remove("fadeOut");
    element?.classList.add("fadeIn");

  }

  death(){
    this.slimeIsPresent = false;

    var element = document.getElementById("slimeyId");
    element?.classList.add("fadeOut");
    element?.classList.remove("fadeIn");

    this.ng_death++;
  }

  attack(){
    this.ng_attack++;
  }

  hit(){
    this.css_hit = true;
    
    setTimeout(() => {this.css_hit = false;}, 1000);
  }

  async bounceShakeFlip(){
    this.ng_bounce++;
    await lastValueFrom(timer(1000));
    this.ng_shake++;
    await lastValueFrom(timer(750));
    this.ng_flip++;
  }

  infiniteTripleSpin(){
    this.css_doubleFlip = true;
    setTimeout(() => {this.css_doubleFlip = false; this.o();}, 1600);
  }

  o(){
    this.css_topFlip = true;
    setTimeout(() => {this.css_topFlip = false; this.infiniteTripleSpin();}, 700);
  }

}
