//开始按钮类
import {Sprite} from "../base/Sprite.js";
import {Data} from "../base/Data.js";

export class StartButton extends Sprite {
    constructor() {
        const image = Sprite.getImage('startButton');
        super(
            image,
            0, 0,
            image.width, image.height,
            (Data.getInstance().canvas.width - image.width) / 2,
            (Data.getInstance().canvas.height - image.height) / 2.5,
            image.width, image.height
        );

    }
}