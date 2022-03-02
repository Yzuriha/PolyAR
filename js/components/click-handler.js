AFRAME.registerComponent("click-handler", {
    schema: {
        position: {default: ""},
        rotation: {default: ""},
        folded: {default: false}
    },
    init: function () {
        let element = this.el.object3D;
        this.el.addEventListener("click", (evt) => {
            // We do not Bubble up the Event to their Parent
            evt.stopPropagation();

            if (this.data.position) {
                this.el.setAttribute("animation", {
                    property: "position",
                    to: this.data.folded ? element.position : this.data.position,
                    dur: 250
                });
            }
            if (this.data.rotation) {
                // TODO Maybe not Hardcode the 0 0 0
                console.log("ROTATE");
                this.el.setAttribute("animation", {
                    property: "rotation",
                    to: this.data.folded ? "0 0 0" : this.data.rotation,
                    dur: 250
                });
            }

            this.data.folded = !this.data.folded;
        });
    }
});