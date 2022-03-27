AFRAME.registerComponent('a-six', {
    schema: {
        widthT: {type: 'number', default: 0.5},
        widthB: {type: 'number', default: 1},
        height: {type: 'number', default: 0.45},
        color: {type: 'color', default: '#FFFFFF'},
        rotationAxis: {type: 'string', default: 'bottom'},
    },

    init: function () {
        let data = this.data;
        let el = this.el;

        const square = new THREE.Shape();

        square.moveTo(0.25, 0);
        square.lineTo(0.75, 0);
        square.lineTo(1, 0.25 * Math.sqrt(3));
        square.lineTo(0.75,2 * (0.25 * Math.sqrt(3)));
        square.lineTo(0.25, 2 * (0.25 * Math.sqrt(3)));
        square.lineTo(0, 0.25 * Math.sqrt(3));

        const extrudeSettings = {
            steps: 1,
            depth: 0.01,
            bevelEnabled: false
        };

        const geometry = new THREE.ExtrudeGeometry(square, extrudeSettings);
        const mesh = new THREE.Mesh(geometry);

        el.setObject3D('mesh', mesh);
    },
});