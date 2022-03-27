AFRAME.registerComponent('a-three', {
    schema: {
        widthT: {type: 'number', default: 0.5},
        widthB: {type: 'number', default: 1},
        height: {type: 'number', default: 0.866},
        color: {type: 'color', default: '#FFFFFF'},
        rotationAxis: {type: 'string', default: 'bottom'},
        angle: {type: 'number', default: 73.868}
    },

    init: function () {
        this.degToRad = this.degToRad.bind(this);
        this.rotateX = this.rotateX.bind(this);
        this.rotateY = this.rotateY.bind(this);

        let data = this.data;
        let el = this.el;

        const square = new THREE.Shape();

        square.moveTo(0, 0);
        square.lineTo(data.widthT * 2, 0);
        square.lineTo(data.widthT, Math.sqrt(-1 * Math.pow(data.widthT, 2) + Math.pow(data.widthB, 2)));


        const extrudeSettings = {
            steps: 1,
            depth: 0.01,
            bevelEnabled: false
        };

        const geometry = new THREE.ExtrudeGeometry(square, extrudeSettings);
        const mesh = new THREE.Mesh(geometry);

        if (data.rotationAxis === "left") {
            mesh.rotation.z = THREE.Math.degToRad(-72.898);
        }
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