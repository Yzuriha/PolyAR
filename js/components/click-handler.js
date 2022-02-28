AFRAME.registerComponent("click-handler", {
    schema: {
        position: {default: ""},
        rotation: {default: ""},
        folded: {default: false}
    },
    init: function () {
        let element = this.el.object3D
        this.el.addEventListener("click", (evt) => {
            console.log(evt)
            evt.stopPropagation();

            console.log("CLICKED", this.el)
            if (this.data.position) {
                let position = this.data.folded ? element.position : this.data.position
                let [pX, pY, pZ] = position.split(" ")
                element.position.set(pX, pY, pZ)
            }
            if (this.data.rotation) {
                // TODO Maybe not Hardcode the 0 0 0
                let rotation = this.data.folded ? "0 0 0" : this.data.rotation
                let [rX, rY, rZ] = rotation.split(" ")
                element.rotation.set(THREE.Math.degToRad(rX), THREE.Math.degToRad(rY), THREE.Math.degToRad(rZ))
            }
            this.data.folded = !this.data.folded
        })
    }
});