import {
    Layout,
    Point,
    flatOrientation
} from "./hexagons";
import {
    drawBoard
} from "./draw";

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

    drawBoard(2, layout);

    view.onFrame = function(event) {
        path.rotate(3);
    }

    paper.view.draw();
}
