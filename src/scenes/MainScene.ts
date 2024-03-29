import * as Phaser from 'phaser';
import MessageBus from "../messageBus/MessageBus";
import {Messages} from "../messageBus/Messages";
import Timer from "../entities/Timer";
import GameOver from "./GameOver";
import BaseScene from "./BaseScene";
import Container = Phaser.GameObjects.Container;

export default class MainScene extends BaseScene {
    static readonly key = 'MainScene';
    private circle: Phaser.GameObjects.Arc;
    private timeHandler: TimeHandler = new TimeHandler();

    constructor() {
        super({ key: MainScene.key});
    }

    create():void {
        this.addCircle();
        this.addKeyInputListeners();
        this.addTimer();
        this.addGameOverHandler();
    }

    update(time: number, delta: number):void {
        this.timeHandler.tick(delta);
    }

    private addTimer() {
        let x = (Timer.TimerWidth / 2) + 30;

        this.add.existing<Container>(new Timer(this.scene.scene, x, 100));
    }

    private addGameOverHandler() {
        MessageBus.subscribe<void>(Messages.GameOver, () => {
            this.scene.start(GameOver.key);
        });
    }

    private addCircle() {
        let circle = this.add.circle(200, 200, 30, 0xff6699);
        this.circle = this.physics.add.existing(circle, false);
    }

    addKeyInputListeners():void {
        const acceleration = 150;

        this.input.keyboard?.on('keydown-UP', () => {
            this.circle.body.velocity.y = -acceleration;
        });
        this.input.keyboard?.on('keydown-DOWN', () => {
            this.circle.body.velocity.y = acceleration;
        });
        this.input.keyboard?.on('keydown-LEFT', () => {
            this.circle.body.velocity.x = -acceleration;
        });
        this.input.keyboard?.on('keydown-RIGHT', () => {
            this.circle.body.velocity.x = acceleration;
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