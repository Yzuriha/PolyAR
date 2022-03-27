AFRAME.registerComponent('a-trap', {
    schema: {
        widthT: {type: 'number', default: 0.5},
        widthB: {type: 'number', default: 1},
        height: {type: 'number', default: 0.45},
        color: {type: 'color', default: '#FFFFFF'},
        rotationAxis: {type: 'string', default: 'bottom'},
        angle: {type: 'number', default: 29.02}
    },

    init: function () {
        this.degToRad = this.degToRad.bind(this);
        this.rotateX = this.rotateX.bind(this);
        this.rotateY = this.rotateY.bind(this);

        let data = this.data;
        let el = this.el;

        const square = new THREE.Shape();
        let rotationAxis = data.rotationAxis;

        let widthTNormL = data.widthT - ((data.widthB - data.widthT) / 2);
        let widthTNormR = ((data.widthB - data.widthT) / 2) + data.widthT;

        if (rotationAxis === "bottom") {
            square.moveTo(0, 0);
            square.lineTo(data.widthB, 0);
            square.lineTo(widthTNormR, data.height);
            square.lineTo(widthTNormL, data.height);
        } else if (rotationAxis === "left") {
            this.data.angle = 90 - this.data.angle;
            square.moveTo(0, 0);
            square.lineTo(this.rotateX(data.widthB, 0), this.rotateY(data.widthB, 0));
            square.lineTo(this.rotateX(widthTNormR, data.height), this.rotateY(widthTNormR, data.height));
            square.lineTo(this.rotateX(widthTNormL, data.height), this.rotateY(widthTNormL, data.height));
        } else if (rotationAxis === "top") {
            square.moveTo(widthTNormL, 0);
            square.lineTo(widthTNormR, 0);
            square.lineTo(data.widthB, data.height);
            square.lineTo(0, data.height);
        } else if (rotationAxis === "right") {
            this.data.angle = 90 + this.data.angle;
            square.moveTo(0, 0);
            square.lineTo(this.rotateX(-1 * data.widthB, 0), this.rotateY(-1 * data.widthB, 0));
            square.lineTo(this.rotateX(-1 * widthTNormR, data.height), this.rotateY(-1 * widthTNormR, data.height));
            square.lineTo(this.rotateX(-1 * widthTNormL, data.height), this.rotateY(-1 * widthTNormL, data.height));
        }


        const extrudeSettings = {
            steps: 1,
            depth: 0.01,
            bevelEnabled: false
        };

        const geometry = new THREE.ExtrudeGeometry(square, extrudeSettings);
        const mesh = new THREE.Mesh(geometry);

        el.setObject3D('mesh', mesh);
    },

    degToRad(angle) {
        return angle * (Math.PI / 180);
    },

    rotateX(x, y) {
        return x * Math.cos(this.degToRad(this.data.angle)) + y * Math.sin(this.degToRad(this.data.angle));
    },

    rotateY(x, y) {
        return -(x) * Math.sin(this.degToRad(this.data.angle)) + y * Math.cos(this.degToRad(this.data.angle));
    },
});