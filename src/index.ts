import * as Phaser from 'phaser';
import GameScene from './scenes/MainMenu';
import MainScene from "./scenes/MainScene";
import GameOver from "./scenes/GameOver";

new Phaser.Game(
    {
        type: Phaser.AUTO,
        parent: 'game',
        backgroundColor: '#aaaaee',
        title: 'Something About Wind!',
        scale: {
            width: 1920,
            height: 1080,
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        scene: [GameScene, MainScene, GameOver],
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {x: 0, y: 0},
                debug: false
            }
        }
});
