AFRAME.registerComponent('rescaler', {
    init: function () {

        this.camera = document.getElementById("camera")

        this.marker = this.el.parentNode;

        // this.el.sceneEl.addEventListener("markerFound", (e) => {
        //
        //     let aspectRatio = window.innerWidth / window.innerHeight;
        //     let canvas = document.body.getBoundingClientRect();
        //
        //     console.log("W", window.innerWidth);
        //     console.log("H", window.innerHeight);
        //     console.log("ASKEP", aspectRatio)
        //     console.log("C", canvas);
        //     if (aspectRatio > 1) {
        //         this.el.object3D.scale.y = 1.333333333;
        //     } else {
        //         this.el.object3D.scale.x = 1 / 1.333333333;
        //     }
        //
        // });

        this.el.sceneEl.addEventListener("markerLost", (e) => {
            // this.el.object3D.scale.x = 1;
            // this.el.object3D.scale.y = 1;
        });
    },
    tick: function () {

        // let currentRotation =THREE.Math.radToDeg(this.marker.object3D.rotation.x)
        // console.log("ROT1", currentRotation);
        // currentRotation = currentRotation > 90 ? (currentRotation / 2) - 90 : currentRotation
        // // console.log("ROT2", currentRotation);
        // let currentRotationRelative =  (currentRotation / 90)
        //
        // this.el.object3D.scale.y = 1 + 0.333333333 * currentRotationRelative


        //
        // let aspectRatio = window.innerWidth / window.innerHeight;
        // let aspectFromScale = aspectRatio - 1 //1.4444 = 100%
        //
        // let newAspectRatio = 1 + aspectFromScale * currentRotationRelative
        // if (aspectRatio > 1) {
        //     this.el.object3D.scale.y = newAspectRatio;
        // } else {
        //     this.el.object3D.scale.x = 1 / newAspectRatio;
        // }
        // console.log("rotationX",THREE.Math.radToDeg(this.marker.object3D.rotation.x));
        // console.log("rotationY",THREE.Math.radToDeg(this.marker.object3D.rotation.y));
        // if (rotation.y < 180) {
        //     // ...
        // }
    }
});

AFRAME.registerComponent('log', {
    init: function () {
        const scene = AFRAME.scenes[0];

        console.log("sc",scene);
        const mouseCursor = document.createElement('a-entity');
        mouseCursor.setAttribute('cursor', 'rayOrigin', 'mouse');
        scene.appendChild(mouseCursor);
    }
});