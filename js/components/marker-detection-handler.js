AFRAME.registerComponent("marker-detection-handler", {
    schema: {
        enableClicking: {default: true}
    },
    init: function () {
        let allClickableEntities = document.querySelectorAll(`[data-tag=${this.el.object3D.el.id}]`);

        this.el.addEventListener("markerFound", (e) => {

            // Check whether one marker is already displayed to disable the display of other markers
            if (document.getElementById("marker-active-checker").value === "true") {
                this.el.object3D.visible = false;
                return;
            }

            // When no marker was displayed yet, then change in input value to prevent more than one to be displayed
            document.getElementById("marker-active-checker").value = "true";

            if (this.data.enableClicking) {

                // Add the "clickable" Class so the Raycaster can fire Events on that object
                for (let i = 0; i < allClickableEntities.length; i++) {
                    allClickableEntities[i].classList.add("clickable");
                }

                // Set the Instruction Text to the Name of the Polyhedron
                document.querySelector(".instruction__text").innerText = this.el.getAttribute("data-object-name");
                // Fade in the name
                document.querySelector(".instruction__text").classList.remove("no-opacity");
            }
        });

        this.el.addEventListener("markerLost", (e) => {

            // When a marker has been lost, re-enable the ability for other markers to be displayed
            document.getElementById("marker-active-checker").value = "false";

            if (this.data.enableClicking) {
                // Remove the "clickable" Class so the Raycaster stops listening for Clicks, possibly interfering with other Entites
                for (let i = 0; i < allClickableEntities.length; i++) {
                    allClickableEntities[i].classList.remove("clickable");
                }

                // Fade Out the name
                document.querySelector(".instruction__text").classList.add("no-opacity");
            }
        });
    },
});