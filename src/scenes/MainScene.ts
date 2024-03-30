import * as Phaser from 'phaser';
import MessageBus from '../messageBus/MessageBus';
import { Messages } from '../messageBus/Messages';
import Timer from '../entities/Timer';
import GameOver from './GameOver';
import BaseScene from './BaseScene';
import Vacuum from '../entities/Vacuum';
import Player from '../entities/Player';
import Container = Phaser.GameObjects.Container;
import Group = Phaser.GameObjects.Group;
import Coin from '../entities/Coin';
import GameObjectWithBody = Phaser.Types.Physics.Arcade.GameObjectWithBody;

export default class MainScene extends BaseScene {
	static readonly key = 'MainScene';
	private player: Player;
	private timeHandler: TimeHandler = new TimeHandler();
	private wallLayer: Phaser.Tilemaps.TilemapLayer;
	private coinPool: Group;

	constructor() {
		super({ key: MainScene.key });
	}

	preload() {
		super.preload();

		this.load.tilemapTiledJSON('map1', 'assets/map1.json');
		this.load.image('tiles', 'assets/wall.png');
	}

	create(): void {
		this.addCircle();
		this.addTimer();
		this.addGameOverHandler();

		this.add.existing<Container>(new Vacuum(this.scene.scene, 500, 400));
		this.coinPool = this.add.group({
			classType: Coin,
			max: 50
		});

		this.initializeMapAndCameras();
		this.initializeBallScale();
	}

	private initializeBallScale() {
		MessageBus.sendMessage(Messages.BallScale, 1);
	}

	private initializeMapAndCameras(): void {
		const map = this.make.tilemap({ key: 'map1' });
		const tileset = map.addTilesetImage('walls', 'tiles', 32, 32, 0, 0, 1);
		this.wallLayer = map.createLayer(0, tileset, 0, 0);
		this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
		map.setCollision(1, true);

		this.physics.add.collider(this.player.ball, this.wallLayer);
	}

	update(time: number, delta: number): void {
		this.timeHandler.tick(delta);
		this.player.update();

		if (this.coinPool.children.getArray().length < 50) {
			const coin = this.coinPool.get();
			coin.setPosition(Math.random() * this.renderer.width, Math.random() * this.renderer.height);

			this.physics.add.collider(coin, this.player.ball, this.growBall);
		}
	}

	growBall(coin: GameObjectWithBody) {
		coin.destroy();

		let scale = MessageBus.getLastMessage<number>(Messages.BallScale);
		let growthFactor = 0.05;

		MessageBus.sendMessage(Messages.BallScale, scale + growthFactor);
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
