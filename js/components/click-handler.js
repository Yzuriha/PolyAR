AFRAME.registerComponent("click-handler", {
    schema: {
        position: {default: ""},
        rotation: {default: ""},
        folded: {default: false},
        lastClicked: {default: 0}

    },
    init: function () {
        this.handleFold = this.handleFold.bind(this);

        this.el.addEventListener("click", this.handleFold);

        this.data.lastClicked = Date.now();
    },

    remove: function () {
        this.el.removeEventListener("click", this.handleFold);
    },

    handleFold: function (event) {
        // We don't want to fire the Events on the Parent
        event.stopPropagation();

        console.log("FOILD")

        // If the Element just has been clicked, it does not have to be clicked again
        if (Date.now() < this.data.lastClicked + 10) {
            return;
        }

        if (this.data.position) {
            this.el.setAttribute("animation", {
                property: "position",
                to: this.data.folded ? this.el.object3D.position : this.data.position,
                dur: 250
            });
        }
        if (this.data.rotation) {
            // TODO Maybe not Hardcode the 0 0 0
            this.el.setAttribute("animation", {
                property: "rotation",
                to: this.data.folded ? "0 0 0" : this.data.rotation,
                dur: 250
            });
        }

        this.data.folded = !this.data.folded;
        this.data.lastClicked = Date.now();
    }
});