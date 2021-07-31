'use strict';

export default class Water {

    static list = [];

    viscosity = .5;

    width  = 0;
    height = 0;

    x = 0;
    y = 0;

    color = 'rgba(75, 75, 255, .9)';

    constructor(x, y, width, height) {

        this.x = x;
        this.y = y;

        this.width  = width;
        this.height = height;

        Water.list.push(this);

    }

}

