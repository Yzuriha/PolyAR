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
            this.raycaster = null;
        });

        this.mouseCursor = document.getElementById("mouseCursor");

        this.delayDone = false;

        // console.log(this.el.sceneEl.canvas.getBoundingClientRect())
    },

    tick: function () {
        if (!this.raycaster) {
            return;
        }  // Not intersecting.

        let intersection = this.raycaster.components.raycaster.getIntersection(this.el);

        if (!intersection) {
            return;
        }

        if (this.mouseCursor.object3D.visible) {
            console.log("intersetcion", this.raycaster.components.raycaster.getIntersection(this.el).point)

            // console.log("intersection", intersection.object.el.id);
            let eventName = intersection.object.el.id + "-clicked"
            this.el.emit(eventName)
            // After 1 Tick was registred, it means a Click was done, meaning the Detection should be deactivated again
            // or else it will keep firing the Event multiple times
            this.mouseCursor.object3D.visible = false
        }
    }
});

