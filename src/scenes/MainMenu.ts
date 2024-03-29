import * as Phaser from 'phaser';
import MainScene from './MainScene';
export default class MainMenu extends Phaser.Scene {
    button: Phaser.GameObjects.NineSlice;

    constructor() {
        super('GameScene');
    }

    preload():void {
        this.load.atlas('textures', 'assets/texture.png', 'assets/texture.json');
        this.load.bitmapFont('rubik', 'assets/rubik-font_0.png', 'assets/rubik-font.fnt');
    }

    create():void {
        this.addTitle();
        this.addPlayButton();
        this.add.bitmapText(this.game.renderer.width/2, 250, 'rubik', 'a game by bugvevo, slowback1, and mafcho')
            .setOrigin(0.5, 0.5);
    }

    private addTitle() {
        this.add.image(this.game.renderer.width / 2, 150, 'textures', 'title');
    }

    private addPlayButton() {
        this.button = this.add.nineslice(0, 0, 'textures', 'menu-button', 320, 64, 20, 20);
        this.button.setPosition(this.game.renderer.width / 2, this.game.renderer.height / 2);
        this.button.setInteractive();
        this.button.on('pointerdown', () => {
            this.scene.start(new MainScene());
        });
    }

    update(time: number, delta: number):void {
    }
}