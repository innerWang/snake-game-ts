import Food from './Food';
import ScorePanel from './ScorePanel';
import Snake from './Snake';

class GameControl {
  snake: Snake;
  food: Food;
  scorePanel: ScorePanel;

  direction: string = '';

  isLive: boolean = true;

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel();
    this.init();
  }

  init() {
    document.addEventListener('keydown', this.keydownHandler.bind(this));
    this.run();
  }

  keydownHandler(event: KeyboardEvent) {
    if (this.snake.hasBody) {
      const str = (this.direction + event.key).toLocaleLowerCase();
      const isOppo = [
        ['up', 'down'],
        ['left', 'right'],
      ].some((arr: Array<string>) => arr.every((item) => str.includes(item)));
      if (isOppo) return;
    }
    this.direction = event.key;
  }

  run() {
    let posX = this.snake.headPos.X;
    let posY = this.snake.headPos.Y;

    switch (this.direction) {
      case 'ArrowUp':
      case 'Up':
        posY -= 10;
        break;
      case 'ArrowDown':
      case 'Down':
        posY += 10;
        break;
      case 'ArrowRight':
      case 'Right':
        posX += 10;
        break;
      case 'ArrowLeft':
      case 'Left':
        posX -= 10;
        break;
      default:
        break;
    }

    // 检查是否吃到了食物
    this.checkEat(posX, posY);

    try {
      this.snake.headPos = { X: posX, Y: posY };
    } catch (err) {
      // 需要做游戏结束的提示！！
      this.isLive = false;
      alert((err as Error).message);
    }

    this.isLive &&
      setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
  }

  checkEat(x: number, y: number) {
    if (x === this.food.X && y === this.food.Y) {
      this.food.updatePos();
      this.scorePanel.addScore();
      this.snake.addBody();
    }
  }
}

export default GameControl;
