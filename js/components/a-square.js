AFRAME.registerComponent('a-square', {
    schema: {
        width: {type: 'number', default: 1},
        height: {type: 'number', default: 1},
        color: {type: 'color', default: '#FFFFFF'},
        rotationAxis: {type: 'string', default: 'bottom'}
    },

    init: function () {
        var data = this.data;
        var el = this.el;

        // Red - X
        // Green - Y
        // Blue - Z
        const square = new THREE.Shape();
        square.moveTo(0, 0);

        let rotationAxis = data.rotationAxis
        if (rotationAxis === "top") {
            square.lineTo(data.width, 0);
            square.lineTo(data.width, -1 * data.height);
            square.lineTo(0, -1 * data.height);
        } else if (rotationAxis === "left") {
            square.lineTo(0, data.height);
            square.lineTo(data.width, data.height);
            square.lineTo(data.width, 0);
        } else if (rotationAxis === "right") {
            square.lineTo(0, data.height);
            square.lineTo(-1 * data.width, data.height);
            square.lineTo(-1 * data.width, 0);
        } else {
            square.lineTo(data.width, 0);
            square.lineTo(data.width, data.height);
            square.lineTo(0, data.height);
        }

        const extrudeSettings = {
            steps: 1,
            depth: 0.025,
            bevelEnabled: false
        };

        const geometry = new THREE.ExtrudeGeometry(square, extrudeSettings);
        // const material = new THREE.MeshBasicMaterial({color: 0x3333FF});
        const mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color: data.color}) );
        el.setObject3D('mesh', mesh);

    },
});
