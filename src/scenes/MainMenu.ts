import * as Phaser from 'phaser';
import MainScene from './MainScene';

export default class MainMenu extends Phaser.Scene {
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
    }

    private addTitle() {
        this.add.image(this.game.renderer.width / 2, 150, 'textures', 'title');
        this.add.bitmapText(this.game.renderer.width/2, 250, 'rubik', 'a game by bugvevo, slowback1, and mafcho')
            .setOrigin(0.5, 0.5);
    }

    private addPlayButton() {
        this.addCenteredButton(400, 'Play', () => {
            this.scene.start(new MainScene());
        });
    }

    private addCenteredButton(y: number, text: string, onClick: () => void):Phaser.GameObjects.NineSlice {
        const button = this.add.nineslice(0, 0, 'textures', 'menu-button', 420, 80, 20, 20, 20, 20);
        button.setPosition(this.game.renderer.width / 2, y);
        button.setInteractive();
        button.on('pointerdown', onClick);
        this.add.bitmapText(this.game.renderer.width/2, y, 'rubik', text)
            .setOrigin(0.5, 0.5);

        return button;
    }

    update(time: number, delta: number):void {
    }
}