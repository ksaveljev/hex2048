import {
    Hex,
    hexToPoint,
    polygonCorners
} from "./hexagons";

function toColor(rgb) {
    return new paper.Color(rgb[0] / 255, rgb[1] / 255, rgb[2] / 255);
}

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
].map(toColor);

const backgroundColor = toColor([187, 173, 160]);

const lightTextColour = toColor([249, 246, 242]);
const darkTextColour  = toColor([119, 110, 101]);

function HexPath(layout, hex, backgroundColor, fillColor) {
    const corners = polygonCorners(layout, hex);
    const path = new Path();
    path.strokeColor = backgroundColor;
    path.fillColor = fillColor;
    path.strokeWidth = 10;
    path.closed = true;
    path.fullySelected = false;
    corners.forEach((corner) => {
        path.add(new Point(corner.x, corner.y));
    });
    return path;
}

function ValueText(layout, hex, hexPath, value, color) {
    const center = hexToPoint(layout, hex);
    const textLocation = new Point(center.x, center.y);
    const text = new PointText(textLocation);
    text.fillColor = color;
    text.content = value;
    text.fontSize = 40;
    text.justification = "center";
}

export function Board(layout, radius) {
    const hexes = [];
    const tiles = [];

    for (var q = -radius; q <= radius; q++) {
        const r1 = Math.max(-radius, -q - radius);
        const r2 = Math.min(radius, -q + radius);
        for (var r = r1; r <= r2; r++) {
            const hex = Hex(q, r, -q-r);
            const path = HexPath(layout, hex, backgroundColor, hexColors[0]);
            hexes.push({ path, hex });
        }
    }

    return {
        layout,
        radius,
        hexes,
        tiles
    };
}

function Tile(layout, hex, value) {
    const tileColor = hexColors[Math.log2(value)];
    const valueColor = value > 4 ? lightTextColour : darkTextColour;
    const path = HexPath(layout, hex, backgroundColor, tileColor);
    const text = ValueText(layout, hex, path, value, valueColor);
    return {
        hex,
        value,
        path,
        text
    };
}

export function addTile(board, hex, value) {
    const tile = Tile(board.layout, hex, value);
    board.tiles.push(tile);
}
