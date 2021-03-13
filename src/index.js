import p5 from "p5";

import {
    Layout,
    Point,
    flatOrientation
} from "./hexagons";
import {
    Grid,
    gridChanged,
    hasMoves,
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
    fieldSize,
    getRadiusFromHash
} from "./util";

new p5((p5) => {
    const radius = getRadiusFromHash() ?? 2;
    const defaultSize = 60;
    const [width, height] = fieldSize(p5, radius);

    const game = {
        grid: Grid(radius),
        layout: Layout(
            flatOrientation,
            Point(defaultSize, defaultSize),
            Point(width / 2, height / 2)
        ),
        score: 0,
        progress: "playing"
    };

    p5.setup = async () => {
        p5.createCanvas(width, height);
        //localSpawn(grid, 3);
        await remoteSpawn(game.grid);
    };

    p5.draw = () => {
        p5.background(backgroundColor);
        drawGrid(p5, game.layout, game.grid);
    };

    p5.windowResized = () => {
        const [width, height] = fieldSize(p5, radius);
        game.layout.origin = Point(width / 2, height / 2);
        p5.resizeCanvas(width, height);
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
            const [newGrid, score] = slideGrid(game.grid, direction);
            if (gridChanged(game.grid, newGrid)) {
                game.grid = newGrid;
                //localSpawn(grid, 2);
                await remoteSpawn(game.grid);
            }

            if (!hasMoves(game.grid)) {
                console.log("DONE");
            }
        }
    };
});
