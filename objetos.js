class Fila {
  constructor(y, altura) {
    this.y = y;
    this.altura = altura;
    this.columnas = [];
    
    // Crear las columnas para ocupar todo el ancho, incluyendo márgenes
    let numColumnas = int(random(5, 10));
    let x = margenX;
    let totalWidth = windowWidth - (numColumnas + 1) * margenX;
    let colAncho1 = totalWidth / (numColumnas + 0.5);
    let colAncho2 = totalWidth / (numColumnas + 0.5) * 1.5;
    for (let i = 0; i < numColumnas; i++) {
      let ancho = (i % 2 === 0) ? colAncho1 : colAncho2;
      let columna = new Columna(x, this.y, ancho, this.altura, i);
      this.columnas.push(columna);
      x += ancho + margenX;
     // x += (i > 0 ? (i % 2 === 0) ? colAncho1 + margenX * 6 : colAncho2 : colAncho1) + margenX;
    }
  }
  
  display() {
    let nuevaAltura;
    if (this.index % 2 === 0) {
      nuevaAltura = map(gestorAmp.filtrada, 0, 1, this.altura, 100); // Ajusta la altura de las filas pares 25,100
    } else {
      nuevaAltura = map(1-gestorAmp.filtrada, 0, 1, 125,this.altura); // Ajusta la altura de las filas impares 125,200
    }
    for (let columna of this.columnas) {
      push();
      rectMode(CENTER);
      translate(columna.ancho / 2, columna.altura / 2);
      columna.actualizarAltura(nuevaAltura);
      columna.display();
      pop();
    }
  }


actualizarAltura(nuevaAltura) {
  this.altura = nuevaAltura;
  for (let columna of this.columnas) {
    columna.actualizarAltura(nuevaAltura);
  }
}

}

class Columna {
  constructor(x, y, ancho, altura, index) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.altura = altura;
    this.index = index;
    this.numCeldas = floor(random(9,10));
    
    colorRandom = colorPaleta.darUnColor();
    this.tinte = colorRandom.hue;
    this.saturacion = colorRandom.saturation;
    this.brillo = colorRandom.brightness;

    this.celdas = [];

    let celdaAncho = this.ancho / this.numCeldas;
    for (let i = 0; i < this.numCeldas; i++) {
      let brillo = map(i, 0, this.brillo, 0, 100);
      this.celdas.push(new Celda(this.x + i * celdaAncho, this.y, celdaAncho, this.altura, this.color, brillo, this.tinte, this.saturacion, this.brillo));
    }
  }
  
  display() {
    for (let celda of this.celdas) {
      //let crece = (celda % 2 === 0) ? map(gestorAmp.filtrada, AMP_MIN, AMP_MAX, 0, height/2, 0, this.altura) : this.altura;
      celda.display();
    }
    //this.dibujarRect();
  }

  actualizarAltura(nuevaAltura) {
    this.altura = nuevaAltura;
    for (let celda of this.celdas) {
      celda.actualizarAltura(nuevaAltura);
    }
  }
  
  dibujarRect() {
    push();
    //fill(this.tinte, this.saturacion, map(sin((frameCount * this.velocidad + this.index) * 0.4), -1, 1, 100, 200));
    //fill(this.tinte, this.saturacion, map(sin((frameCount * 0.1 + this.index) * 0.4), -1, 5, 0, 255));
    fill(map(gestorAmp.filtrada, AMP_MIN, AMP_MAX, 0, height/4, 0, this.hue), this.saturacion, map(sin((frameCount * 0.1 + this.index) * 0.4), -1, 5, 0, 255));
    rect(this.x, this.y, this.ancho, this.altura);
    pop();
  }

}


class Celda {
  constructor(x, y, ancho, altura, color, brillo, tinte, saturacion, brilloOriginal) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.altura = altura;
    this.color = color;
    this.brillo = brillo;
    this.tinte = tinte;
    this.saturacion = saturacion;
    this.brilloOriginal = brilloOriginal;
  }
  
  display() {
    
    let c = color(this.tinte, map(sin((frameCount * 0.1 + this.x / this.ancho) * 0.4), -1, 5, 0, 255), map(gestorPitch.filtrada, 0.0, 1.0, 0, this.brilloOriginal));
    c = lerpColor(c, color(255), this.brillo / 100);
    fill(c);
    
    push();
    rectMode(CENTER);
    //fill(this.tinte, this.saturacion, map(sin((frameCount * 0.1 + this.index) * 0.4), -1, 5, 0, 255));
    rect(this.x, this.y, this.ancho, this.altura);
    pop();
  }

  actualizarAltura(nuevaAltura) {
    this.altura = nuevaAltura;
  }
}

function adjustRowHeights(amplitud) {
  // Mapea la frecuencia a un valor entre 100 y 200
  let nuevaAltura = map(amplitud, FREC_MIN, FREC_MAX, 100, 200);
  let y = margenY;
  for (let i = 0; i < filas.length; i++) {
    filas[i].actualizarAltura(nuevaAltura);
    filas[i].y = y;
    y += filas[i].altura + margenY;
  }
}


function marco() {
  push();
  rectMode(CENTER);
  fill(0, 0);
  strokeWeight(30);
  stroke(0);
     rect(displayWidth / 2, displayHeight / 2, displayWidth, displayHeight);
     pop();
}