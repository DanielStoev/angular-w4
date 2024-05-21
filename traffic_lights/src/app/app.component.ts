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
  private topBottomSequence = ['green', 'yellow', 'red', 'yellow'];
  private leftRightSequence = ['red', 'yellow', 'green', 'yellow'];
  private lightTimings = [5000, 2000, 5000, 2000];
  private topBottomIndex = 0;
  private leftRightIndex = 0;

  ngOnInit() {
    this.startTrafficCycle();
  }

  startTrafficCycle() {
    this.changeTopBottomLight();
    this.changeLeftRightLight();
  }

  changeTopBottomLight() {
    setTimeout(() => {
      this.topBottomIndex =
        (this.topBottomIndex + 1) % this.topBottomSequence.length;
      this.topBottomLight = this.topBottomSequence[this.topBottomIndex];
      this.changeTopBottomLight();
    }, this.lightTimings[this.topBottomIndex]);
  }

  changeLeftRightLight() {
    setTimeout(() => {
      this.leftRightIndex =
        (this.leftRightIndex + 1) % this.leftRightSequence.length;
      this.leftRightLight = this.leftRightSequence[this.leftRightIndex];
      this.changeLeftRightLight();
    }, this.lightTimings[this.leftRightIndex]);
  }

  onCrossClick() {
    if (this.leftRightLight === 'yellow' || this.topBottomLight === 'yellow') {
      alert('неправилно пресичане');
    }
  }
}
