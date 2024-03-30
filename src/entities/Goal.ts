import * as Phaser from 'phaser';
import Container = Phaser.GameObjects.Container;
import { Scene } from 'phaser';
import CoinBall from './CoinBall';
import Arc = Phaser.GameObjects.Arc;
import Body = Phaser.Physics.Arcade.Body;
import MessageBus from '../messageBus/MessageBus';
import { Messages } from '../messageBus/Messages';

export default class Goal extends Container {
	circle: Arc;
	constructor(
		scene: Scene,
		x: number,
		y: number,
		private ball: CoinBall
	) {
		super(scene, x, y);

		let radius = 50;

		this.circle = this.scene.add.circle(x, y, radius, 0x323232);
		this.scene.physics.add.existing(this.circle);
		(this.circle.body as Body).setCircle(radius);
	}

	update() {
		this.scene.physics.collide(this.circle, this.ball, this.onGoalTouch.bind(this));
	}

	onGoalTouch() {
		let scale = MessageBus.getLastMessage(Messages.BallScale) ?? 1;
		let score = this.calculateScore(scale);
		let currentScore = MessageBus.getLastMessage(Messages.PlayerScore) ?? 0;

		MessageBus.sendMessage(Messages.PlayerScore, score + currentScore);
		this.ball.resetBall();
	}

	private calculateScore(scale: number) {
		let baseScore = 1000;
		let perGrowthMultiplier = 500;

		let growthScore = (scale - 1) * 10 * perGrowthMultiplier;

		return Math.floor(baseScore + growthScore);
	}
}
