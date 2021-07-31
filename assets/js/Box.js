'use strict';

export default class Box {

    static list = [];

    static width  = 100;
    static height = 100;

    weight = 100;

    x = 0;
    y = 0;

    velocity = {
        x: 0,
        y: 0
    }

    color = 'yellow';

    constructor(x, y) {

        this.x = x;
        this.y = y;

        this.width  = Box.width;
        this.height = Box.height;

        Box.list.push(this);

    }

}