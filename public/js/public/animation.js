document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("errorCanvas");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas });

    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x333333);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    let loadedObject = null; // Variable pour stocker le modèle chargé

    const mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath('/models/');
    mtlLoader.load('MVR1272_LP_250K.mtl', (materials) => {
        console.log("MTL chargé", materials);
        materials.preload();

        const objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath('/models/');
        objLoader.load(
            'MVR1272_LP_250K.obj',
            (object) => {
                console.log("OBJ chargé", object);
                object.position.set(0, 0, 0);
                object.scale.set(500, 500, 500);
                loadedObject = object; // Stocke le modèle pour la rotation
                scene.add(object);
            },
            (xhr) => {
                console.log(`Progression du chargement OBJ : ${(xhr.loaded / xhr.total) * 100}%`);
            },
            (error) => {
                console.error("Erreur OBJ", error);
            }
        );
    }, (xhr) => {
        console.log(`Progression du chargement MTL : ${(xhr.loaded / xhr.total) * 100}%`);
    }, (error) => {
        console.error("Erreur MTL", error);
    });

    camera.position.set(0, 50, 200);

    function animate() {
        requestAnimationFrame(animate);

        // Rotation du modèle chargé
        if (loadedObject) {
            loadedObject.rotation.y += 0.01; // Fait tourner autour de l'axe Y
        }

        renderer.render(scene, camera);
    }

    animate();
});
