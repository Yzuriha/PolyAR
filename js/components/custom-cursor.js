AFRAME.registerComponent('custom-cursor', {
    init: function () {
        setTimeout(() => {
            const scene = AFRAME.scenes[0];
            const mouseCursor = document.createElement('a-entity');
            mouseCursor.setAttribute('cursor', 'rayOrigin', 'mouse');
            mouseCursor.setAttribute('raycaster', 'objects', '.clickable');
            scene.appendChild(mouseCursor);
        }, 2000);
    },
});