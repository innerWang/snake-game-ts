class Snake {
  private head: HTMLElement;
  private bodies: HTMLCollection;
  private element: HTMLElement;
  hasBody: boolean = false;

  constructor() {
    this.head = document.querySelector('#snake > div') as HTMLElement;
    this.element = document.getElementById('snake')!;
    this.bodies = this.element.getElementsByTagName('div');
  }

  // 获取蛇的坐标(主要是蛇头的坐标)
  get headPos() {
    return { X: this.head.offsetLeft, Y: this.head.offsetTop };
  }

  set headPos(newPos) {
    const isHorizontal = this.headPos.X !== newPos.X;
    const isVertical = this.headPos.Y !== newPos.Y;

    if (!isHorizontal && !isVertical) return;

    if (newPos.X < 0 || newPos.X > 290 || newPos.Y < 0 || newPos.Y > 290) {
      throw new Error('撞墙了！！！');
    }

    this.moveBody();

    this.head.style.left = newPos.X + 'px';
    this.head.style.top = newPos.Y + 'px';

    this.checkBodyCollision();
  }

  addBody() {
    this.element.insertAdjacentHTML('beforeend', '<div></div>');
    if (!this.hasBody) {
      this.hasBody = true;
    }
  }

  // 将后边一截身体的位置设置为前一截身体的位置
  moveBody() {
    for (let i = this.bodies.length - 1; i >= 1; i--) {
      (this.bodies[i] as HTMLElement).style.left =
        (this.bodies[i - 1] as HTMLElement).offsetLeft + 'px';
      (this.bodies[i] as HTMLElement).style.top =
        (this.bodies[i - 1] as HTMLElement).offsetTop + 'px';
    }
  }

  // 检查头撞身体
  checkBodyCollision() {
    if (this.hasBody) {
      for (let i = 1; i < this.bodies.length - 1; i++) {
        let bd = this.bodies[i] as HTMLElement;
        if (
          this.headPos.X === bd.offsetLeft &&
          this.headPos.Y === bd.offsetTop
        ) {
          throw new Error('撞自己了！！！');
        }
      }
    }
  }
}

export default Snake;
