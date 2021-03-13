export function gridToDom(selector, grid) {
    const container = document.querySelector(selector);
    container.innerHTML = null;

    grid.tiles.forEach((tile) => {
        const div = document.createElement("div");
        div.setAttribute("data-x", tile.hex.q);
        div.setAttribute("data-y", tile.hex.s);
        div.setAttribute("data-z", tile.hex.r);
        div.setAttribute("data-value", tile.value ?? 0);
        container.appendChild(div);
    });
}

export function updateGameStatusDom(selector, status) {
    const container = document.querySelector(selector);
    const span = container.querySelector('span');
    span.innerHTML = status;
    span.setAttribute("data-status", status);
}

export function getSpawnServerUrl() {
    const container = document.getElementById("url-server");
    return container.value;
}

export function onSpawnServerUrlChange(fn) {
    const container = document.getElementById("url-server");
    container.addEventListener("change", fn);
}
