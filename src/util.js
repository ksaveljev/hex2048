export function getHashValue(regexp) {
    const matches = location.hash.match(new RegExp(regexp));
    return matches ? matches[1] : null;
}

export function getRadiusFromHash() {
    const radius = getHashValue("test([1-9][0-9]*)");
    return radius ? parseInt(radius) : null;
}

export function fieldSize(p5, radius) {
    const width = Math.max(p5.windowWidth, (radius * 2 + 1) * 120);
    const height = Math.max(p5.windowHeight, (radius * 2 + 1) * 120);
    return [width, height];
}
