AFRAME.registerComponent("marker-detection-handler", {
    init: function () {
        this.el.addEventListener("markerFound", (e) => {
            console.log("MARKER FOUND");
        });

        this.el.addEventListener("markerLost", (e) => {
            console.log("MARKER LOST");
        });
    }
});