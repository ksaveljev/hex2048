import paper from "paper";

import {
    Layout,
    Point,
    flatOrientation
} from "./hexagons";
import {
    drawBoard
} from "./draw";

paper.setup("game");

const layout = Layout(
    flatOrientation,
    Point(40, 40),
    Point(500, 500)
);

drawBoard(2, layout);
