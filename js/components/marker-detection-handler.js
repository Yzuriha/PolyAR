AFRAME.registerComponent("marker-detection-handler", {
    init: function () {
        let allClickableEntities = document.querySelectorAll(`[data-tag=${ this.el.object3D.el.id}]`)

        this.el.addEventListener("markerFound", (e) => {
            // Add the "clickable" Class so the Raycaster can fire Events on that object
            for (let i = 0; i < allClickableEntities.length; i++) {
                allClickableEntities[i].classList.add("clickable")
            }

            // Set the Instruction Text to the Name of the Polyhedron
            document.querySelector(".instruction__text").innerText = this.el.getAttribute("data-object-name")
        });

        this.el.addEventListener("markerLost", (e) => {
            // Remove the "clickable" Class so the Raycaster stops listening for Clicks, possibly interfering with other Entites
            for (let i = 0; i < allClickableEntities.length; i++) {
                allClickableEntities[i].classList.remove("clickable")
            }

            // Remove the Text when Marker is list
            document.querySelector(".instruction__text").innerText = ""
        });
    },
});