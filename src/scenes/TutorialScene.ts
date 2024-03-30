import UIHelpers from '../UIHelpers';
import BaseScene from './BaseScene';
import MainMenu from './MainMenu';
import DialogueBox from '../entities/DialogueBox';
import Container = Phaser.GameObjects.Container;

export default class TutorialScene extends BaseScene {
	static readonly key = 'Tutorial';
	private music: Phaser.Sound.BaseSound;
	constructor() {
		super({ key: TutorialScene.key });
	}

	create(): void {
		this.addTitle();
		this.addPlayButton();
		this.playSound();

		const dialogueBox = new DialogueBox(this.scene.scene, 0, this.renderer.height - 420, [
			{
				text: 'Welcome to the tutorial!',
				name: 'Blower-san',
				image: 'blower-san'
			},
			{
				text: 'I will guide you through the basics of the game.',
				name: 'Blower-san',
				image: 'blower-san'
			},
			{
				text: 'Coins are falling everywhere and we need to get them to the goal',
				name: 'Blower-san',
				image: 'blower-san'
			}
		]);
		this.add.existing<Container>(dialogueBox);
	}

	update(time: number, delta: number): void {}

	override preload() {
		super.preload();

		this.load.audio('blower_san_theme', 'assets/blower_san_theme.mp3');
	}

	private playSound() {
		this.music = this.sound.add('blower_san_theme');

		this.music.play({ loop: true });
	}

	private addTitle() {
		this.add.bitmapText(this.game.renderer.width / 2, 250, 'rubik', 'Tutorial').setOrigin(0.5, 0.5);
	}

	private addPlayButton() {
		UIHelpers.addCenteredButton(this, 400, 'Main Menu', () => {
			this.music.stop();
			this.scene.start(MainMenu.key);
		});
	}
}
