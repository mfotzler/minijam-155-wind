import * as Phaser from 'phaser';
import MessageBus from "../messageBus/MessageBus";
import {Messages} from "../messageBus/Messages";
import Timer from "../entities/Timer";
import Container = Phaser.GameObjects.Container;

export default class MainScene extends Phaser.Scene {
    static readonly key = 'MainScene';
    private timeSinceLastTick: number = 0;

    constructor() {
        super({ key: MainScene.key});
    }

    preload():void {
        this.load.atlas('textures', 'assets/texture.png', 'assets/texture.json');
        this.load.bitmapFont('rubik', 'assets/rubik-font_0.png', 'assets/rubik-font.fnt');
    }

    create():void {
        this.addKeyInputListeners();
        this.add.existing<Container>(new Timer(this.scene.scene, this.renderer.width/2, 100));
    }

    update(time: number, delta: number):void {
        this.timeSinceLastTick += delta;
        if (this.timeSinceLastTick > 1000) {
            this.timeSinceLastTick = 0;
            MessageBus.sendMessage(Messages.SecondElapsed, {});
        }
    }

    addKeyInputListeners():void {
        this.input.keyboard?.on('keydown-UP', () => {
        });
        this.input.keyboard?.on('keydown-DOWN', () => {
        });
        this.input.keyboard?.on('keydown-LEFT', () => {
        });
        this.input.keyboard?.on('keydown-RIGHT', () => {
        });
    }
}
