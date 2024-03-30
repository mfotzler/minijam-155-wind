import * as Phaser from "phaser";
import CoinBall from "./CoinBall";
import Sprite = Phaser.GameObjects.Sprite;
import Arc = Phaser.GameObjects.Arc;
import Body = Phaser.Physics.Arcade.Body;
import Vector2 = Phaser.Math.Vector2;
import Container = Phaser.GameObjects.Container;

export default class Player {
  public ball: CoinBall;
  public sprite: Sprite;
  public collisionArc: Arc;
  private moveDirect: Arc;
  constructor(
    private scene: Phaser.Scene,
    x: number,
    y: number,
  ) {
    this.initializeSprite(x, y);
    this.initializeMoveLocation();
    this.initializeBall(x, y);
    this.initializeArc(x, y);
  }

  private initializeSprite(x: number, y: number) {
    this.sprite = this.scene.add.sprite(x, y, "textures", "lil-blower-san");
    this.sprite.scale = 1;

    this.scene.physics.add.existing(this.sprite, false);
  }

  private initializeMoveLocation() {
    this.moveDirect = this.scene.add.circle(0, 0, 1, 0x000000, 0);
  }

  update() {
    this.handleMouseEvents();
    this.setArcLocation();
    this.RotatePlayerSprite();
    this.moveBall();
    this.decelerateBall();
  }

  private handleMouseEvents() {
    if (this.scene.input.mousePointer.isDown) {
      this.movePlayerToCursor();
    } else {
      this.sprite.body.velocity.x = 0;
      this.sprite.body.velocity.y = 0;
    }
  }

  private movePlayerToCursor() {
    this.moveDirect.x = this.scene.input.mousePointer.x;
    this.moveDirect.y = this.scene.input.mousePointer.y;

    this.scene.physics.accelerateToObject(this.sprite, this.moveDirect, 250);
  }

  private RotatePlayerSprite() {
    let angle = this.getAngleOfAttack();
    let offset = -0.15;

    let rotation = angle + offset;

    this.sprite.setRotation(rotation);
  }

  private getAngleOfAttack() {
    let ballX = (this.ball.body as Body).center.x;
    let ballY = (this.ball.body as Body).center.y;

    let spriteX = (this.sprite.body as Body).center.x;
    let spriteY = (this.sprite.body as Body).center.y;

    return Math.atan2(ballY - spriteY, ballX - spriteX);
  }

  private decelerateBall() {
    const decelerationFactor = 1.01;

    const moveToZero = (value: number) => {
      return value / decelerationFactor;
    };

    this.ball.body.velocity.x = moveToZero(this.ball.body.velocity.x);
    this.ball.body.velocity.y = moveToZero(this.ball.body.velocity.y);
  }

  private moveBall() {
    const distance = new Vector2();
    const force = new Vector2();
    const acceleration = new Vector2();

    distance
      .copy(this.ball.body["center"])
      .subtract(this.collisionArc.body["center"]);
    force
      .copy(distance)
      .setLength(85000 / distance.lengthSq())
      .limit(10);
    acceleration.copy(force).scale(1 / this.ball.body.mass);
    this.ball.body.velocity["add"](acceleration);
  }

  private initializeBall(x: number, y: number) {
    this.ball = new CoinBall(this.scene, x + 400, y + 105);

    this.scene.add.existing<Container>(this.ball);
    this.scene.physics.add.existing(this.ball, false);

    let offset = -35;
    (this.ball.body as Body).setOffset(offset, offset);
    (this.ball.body as Body).setCircle(40);
  }

  private setArcLocation() {
    let angle = this.getAngleOfAttack();

    let magnitude = this.sprite.width / 2;

    const collisionY = Math.sin(angle) * magnitude;
    const collisionX = Math.cos(angle) * magnitude;

    this.collisionArc.x = collisionX + (this.sprite.body as Body).center.x;
    this.collisionArc.y = collisionY + (this.sprite.body as Body).center.y;
  }

  private initializeArc(x: number, y: number) {
    this.collisionArc = this.scene.add.circle(x, y, 35, 0, 0);

    let physics = this.scene.physics.add.existing(this.collisionArc);
    (physics.body as Body).setCircle(35);
  }
}
