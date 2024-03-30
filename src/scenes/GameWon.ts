import BaseScene from './BaseScene';
import UIHelpers from '../UIHelpers';
import MainScene from './MainScene';
import DialogueBox from '../entities/DialogueBox';
import Container = Phaser.GameObjects.Container;

export default class GameWon extends BaseScene {
	static readonly key = 'GameWon';
	private music: Phaser.Sound.BaseSound;
	constructor() {
		super({ key: GameWon.key });
	}

	create(): void {
		this.addTitle();
		this.addPlayButton();
		this.playSound();

		const dialogueBox = new DialogueBox(this, 0, this.renderer.height - 420, [
			{
				text: 'You did it!  I have enough money now!!! :)',
				name: 'Blower-san',
				image: 'lil-blower-san01'
			},
			{
				text: 'Now I can reveal my true form...',
				name: 'Blower-san',
				image: 'lil-blower-san01'
			},
			{
				text: 'Surprised?  I know, I get that look a lot.',
				name: 'Blower-san',
				image: 'blower-san'
			},
			{
				text: 'Maybe try to collect even more coins next time!',
				name: 'Blower-san',
				image: 'blower-san'
			}
		]);
		this.add.existing<Container>(dialogueBox);
	}

	override preload() {
		super.preload();

		this.load.audio('blower_san_theme', 'assets/blower_san_theme.mp3');
	}

	private playSound() {
		this.music = this.sound.add('blower_san_theme');

		this.music.play({ loop: true });
	}

	private addTitle() {
		this.add
			.bitmapText(this.game.renderer.width / 2, 250, 'rubik', 'You win !!!')
			.setOrigin(0.5, 0.5);
	}

	private addPlayButton() {
		UIHelpers.addCenteredButton(this, 400, 'Play Again', () => {
			this.scene.start(MainScene.key);
		});
	}
}
