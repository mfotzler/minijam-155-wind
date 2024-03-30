import * as Phaser from 'phaser';
import Container = Phaser.GameObjects.Container;
import CoinBall from './CoinBall';
import Sprite = Phaser.GameObjects.Sprite;
import TilemapLayer = Phaser.Tilemaps.TilemapLayer;
import Vector2 = Phaser.Math.Vector2;
import Vector2Like = Phaser.Types.Math.Vector2Like;
import Body = Phaser.Physics.Arcade.Body;

export default class Vacuum extends Container {
	private static hasCreatedAnimations = false;
	private vacuumSprite: Sprite;
	keepDirection: boolean = false;
	constructor(
		scene: Phaser.Scene,
		x: number,
		y: number,
		private ball: CoinBall,
		private walls: TilemapLayer
	) {
		super(scene, x, y);

		if (!Vacuum.hasCreatedAnimations) {
			scene.anims.create({
				key: 'vacuum',
				frames: scene.anims.generateFrameNames('textures', {
					prefix: 'vacuum',
					start: 1,
					end: 3,
					zeroPad: 2
				}),
				frameRate: 3,
				repeat: -1
			});
			Vacuum.hasCreatedAnimations = true;
		}

		this.vacuumSprite = scene.add.sprite(0, 0, 'textures').play('vacuum');
		this.vacuumSprite.scale = 0.4;
		this.scene.physics.add.existing(this.vacuumSprite);
		this.vacuumSprite.body['scale'] = 0.4;
		this.add(this.vacuumSprite);
		this.moveInARandomDirection();
		this.scene.physics.add.collider(this.vacuumSprite, this.walls, this.onWallCollide.bind(this));
	}

	update() {
		this.scene.physics.collide(this.vacuumSprite, this.ball, this.onBallCollide.bind(this));
		if (this.isNotMovingFastEnough()) this.moveInARandomDirection();
	}

	private shouldTryUpdatingDirection() {
		return !this.keepDirection;
	}

	private isNotMovingFastEnough() {
		let minVelocity = 100;

		let totalVelocity =
			Math.abs(this.vacuumSprite.body.velocity.x) + Math.abs(this.vacuumSprite.body.velocity.y);

		return totalVelocity < minVelocity;
	}

	onBallCollide() {
		this.ball.resetBall();
	}

	onWallCollide() {
		if (this.shouldTryUpdatingDirection()) this.moveInARandomDirection();
	}

	private moveInARandomDirection() {
		let direction = this.getRandomDirection();
		let angle = this.getAngleOfAttack(direction);
		this.setAngleAndDirection(angle, direction);
	}

	private setAngleAndDirection(angle: number, direction: Phaser.Types.Math.Vector2Like) {
		this.vacuumSprite.rotation = angle;
		this.vacuumSprite.body.velocity.x = direction.x;
		this.vacuumSprite.body.velocity.y = direction.y;
		this.keepDirection = true;

		setTimeout(() => {
			this.keepDirection = false;
		}, 100);
	}

	private moveInTheOppositeDirection() {
		let direction = {
			x: -this.vacuumSprite.body.velocity.x,
			y: -this.vacuumSprite.body.velocity.y
		};
		let angle = this.getAngleOfAttack(direction);
		this.setAngleAndDirection(angle, direction);
	}

	private getAngleOfAttack(vector: Vector2Like) {
		return Math.atan2(vector.y, vector.x) + 1.5;
	}

	private getRandomDirection(): Vector2Like {
		let randomNumber = (max: number, min: number) =>
			(Math.random() * max + min) * (Math.random() > 0.5 ? 1 : -1);

		let x = randomNumber(100, 10);
		let y = randomNumber(100, 10);

		return { x, y };
	}
}
