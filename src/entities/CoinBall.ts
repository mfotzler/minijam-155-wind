import * as Phaser from 'phaser';
import Container = Phaser.GameObjects.Container;

export default class CoinBall extends Container {
    private static hasCreatedAnimations = false;
    constructor(scene:Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        if(!CoinBall.hasCreatedAnimations) {
            scene.anims.create({
                key: 'roll',
                frames: scene.anims.generateFrameNames('textures', {prefix: 'coin-ball', start: 1, end: 3, zeroPad: 2}),
                frameRate: 3,
                repeat: -1
            });
            CoinBall.hasCreatedAnimations = true;
        }

        const ballSprite = scene.add.sprite(0, 0, 'textures').play('roll');
        this.add(ballSprite);
    }
}