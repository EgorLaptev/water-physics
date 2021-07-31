'use strict';

import Box from "./Box.js";
import Water from "./Water.js";

export default class World
{

    static config = {
        gravity: {
            accelerationCoefficient: 1,
            maximumAcceleration: 20
        }
    }

    static paused = false;

    static cnv = document.getElementById('world');
    static ctx = this.cnv.getContext('2d');

    static init() {


        this.paused = false;

        this.cnv.width  = window.innerWidth;
        this.cnv.height = window.innerHeight;

        new Water(0, this.cnv.height - 250, this.cnv.width, 250);

        this.listeners();

        this.loop();

    }

    static loop() {

        if ( !World.paused ) {
            World.movement();
            World.physic();
            World.render();
        }

        requestAnimationFrame(World.loop);

    }

    static render() {

        const cnv = this.cnv;
        const ctx = this.ctx;

        ctx.clearRect(0, 0, cnv.width, cnv.height);

        /* boxes */
        for ( const box of Box.list ) {
            ctx.fillStyle = box.color;
            ctx.fillRect(box.x, box.y, box.width, box.height);
        }

        /* water */
        for ( const water of Water.list) {
            ctx.fillStyle = water.color;
            ctx.fillRect(water.x, water.y, water.width, water.height);
        }

    }

    static physic() {

        /* gravity */
        for ( const box of Box.list ) {

            if ( box.velocity.y < this.config.gravity.maximumAcceleration ) {
                box.velocity.y += this.config.gravity.accelerationCoefficient;
            }

        }

    }

    /* Переписать */
    static movement() {

        for ( const box of Box.list ) {

            if ( box.y + box.height >= Water.list[0].y ) {

                let underWater = (box.y + box.height) - Water.list[0].y ;

                if(underWater > box.height) underWater = box.height;

                box.velocity.y -= underWater/75;
                box.velocity.y *= .9;

            }

            if ( box.y + box.height >= this.cnv.height )  {
                box.y = this.cnv.height - box.height;

            }
            else box.y += box.velocity.y;

        }

    }

    static listeners() {

        window.addEventListener('resize', e => {
            this.cnv.width  = window.innerWidth;
            this.cnv.height = window.innerHeight;
        });

        this.cnv.addEventListener('click', e => {
            new Box(e.clientX - Box.width/2, e.clientY - Box.height/2);
        });

    }

}