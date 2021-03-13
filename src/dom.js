export function gridToDom(selector, grid) {
    const container = document.querySelector(selector);
    container.innerHTML = null;

    grid.tiles.forEach((tile) => {
        const div = document.createElement("div");
        div.setAttribute("data-x", tile.hex.q);
        div.setAttribute("data-y", tile.hex.r);
        div.setAttribute("data-z", tile.hex.s);
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
