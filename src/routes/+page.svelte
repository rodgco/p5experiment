<script>
	import { createNoise2D } from 'simplex-noise';
	import P5 from '@macfja/svelte-p5';

	let y = 0;
	let speed = 30;
	let current;

	let inc = 0.01;
	let start = 0;

	let noise2d = createNoise2D();

	let sketch = {
		setup: (p5) => {
			p5.createCanvas(400, 400);
			p5.stroke(255); // Set line drawing color to white
		},
		draw: (p5) => {
			p5.background(51);

			p5.stroke(255);
			p5.noFill();
			p5.beginShape();
			let xoff = start;
			for (let x = 0; x < p5.width; x++) {
				// p5.stroke(255);
				// let y = random(p5.height);
				let r = noise2d(xoff, 0);
				let y = p5.map(r, -1, 1, 0, p5.height);
				p5.vertex(x, y);

				xoff += inc;
			}
			p5.endShape();

			start += inc;

			//noLoop();
		}
	};
</script>

<P5 {...sketch} />
