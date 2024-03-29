import UIHelpers from "../UIHelpers";
import BaseScene from "./BaseScene";
import MainMenu from "./MainMenu";
import DialogueBox from "../entities/DialogueBox";
import Container = Phaser.GameObjects.Container;

export default class TutorialScene extends BaseScene {
    static readonly key = 'Tutorial';
    constructor() {
        super({ key: TutorialScene.key });
    }

    create():void {
        this.addTitle();
        this.addPlayButton();

        const dialogueBox = new DialogueBox(this.scene.scene, 0, this.renderer.height - 420, 'Welcome to the tutorial!');
        this.add.existing<Container>(dialogueBox);
    }

    update(time: number, delta: number):void {
    }

    override preload() {
        super.preload();
    }

    private addTitle() {
        this.add.bitmapText(this.game.renderer.width/2, 250, 'rubik', 'Tutorial')
            .setOrigin(0.5, 0.5);
    }

    private addPlayButton() {
        UIHelpers.addCenteredButton(this, 400, 'Main Menu', () => {
            this.scene.start(MainMenu.key);
        });
    }
}
