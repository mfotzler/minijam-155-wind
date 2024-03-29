import MainScene from "./MainScene";
import UIHelpers from "../UIHelpers";
import BaseScene from "./BaseScene";

export default class GameOver extends BaseScene {
    static readonly key = 'GameOver';
    constructor() {
        super({ key: GameOver.key });
    }

    create():void {
        this.addTitle();
        this.addPlayButton();
    }

    update(time: number, delta: number):void {
    }

    private addTitle() {
        this.add.bitmapText(this.game.renderer.width/2, 250, 'rubik', 'Game Over!')
            .setOrigin(0.5, 0.5);
    }

    private addPlayButton() {
        UIHelpers.addCenteredButton(this, 400, 'Play Again', () => {
            this.scene.start(MainScene.key);
        });
    }
}
