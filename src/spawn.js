import {
    placeRandomTile
} from "./2048";

export function localSpawn(grid, n) {
    while (n--) {
        placeRandomTile(grid);
    }
}

export function remoteSpawn(grid) {
    // TODO
}
