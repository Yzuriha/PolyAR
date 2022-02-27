AFRAME.registerComponent("got-clicked", {
    schema: {
        position: {default: ""},
        rotation: {default: ""},
        folded: {default: false}
    },
    init: function () {
        let ids = ["first", "second", "third", "fourth", "fifth", "sixth"]

        for (let i = 0; i < ids.length; i++) {
            let id = ids[i]
            let eventName = id + "-clicked"
            this.el.addEventListener(eventName, () => {
                let element = document.getElementById(id).object3D
                if(this.data.position) {
                    let position = this.data.folded ? element.position : this.data.position
                    let [pX, pY, pZ] = position.split(" ")
                    element.position.set(pX, pY, pZ)
                }
                if(this.data.rotation) {
                    // TODO Maybe not Hardcode the 0 0 0
                    let rotation = this.data.folded ? "0 0 0" : this.data.rotation
                    let [rX, rY, rZ] = rotation.split(" ")
                    element.rotation.set(THREE.Math.degToRad(rX), THREE.Math.degToRad(rY), THREE.Math.degToRad(rZ))
                }
                this.data.folded = !this.data.folded
            })
        }
    }
});
