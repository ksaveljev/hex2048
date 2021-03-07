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

        const grid = Grid(2);

        const hex = Hex(0, 0, 0);
        const tile = Tile(hex, 2048);
        setTile(grid, tile);

        drawGrid(p5, grid);
    };

    p5.draw = () => {
    };
};

new p5(game);
