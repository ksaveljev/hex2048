import {
    getRadiusFromHash
} from "../src/util";

test("getRadiusFromHash", () => {
    location.hash = "test2";
    expect(getRadiusFromHash()).toStrictEqual(2);
});

test("getRadiusFromHash", () => {
    location.hash = "test13";
    expect(getRadiusFromHash()).toStrictEqual(13);
});

test("getRadiusFromHash", () => {
    location.hash = "";
    expect(getRadiusFromHash()).toStrictEqual(null);
});
