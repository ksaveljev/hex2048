import p5 from "p5";

import {
    Layout,
    Point,
    flatOrientation
} from "./hexagons";
import {
    Grid,
    gridChanged,
    slideGrid,
} from "./2048";
import {
    backgroundColor,
    drawGrid
} from "./render";
import {
    localSpawn,
    remoteSpawn
} from "./spawn";
import {
    getRadiusFromHash
} from "./util";

const game = (p5) => {

    const layout = Layout(
        flatOrientation,
        Point(60, 60),
        Point(p5.windowWidth / 2, p5.windowHeight / 2)
    );

    const radius = getRadiusFromHash() ?? 2;
    let grid = Grid(radius);

    p5.setup = async () => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight);
        //localSpawn(grid, 3);
        await remoteSpawn(grid);
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

    const directions = {
        87: "N",
        69: "NE",
        81: "NW",
        83: "S",
        68: "SE",
        65: "SW"
    };

    p5.keyPressed = async () => {

        const direction = directions[p5.keyCode];
        if (direction) {
            const [newGrid, score] = slideGrid(grid, direction);
            if (gridChanged(grid, newGrid)) {
                grid = newGrid;
                //localSpawn(grid, 2);
                await remoteSpawn(grid);
            }
        }
    };
};

new p5(game);
