import p5 from "p5";

import {
    Hex
} from "./hexagons";
import {
    Grid,
    Tile,
    setTile
} from "./2048";
import {
    backgroundColor,
    drawGrid
} from "./render";

const game = (p5) => {

    p5.setup = () => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight);
        p5.background(backgroundColor);

        const radius = 2;
        const grid = Grid(radius);

        let x = 1;
        for (var q = -radius; q <= radius; q++) {
            const r1 = Math.max(-radius, -q - radius);
            const r2 = Math.min(radius, -q + radius);
            for (var r = r1; r <= r2; r++) {
                setTile(grid, Tile(Hex(q, r, -q-r), 1<<x));
                x++;
            }
        }

        drawGrid(p5, grid);
    };

    p5.draw = () => {
    };
};

new p5(game);
