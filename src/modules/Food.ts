class Food {
  private element: HTMLElement;

  constructor() {
    this.element = document.getElementById('food')!;
  }

  // 定义获取位置的方法
  get X() {
    return this.element.offsetLeft;
  }

  get Y() {
    return this.element.offsetTop;
  }

  updatePos() {
    // 食物的位置为 0 ~ 290 且为  10 的倍数
    const getRandomPos = () => Math.round(Math.random() * 29) * 10;

    this.element.style.left = getRandomPos() + 'px';
    this.element.style.top = getRandomPos() + 'px';
  }
}

export default Food;
