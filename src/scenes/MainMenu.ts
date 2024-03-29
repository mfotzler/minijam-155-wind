import * as Phaser from 'phaser';
import MainScene from './MainScene';
export default class MainMenu extends Phaser.Scene {
    button: Phaser.GameObjects.NineSlice;

    constructor() {
        super('GameScene');
    }

    preload():void {
        this.load.atlas('textures', 'assets/texture.png', 'assets/texture.json');
    }

    create():void {
        this.add.image(this.game.renderer.width/2, 150, 'textures', 'title');

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