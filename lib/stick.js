import { Util } from './util';

class Stick {
  constructor (options) {
    this.lineHead = options.lineHead;
    this.lineTail = options.lineTail;
    this.color = "#909090";
    this.width = 1;
    this.pos = null;
    this.prePos = null;
    this.endPos = null;
    this.waitTime = 200;
  }

  compare(timeDelta, speedAmplifier) {
    if (!this.checkFinishCompare()) {
      this.color = "#000";
      this.width = 2;
      this.waitTime = Util.wait(this.waitTime, timeDelta, speedAmplifier);
    }
  }

  checkFinishCompare() {
    if (this.waitTime === 0) {
      this.color = "#909090";
      this.width = 1;
      this.waitTime = 200;
      return true;
    } else {
      return false;
    }
  }

  getEndpos (anotherStick){
    if (!this.endPos) {
      this.endPos = anotherStick.lineHead[0];
    }
  }

  moveTo (timeDelta, speedAmplifier) {
    if (!this.checkFinishMove()) {
      this.color = "#f00";
      this.width = 2;
      const speed = Util.moveSpeed(this.lineHead[0], this.endPos, timeDelta, speedAmplifier);
      this.lineHead[0] += speed;
      this.lineTail[0] += speed;
    }
  }

  checkFinishMove () {
    if (this.lineHead[0] === this.endPos) {
      this.color = "#909090";
      this.width = 1;
      this.endPos = null;
      return true;
    } else {
      return false;
    }
  }

  draw (ctx) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.width;
    ctx.beginPath();
    ctx.moveTo(...this.lineHead);
    ctx.lineTo(...this.lineTail);
    ctx.stroke();
  }
}

export default Stick;
