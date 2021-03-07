import {
    Layout,
    Point,
    flatOrientation,
    polygonCorners
} from "./hexagons";

const hexColors = [
    [205, 193, 180],  //   empty
    [238, 228, 218],  //       2
    [238, 225, 201],  //       4
    [243, 178, 122],  //       8
    [246, 150, 100],  //      16
    [247, 124,  95],  //      32
    [247,  95,  59],  //      64
    [237, 208, 115],  //     128
    [237, 204,  98],  //     256
    [237, 201,  80],  //     512
    [237, 197,  63],  //    1024
    [237, 194,  46],  //    2048
    [239, 103, 108],  //    4096
    [237,  77,  88],  //    8192
    [226,  67,  57],  //   16384
    [113, 180, 213],  //   32768
    [ 94, 160, 223],  //   65536
    [  0, 124, 190],  //  131072
    [ 10, 144, 170],  //  262114
    [ 20, 164, 150],  //  524288
    [ 30, 184, 130]   // 1048576
];

export const backgroundColor = [187, 173, 160];

const lightTextColour = [249, 246, 242];
const darkTextColour  = [119, 110, 101];

const layout = Layout(
    flatOrientation,
    Point(40, 40),
    Point(500, 500)
);

export function drawGrid(p5, grid) {
    grid.tiles.forEach((tile) => {
        p5.fill(hexColors[0]);
        const corners = polygonCorners(layout, tile.hex);
        p5.stroke(backgroundColor);
        p5.strokeWeight(10);
        p5.beginShape();
        corners.forEach((corner) => {
            p5.vertex(corner.x, corner.y);
        });
        p5.endShape(p5.CLOSE);

        if (tile.value) {
            const color = hexColors[Math.log2(tile.value)];
            p5.fill(color);

            const corners = polygonCorners(layout, tile.hex);
            p5.beginShape();
            corners.forEach((corner) => {
                p5.vertex(corner.x, corner.y);
            });
            p5.endShape(p5.CLOSE);
        }
    });
}
