import * as Phaser from 'phaser';
import Container = Phaser.GameObjects.Container;

export default class Vacuum extends Container {
    private static hasCreatedAnimations = false;
    constructor(scene:Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        if(!Vacuum.hasCreatedAnimations) {
            scene.anims.create({
                key: 'vacuum',
                frames: scene.anims.generateFrameNames('textures', {prefix: 'vacuum', start: 1, end: 3, zeroPad: 2}),
                frameRate: 3,
                repeat: -1
            });
            Vacuum.hasCreatedAnimations = true;
        }

        const ballSprite = scene.add.sprite(0, 0, 'textures').play('vacuum');
        this.add(ballSprite);
    }
}