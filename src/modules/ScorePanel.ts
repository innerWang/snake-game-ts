class ScorePanel {
  score = 0;
  level = 1;

  private scoreEle: HTMLElement;
  private levelEle: HTMLElement;

  private maxLevel: number;
  private scoreStepForLevel: number;

  constructor(maxLevel: number = 10, scoreStep: number = 10) {
    this.scoreEle = document.getElementById('score')!;
    this.levelEle = document.getElementById('level')!;
    this.maxLevel = maxLevel;
    this.scoreStepForLevel = scoreStep;
  }

  addScore() {
    this.scoreEle.innerText = ++this.score + '';
    if (this.score % this.scoreStepForLevel === 0) {
      this.levelUp();
    }
  }

  levelUp() {
    if (this.level < this.maxLevel) {
      this.levelEle.innerText = ++this.level + '';
    }
  }
}

export default ScorePanel;
