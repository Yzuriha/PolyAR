// Component that detects and emits events for touch gestures
// https://github.com/fcor/arjs-gestures/blob/master/gesture-detector.js

AFRAME.registerComponent("gesture-detector", {
    schema: {
        element: {default: ""}
    },

    init: function () {
        this.targetElement =
            this.data.element && document.querySelector(this.data.element);

        if (!this.targetElement) {
            this.targetElement = this.el;
        }

        this.internalState = {
            previousState: null
        };

        this.emitGestureEvent = this.emitGestureEvent.bind(this);

        this.targetElement.addEventListener("touchstart", this.emitGestureEvent);

        this.targetElement.addEventListener("touchend", this.emitGestureEvent);

        this.targetElement.addEventListener("touchmove", this.emitGestureEvent);

        this.mouseCursor = document.getElementById("mouseCursor");
        this.testCube = document.getElementById("markerA");
        this.camera = document.getElementById("camera")

    },

    remove: function () {
        this.targetElement.removeEventListener("touchstart", this.emitGestureEvent);

        this.targetElement.removeEventListener("touchend", this.emitGestureEvent);

        this.targetElement.removeEventListener("touchmove", this.emitGestureEvent);
    },

    emitGestureEvent(event) {
        const currentState = this.getTouchState(event);

        const previousState = this.internalState.previousState;

        const gestureContinues =
            previousState &&
            currentState &&
            currentState.touchCount == previousState.touchCount;

        const gestureEnded = previousState && !gestureContinues;

        const gestureStarted = currentState && !gestureContinues;

        if (gestureEnded) {
            const eventName =
                this.getEventPrefix(previousState.touchCount) + "fingerend";

            this.el.emit(eventName, previousState);

            this.internalState.previousState = null;

            this.mouseCursor.object3D.visible = false

        }

        if (gestureStarted) {

            currentState.startTime = performance.now();

            currentState.startPosition = currentState.position;

            currentState.startSpread = currentState.spread;

            const eventName =
                this.getEventPrefix(currentState.touchCount) + "fingerstart";

            this.el.emit(eventName, currentState);

            this.internalState.previousState = currentState;

            this.mouseCursor.object3D.visible = true

            let canvas = this.el.canvas.getBoundingClientRect()
            console.log(canvas)
            // console.log(canvas)
            //
            // console.log("CURRENTSTATE", currentState.positionRaw)
            // console.log("CURRENTSTATE", currentState.startPosition)
            // // console.log("REAL", {})


            const pointer = new THREE.Vector2();
            const origi = new THREE.Vector3(0 , 0, 0)
            let caster = new THREE.Raycaster()
            console.log("CANVAS", canvas)
            pointer.x = ((currentState.positionRaw.x - canvas.left) / canvas.width) * 2 - 1
            pointer.y = -((currentState.positionRaw.y - canvas.top) / canvas.height) * 2 + 1
            console.log("POINTER", pointer)
            caster.setFromCamera(pointer, document.getElementById("camera").getObject3D("camera"))
            console.log("CAST", caster.ray.direction)

            this.mouseCursor.setAttribute('raycaster', {
                // origin: {
                //     x: currentState.startPosition.x - 0.5774099318403116,
                //     y: -1 * (currentState.startPosition.y - 0.42940603700097374)
                // },
                direction: new THREE.Vector3(currentState.startPosition.x, currentState.startPosition.x.y, this.testCube.object3D.position.z),
                origin: origi
            })

            let cursorIn3D = new THREE.Vector3(pointer.x, pointer.y, -1)
            console.log("CURSOR", cursorIn3D)

            console.log("DISTANCEZ", this.testCube.object3D.position.z)
            // Position
            // this.mouseCursor.object3D.position.x = (currentState.positionRaw.x / canvas.width) * 2 - 1
            // this.mouseCursor.object3D.position.y = -(currentState.positionRaw.y / canvas.height) * 2 + 1

            // this.mouseCursor.object3D.position.x = ((currentState.positionRaw.x / canvas.width) * 2 - 1)
            // this.mouseCursor.object3D.position.y = (-(currentState.positionRaw.y / canvas.height) * 2 + 1)




            // console.log("MOUSEPOSITION", {
            //     x: this.mouseCursor.object3D.position.x,
            //     y: this.mouseCursor.object3D.position.y
            // })
            //
            // console.log("TESTCUBE", this.testCube.object3D.position)
            // let depth = this.el.camera.position.distanceTo(this.testCube.object3D.position)
            // console.log("DISTANCE", this.el.camera.position.distanceTo(this.testCube.object3D.position))
            //
            //
            // console.log("WIDTH", this.visibleHeightAtZDepth(depth, this.el.camera))
            // console.log("HEiGHT", this.visibleWidthAtZDepth(depth, this.el.camera))


        }

        if (gestureContinues) {
            const eventDetail = {
                positionChange: {
                    x: currentState.position.x - previousState.position.x,

                    y: currentState.position.y - previousState.position.y
                }
            };

            if (currentState.spread) {
                eventDetail.spreadChange = currentState.spread - previousState.spread;
            }

            // Update state with new data

            Object.assign(previousState, currentState);

            // Add state data to event detail

            Object.assign(eventDetail, previousState);

            const eventName =
                this.getEventPrefix(currentState.touchCount) + "fingermove";
            this.el.emit(eventName, eventDetail);
        }
    },

    visibleHeightAtZDepth: function ( depth, camera )  {
        // compensate for cameras not positioned at z=0
        const cameraOffset = camera.position.z;
        if ( depth < cameraOffset ) depth -= cameraOffset;
        else depth += cameraOffset;

        // vertical fov in radians
        const vFOV = camera.fov * Math.PI / 180;

        // Math.abs to ensure the result is always positive
        return 2 * Math.tan( vFOV / 2 ) * Math.abs( depth );
    },

    visibleWidthAtZDepth: function ( depth, camera ) {
        const height = this.visibleHeightAtZDepth( depth, camera );
        return height * camera.aspect;
    },

    getTouchState: function (event) {
        if (event.touches.length === 0) {
            return null;
        }

        // Convert event.touches to an array so we can use reduce

        const touchList = [];

        for (let i = 0; i < event.touches.length; i++) {
            touchList.push(event.touches[i]);
        }

        const touchState = {
            touchCount: touchList.length
        };

        // Calculate center of all current touches

        const centerPositionRawX =
            touchList.reduce((sum, touch) => sum + touch.clientX, 0) /
            touchList.length;

        const centerPositionRawY =
            touchList.reduce((sum, touch) => sum + touch.clientY, 0) /
            touchList.length;

        touchState.positionRaw = {x: centerPositionRawX, y: centerPositionRawY};

        // Scale touch position and spread by average of window dimensions

        const screenScale = 2 / (window.innerWidth + window.innerHeight);

        touchState.position = {
            x: centerPositionRawX * screenScale,
            y: centerPositionRawY * screenScale
        };

        // Calculate average spread of touches from the center point

        if (touchList.length >= 2) {
            const spread =
                touchList.reduce((sum, touch) => {
                    return (
                        sum +
                        Math.sqrt(
                            Math.pow(centerPositionRawX - touch.clientX, 2) +
                            Math.pow(centerPositionRawY - touch.clientY, 2)
                        )
                    );
                }, 0) / touchList.length;

            touchState.spread = spread * screenScale;
        }

        return touchState;
    },

    getEventPrefix(touchCount) {
        const numberNames = ["one", "two", "three", "many"];

        return numberNames[Math.min(touchCount, 4) - 1];
    }
});