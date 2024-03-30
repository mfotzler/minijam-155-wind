import * as Phaser from "phaser";
import MessageBus from "../messageBus/MessageBus";
import {Messages} from "../messageBus/Messages";
import Timer from "../entities/Timer";
import GameOver from "./GameOver";
import BaseScene from "./BaseScene";
import CoinBall from "../entities/CoinBall";
import Vacuum from "../entities/Vacuum";
import Player from "../entities/Player";
import Container = Phaser.GameObjects.Container;

export default class MainScene extends BaseScene {
    static readonly key = "MainScene";
    private player: Player;
    private timeHandler: TimeHandler = new TimeHandler();
    private wallLayer: Phaser.Tilemaps.TilemapLayer;

    constructor() {
        super({key: MainScene.key});
    }

    preload() {
        super.preload();

        this.load.tilemapTiledJSON("map1", "assets/map1.json");
        this.load.image('tiles', 'assets/wall.png');
    }

    create(): void {
        this.addCircle();
        this.addTimer();
        this.addGameOverHandler();

        this.add.existing<Container>(new CoinBall(this.scene.scene, 400, 400));
        this.add.existing<Container>(new Vacuum(this.scene.scene, 500, 400));

        this.initializeMapAndCameras();
    }

    private initializeMapAndCameras():void {
        const map = this.make.tilemap({key: 'map1'});
        const tileset = map.addTilesetImage('walls', 'tiles', 32, 32, 0, 0, 1);
        this.wallLayer = map.createLayer(0, tileset, 0, 0);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        map.setCollision(1, true);
    }

    update(time: number, delta: number): void {
        this.timeHandler.tick(delta);
        this.player.update();
    }

    private addTimer() {
        let x = Timer.TimerWidth / 2 + 30;

        this.add.existing<Container>(new Timer(this.scene.scene, x, 100));
    }

    private addGameOverHandler() {
        MessageBus.subscribe<void>(Messages.GameOver, () => {
            this.scene.start(GameOver.key);
        });
    }

    private addCircle() {
        this.player = new Player(this, 200, 200);
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
