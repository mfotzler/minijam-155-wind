import * as Phaser from 'phaser';
import {Messages} from "../messageBus/Messages";
import MessageBus from "../messageBus/MessageBus";
import BitmapText = Phaser.GameObjects.BitmapText;
import Container = Phaser.GameObjects.Container;

export default class Timer extends Container {
    private text: BitmapText;
    private isActive = true;
    private timeRemaining: number = 3;
    public static TimerWidth: number = 300;
    constructor(scene:Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        const background = scene.add.nineslice(0, 0, 'textures', 'menu-button', Timer.TimerWidth, 100, 20, 20, 20, 20);
        this.add(background);

        this.text = scene.add.bitmapText(0, 0, 'rubik', `Time: ${this.timeRemaining}`);
        this.text.setOrigin(0.5, 0.5);
        this.add(this.text);

        MessageBus.subscribe(Messages.SecondElapsed, () => {
            if(!this.isActive) return;

            if(this.timeRemaining > 0) {
                this.timeRemaining--;
                this.text.setText(`Time: ${this.timeRemaining}`);
            }
            else {
                this.isActive = false;
                MessageBus.sendMessage(Messages.GameOver, {});
                this.text.setText('Time\'s up!');
            }
        })
    }
}