

class Selector {

  //a simple slider style selection bar with modes to create selectors with numbers, drawings or images 
  position_number = 0;
  
  incrament_outputs = [];
  
  constructor(xpos, ypos, len, wid, incraments_no, labels_is_on, icon_set){
    this.xpos = xpos;
    this.ypos = ypos; 
    this.len = len;
    this.wid = wid;
    this.incraments_no = incraments_no;
    this.labels_is_on = labels_is_on;
    this.icon_set = icon_set;
    //new array(incraments_no); //number of incraments for the slider
    //let incrament_outputs []; //the lables for the incraments
    //let incrament_val = new Array(incraments_no);
    //let incrament_outputs = new Array(incraments_no);
    var handle_x = xpos;
    var handle_size = wid;
    //var position_number = 0;
  }

  display() {
    stroke(150);

    var incrament_length = len/(incraments_no-1);
    var x_incraments = xpos;
   
    line(xpos, ypos, xpos+len, ypos);
    for (var i=0; i < incraments_no; i++) {
      line(x_incraments, ypos, x_incraments, ypos+wid/2);
      textAlign(CENTER);
      textFont(futura);
      if (i == position_number) {
        textSize(45);
      } else {
        textSize(18);
      }
      if (labels_is_on == true) {
        text(incrament_outputs[i], x_incraments, ypos-5);
      }
      incrament_val[i] = x_incraments;
      x_incraments = x_incraments+incrament_length;
    }

    if (icon_set == 1) {
      rectMode(CENTER);
      fill(150);
      rect(xpos, ypos-20, 15, 15);
      strokeWeight(3);
      fill(255);
      rect(xpos+(len/(incraments_no-1)), ypos-20, 15, 15); 
      noStroke();
      fill(150);
      rect(xpos+(len/(incraments_no-1))*2, ypos-20, 15, 15, 5);
      stroke(150);
      strokeWeight(3);
      fill(255);
      rect(xpos+(len/(incraments_no-1))*3, ypos-20, 15, 15, 5);
    }

    if (icon_set == 2) {
      rectMode(CENTER);
      fill(150);
      ellipse(xpos, ypos-20, 15, 15);
      strokeWeight(3);
      fill(255);
      ellipse(xpos+len, ypos-20, 15, 15);
    }

    if (icon_set == 3) {
      rectMode(CENTER);
      fill(150);
      easy_triangle(xpos, ypos-20, 15, 15, 1);
      strokeWeight(3);
      fill(255);
      easy_triangle(xpos+len, ypos-20, 15, 15, 1);
    }
    if (icon_set == 4) {
      rectMode(CENTER);
      fill(150);
      image(numerals_icons_one, xpos-20, ypos-45);
      image(numerals_icons_two, (xpos-20)+(len/(incraments_no-1)), ypos-45);
      image(numerals_icons_three, (xpos-20)+((len/(incraments_no-1))*2), ypos-45);
    }
  }

  update() {

    if ((mouseX > xpos-wid) && (mouseX < xpos+(len+10)) && (mouseY > ypos-(wid*2)) && (mouseY < ypos+wid)) {
      fill(213, 104, 104);
      stroke(213, 104, 104);
      if (mousePressed) {
        for (var i= 0; i < incraments_no; i++) {
          if ((mouseX > incrament_val[i] - 5) && (mouseX < incrament_val[i] + 5)) {
            handle_x = incrament_val[i];
            position_number = i;
          }
        }
      }
    } else {
      stroke(150);
      fill(150);
    }
    triangle(handle_x, ypos, handle_x+10, ypos+wid, handle_x-10, ypos+wid); 
    //rect(handle_x, ypos, wid, wid);
  }
}
