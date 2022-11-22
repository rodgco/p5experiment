<script>
	import { createNoise3D } from 'simplex-noise';
	import P5 from '@macfja/svelte-p5';
	import Particle from '$lib/particle';

	let inc = 0.003;
	let scl = 10;
	let cols, rows;
	let fr;
	let zoff = 0;

	const noise3d = createNoise3D();

	let particles = [];

	let flowfield;

	let sketch = {
		setup: (p5) => {
			p5.createCanvas(600, 400);
			cols = p5.floor(p5.width / scl);
			rows = p5.floor(p5.height / scl);

			flowfield = new Array(cols * rows);

			for (var i = 0; i < 300; i++) {
				particles[i] = new Particle(p5, cols, rows, scl);
			}
			p5.background(51);
		},
		draw: (p5, classes, constants) => {
			let xoff = 0;
			for (let x = 0; x < cols; x++) {
				let yoff = 0;
				for (let y = 0; y < rows; y++) {
					var index = x + y * cols;
					var angle = p5.map(noise3d(xoff, yoff, zoff), -1, 1, 0, constants.TWO_PI * 4);
					var v = classes.Vector.fromAngle(angle);
					v.setMag(1);
					flowfield[index] = v;
					yoff += inc;
					p5.stroke(0, 50);
				}
				xoff += inc;
				zoff += 0.00003;
			}

			for (var i = 0; i < particles.length; i++) {
				particles[i].follow(flowfield);
				particles[i].update();
				particles[i].edges();
				particles[i].show();
			}
			fr = p5.floor(p5.frameRate());
		}
	};
</script>

<P5 {...sketch} />
<p>{fr}</p>
