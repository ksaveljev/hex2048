import p5 from "p5";

import {
    Hex,
    Layout,
    Point,
    flatOrientation
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

    const layout = Layout(
        flatOrientation,
        Point(60, 60),
        Point(p5.windowWidth / 2, p5.windowHeight / 2)
    );

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

    p5.setup = () => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight);
    };

    p5.draw = () => {
        p5.background(backgroundColor);
        drawGrid(p5, layout, grid);
    };

    p5.windowResized = () => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
        layout.origin = Point(p5.windowWidth / 2, p5.windowHeight / 2);
        p5.redraw();
    };
};

new p5(game);
