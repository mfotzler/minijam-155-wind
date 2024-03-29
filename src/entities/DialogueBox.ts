import * as Phaser from 'phaser';
import BitmapText = Phaser.GameObjects.BitmapText;
import Container = Phaser.GameObjects.Container;

export default class DialogueBox extends Container {
    private text: BitmapText;
    constructor(scene:Phaser.Scene, x: number, y: number, text: string) {
        super(scene, x, y);

        const background = scene.add.nineslice(0, 0, 'textures', 'menu-button', scene.renderer.width, 420, 20, 20, 20, 20);
        background.setOrigin(0,0);
        this.add(background);

        const blowerSanImage = scene.add.image(20, 20, 'textures', 'blower-san');
        blowerSanImage.setOrigin(0, 0);
        this.add(blowerSanImage);

        const nameText = scene.add.bitmapText(350, 20, 'rubik', 'Blower-san:');
        nameText.setOrigin(0, 0);
        this.add(nameText);

        this.text = scene.add.bitmapText(350, 100, 'rubik', text);
        this.text.setOrigin(0, 0);
        this.add(this.text);
    }
}
