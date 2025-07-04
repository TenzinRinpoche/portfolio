class OrbitingBody {
    constructor({ radius = 0.1, orbitradius = 5, angle = 0 }) {
        this.radius = radius;
        this.orbitradius = orbitradius;
        this.angle = angle;

        const geometry = new THREE.SphereGeometry(radius, 32, 32);
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        this.mesh = new THREE.Mesh(geometry, material);
    }
}