export function getHashValue(regexp) {
    const matches = location.hash.match(new RegExp(regexp));
    return matches ? matches[1] : null;
}

export function getRadiusFromHash() {
    const radius = getHashValue("test([1-9][0-9]*)");
    return radius ? parseInt(radius) : null;
}
