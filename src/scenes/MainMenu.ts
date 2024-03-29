import MainScene from "./MainScene";
import UIHelpers from "../UIHelpers";
import BaseScene from "./BaseScene";
import TutorialScene from "./TutorialScene";

export default class MainMenu extends BaseScene {
    static readonly key = 'MainMenu';
    constructor() {
        super({ key: MainMenu.key });
    }

    create():void {
        this.addTitle();
        this.addPlayButton();
        this.addTutorialButton();
    }

    update(time: number, delta: number):void {
    }

    private addTitle() {
        this.add.image(this.game.renderer.width / 2, 150, 'textures', 'title');
        this.add.bitmapText(this.game.renderer.width/2, 250, 'rubik', 'a game by bugvevo, slowback1, and mafcho')
            .setOrigin(0.5, 0.5);
    }

    private addPlayButton() {
        UIHelpers.addCenteredButton(this, 400, 'Play', () => {
            this.scene.start(MainScene.key);
        });
    }

    private addTutorialButton() {
        UIHelpers.addCenteredButton(this, 600, 'Tutorial', () => {
            this.scene.start(TutorialScene.key);
        });
    }
}