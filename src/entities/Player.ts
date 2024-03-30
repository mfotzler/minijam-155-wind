import * as Phaser from "phaser";

import Sprite = Phaser.GameObjects.Sprite;
import Arc = Phaser.GameObjects.Arc;
import Body = Phaser.Physics.Arcade.Body;
import Vector2 = Phaser.Math.Vector2;

export default class Player {
  public circle: Arc;
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
    if (this.scene.input.mousePointer.isDown) {
      this.moveDirect.x = this.scene.input.mousePointer.x;
      this.moveDirect.y = this.scene.input.mousePointer.y;

      this.scene.physics.accelerateToObject(this.sprite, this.moveDirect, 250);
    } else {
      this.sprite.body.velocity.x = 0;
      this.sprite.body.velocity.y = 0;
    }
    this.setArcLocation();

    this.moveBall();
    // this.decelerateBall();
    // this.scene.physics.collide(
    //   this.collisionArc,
    //   this.circle,
    //   this.moveCircle.bind(this),
    // );
  }

  private decelerateBall() {
    const moveToZero = (value: number) => {
      let newValue: number;
      if (value > 0) newValue = value - 1;
      else newValue = value + 1;

      if (newValue < 1 || newValue > -1) newValue = 0;

      return newValue;
    };

    this.circle.body.velocity.x = moveToZero(this.circle.body.velocity.x);
    this.circle.body.velocity.y = moveToZero(this.circle.body.velocity.y);
  }

  private moveBall() {
    const distance = new Vector2();
    const force = new Vector2();
    const acceleration = new Vector2();

    distance.copy(this.circle.body["center"]);
    force
      .copy(distance)
      .setLength(200000 / distance.lengthSq())
      .limit(1000);
    acceleration.copy(force).scale(1 / this.circle.body.mass);
    this.circle.body.velocity["add"](acceleration);
  }

  private initializeBall(x: number, y: number) {
    this.circle = this.scene.add.circle(x + 400, y + 105, 35, 0xff6699);
    this.scene.physics.add.existing(this.circle, false);
  }

  private setArcLocation() {
    let offsetX = 15;
    let offsetY = 15;

    this.collisionArc.x = this.sprite.x + offsetX;
    this.collisionArc.y = this.sprite.y + offsetY;
  }

  private initializeArc(x: number, y: number) {
    this.collisionArc = this.scene.add.arc(x, y, 10, 0, 25, false, 0xff0011);

    let physics = this.scene.physics.add.existing(this.collisionArc);
    (physics.body as Body).setCircle(35);
  }

  private moveCircle() {
    let isLeftOfPlayer = this.circle.x > this.sprite.x;
    let isBelowPlayer = this.circle.y > this.sprite.y;

    let acceleration = 120;

    let isWithinXTolerance = this.isWithinTolerance(
      this.circle.x,
      this.sprite.x,
    );
    let isWithinYTolerance = this.isWithinTolerance(
      this.circle.y,
      this.sprite.y,
    );

    if (isLeftOfPlayer && !isWithinXTolerance)
      this.circle.body.velocity.x += acceleration;
    else if (!isWithinXTolerance) this.circle.body.velocity.x -= acceleration;
    if (isBelowPlayer && !isWithinYTolerance)
      this.circle.body.velocity.y += acceleration;
    else if (!isWithinYTolerance) this.circle.body.velocity.y -= acceleration;
  }

  private isWithinTolerance(coord: number, coord2: number) {
    let tolerance = 5;

    return Math.abs(coord2 - coord) < 5;
  }
}
