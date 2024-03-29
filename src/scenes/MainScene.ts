import * as Phaser from 'phaser';
export default class MainScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    preload():void {
    }

    create():void {
        this.addKeyInputListeners()
    }

    update(time: number, delta: number):void {
    }

    addKeyInputListeners():void {
        this.input.keyboard.on('keydown-UP', () => {
        });
        this.input.keyboard.on('keydown-DOWN', () => {
        });
        this.input.keyboard.on('keydown-LEFT', () => {
        });
        this.input.keyboard.on('keydown-RIGHT', () => {
        });
    }
}
