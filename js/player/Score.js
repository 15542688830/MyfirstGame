//计分器类

import {Data} from "../base/Data.js";

export class Score {

    constructor() {
        this.ctx = Data.getInstance().ctx;
        this.scoreNumber = 0;
        //因为canvas刷新的很快，所以需要一个变量控制加分，只加一次
        this.isScore = true;
    }

    draw() {
        this.ctx.font = '25px Arial';
        this.ctx.fillStyle = '#ffcbeb';
        this.ctx.fillText(
            this.scoreNumber,
            Data.getInstance().canvas.width / 2,
            Data.getInstance().canvas.height / 18,
            1000
        );
    }
}