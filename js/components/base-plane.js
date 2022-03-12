AFRAME.registerComponent('base-plane', {
    init: function () {
        const INFORMATION_TEXT = document.querySelector(".information__text");

        this.el.addEventListener("click", () => {
            INFORMATION_TEXT.innerText = "Die Gründfläche kann nicht gefaltet werden.";
            INFORMATION_TEXT.classList.remove("no-opacity")
            setTimeout(() => {
                INFORMATION_TEXT.classList.add("no-opacity");
            }, 3000)
        })
    },
});