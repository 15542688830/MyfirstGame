//小鸟类
//是循环渲染三只小鸟
//其实是循环渲染图片的三个部分
import {Sprite} from "../base/Sprite.js";
import {Data} from "../base/Data.js";

export class PLL extends Sprite {
    constructor() {
        const image = Sprite.getImage('pll');
        super(image, 0, 0, image.width, image.height,
            0, 0, image.width, image.height);

        //小鸟的三种状态需要一个数组去存储
        //小鸟的宽是34，小鸟的高度是24，上下边距是10，小鸟左右边距是9
        this.clippingX = [
            9,
            9 + 34 + 18,
            9 + 34 + 18 + 34 + 18
        ];
        this.clippingY = [10, 10, 10];
        this.clippingWidth = [34, 34, 34];
        this.clippingHeight = [24, 24, 24];
        const pllX = Data.getInstance().canvas.width / 4;
        this.pllsX = [pllX, pllX, pllX];
        const pllY = Data.getInstance().canvas.height / 2;
        this.pllsY = [pllY, pllY, pllY];
        const pllWidth = 34;
        this.pllsWidth = [pllWidth, pllWidth, pllWidth];
        const pllHeight = 24;
        this.pllsHeight = [pllHeight, pllHeight, pllHeight];
        this.y = [pllY, pllY, pllY];
        this.index = 0;
        this.count = 0;
        this.time = 0;
    }

    draw() {
        //切换三只小鸟的速度
        const speed = 0.2;
        this.count = this.count + speed;
        //0,1,2
        if (this.index >= 2) {
            this.count = 0;
        }
        //减速器的作用
        this.index = Math.floor(this.count);

        //模拟重力加速度
        const g = 0.98 / 2.4;
        //向上移动一丢丢的偏移量
        const offsetUp = 30;
        //小鸟的位移
        // const offsetY = (g * this.time * (this.time - offsetUp)) / 2;
        console.log((g * this.time * (this.time - offsetUp)) / 2);
        const offsetY = 0;

        for (let i = 0; i <= 2; i++) {
            this.pllsY[i] = this.y[i] + offsetY;
        }
        this.time++;

        super.draw(
            this.img,
            this.clippingX[this.index], this.clippingY[this.index],
            this.clippingWidth[this.index], this.clippingHeight[this.index],
            this.pllsX[this.index], this.pllsY[this.index],
            this.pllsWidth[this.index], this.pllsHeight[this.index]
        );
    }


}