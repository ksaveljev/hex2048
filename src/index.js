import p5 from "p5";

const game = (p5) => {

    p5.setup = () => {
        p5.createCanvas();
        p5.background('yellow');
    };

    p5.draw = () => {
    };
};

new p5(game);
