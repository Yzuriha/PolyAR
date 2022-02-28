/* global AFRAME, THREE */
// extended Code from https://github.com/fcor/arjs-gestures/blob/master/gesture-handler.js

AFRAME.registerComponent("gesture-handler", {
    schema: {
        enabled: {default: true},
        rotationFactor: {default: 5},
        minScale: {default: 0.3},
        maxScale: {default: 8},
    },

    init: function () {
        this.handleScale = this.handleScale.bind(this);
        this.handleRotation = this.handleRotation.bind(this);
        this.moveSomething = this.moveSomething.bind(this);

        this.isVisible = false;
        this.initialScale = this.el.object3D.scale.clone();
        this.scaleFactor = 1;

        this.el.sceneEl.addEventListener("markerFound", (e) => {
            this.isVisible = true;
            console.log("markerFound")
        });

        this.el.sceneEl.addEventListener("markerLost", (e) => {
            this.isVisible = false;
            console.log("markerLost")
        });
    },

    update: function () {
        if (this.data.enabled) {
            this.el.sceneEl.addEventListener("onefingermove", this.handleRotation);
            this.el.sceneEl.addEventListener("twofingermove", this.handleScale);
            this.el.sceneEl.addEventListener("onefingerstart", this.moveSomething);
        } else {
            this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
            this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
            this.el.sceneEl.removeEventListener("onefingerstart", this.moveSomething);
        }
    },

    remove: function () {
        this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
        this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
        this.el.sceneEl.removeEventListener("onefingerstart", this.moveSomething);
    },

    handleRotation: function (event) {
        if (this.isVisible) {
            this.el.object3D.rotation.y +=
                event.detail.positionChange.x * this.data.rotationFactor;
            this.el.object3D.rotation.x +=
                event.detail.positionChange.y * this.data.rotationFactor;
        }
    },

    handleScale: function (event) {
        if (this.isVisible) {
            this.scaleFactor *=
                1 + event.detail.spreadChange / event.detail.startSpread;

            this.scaleFactor = Math.min(
                Math.max(this.scaleFactor, this.data.minScale),
                this.data.maxScale
            );

            this.el.object3D.scale.x = this.scaleFactor * this.initialScale.x;
            this.el.object3D.scale.y = this.scaleFactor * this.initialScale.y;
            this.el.object3D.scale.z = this.scaleFactor * this.initialScale.z;
        }
    },

    moveSomething: function (event) {

        // console.log("MOVE", event)

        // console.log("CLICKED", event)

        if (this.isVisible) {
            // this.el.object3D.position.x =  this.el.object3D.position.x + 1;
            // this.el.object3D.scale.x = 1.1 * this.initialScale.x;
            // this.el.object3D.scale.y = 1.1 * this.initialScale.y;
            // this.el.object3D.scale.z = 1.1 * this.initialScale.z;
        }
    }
});
