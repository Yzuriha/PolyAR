AFRAME.registerComponent('a-square', {
    schema: {
        width: {type: 'number', default: 1},
        height: {type: 'number', default: 1},
        color: {type: 'color', default: '#FFFFFF'},
        event: {type: 'string', default: ''},
        message: {tyoe: 'string', default: ''}
    },

    init: function () {

        // this.el.addEventListener('click', function () {
        //     console.log(this.data.message)
        // });
    },

    /**
     * Update the mesh in response to property updates.
     */
    update: function (oldData) {
        var data = this.data;
        var el = this.el;

        const square = new THREE.Shape();

        square.moveTo(0, 0);
        square.lineTo(data.width, 0);
        square.lineTo(data.width, data.height);
        square.lineTo(0, data.height);

        const geometry = new THREE.ShapeGeometry(square);
        const material = new THREE.MeshBasicMaterial({color: data.color});
        const mesh = new THREE.Mesh(geometry, material);
        el.setObject3D('mesh', mesh);


        // el.addEventListener('click', function () {
        //     el.setAttribute('color', "#FF00FF");
        //     console.log("col")
        // });

        el.addEventListener('click', function () {
            console.log(data.message)
        });

    }
});