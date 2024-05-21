import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  topBottomLight: string = 'green';
  leftRightLight: string = 'red';
  isEmergency: boolean = false;
  emergencyCooldown: boolean = false;
  isBlinking: boolean = false;
  private topBottomSequence = ['green', 'yellow', 'red', 'yellow'];
  private leftRightSequence = ['red', 'yellow', 'green', 'yellow'];
  private lightTimings = [5000, 2000, 5000, 2000];
  private topBottomIndex = 0;
  private leftRightIndex = 0;
  private emergencyBlinkInterval: any;
  private emergencyTimeout: any;

  ngOnInit() {
    this.startTrafficCycle();
  }

  startTrafficCycle() {
    this.changeTopBottomLight();
    this.changeLeftRightLight();
  }

  changeTopBottomLight() {
    setTimeout(() => {
      if (!this.isEmergency) {
        this.topBottomIndex =
          (this.topBottomIndex + 1) % this.topBottomSequence.length;
        this.topBottomLight = this.topBottomSequence[this.topBottomIndex];
        this.changeTopBottomLight();
      }
    }, this.lightTimings[this.topBottomIndex]);
  }

  changeLeftRightLight() {
    setTimeout(() => {
      if (!this.isEmergency) {
        this.leftRightIndex =
          (this.leftRightIndex + 1) % this.leftRightSequence.length;
        this.leftRightLight = this.leftRightSequence[this.leftRightIndex];
        this.changeLeftRightLight();
      }
    }, this.lightTimings[this.leftRightIndex]);
  }

  onCrossClick() {
    if (this.isEmergency) return;
    if (this.leftRightLight === 'yellow' || this.topBottomLight === 'yellow') {
      alert('неправилно пресичане');
    }
  }

  activateEmergency() {
    this.isEmergency = true;
    
    this.startBlinking();
    this.emergencyTimeout = setTimeout(() => {
      this.stopBlinking();
      this.isEmergency = false;
      this.startTrafficCycle();
      this.emergencyCooldown = true;
      setTimeout(() => {
        this.emergencyCooldown = false;
      }, 10000);
    }, 10000);
  }

  startBlinking() {
    this.isBlinking = true;
    this.emergencyBlinkInterval = setInterval(() => {
      this.isBlinking = !this.isBlinking;
    }, 500);
  }

  stopBlinking() {
    clearInterval(this.emergencyBlinkInterval);
    this.isBlinking = false;
  }
}
