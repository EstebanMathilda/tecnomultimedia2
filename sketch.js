// Comisión de Matías - Joray (77302/9); Esteban (93509/6); Galasso (94698/3); Farías Jomñuk (86909/7).
// Video explicativo: https://youtu.be/i5E8lyjL_Lk

let monitorear = true;

let AMP_MIN = 0.02;
let AMP_MAX = 0.1;

let FREC_MIN = 20;
let FREC_MAX = 800;

let mic;
let pitch;
let audioContext;

let gestorAmp;
let gestorPitch;

let haySonido; // estado de cómo está el sonido en cada momento
let antesHabiaSonido; // moemoria del estado anterior del sonido

let estado = "inicio";
let columnas = [];

let cantidadFilas;
let cantidadColumnas;
let cantidadCeldas;

let totalCeldas;

let colorPaleta;
let colorRandom;

let imagenesPaleta = [];

let marca;

let filas = [];
let numFilas = 5;
let margen = 10;

const model_url =
  "https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/";

function preload() {
  let urls_img = [
    "paleta/paleta_1.png",
    "paleta/paleta_2.png",
    "paleta/paleta_3.png",
    "paleta/paleta_4.png",
  ];

  // Carga de las imágenes de trazos figura en el array imagen_paleta_fondo
  for (let i = 0; i < urls_img.length; i++) {
    loadImage(urls_img[i], (img) => {
      imagenesPaleta.push(img); // inicio la imagen cargada al array
    });
  }
}

function setup() {
  createCanvas(displayWidth, displayHeight);

  background(0);

  audioContext = getAudioContext(); // inicia el motor de audio
  mic = new p5.AudioIn(); // inicia el micrófono
  mic.start(startPitch); // se enciende el micrófono y le transmito el analisis de frecuencia (pitch) al micrófono. Conecto la libreria con el micrófono

  userStartAudio(); // por la dudas para forzar inicio de audio en algunos navegadores

  gestorAmp = new GestorSenial(AMP_MIN, AMP_MAX);
  gestorPitch = new GestorSenial(FREC_MIN, FREC_MAX);

  colorMode(HSB, 360, 100, 100, 1);
  colorPaleta = new paleta(imagenesPaleta);

  antesHabiaSonido = false;

  cantidadFilas = random(5, 11);
  cantidadColumnas = random(5, 7);
  cantidadCeldas = random(10, 12);

  // Crear las filas
  let y = margen;
  for (let i = 0; i < numFilas; i++) {
    let altura = i % 2 === 0 ? 100 : 200;
    let fila = new Fila(y, altura);
    filas.push(fila);
    y += altura + margen;
  }
}

function draw() {
  let vol = mic.getLevel(); // cargo en vol la amplitud del micrófono (señal cruda);
  gestorAmp.actualizar(vol);

  haySonido = gestorAmp.filtrada > 0.1; // umbral de ruido que define el estado haySonido

  let inicioElSonido = haySonido && !antesHabiaSonido; // evendo de INICIO de un sonido
  let finDelSonido = !haySonido && antesHabiaSonido; // evento de fIN de un sonido

  if (estado == "inicio") {
     // Dibujar las filas
     background(0);
     for (let fila of filas) {
      fila.display();
    }

    if (inicioElSonido) {
      
    }

    if (haySonido) {
      //Estado
      columnas[cantidadColumnas] = new Columna();
    }

    if (finDelSonido) {
      //Evento
      marca = millis();
    }
    if (!haySonido) {
      //Estado SILENCIO
      let ahora = millis();
    }
  }

  if (monitorear) {
    gestorAmp.dibujar(100, 100);
    gestorPitch.dibujar(500, 100);
  }

  printData();
  antesHabiaSonido = haySonido;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  filas = [];
  setup(); // Vuelve a crear las filas y columnas cuando se redimensiona la ventana
}

// ---- Debug ---
function printData() {
  //background(255);
  console.log(estado);
  console.log(gestorAmp.filtrada);
  console.log(gestorPitch.filtrada);
}

// ---- Pitch detection ---
function startPitch() {
  pitch = ml5.pitchDetection(model_url, audioContext, mic.stream, modelLoaded);
}

function modelLoaded() {
  getPitch();
}

function getPitch() {
  pitch.getPitch(function (err, frequency) {
    if (frequency) {
      gestorPitch.actualizar(frequency);
      //adjustRowHeights(gestorAmp.filtrada);
      //console.log(frequency);
    }
    getPitch();
  });
}
