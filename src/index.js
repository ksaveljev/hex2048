import {
    Hex,
    Layout,
    Point,
    flatOrientation
} from "./hexagons";
import {
    Board,
    addTile
} from "./2048";

paper.install(window);

window.onload = function() {
    const canvas = document.getElementById("game");

    paper.setup(canvas);

    var path = new Path.Rectangle({
        point: [75, 75],
        size: [75, 75],
        strokeColor: 'red'
    });

    const layout = Layout(
        flatOrientation,
        Point(40, 40),
        Point(view.center.x, view.center.y)
    );

    const board = Board(layout, 2);
    const tile = addTile(board, Hex(0, 0, 0), 2);

    view.onFrame = function(event) {
        path.rotate(3);
    }

    paper.view.draw();
}
