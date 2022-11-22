// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/BjoM9oKOAKY

export default class Particle {
	constructor(p5, rows, cols, scl) {
		this.p5 = p5;
		this.pos = p5.createVector(p5.random(p5.width), p5.random(p5.height));
		this.vel = p5.createVector(0, 0);
		this.acc = p5.createVector(0, 0);
		this.maxspeed = 4;
		this.prevPos = this.pos.copy();
		this.rows = rows;
		this.cols = cols;
		this.scl = scl;
	}

	update() {
		this.vel.add(this.acc);
		this.vel.limit(this.maxspeed);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}

	follow(vectors) {
		var x = this.p5.floor(this.pos.x / this.scl);
		var y = this.p5.floor(this.pos.y / this.scl);
		var index = x + y * this.cols;
		var force = vectors[index];
		this.applyForce(force);
	}

	applyForce(force) {
		this.acc.add(force);
	}

	show() {
		this.p5.stroke(255, 10);
		this.p5.strokeWeight(1);
		this.p5.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
		this.updatePrev();
	}

	updatePrev() {
		this.prevPos.x = this.pos.x;
		this.prevPos.y = this.pos.y;
	}

	edges() {
		if (this.pos.x > this.p5.width) {
			this.pos.x = 0;
			this.updatePrev();
		}
		if (this.pos.x < 0) {
			this.pos.x = this.p5.width;
			this.updatePrev();
		}
		if (this.pos.y > this.p5.height) {
			this.pos.y = 0;
			this.updatePrev();
		}
		if (this.pos.y < 0) {
			this.pos.y = this.p5.height;
			this.updatePrev();
		}
	}
}
