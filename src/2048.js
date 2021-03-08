import {
    find,
    indexOf,
    sample
} from "lodash";

import {
    Hex,
    equal,
    toString
} from "./hexagons";

const tile2Probability = 0.9;

export function Tile(hex, value) {
    return {
        hex,
        value
    };
}

export function Grid(radius) {
    const tiles = [];
    for (var q = -radius; q <= radius; q++) {
        const r1 = Math.max(-radius, -q - radius);
        const r2 = Math.min(radius, -q + radius);
        for (var r = r1; r <= r2; r++) {
            tiles.push(Tile(Hex(q, r, -q-r), null));
        }
    }
    return {
        radius,
        tiles
    };
}

export function newTile(hex, v) {
    return v < tile2Probability ? Tile(hex, 2) : Tile(hex, 4);
}

export function readTile(grid, hex) {
    const tile = find(grid.tiles, (tile) => equal(tile.hex, hex));
    if (!tile) {
        throw new Error("Couldn't find tile at " + toString(hex));
    }
    return tile;
}

export function setTile(grid, newTile) {
    const currentTile = readTile(grid, newTile.hex);
    const idx = indexOf(grid.tiles, currentTile);
    if (idx == -1) {
        throw new Error("TODO");
    }
    grid.tiles.splice(idx, 1, newTile);
}

export function emptyTiles(grid) {
    return grid.tiles.filter((tile) => tile.value === null);
}

export function newTileHex(grid) {
    const tiles = emptyTiles(grid);
    if (tiles.lenght == 0) return null;
    else return sample(tiles).hex;
}

export function placeRandomTile(grid) {
    const hex = newTileHex(grid);
    if (!hex) {
        return;
    }
    setTile(grid, newTile(hex, Math.random()));
}

export function spawn(grid, n) {
    while (n--) {
        placeRandomTile(grid);
    }
}
