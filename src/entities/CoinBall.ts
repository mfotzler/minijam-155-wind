import * as Phaser from 'phaser';
import Container = Phaser.GameObjects.Container;
import Vector2 = Phaser.Math.Vector2;
import Arc = Phaser.GameObjects.Arc;
import MessageBus from '../messageBus/MessageBus';
import { Messages } from '../messageBus/Messages';
import Sprite = Phaser.GameObjects.Sprite;
import Body = Phaser.Physics.Arcade.Body;

const BALL_SIZE_THRESHOLDS = {
	small: 0,
	medium: 1.5,
	large: 2.0
};

const PHYSICS_BODY_SIZE = {
	small: 50 / 2,
	medium: 100 / 2,
	large: 150 / 2
};

export default class CoinBall extends Container {
	private static hasCreatedAnimations = false;
	private readonly initialX: number;
	private readonly initialY: number;
	ballSprite: Sprite;
	constructor(
		scene: Phaser.Scene,
		x: number,
		y: number,
		private collisionArc: Arc
	) {
		super(scene, x, y);

		this.initialY = y;
		this.initialX = x;

		if (!CoinBall.hasCreatedAnimations) {
			this.createBallAnimal(scene, 's');
			this.createBallAnimal(scene, 'm');
			this.createBallAnimal(scene, 'l');
			CoinBall.hasCreatedAnimations = true;
		}

		this.initializeMessageBus();
		this.ballSprite = scene.add.sprite(0, 0, 'textures').play('roll-s');
		this.add(this.ballSprite);
	}

	private createBallAnimal(scene: Phaser.Scene, size: string) {
		scene.anims.create({
			key: `roll-${size}`,
			frames: scene.anims.generateFrameNames('textures', {
				prefix: `coin-ball-${size}`,
				start: 1,
				end: 3,
				zeroPad: 2
			}),
			frameRate: 3,
			repeat: -1
		});
	}

	ballScale: number = 1;

	private initializeMessageBus() {
		MessageBus.subscribe<number>(Messages.BallScale, (value) => {
			this.ballScale = value ?? 1;
		});
	}

	public update() {
		this.moveBall();
		this.decelerateBall();
		this.setBallSize();
		this.checkIfBallIsOutOfBounds();
	}

	private checkIfBallIsOutOfBounds() {
		if (!this.scene.physics.world.bounds.contains(this.x, this.y)) this.setBallPositionToInitial();
	}

	public setBallSize() {
		if (this.ballScale > BALL_SIZE_THRESHOLDS.large) {
			this.ballSprite.play('roll-l');
			(this.body as any as Body).setCircle(PHYSICS_BODY_SIZE.large, -75, -75);
		} else if (this.ballScale > BALL_SIZE_THRESHOLDS.medium) {
			this.ballSprite.play('roll-m');
			(this.body as any as Body).setCircle(PHYSICS_BODY_SIZE.medium, -50, -50);
		} else if (this.ballScale > BALL_SIZE_THRESHOLDS.small) {
			this.ballSprite.play('roll-s');
			(this.body as any as Body).setCircle(PHYSICS_BODY_SIZE.small, -25, -25);
		}
	}

	public resetBall() {
		MessageBus.sendMessage(Messages.BallScale, 1);
		this.setBallPositionToInitial();
	}

	private setBallPositionToInitial() {
		this.x = this.initialX;
		this.y = this.initialY;
	}

	private moveBall() {
		const distance = new Vector2();
		const force = new Vector2();
		const acceleration = new Vector2();

		distance.copy(this.body['center']).subtract(this.collisionArc.body['center']);
		force
			.copy(distance)
			.setLength(85000 / distance.lengthSq())
			.limit(10);
		acceleration.copy(force).scale(1 / this.body.mass);
		this.body.velocity['add'](acceleration);
	}

	private decelerateBall() {
		const decelerationFactor = 1.01;

		const moveToZero = (value: number) => {
			return value / decelerationFactor;
		};

		this.body.velocity.x = moveToZero(this.body.velocity.x);
		this.body.velocity.y = moveToZero(this.body.velocity.y);
	}
}
