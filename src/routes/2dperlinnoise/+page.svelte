<script>
	import { createNoise3D } from 'simplex-noise';
	import converter from 'hsl-to-rgb-for-reals';
	import P5 from '@macfja/svelte-p5';

	let inc = 0.03;
	let start = 0;
	let pixels = [];

	let zoff = 0;

	const noise3d = createNoise3D();

	let sketch = {
		setup: (p5) => {
			p5.createCanvas(400, 400);
			p5.pixelDensity(1);
		},
		draw: (p5) => {
			p5.loadPixels();
			let xoff = 0;
			for (let x = 0; x < p5.width; x++) {
				let yoff = 0;
				for (let y = 0; y < p5.height; y++) {
					var index = (x + y * p5.width) * 4;

					const v = noise3d(xoff, yoff, zoff);
					const h = Math.floor(p5.map(v, -1, 1, 0, 360));

					const [r, g, b] = converter(h, 1, 0.5);
					// const r = v <= 0 ? 0 : 255;
					// console.log(h, r, g, b);

					p5.pixels[index + 0] = r;
					p5.pixels[index + 1] = g;
					p5.pixels[index + 2] = b;
					p5.pixels[index + 3] = 255;
					yoff += inc;
				}
				xoff += inc;
			}
			p5.updatePixels();
			zoff += 0.003;
		}
	};
</script>

<P5 {...sketch} />
