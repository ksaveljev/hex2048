export function Point(x, y) {
    return { x, y };
}

export function Hex(q, r, s) {
    if (q + r + s == 0) return { q, r, s };
    throw new Error(`Invalid hex coordinates: ${q}, ${r}, ${s} (sum must be 0)`);
}

export function add(hexA, hexB) {
    return Hex(hexA.q + hexB.q, hexA.r + hexB.r, hexA.s + hexB.s);
}

export function subtract(hexA, hexB) {
    return Hex(hexA.q - hexB.q, hexA.r - hexB.r, hexA.s - hexB.s);
}

export function scale(hex, k) {
    return Hex(hex.q * k, hex.r * k, hex.s * k);
}

export const directions = {
    "N": Hex(1, 0, -1),
    "NE": Hex(1, -1, 0),
    "NW": Hex(0, -1, 1),
    "S": Hex(-1, 0, 1),
    "SE": Hex(-1, 1, 0),
    "SW": Hex(0, 1, -1)
};

export function direction(dir) {
    if (directions.hasOwnProperty(dir)) return directions[dir];
    throw new Error(`Invalid direction ${dir}`);
};

export function neighbor(hex, dir) {
    return add(hex, direction(dir));
}

export function Orientation(f0, f1, f2, f3, b0, b1, b2, b3, angle) {
    return { f0, f1, f2, f3, b0, b1, b2, b3, angle };
}

export const pointyOrientation = Orientation(
    Math.sqrt(3.0),
    Math.sqrt(3.0) / 2.0,
    0.0,
    3.0 / 2.0,
    Math.sqrt(3.0) / 3.0,
    -1.0 / 3.0,
    0.0,
    2.0 / 3.0,
    0.5
);

export const flatOrientation = Orientation(
    3.0 / 2.0,
    0.0,
    Math.sqrt(3.0) / 2.0,
    Math.sqrt(3.0),
    2.0 / 3.0,
    0.0,
    -1.0 / 3.0,
    Math.sqrt(3.0) / 3.0,
    0.0
);

export function Layout(orientation, size, origin) {
    return { orientation, size, origin };
};

export function hexToPoint(layout, hex) {
    const { orientation, size, origin } = layout;
    const x = (orientation.f0 * hex.q + orientation.f1 * hex.r) * size.x;
    const y = (orientation.f2 * hex.q + orientation.f3 * hex.r) * size.y;
    return Point(x + origin.x, y + origin.y);
}

function cornerOffset(layout, corner) {
    const { orientation, size } = layout;
    const angle = 2.0 * Math.PI * (orientation.angle - corner) / 6.0;
    return Point(size.x * Math.cos(angle), size.y * Math.sin(angle));
}

export function polygonCorners(layout, hex) {
    const corners = [];
    const center = hexToPoint(layout, hex);
    for (var i = 0; i < 6; i++) {
        const offset = cornerOffset(layout, i);
        corners.push(Point(center.x + offset.x, center.y + offset.y));
    }
    return corners;
}
