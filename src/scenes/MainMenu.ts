import * as Phaser from 'phaser';
import MainScene from "./MainScene";
import UIHelpers from "../UIHelpers";

export default class MainMenu extends Phaser.Scene {
    static readonly key = 'MainMenu';
    constructor() {
        super({ key: MainMenu.key });
    }

    preload():void {
        this.load.atlas('textures', 'assets/texture.png', 'assets/texture.json');
        this.load.bitmapFont('rubik', 'assets/rubik-font_0.png', 'assets/rubik-font.fnt');
    }

    create():void {
        this.addTitle();
        this.addPlayButton();
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

    update(time: number, delta: number):void {
    }
}