AFRAME.registerComponent('custom-cursor', {
    init: function () {

        this.el.addEventListener("cameraready", () => {
            console.log("cameraready");
            const scene = AFRAME.scenes[0];

            const mouseCursor = document.createElement('a-entity');
            mouseCursor.setAttribute('cursor', 'rayOrigin', 'mouse');
            mouseCursor.setAttribute('raycaster', 'objects', '.clickable');
            scene.appendChild(mouseCursor);
            console.log("new cursr");
        });


        // setTimeout(() => {
        //     const scene = AFRAME.scenes[0];
        //
        //     const mouseCursor = document.createElement('a-entity');
        //     mouseCursor.setAttribute('cursor', 'rayOrigin', 'mouse');
        //     mouseCursor.setAttribute('raycaster', 'objects', '.clickable');
        //     scene.appendChild(mouseCursor);
        //     console.log("new cursr");
        // }, 2000);
    },

});