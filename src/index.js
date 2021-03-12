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
    getRadiusFromHash
} from "./util";

const game = (p5) => {
    const radius = getRadiusFromHash() ?? 2;
    let grid = Grid(radius);

    const config = {
        size: 60,
        width: Math.max(p5.windowWidth, (radius * 2 + 1) * 120),
        height: Math.max(p5.windowHeight, (radius * 2 + 1) * 120)
    };

    const layout = Layout(
        flatOrientation,
        Point(config.size, config.size),
        Point(config.width / 2, config.height / 2)
    );

    p5.setup = async () => {
        p5.createCanvas(config.width, config.height);
        //localSpawn(grid, 3);
        await remoteSpawn(grid);
    };

    p5.draw = () => {
        p5.background(backgroundColor);
        drawGrid(p5, layout, grid);
    };

    p5.windowResized = () => {
        config.width = Math.max(p5.windowWidth, (radius * 2 + 1) * 120);
        config.height = Math.max(p5.windowHeight, (radius * 2 + 1) * 120);
        p5.resizeCanvas(config.width, config.height);
        layout.origin = Point(config.width / 2, config.height / 2);
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

            if (!hasMoves(grid)) {
                console.log("DONE");
            }
        }
    };
};

new p5(game);
