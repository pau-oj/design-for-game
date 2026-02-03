let fotoNina;
let corona;

function preload() {
    fotoNina = loadImage('tu_foto.jpg'); // Asegúrate de que el nombre sea igual
    corona = loadImage('corona_dibujo.png'); // Tu dibujo sin fondo
}

function setup() {
    // Esto hace que el mapa se meta dentro del contenedor HTML
    let canvas = createCanvas(windowWidth, windowHeight * 0.7);
    canvas.parent('sketch-container');
    background(255);
}

function draw() {
    // Efecto de rastro para revelar la foto
    if (mouseIsPressed) {
        tint(255, 50);
        imageMode(CENTER);
        image(fotoNina, width/2, height/2);
        
        // Dibujamos destellos
        fill(255, 105, 180, 150);
        noStroke();
        ellipse(mouseX + random(-20, 20), mouseY + random(-20, 20), random(5, 15));
    }

    // El cursor es tu corona dibujada
    image(corona, mouseX, mouseY, 80, 80);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight * 0.7);
}