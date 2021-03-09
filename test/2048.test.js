import {
    groupedByTwo
} from "../src/2048";

test("groupedByTwo", () => {
    const values = [ 2, 4, 4, 4, 8, 16, 8, 8, 8, 8 ];
    const result = [ [2], [4, 4], [4], [8], [16], [8, 8], [8, 8] ];
    expect(groupedByTwo(values)).toStrictEqual(result);
});

test("groupedByTwo", () => {
    const values = [ 2, 2, 2 ];
    const result = [ [2, 2], [2] ];
    expect(groupedByTwo(values)).toStrictEqual(result);
});
