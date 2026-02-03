let estado = 0; // 0: Cerrada, 1: Abierta, 2: Emocion, 3: Refugio, 4: Poder
let imgCasaCerrada, imgCasaAbierta, imgPoder, imgRefugio, imgFotoNina;
let sonidoAbrir, sonidoPapel, sonidoTe, sonidoPoder;
let cartas = [];
let elementosTe = [];
let texturaPoder;

function preload() {
  // --- REEMPLAZA LOS NOMBRES DE ARCHIVOS AQUÍ CON TUS ARCHIVOS REALES ---
  imgCasaCerrada = loadImage('casa_frontal.png'); 
  imgCasaAbierta = loadImage('casa_interior.png'); // Tu dibujo de las 3 zonas
  imgFotoNina = loadImage('foto_ninez.jpg'); // Tu foto de los 9/10 años
  imgPoder = loadImage('textura_poder.png'); // El boceto de la pag 5
  
  // Sonidos (Asegúrate de subirlos con estos nombres)
  // sonidoAbrir = loadSound('abrir.mp3');
  // sonidoTe = loadSound('te.mp3');
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-container');
  textAlign(CENTER, CENTER);
  
  // Inicializar cartas para "Emoción"
  for(let i=0; i<5; i++) {
    cartas.push({x: random(width*0.2, width*0.8), y: random(height*0.2, height*0.8), rot: random(-0.2, 0.2)});
  }
}

function draw() {
  background(255, 240, 245);
  
  if (estado === 0) {
    dibujarPantallaInicio();
  } else if (estado === 1) {
    dibujarMenuInterior();
  } else if (estado === 2) {
    dibujarEmocion();
  } else if (estado === 3) {
    dibujarRefugio();
  } else if (estado === 4) {
    dibujarPoder();
  }
}

// --- ESTADO 0: CASA CERRADA ---
function dibujarPantallaInicio() {
  imageMode(CENTER);
  image(imgCasaCerrada, width/2, height/2, 600, 450);
  
  // Botón "ábreme" 
  fill(139, 69, 19); // Marrón como tu boceto
  rectMode(CENTER);
  noStroke();
  rect(width/2, height/2 + 50, 120, 40, 10);
  fill(255);
  textSize(20);
  text("abreme", width/2, height/2 + 50);
}

// --- ESTADO 1: MENÚ INTERIOR ---
function dibujarMenuInterior() {
  image(imgCasaAbierta, width/2, height/2, width*0.8, height*0.8);
  textSize(30);
  fill(255, 20, 147);
  text("¿A DÓNDE QUIERES IR?", width/2, 50);
  
  // Áreas interactivas basadas en tus bocetos 
  dibujarBotonZona(width*0.25, height/2, "EMOCIÓN", 2);
  dibujarBotonZona(width*0.5, height/2, "REFUGIO", 3);
  dibujarBotonZona(width*0.75, height/2, "PODER", 4);
}

function dibujarBotonZona(x, y, label, targetEstado) {
  fill(255, 255, 255, 200);
  ellipse(x, y, 150, 150);
  fill(219, 112, 147);
  textSize(18);
  text(label, x, y);
}

// --- ESTADO 2: EMOCIÓN (Cartas) [cite: 38, 39] ---
function dibujarEmocion() {
  background(255);
  textSize(24);
  text("Cartas de/a mi yo de 10 años", width/2, 40);
  
  for (let c of cartas) {
    push();
    translate(c.x, c.y);
    rotate(c.rot);
    fill(255);
    stroke(255, 182, 193);
    rect(0, 0, 150, 100);
    fill(0);
    textSize(10);
    text("Querida yo...", 0, 0);
    pop();
  }
}

// --- ESTADO 3: REFUGIO (Tea Party) [cite: 46, 50] ---
function dibujarRefugio() {
  background(245, 245, 220);
  text("ARMA TU FIESTA DEL TÉ", width/2, 40);
  // Aquí puedes dibujar tu tetera "Indian Tea" [cite: 46]
  fill(255, 105, 180);
  ellipse(width/2, height/2, 200, 100); // Representación de la mesa
}

// --- ESTADO 4: PODER (Textura)  ---
function dibujarPoder() {
  // Efecto de revelar la foto de la niñez con la textura de poder
  image(imgFotoNina, width/2, height/2, width*0.5, (width*0.5 * imgFotoNina.height)/imgFotoNina.width);
  
  if (mouseIsPressed) {
    // Revelar "poder" a través del dibujo 
    noStroke();
    fill(144, 238, 144, 50); // Verde suave como tu boceto
    ellipse(mouseX, mouseY, 50, 50);
  }
}

// --- LÓGICA DE CLIC ---
function mousePressed() {
  if (estado === 0) {
    // Si hace clic en el área del botón "ábreme"
    if (dist(mouseX, mouseY, width/2, height/2 + 50) < 60) {
      estado = 1;
      document.getElementById('regresar').style.display = 'block';
    }
  } else if (estado === 1) {
    // Selección de habitaciones
    if (dist(mouseX, mouseY, width*0.25, height/2) < 75) estado = 2;
    if (dist(mouseX, mouseY, width*0.5, height/2) < 75) estado = 3;
    if (dist(mouseX, mouseY, width*0.75, height/2) < 75) estado = 4;
  }
}

function regresarAlMenu() {
  estado = 1;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}