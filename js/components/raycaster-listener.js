AFRAME.registerComponent('raycaster-listener', {
    schema: {
        doUpdate: {type: 'string', default: ''}
    },

    init: function () {
        // Use events to figure out what raycaster is listening so we don't have to
        // hardcode the raycaster.
        this.el.addEventListener('raycaster-intersected', evt => {
            console.log("intersect")
            this.raycaster = evt.detail.el;
        });
        this.el.addEventListener('raycaster-intersected-cleared', evt => {
            // this.raycaster = null;
        });

        this.mouseCursor = document.getElementById("mouseCursor");
    },

    tick: function () {
        if (!this.raycaster) {
            return;
        }  // Not intersecting.


        let intersection = this.raycaster.components.raycaster.getIntersection(this.el);

        if (!intersection) {
            return;
        }

        console.log("intersection", intersection.object.el.id);
    }
});

