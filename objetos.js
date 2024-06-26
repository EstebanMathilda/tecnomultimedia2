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
      console.log(this.destello);
        background(0);
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
  
}

/*class Celda {
    constructor(x, y, width, maxHeight) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.maxHeight = maxHeight;
    }
  
    dibujar() {
      push();
      rectMode(CENTER);
      fill(map(gestorAmp.filtrada, AMP_MIN, AMP_MAX, 0, this.maxHeight), 100, map(sin((frameCount * 0.1 + this.x / this.width) * 0.4), -1, 5, 0, 255));
      rect(this.x, this.y, this.width, map(gestorAmp.filtrada, AMP_MIN, AMP_MAX, 0, this.maxHeight));
      pop();
    }
  }

  */