import * as Phaser from "phaser";

export default class UIHelpers {
    static addCenteredButton(scene: Phaser.Scene, y: number, text: string, onClick: () => void):Phaser.GameObjects.NineSlice {
        const button = scene.add.nineslice(0, 0, 'textures', 'menu-button', 420, 80, 20, 20, 20, 20);
        button.setPosition(scene.game.renderer.width / 2, y);
        button.setInteractive();
        button.on('pointerdown', onClick);
        scene.add.bitmapText(scene.game.renderer.width/2, y, 'rubik', text)
            .setOrigin(0.5, 0.5);

        return button;
    }
}
