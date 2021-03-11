import {
    cloneDeep,
    find,
    flatten,
    indexOf,
    reverse,
    sample,
    sortBy,
    sum,
    take,
    zip
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

export function newRandomTile(hex, v) {
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
        throw new Error("Unknown error in setTile");
    }
    grid.tiles.splice(idx, 1, newTile);
}

export function emptyTiles(grid) {
    return grid.tiles.filter((tile) => tile.value === null);
}

export function nonEmptyTiles(grid) {
    return grid.tiles.filter((tile) => tile.value !== null);
}

export function newTileHex(grid) {
    const tiles = emptyTiles(grid);
    return tiles.length ?  sample(tiles).hex : null;
}

export function placeRandomTile(grid) {
    const hex = newTileHex(grid);
    if (hex) {
        setTile(grid, newRandomTile(hex, Math.random()));
    }
}

export function groupedByTwo(values) {
    if (values.length == 1) {
        return [values];
    } else if (values.length == 2) {
        if (values[0] === values[1]) {
            return [values];
        } else {
            return [[values[0]], [values[1]]];
        }
    } else if (values.length) {
        if (values[0] === values[1]) {
            return [[values[0], values[1]]].concat(groupedByTwo(values.slice(2)));
        } else {
            return [[values[0]]].concat(groupedByTwo(values.slice(1)));
        }
    } else {
        return [];
    }
}

export function slideRow(values) {
    const size = values.length;
    const grouped = groupedByTwo(values.filter((v) => v !== null));
    const newValues = take(grouped.map(sum).concat(Array(size).fill(null)), size);
    const score = sum(flatten(grouped.filter((group) => group.length > 1)));
    return [newValues, score];
}

export function slideGrid(grid, direction) {
    let pick;
    let sortByFn;
    const radius = grid.radius;
    const newGrid = cloneDeep(grid);

    switch (direction) {
        case "N":
        case "S":
            pick = (hex, v) => hex.q == v;
            sortByFn = (tile) => tile.hex.r;
            break;

        case "NE":
        case "SW":
            pick = (hex, v) => hex.s == v;
            sortByFn = (tile) => tile.hex.q;
            break;

        case "NW":
        case "SE":
            pick = (hex, v) => hex.r == v;
            sortByFn = (tile) => tile.hex.q;
            break;
    }

    let totalScore = 0;

    for (var q = -radius; q <= radius; q++) {
        const tiles = sortBy(newGrid.tiles.filter((tile) => pick(tile.hex, q)), sortByFn)
        if (["S", "NE", "SE"].includes(direction)) {
            reverse(tiles);
        }

        const [values, score] = slideRow(tiles.map((tile) => tile.value));

        zip(tiles, values).forEach(([tile, value]) => {
            setTile(newGrid, Tile(tile.hex, value));
        });

        totalScore += score;
    }

    return [newGrid, totalScore];
}

export function gridChanged(oldGrid, newGrid) {
    for (const oldTile of oldGrid.tiles) {
        const newTile = readTile(newGrid, oldTile.hex);
        if (newTile.value != oldTile.value) {
            return true;
        }
    }

    return false;
}
