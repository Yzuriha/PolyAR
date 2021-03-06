AFRAME.registerComponent('a-four', {
    schema: {
        width: {type: 'number', default: 1},
        height: {type: 'number', default: 1},
        color: {type: 'color', default: '#FFFFFF'},
        rotationAxis: {type: 'string', default: 'bottom'},
    },

    init: function () {
        let data = this.data;
        let el = this.el;

        const square = new THREE.Shape();
        let rotationAxis = data.rotationAxis;

        square.moveTo(0, 0);
        square.lineTo(data.width, 0);
        square.lineTo(data.width, data.height);
        square.lineTo(0, data.height);

        const extrudeSettings = {
            steps: 1,
            depth: 0.01,
            bevelEnabled: false
        };

        const geometry = new THREE.ExtrudeGeometry(square, extrudeSettings);
        const mesh = new THREE.Mesh(geometry);

        if (rotationAxis === "top" || rotationAxis === "right") {
            mesh.rotation.z = THREE.Math.degToRad(180);
        }

        el.setObject3D('mesh', mesh);
    },
});