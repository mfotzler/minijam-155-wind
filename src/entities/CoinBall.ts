import * as Phaser from "phaser";
import Container = Phaser.GameObjects.Container;
import Vector2 = Phaser.Math.Vector2;
import Arc = Phaser.GameObjects.Arc;

export default class CoinBall extends Container {
  private static hasCreatedAnimations = false;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    private collisionArc: Arc,
  ) {
    super(scene, x, y);

    if (!CoinBall.hasCreatedAnimations) {
      scene.anims.create({
        key: "roll",
        frames: scene.anims.generateFrameNames("textures", {
          prefix: "coin-ball",
          start: 1,
          end: 3,
          zeroPad: 2,
        }),
        frameRate: 3,
        repeat: -1,
      });
      CoinBall.hasCreatedAnimations = true;
    }

    const ballSprite = scene.add.sprite(0, 0, "textures").play("roll");
    this.add(ballSprite);
  }

  public update() {
    this.moveBall();
    this.decelerateBall();
  }

  private moveBall() {
    const distance = new Vector2();
    const force = new Vector2();
    const acceleration = new Vector2();

    distance
      .copy(this.body["center"])
      .subtract(this.collisionArc.body["center"]);
    force
      .copy(distance)
      .setLength(85000 / distance.lengthSq())
      .limit(10);
    acceleration.copy(force).scale(1 / this.body.mass);
    this.body.velocity["add"](acceleration);
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
