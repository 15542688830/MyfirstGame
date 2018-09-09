//导演类，控制游戏的逻辑

import {Data} from "./base/Data.js";
import {UpPencil} from "./runtime/UpPencil.js";
import {DownPencil} from "./runtime/DownPencil.js";

export class Director {

    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    constructor() {
        this.Data = Data.getInstance();
        this.moveSpeed = 2;
    }

    createPencil() {
        const minTop = Data.getInstance().canvas.height / 8;
        const maxTop = Data.getInstance().canvas.height / 2;
        const top = minTop + Math.random() * (maxTop - minTop);
        // this.Data.get('pencils').push(new UpPencil(top));
        this.Data.get('pencils').push(new DownPencil(top));
    }

    birdsEvent() {
        for (let i = 0; i <= 2; i++) {
            this.Data.get('pll').y[i] =
                this.Data.get('pll').pllsY[i];
        }
        this.Data.get('pll').time = 0;
    }

    //判断小鸟是否和铅笔撞击
    static isStrike(pll, pencil) {
        let s = false;
        if (pll.top > pencil.bottom ||
            pll.bottom < pencil.top ||
            pll.right < pencil.left ||
            pll.left > pencil.right
        ) {
            s = true;
        }
        return !s;
    }

    //判断小鸟是否撞击地板和铅笔
    check() {
        const plls = this.Data.get('pll');
        const land = this.Data.get('land');
        const pencils = this.Data.get('pencils');
        const score = this.Data.get('score');

        //地板的撞击判断
        if (plls.pllsY[0] + plls.pllsHeight[0] >= land.y) {
            console.log('撞击地板啦');
            this.isGameOver = true;
            return;
        }

        //小鸟的边框模型
        const pllBorder = {
            top: plls.y[0],
            bottom: plls.pllsY[0] + plls.pllsHeight[0],
            left: plls.pllsX[0],
            right: plls.pllsX[0] + plls.pllsWidth[0]
        };

        const length = pencils.length;
        for (let i = 0; i < length; i++) {
            const pencil = pencils[i];
            const pencilBorder = {
                top: pencil.y,
                bottom: pencil.y + pencil.height,
                left: pencil.x,
                right: pencil.x + pencil.width
            };

            if (Director.isStrike(pllBorder, pencilBorder)) {
                console.log('撞到水管啦');
                this.isGameOver = true;
                return;
            }
        }

        //加分逻辑
        if (plls.pllsX[0] > pencils[0].x + pencils[0].width
            && score.isScore) {
            wx.vibrateShort({
                success: function () {
                    console.log('振动成功');
                }
            });
            score.isScore = false;
            score.scoreNumber++;
        }
    }

    run() {
        this.check();
        if (!this.isGameOver) {
            this.Data.get('background').draw();

            const pencils = this.Data.get('pencils');
            if (pencils[0].x + pencils[0].width <= 0 &&
                pencils.length === 4) {
                pencils.shift();
                pencils.shift();
                this.Data.get('score').isScore = true;
            }

            if (pencils[0].x <= (Data.getInstance().canvas.width - pencils[0].width) / 2 &&
                pencils.length === 2) {
                this.createPencil();
            }

            this.Data.get('pencils').forEach(function (value) {
                value.draw();
            });

            this.Data.get('land').draw();
            this.Data.get('score').draw();
            this.Data.get('pll').draw();

            let timer = requestAnimationFrame(() => this.run());
            this.Data.put('timer', timer);
        } else {
            console.log('游戏结束');
            this.Data.get('startButton').draw();
            cancelAnimationFrame(this.Data.get('timer'));
            this.Data.destroy();
            //触发微信小游戏垃圾回收
            wx.triggerGC();
        }
    }
}