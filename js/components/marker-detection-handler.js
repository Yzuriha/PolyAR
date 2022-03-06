AFRAME.registerComponent("marker-detection-handler", {
    init: function () {
        let informationText = document.querySelector(".instruction__text")
        this.el.addEventListener("markerFound", (e) => {
            console.log("MARKER FOUND");
            document.querySelector(".instruction__text").innerText = this.el.getAttribute("data-object-name")
        });

        this.el.addEventListener("markerLost", (e) => {
            console.log("MARKER LOST");
            document.querySelector(".instruction__text").innerText = ""
        });
    }
});