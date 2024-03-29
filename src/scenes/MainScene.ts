import * as Phaser from 'phaser';
import MessageBus from "../messageBus/MessageBus";
import {Messages} from "../messageBus/Messages";
import Timer from "../entities/Timer";
import GameOver from "./GameOver";
import BaseScene from "./BaseScene";
import Container = Phaser.GameObjects.Container;

export default class MainScene extends BaseScene {
    static readonly key = 'MainScene';
    private timeHandler: TimeHandler = new TimeHandler();

    constructor() {
        super({ key: MainScene.key});
    }

    create():void {
        this.addKeyInputListeners();
        this.addTimer();
        this.addGameOverHandler();
    }

    update(time: number, delta: number):void {
        this.timeHandler.tick(delta);
    }

    private addTimer() {
        this.add.existing<Container>(new Timer(this.scene.scene, this.renderer.width / 2, 100));
    }

    private addGameOverHandler() {
        MessageBus.subscribe<void>(Messages.GameOver, () => {
            this.scene.start(GameOver.key);
        });
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

class TimeHandler {
    private timeSinceLastTick: number = 0;

    tick(delta: number) {
        this.timeSinceLastTick += delta;
        if (this.timeSinceLastTick > 1000) {
            this.timeSinceLastTick = 0;
            MessageBus.sendMessage(Messages.SecondElapsed, {});
        }
    }
}