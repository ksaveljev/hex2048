import {
    Tile,
    nonEmptyTiles,
    placeRandomTile,
    setTile
} from "./2048";
import {
    Hex
} from "./hexagons";

export function localSpawn(grid, n) {
    while (n--) {
        placeRandomTile(grid);
    }
}

function json(response) {
    return response.json();
}

export async function remoteSpawn(serverUrl, grid) {
    const url = `${serverUrl}/${grid.radius+1}`;
    const tiles = nonEmptyTiles(grid).map((tile) => {
        return {
            x: tile.hex.q,
            y: tile.hex.r,
            z: tile.hex.s,
            value: tile.value
        };
    });

    fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: JSON.stringify(tiles)
    })
    .then(json)
    .then(function (data) {
        for (const entry of data) {
            setTile(grid, Tile(Hex(entry.x, entry.y, entry.z), entry.value));
        }
    })
    .catch(function (error) {
        console.log('Request failed', error);
    });
}
