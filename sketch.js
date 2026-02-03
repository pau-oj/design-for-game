let fotoNina;
let coronaImg;
let misDibujos = []; // Aquí irán tus PNGs de cupcakes o muñecas

function preload() {
  fotoNina = loadImage('tu_foto_ninez.jpg'); // La foto que subiste
  coronaImg = loadImage('corona_dibujo.png'); // Tu dibujo a mano
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight * 0.7);
  canvas.parent('sketch-container');
  background(255, 240, 245); // Un rosa pastel inicial
  imageMode(CENTER);
}

function draw() {
  // 1. REVELAR EL MAPA: El usuario "pinta" la memoria
  if (mouseIsPressed) {
    // Revela fragmentos de la foto original
    let pix = fotoNina.get(mouseX, mouseY, 50, 50);
    image(pix, mouseX, mouseY);
    
    // 2. TEXTURA: Añade destellos rosas (tu esencia curiosa)
    noStroke();
    fill(255, 105, 180, 100);
    ellipse(mouseX + random(-15, 15), mouseY + random(-15, 15), random(5, 10));
  }

  // 3. VEHÍCULO: La corona sigue al mouse como un "escudo de poder"
  image(coronaImg, mouseX, mouseY, 60, 60);
}

// 4. SENSORIAL (AUDIO): Sonido al interactuar
function mousePressed() {
  // Si tienes un archivo de audio, actívalo aquí. 
  // Si no, puedes usar un oscilador de p5.js rápido:
  let osc = new p5.Oscillator('sine');
  osc.start();
  osc.freq(440);
  osc.amp(0.5, 0.1);
  osc.stop(0.2);
}