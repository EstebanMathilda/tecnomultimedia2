class Fila {
  constructor(y, altura) {
    this.y = y;
    this.altura = altura;
    this.columnas = [];
    
    // Crear las columnas para ocupar todo el ancho, incluyendo márgenes
    let numColumnas = int(random(5, 8));
    let x = margen;
    let totalWidth = windowWidth - (numColumnas + 1) * margen;
    let colAncho1 = totalWidth / (numColumnas + 0.5);
    let colAncho2 = totalWidth / (numColumnas + 0.5) * 1.5;
    for (let i = 0; i < numColumnas; i++) {
      let ancho = (i % 2 === 0) ? colAncho1 : colAncho2;
      let columna = new Columna(x, this.y, ancho, this.altura, i);
      this.columnas.push(columna);
      x += ancho + margen;
    }
  }
  
  display() {
    for (let columna of this.columnas) {
      columna.display();
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
    
    colorRandom = colorPaleta.darUnColor();
    this.tinte = colorRandom.hue;
    this.saturacion = colorRandom.saturation;
    this.brillo = colorRandom.brightness;

    this.celdas = [];

    let celdaAncho = this.ancho / 10;
    for (let i = 0; i < 10; i++) {
      //let brillo = map(i, 0, 9, 0, 255);
      this.celdas.push(new Celda(this.x + i * celdaAncho, this.y, celdaAncho, this.altura, this.color, this.brillo, this.tinte, this.saturacion, this.brillo));
    }

    this.desfase = random(-2.0, 2.0);
    this.velocidad = random(0.05, 0.15);
  }
  
  display() {
    this.dibujarRect();
    for (let celda of this.celdas) {
      //let crece = (celda % 2 === 0) ? map(gestorAmp.filtrada, AMP_MIN, AMP_MAX, 0, height/2, 0, this.altura) : this.altura;
      celda.display();
    }
  }

  actualizarAltura(nuevaAltura) {
    this.altura = nuevaAltura;
    for (let celda of this.celdas) {
      celda.actualizarAltura(nuevaAltura);
    }
  }
  
  dibujarRect() {
    fill(this.tinte, this.saturacion, map(sin((frameCount * 0.05 + this.index) * 0.4), -1, 1, 0, 255));
    rect(this.x, this.y, this.ancho, this.altura);
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
    /*
    let c = color(this.tinte, map(sin((frameCount * 0.1 + this.x / this.ancho) * 0.4), -1, 5, 0, 255), this.brilloOriginal);
    c = lerpColor(c, color(255), this.brillo / 255);
    fill(c);
    */
    push();
    //rectMode(CENTER);
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
  let y = margen;
  for (let i = 0; i < filas.length; i++) {
    filas[i].actualizarAltura(nuevaAltura);
    filas[i].y = y;
    y += filas[i].altura + margen;
  }
}


// map(gestorAmp.filtrada, AMP_MIN, AMP_MAX, 0, height/2, 0, this.altura)


/*
class Columna {
    constructor(paleta, cantidadCeldas, cantidadColumnas, totalCeldas){
        this.grosor = 1;
        this.tinte = colorRandom.hue;
        this.saturacion = colorRandom.saturation;
        this.brillo = colorRandom.brightness;
        this.cantidad = width / cantidadColumnas / cantidadCeldas;
        this.anchoAnt = 0;
        this.destello = floor(random(0,2));
    }

    dibujar(){
        push()
        //rectMode(CENTER);
        if (boolean(this.destello) == true) {
        for (let i = 0; i < cantidadCeldas; i++) {
            // new Celda (color, alto, ancho);
            strokeWeight( this.grosor);
            fill(this.tinte, map(sin((frameCount * 0.1 + i) * 0.4), -1, 5, 0, 255), this.brillo);
            rect(this.cantidad * i, 0, this.cantidad, mouseY);
          }
        
    } else if (this.destello == false){
      for (let i = 0; i < cantidadCeldas; i++) {
        // new Celda (color, alto, ancho);
        strokeWeight( this.grosor);
        fill(this.tinte, this.saturacion, map(sin((frameCount * 0.1 + i) * 0.4), -1, 5, 0, 255));
        rect(this.cantidad * i, 0, this.cantidad, mouseY);
      }
    }
    pop();
  }
  
}  */