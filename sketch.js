//PARA DIAL
//Software to design watch dials parametrically
//Martyn Dade-Robertson 2023

 var dialSize = 28.5; //dial size in mm
 var scalar = 10; //scale amount to visualise on the screen
 var dialXPos = 600;
 var dialYPos = 300;
 var numberOfTracks = 20;
 var selectedTrackNumber = 1000;
 let renderBuffer;
 let render = false;


 function preload() {
  cross_icon = loadImage('data/Close.png');
  battons_icon = loadImage('data/Mode_1_Batton.png');
  circles_icon = loadImage('data/Mode_2_Circle.png');
  numerals_icon = loadImage('data/Mode_3_Numerals.png');
  triangles_icon = loadImage('data/Mode_4_Triangle.png');
  lines_icon = loadImage('data/Mode_5_Line.png');
  dial_text_icon = loadImage('data/Text_Icon.png');

  numeral_t1_icon = loadImage('data/Numeral_Icon_1.png');
  numeral_t2_icon = loadImage('data/Numeral_Icon_2.png');
  numeral_t3_icon = loadImage('data/Numeral_Icon_3.png');
  on_icon = loadImage('data/On_Button.png');

  four_icon = loadImage('data/Number_4_Icon.png');
  twelve_icon = loadImage('data/Number_12_Icon.png');
  twenty_four_icon = loadImage('data/Number_24_Icon.png');
  sixty_icon = loadImage('data/Number_60_Icon.png');
  three_hundred_icon = loadImage('data/Number_300_Icon.png');

  line_icon = loadImage('data/Line_Icon.png');
  fill_icon = loadImage('data/Fill_Icon.png');
  white_fill_icon = loadImage('data/White_Fill_Icon.png');
  black_fill_icon = loadImage('data/Black_Fill_Icon.png');

  test_hour_hand = loadImage('watch_hands/test_hour_hand.png');
  test_min_hand = loadImage('watch_hands/test_min_hand.png');
  test_sec_hand = loadImage('watch_hands/test_second_hand.png');

  hands_icon_1 = loadImage('data/Hands_Preview_Icon.png');
  hands_icon_2 = loadImage('data/Editable_Hands_Icon.png');
  guides_icon = loadImage('data/Guides_Icon.png');

  big_export_icon = loadImage('data/Export_Big.png'); 
  small_export_icon = loadImage('data/Export_Small.png');
  parametric_logo = loadImage('data/Parametric_Logo_Trans.png');
  date_window_icon = loadImage('data/Date_Window_Icon.png');
  hands_guides_icon = loadImage('data/Hands_Guides_Icon.png');

 

  fonts = [];
  
  number_of_fonts = 27;
  fonts[0] = loadFont('fonts/DMSans-Regular.ttf');
  fonts[1] = loadFont('fonts/IBMPlexSans-Regular.ttf');
  fonts[2] = loadFont('fonts/SpaceGrotesk[wght].ttf'); 
  fonts[3] = loadFont('fonts/Cormorant[wght].ttf');
  fonts[4] = loadFont('fonts/FiraSans-Regular.ttf');
  fonts[5] = loadFont('fonts/FiraSansCondensed-Thin.ttf');
  fonts[6] = loadFont('fonts/Syne[wght].ttf');
  fonts[7] = loadFont('fonts/Eczar[wght].ttf');
  fonts[8] = loadFont('fonts/WorkSans[wght].ttf');
  fonts[9] = loadFont('fonts/LibreFranklin[wght].ttf');
  fonts[10] = loadFont('fonts/Roboto[wdth,wght].ttf');
  fonts[11] = loadFont('fonts/RobotoSlab[wght].ttf');
  fonts[12] = loadFont('fonts/BioRhyme-Regular.ttf');
  fonts[13] = loadFont('fonts/ArchivoNarrow[wght].ttf');
  fonts[14] = loadFont('fonts/PlayfairDisplay[wght].ttf');
  fonts[15] = loadFont('fonts/SourceSansPro-Regular.ttf');
  fonts[16] = loadFont('fonts/Poppins-Regular.ttf');
  fonts[17] = loadFont('fonts/SairaStencilOne-Regular.ttf');
  fonts[18] = loadFont('fonts/LibreBaskerville-Regular.ttf');
  fonts[19] = loadFont('fonts/Alegreya[wght].ttf');
  fonts[20] = loadFont('fonts/AlegreyaSans-Regular.ttf');
  fonts[21] = loadFont('fonts/Karla[wght].ttf');
  fonts[22] = loadFont('fonts/Lora[wght].ttf');
  fonts[23] = loadFont('fonts/Raleway[wght].ttf');
  fonts[24] = loadFont('fonts/Rubik[wght].ttf');
  fonts[25] = loadFont('fonts/Chivo[wght].ttf');
  fonts[26] = loadFont('fonts/Spectral-Medium.ttf');

}

function setup() {
  createCanvas(1400, 750);
  tracks = [];

  for(var i = 0; i < numberOfTracks; i++){
    tracks[i] = new Track(dialXPos,dialYPos, 20, 700-(i*30), 12);
  }


  //test_track = new Track(dialXPos,dialYPos, 12);
  scale_bar = new Slider(550,680,100,20,"Horizontal", 5, 18, 18, "simple_line", "Scale")

  
  //GUIDES AND HANDS BUTTONS AND EDITOR
  
  
  var leftAlignGuide = 275;
  var spacing = 30;
  var topAlignGuide = 550;


  export_big_button = new Button(leftAlignGuide,20,25,big_export_icon,"icon", "Export Print");
  export_small_button = new Button(leftAlignGuide, 50 ,25, small_export_icon, "icon", "Export Preview");
  
  guides_button = new Button(leftAlignGuide,100, 25,guides_icon, "icon", "Turn on Guides");
  date_window_button = new Button(leftAlignGuide,130, 25, date_window_icon, "icon", "Date Window");


  hands_editor_button = new Button(leftAlignGuide,190, 25, hands_icon_2, "icon", "Hand Guides");
  show_hands_button = new Button(leftAlignGuide,220, 25, hands_icon_1, "icon", "Preview Hands");
  hands_guides_button = new Button(leftAlignGuide,250, 25, hands_guides_icon, "icon", "Edit Hands");
  
  handsEditor = new Hands_Editor(50,300,150, leftAlignGuide+2, 280);


 
  
  handsEditor.secHandOn.isOn = true;
  handsEditor.minHandOn.isOn = true;
  handsEditor.hourHandOn.isOn = true;

  //CHANGE HAND POSITION EDITORS

}

function draw() {
  background(237, 239, 230);
  fill(10,10,10);
  noStroke;
  circle(dialXPos, dialYPos, (dialSize*scalar));
  noStroke();
  fill(227, 229, 220);
  rect(1000,0,400,750);
  rect(0,0, 250, 800);
  for(var i = 0; i < numberOfTracks; i++){
    tracks[i].display();
    tracks[i].drawDial();

  }
  renderCanvas();
  lowResRender();
  image(parametric_logo, 0,0,100,100);
  noStroke();
  fill(0);
  textAlign(LEFT, TOP);
  textSize(15);
  textFont(fonts[0]);
  text("PARAMETRIC WATCHES", 20, 20);
  text("ParaDial v.0.1 (Alpha)", 20, 40);
  text("Release Date: 10.09.2023", 20, 60);

  //textSize(12);
  //text("Export Hi-Res to Print", 305, 25);
  //text("Export Low-Res Preview", 305, 55);
  
function renderCanvas(){
  if(export_big_button.isOn == true){
  createCanvas(4000, 4000);
  scalar = 125;
  for(var i = 0; i < numberOfTracks; i++){
    tracks[i].xpos = 2000;
    tracks[i].ypos = 2000;
    tracks[i].editable.isOn = false;
    tracks[i].drawDial();
  }
  saveCanvas("High_Res_Print", "png");
    render=false;
    createCanvas(1400, 750);
    for(var i = 0; i < numberOfTracks; i++){
      tracks[i].xpos = 600;
      tracks[i].ypos = 300;
    }
    scalar = 10;
    export_big_button.isOn = false;
    //noLoop();
  }
}

function lowResRender(){
  if(export_small_button.isOn == true){
  createCanvas(1080, 1080);
  scalar = 30;
  fill(0);
  noStroke();
  circle(540, 540, 28.5*scalar, 28.5*scalar);
  image(parametric_logo, 0,30,200,200);
  textSize(20);
  textAlign(LEFT, TOP);
  strokeWeight(1);
  stroke(0);
  text("PARAMETRIC WATCHES", 10, 10);
  noStroke();
  text("ParaDial V.0.1 (Alpha)", 10, 30);
  text("Dial Design", 10, 50);
  text(day(), 10, 70); text(month(), 40, 70); text(year(), 70, 70); 
  text("Dial Size: 28.5mm", 10, 90);
  text("https://martyndr.github.io/ParaDial/", 10,110);

  for(var i = 0; i < numberOfTracks; i++){
    tracks[i].xpos = 540;
    tracks[i].ypos = 540;
    tracks[i].editable.isOn = false;
    tracks[i].drawDial();
  }
  saveCanvas("Low_Res_Preview", "png");
    render=false;
    createCanvas(1400, 750);
    for(var i = 0; i < numberOfTracks; i++){
      tracks[i].xpos = 600;
      tracks[i].ypos = 300;
    }
    scalar = 10;
    export_small_button.isOn = false;
    //noLoop();
  }
}



  scale_bar.display();
  scale_bar.interact();
  scale_bar.handleDrag();
  scale_bar.valueReturn();

  scalar = scale_bar.outputValue;

  handsEditor.display();

  //HANDS AND GUIDE BUTTON FUNCTIONS
  guides_button.display(); 
  show_hands_button.display(); 
  hands_editor_button.display();
  export_big_button.display();
  export_small_button.display();
  date_window_button.display();
  hands_guides_button.display();


  guides_button.interact(); 
  show_hands_button.interact(); 
  hands_editor_button.interact();
  export_big_button.interact();
  export_small_button.interact();
  date_window_button.interact();
  hands_guides_button.interact();



  textSize(14);
  textAlign(LEFT, CENTER);
  noStroke();
  fill(0);
  //text("Guides", 300, 535);
  //text("Handsets", 400, 535);

  //checks to make sure only one track is editable at the time
  for(var i = 0; i < numberOfTracks; i++){
    if(i !== selectedTrackNumber){
      tracks[i].editable.isOn = false;
    }

  }


  /////////////////////////////GUIDELINES/////////////////////////
if(guides_button.isOn == true){
  stroke(100);
  strokeWeight(1);
  line(dialXPos-(dialSize/2*scalar), dialYPos, dialXPos+(dialSize/2*scalar), dialYPos);
  line(dialXPos, dialYPos-(dialSize/2*scalar), dialXPos, dialYPos+(dialSize/2*scalar));
}
  

///Displaying the data window guide


//displaying the hand position guide
if(hands_guides_button.isOn == true){
  stroke(100);
  noFill();
if(handsEditor.secHandOn.isOn == true){
  circle(dialXPos, dialYPos, handsEditor.secHandLengthSlider.outputValue*scalar*2);
  }
  if(handsEditor.minHandOn.isOn == true){
  circle(dialXPos, dialYPos, handsEditor.minHandLengthSlider.outputValue*scalar*2);
 }
 if(handsEditor.hourHandOn.isOn == true){
  circle(dialXPos, dialYPos, handsEditor.hourHandLengthSlider.outputValue*scalar*2);
  }
  if(handsEditor.gmtHandOn.isOn == true){
  circle(dialXPos, dialYPos, handsEditor.gmtHandLengthSlider.outputValue*scalar*2);
  }
}

if(date_window_button.isOn == true){
  noFill();
  stroke(100);
  push();
  translate(dialXPos, dialYPos);
  translate(10.55*scalar, 0);
  var dateWidth = 2.9*scalar;
  var dateHeight = 2*scalar;
  rect(0-(dateWidth/2),0-(dateHeight/2), dateWidth, dateHeight);
  pop();
}

if(hands_editor_button.isOn == true){
  displayEditableHands();
  }
if(show_hands_button.isOn == true){
    displayHands();
    }

////////////////////////////////////////SCREEN TITLES///////////////////////////////////
 fill(0,0,0);
 textFont(fonts[0]);
 textAlign(LEFT, TOP);
 fill(167, 169, 160);
  rect(15,100,220,20);
  textSize(15);
  noStroke();
  fill(0);
  text("TRACKS",20,100);
  textAlign(RIGHT, TOP);
  stroke(10*scalar);
  strokeWeight(0.1*scalar);
  circle(dialXPos, dialYPos, 1*scalar);
  stroke(255);
  strokeWeight(1);
  fill(237, 239, 230);
  circle(dialXPos, dialYPos, 1*scalar); 

}

function mousePressed() {
  //test_track.onClick();
  for(var i = 0; i < numberOfTracks; i++){
    tracks[i].onClick();
    if(tracks[i].editable.rolledOver == true){
      (selectedTrackNumber = i);
      console.log(selectedTrackNumber);
    }
  }

  guides_button.onClick(); 
  show_hands_button.onClick(); 
  hands_editor_button.onClick();
  handsEditor.onClick();
  export_big_button.onClick();
  export_small_button.onClick();
  date_window_button.onClick();
  hands_guides_button.onClick();

}


function keyPressed(){
  if(keyCode === RIGHT_ARROW){
    render = true;
  }

  for(var i = 0; i < numberOfTracks; i++){
    tracks[i].keyPressed();
    tracks[i].keyInput();
  }

 //test_track.keyPressed();
 //test_track.keyInput();

}


//////////////////////////////////DISPLAY HANDS FUNCTION////////////////////////////////
function displayHands(){
push();
translate(600, 300);
rotate(radians(handsEditor.hourHandSet.outputValue+180));
image(test_hour_hand,0-40*(scalar/20),0-285*(scalar/20), 80*(scalar/20), 400*(scalar/20));
pop();
push();
translate(600, 300);
rotate(radians(handsEditor.minHandSet.outputValue+180));
image(test_min_hand,0-40*(scalar/20),0-285*(scalar/20), 80*(scalar/20), 400*(scalar/20));
pop();
push();
translate(600, 300);
rotate(radians(handsEditor.secondHandSet.outputValue+180));
image(test_sec_hand,0-40*(scalar/20),0-285*(scalar/20), 80*(scalar/20), 400*(scalar/20));
pop();
}
/////////////////////////////////DISPLAY EDITABLE HANDS///////////////////////////////////
function displayEditableHands(){
  
  noStroke();
  fill(100);

  push();
  translate(600, 300);
  rotate(radians(handsEditor.secondHandSet.outputValue));
  var width = 3;
  //seconds hand
  if(handsEditor.secHandOn.isOn == true){
  rect(0-width/2,0,width,handsEditor.secHandLengthSlider.outputValue*scalar,10);
  }
  pop();

  push();
  translate(600, 300);
  rotate(radians(handsEditor.minHandSet.outputValue));
  width = 8;
  //min hand
  if(handsEditor.minHandOn.isOn == true){
  rect(0-width/2,0,width,handsEditor.minHandLengthSlider.outputValue*scalar,10);
  }
  pop();

  push();
  translate(600, 300);
  rotate(radians(handsEditor.hourHandSet.outputValue));
  //hour hand
  width = 12;
  if(handsEditor.hourHandOn.isOn == true){
  rect(0-width/2,0,width,handsEditor.hourHandLengthSlider.outputValue*scalar,10);
  }
  pop();

  push();
  translate(600, 300);
  rotate(radians(handsEditor.gmtHandSet.outputValue));
  //GMT Hand
  width = 3;
  if(handsEditor.gmtHandOn.isOn == true){
  rect(0-width/2,0,width, handsEditor.gmtHandLengthSlider.outputValue*scalar,10);
  triangle(0,handsEditor.gmtHandLengthSlider.outputValue*scalar,+20,handsEditor.gmtHandLengthSlider.outputValue*scalar-30,-20,handsEditor.gmtHandLengthSlider.outputValue*scalar-30);
  }
  pop();

} 

//////////////////////////////////////CLASS BUTTON//////////////////////////////////////
class Button {

  constructor(xpos, ypos, size, img, type, tooltip) {
    this.xpos = xpos; //xposition
    this.ypos = ypos; //yposition
    this.size = size; //size in x and y
    this.isVis = true; //sets if the icon is visible
    this.cornerCurve = 0;//chamfer on teh button icon
    this.rolledOver = false;
    this.isOn = false;
    this.newClick = false;//is used to turn on temp. to show that this is the latest clicked button
    this.img = img; //holds the name for the image used in the marker
    this.type = type;//retuns a radio button type or icon
    this.boarderThickness = 2;
    this.is_editable = false;
    this.label = "New Font";
    this.wid = size;
    this.fontSize = 15;
    this.toolTip = tooltip;
    
  }
  interact() {
    //Mouse rolledOver event to detect when the mouse is over the button
    if ((mouseX > this.xpos) && (mouseX < this.xpos + this.wid) && (mouseY > this.ypos) && (mouseY < this.ypos + this.size)) {
      this.rolledOver = true;
    } else {
      this.rolledOver = false;
    }
    if(this.rolledOver == true){
      fill(0);
      noStroke();
      textSize(10);
      textFont(fonts[0]);
      textAlign(LEFT, CENTER)
      text(this.toolTip, this.xpos+this.size+2, this.ypos);
    }
  
  }
  

  //defines the mouse pressed event - should be placed in the KeyPressed event in the main code   
  onClick() {
   //console.log("Clicked");
   if ((this.isOn == true) && (this.rolledOver == true)&& (this.isVis == true)) {
      this.isOn = false;
      
    } else {
     if ((this.isOn == false) && (this.rolledOver == true)&& (this.isVis == true)) {
       this.isOn = true;
       this.newClick = true;
      }
   }
 }

  display() {
    strokeWeight(this.boarderThickness);
    //sets the rollover colour for the button
    if (this.isVis == true){
      if (this.rolledOver == true) {
      fill(255, 0, 0);
      } else {
      fill(255, 255, 255);
      }
    //set the visble icon when the icon is visible
      if (this.isOn == true) {
       stroke(0, 255, 0);
       } else {
       stroke(0, 0, 0);
    } 

    if(this.type == "icon"){
      rect(this.xpos, this.ypos, this.size, this.size, this.cornerCurve);
      image(this.img, this.xpos, this.ypos, this.size,this.size);
      }

    if(this.type == "labelled_icon"){
        strokeWeight(1);
        rect(this.xpos, this.ypos, this.size, this.size, this.cornerCurve);
        textSize(this.fontSize);
        if(this.isOn == true){
          fill(0,255,0);
        }else{
          fill(0,0,0);
        }
        //fill(0,0,0);
        noStroke();
        textAlign(CENTER, CENTER);
        text(this.label,this.xpos+(this.size/2),this.ypos+(this.size/2));
   
        }

    if(this.type == "radio"){
      if(this.isOn == true){
        fill(0,255,0);
      }else{
        fill(255);
      }
      circle(this.xpos+(this.size/2),this.ypos+(this.size/2), this.size);
      }

      if(this.type == "open_radio"){
        if(this.isOn == true){
          fill(0,255,0);
        }else{
          fill(10);
        }
        circle(this.xpos+(this.size/2),this.ypos+(this.size/2), this.size);
        noStroke();
        fill(255);
        triangle(this.xpos+4, this.ypos+4,this.xpos+(this.size)-4, this.ypos+4, this.xpos+(this.size/2), this.ypos+(this.size)-4)
        }


    if(this.type == "borderless"){
      if(this.rolledOver == true){
        fill(255,0,0);
        noStroke();
        circle(this.xpos+(this.size/2),this.ypos+(this.size/2), this.size);
      }
      
      if(this.isOn == true){
        fill(0,255,0);
        noStroke();
        circle(this.xpos+(this.size/2),this.ypos+(this.size/2), this.size);
      }
      image(this.img, this.xpos, this.ypos,this.size,this.size);
    }
    if(this.type == "long_button"){
      strokeWeight(1);
        rect(this.xpos, this.ypos, this.wid, this.size, this.cornerCurve);
        textSize(this.fontSize);
        if(this.isOn == true){
          fill(0,255,0);
        }else{
          fill(0,0,0);
        }
        //fill(0,0,0);
        noStroke();
        textAlign(LEFT, CENTER);
        text(this.label+"   1  2  3",this.xpos+(this.size/2),this.ypos+(this.size/2));
      }
    }
  }


}
//////////////////////////////////////CLASS SLIDER////////////////////////////////////
class Slider {

  constructor(xpos, ypos, len, wid, orientation, minValue, maxValue, startValue, mode, label) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.len = len;
    this.wid = wid;
    this.orientation = orientation;
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.startValue = startValue;
    this.outputValue = 0;
    this.handleSize = wid;
    this.lengthValue = (maxValue - minValue) / len;
    this.rolledOver = false;
    this.mode = mode;
    this.label = label;
    this.labelMode = true;
    this.labelVis = true;


    //calculates the starting point of the handles based on the location of the slider

    if (this.orientation == "Horizontal") {
      this.handleXPos = this.xpos + (this.len / (this.maxValue - this.minValue)) * (this.startValue - this.minValue);
      this.handleYPos = this.ypos + (wid / 2);
    }
    if (this.orientation == "Verticle") {
      this.handleYPos = this.ypos + (this.len / (this.maxValue - this.minValue)) * (this.startValue - this.minValue);
      this.handleXPos = this.xpos + (wid / 2);
    }

  }

  display() {
    //fill(255,255,255);
    stroke(0, 0, 0);
    fill(255, 255, 255);
    if (this.orientation == "Horizontal") {
      if(this.mode == "simple_line"){
        fill(207, 209, 200);
        noStroke();
        //this.margin = 18,
        //rect(this.xpos-this.margin,this.ypos-this.margin, this.len+(2*this.margin), this.wid+(2*this.margin), 5);


        stroke(0);
        strokeWeight(1);
        var tickMarkLen = 10;
      line(this.xpos, this.ypos+(this.wid/2), this.xpos+this.len, this.ypos+(this.wid/2));
      line(this.xpos, this.ypos+(this.wid/2), this.xpos, this.ypos+(this.wid/2)+tickMarkLen);
      line(this.xpos+this.len, this.ypos+(this.wid/2), this.xpos+this.len, this.ypos+(this.wid/2)+tickMarkLen);
      
      if(this.labelMode == true){
      textAlign(CENTER, TOP);
      fill(0,0,0);
      noStroke();
      textSize(15);
      textFont(fonts[0]);
      if(this.labelVis == true){
      text(this.minValue, this.xpos, this.ypos+tickMarkLen+10);
      text(this.maxValue, this.xpos+this.len, this.ypos+tickMarkLen+10);
      }
      text(Number(this.outputValue.toFixed(2)), this.handleXPos, this.handleYPos-30);
      textAlign(CENTER, TOP);
      text(this.label,this.xpos + (this.len/2), this.ypos+20);
      }else{
      textAlign(LEFT, CENTER);
      noStroke();
      fill(0);
      textSize(12);
      text(this.label, this.xpos+this.len+10, this.ypos+2);
      text(Number(this.outputValue.toFixed(0)), this.xpos+this.len+50, this.ypos+2);
      }
    }
      }

      if(this.mode == "boxed_simple_line"){
     
        //fill(255,0,0);
        fill(207, 209, 200);
        noStroke();
        rect(this.xpos, this.ypos, this.len, this.wid, 3);
        var tickMarkLen = 5;
        var margin = 10;
        
        
        stroke(0);
        strokeWeight(1);

      line(this.xpos+margin, this.ypos+(this.wid/2), (this.xpos+this.len)-margin, this.ypos+(this.wid/2));
      //line(this.xpos, this.ypos+(this.wid/2), this.xpos, this.ypos+(this.wid/2)+tickMarkLen);
      //line(this.xpos+this.len, this.ypos+(this.wid/2), this.xpos+this.len, this.ypos+(this.wid/2)+tickMarkLen);
      textAlign(CENTER, TOP);
      fill(0,0,0);
      noStroke();
      textSize(15);
      textFont(fonts[0]);
      text(this.minValue, this.xpos, this.ypos+tickMarkLen+5);
      text(this.maxValue, this.xpos+this.len, this.ypos+tickMarkLen+5);
      text(Number(this.outputValue.toFixed(2)), this.handleXPos, this.handleYPos-30);
      textAlign(RIGHT, TOP);
      text(this.label,this.xpos + this.len, this.ypos+20);



      }

      
    if (this.orientation == "Verticle") {
      strokeWeight(1);
      line(this.xpos+(this.wid/2), this.ypos, this.xpos+(this.wid), this.ypos);
      line(this.xpos+(this.wid/2), this.ypos+this.len, this.xpos+(this.wid), this.ypos+this.len);
      line(this.xpos+(this.wid/2), this.ypos, this.xpos+(this.wid/2), this.ypos+this.len);
      textAlign(LEFT, CENTER);
      fill(0,0,0);
      noStroke();
      textSize(15);
      if (this.labelVis == true){
      text(this.minValue, this.xpos+25, this.ypos);
      text(this.maxValue, this.xpos+25, this.ypos+this.len);
      }
      text(Number(this.outputValue.toFixed(2)), this.handleXPos+15, this.handleYPos-3);
      text(this.label, this.xpos-10, this.ypos+(this.len/2))
      
      //rect(this.xpos, this.ypos, this.wid, this.len, 5)
    }

    if (this.rolledOver == true) {
      fill(255, 0, 0);
    } else {
      fill(255, 255, 255);
    }
    strokeWeight(3);
    stroke(0,0,0)
    circle(this.handleXPos, this.handleYPos, this.handleSize);
  }

  interact() {
    //console.log(mouseIsPressed);
    //checking to see if the handle is rolled over

    if ((mouseX > this.handleXPos - (this.wid / 2)) &&
      (mouseX < this.handleXPos + (this.wid / 2)) &&
      (mouseY > this.handleYPos - (this.wid / 2)) &&
      (mouseY < this.handleYPos + (this.wid / 2))) {
      this.rolledOver = true;
    } else {
      this.rolledOver = false;
    }

  }

  handleDrag() {
    //dragging the handle within the constraints of the slider bar 

    if (this.orientation == "Horizontal") {
      if ((this.rolledOver == true) &&
        (mouseIsPressed == true) &&
        (this.handleXPos > this.xpos - 1) &&
        (this.handleXPos < (this.xpos + this.len + 1))) {
        this.handleXPos = mouseX;
      }

      if (this.handleXPos < this.xpos) {
        this.handleXPos = this.xpos
      }
      if (this.handleXPos > this.xpos + this.len) {
        this.handleXPos = this.xpos + this.len;
      }
    }

    if (this.orientation == "Verticle") {
      if ((this.rolledOver == true) &&
        (mouseIsPressed == true) &&
        (this.handleYPos > this.ypos - 1) &&
        (this.handleYPos < (this.ypos + this.len + 1))) {
        this.handleYPos = mouseY;
      }

      if (this.handleYPos < this.ypos) {
        this.handleYPos = this.ypos
      }
      if (this.handleYPos > this.ypos + this.len) {
        this.handleYPos = this.ypos + this.len;
      }
    }
  }

  valueReturn() {

    //this calculatees the output value based on teh position of the slider handle
    //relative to factors such as teh min and max values of the slider and the
    //overall length of the slider 

    if (this.orientation == "Horizontal") {
      var incraments = (this.maxValue - this.minValue) / this.len;
      var relativePosition = this.handleXPos - this.xpos;
      this.outputValue = (relativePosition * incraments) + this.minValue;
      //console.log(this.outputValue);
    }
    if (this.orientation == "Verticle") {
      var incraments = (this.maxValue - this.minValue) / this.len;
      var relativePosition = this.handleYPos - this.ypos;
      this.outputValue = (relativePosition * incraments) + this.minValue;
      //console.log(this.outputValue);

    }
    //console.log(incraments);

  }
}
///////////////////////////////////////////CLASS MARKER/////////////////////////////////////////////////////
class Marker {

  constructor(xpos, ypos, type, wid, len, lineWeight, filled, visible, colour, chamfer, orientation) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.type = type;
    this.wid = wid;
    this.len = len;
    this.lineWeight = lineWeight;
    this.filled = filled;
    this.lineVis = true;
    this.visible = visible;
    this.colour = colour;
    this.chamfer = chamfer;
    this.orientation = orientation;
    this.isEditable = true;

    this.fillR = 255;
    this.fillG = 255;
    this.fillB = 255;

    this.lineR = 255;
    this.lineG = 255;
    this.lineB = 255;
    this.numeral = 0;

    this.sizeOfText = 25;

  }

  display() {

    //strokeWeight(this.lineWeight);
    stroke(this.lineR,this.lineG,this.lineB);
    if(this.filled == true){
    fill(this.fillR,this.fillG ,this.fillB);
    }else{
      noFill();
    }
    if (this.lineVis == true){
    strokeWeight(this.lineWeight);
    }else{
      noStroke();
    }
    
    if (this.type == "rectangle") {
      rect(this.xpos, this.ypos, this.wid, this.len, this.chamfer);
      if(this.isEditable == true){
        stroke(255,0,0);
        strokeWeight(1);
        noFill();
        rect(this.xpos, this.ypos, this.wid, this.len, this.chamfer);

      }
    }
    if (this.type == "circle") {
      ellipse(this.xpos, this.ypos, this.wid);
      if(this.isEditable == true){
        stroke(255,0,0);
        strokeWeight(1);
        noFill();
        ellipse(this.xpos, this.ypos, this.wid);
      }

  }
  if (this.type == "numeral") {
    textSize(this.sizeOfText);
    text(this.numeral, this.xpos, this.ypos);
    if(this.isEditable == true){
      stroke(255,0,0);
      strokeWeight(1);
      noFill();
      text(this.numeral, this.xpos, this.ypos);
    }
  }

    if (this.type == "triangle") {
    
      //Current definition is for down pointing triangle****NEED TO EDIT
      if(this.orientation == "down"){
        var adjustment = this.len/2;
        triangle(this.xpos, this.ypos + adjustment, this.xpos - (this.wid/2), this.ypos-this.len + adjustment, this.xpos +(this.wid/2), this.ypos - this.len + adjustment);
        //triangle(this.xpos, this.ypos, this.xpos - (this.wid/2), this.ypos-this.len, this.xpos +(this.wid/2), this.ypos - this.len);
        if(this.isEditable == true){
          stroke(255,0,0);
          strokeWeight(1);
          noFill();

          triangle(this.xpos, this.ypos + adjustment, this.xpos - (this.wid/2), this.ypos-this.len + adjustment, this.xpos +(this.wid/2), this.ypos - this.len + adjustment);
        }
      }
      if(this.orientation == "left"){
        triangle(this.xpos, this.ypos, this.xpos+this.len, this.ypos - (this.wid/2), this.xpos + this.len, this.ypos +(this.wid/2));
        if(this.isEditable == true){
          stroke(255,0,0);
          strokeWeight(1);
          noFill();
          triangle(this.xpos, this.ypos, this.xpos+this.len, this.ypos - (this.wid/2), this.xpos + this.len, this.ypos +(this.wid/2));
      }
      if(this.orientation == "up"){
        triangle(this.xpos, this.ypos, this.xpos -(this.wid/2), this.ypos + this.len, this.xpos +(this.wid/2), this.ypos + this.len);
        if(this.isEditable == true){
          stroke(255,0,0);
          strokeWeight(1);
          noFill();
          triangle(this.xpos, this.ypos, this.xpos -(this.wid/2), this.ypos + this.len, this.xpos +(this.wid/2), this.ypos + this.len);
        }
        }
      }

    }
  
  }
}
//////////////////////////////////////////CLASS TRACK///////////////////////////////////////////////////////
class Track {
 constructor(xpos, ypos, selectorXpos, selectorYpos,   markerNumber){
  this.xpos = xpos;
  this.ypos = ypos;
  this.markerNumber = markerNumber;
  
  this.modeSelector = [];
  this.buttonSize = 25;
  this.selectorXpos = selectorXpos //defines the positions 
  this.selectorYpos = selectorYpos;   //of the selectors
  this.lineThickness = 1;
  this.dialText = "This is placeholder dial text"

  this.colourSelectorButtons = [];
  this.lineSelectorButtons = [];
  
  this.numberOfMarkersButtons = [];


  this.quarterNumeralsArray = [];
  this.hoursNumeralsArray = [];
  this.twentyFourNumeralsArray = [];
  this.siztyNumeralsArray = [];

  this.currentRotation = 0;

  //The buttons to set the TRACK TYPE
  this.modeOnButton = new Button(this.selectorXpos-5, this.selectorYpos,this.buttonSize,on_icon,"borderless");
  this.modeSelector[0] = new Button(this.selectorXpos+this.buttonSize, this.selectorYpos,this.buttonSize,battons_icon,"icon");
  this.modeSelector[1] = new Button(this.selectorXpos+ (this.buttonSize*2), this.selectorYpos,this.buttonSize,circles_icon,"icon");
  this.modeSelector[2] = new Button(this.selectorXpos+ (this.buttonSize*3), this.selectorYpos,this.buttonSize,numerals_icon,"icon");
  this.modeSelector[3] = new Button(this.selectorXpos+ (this.buttonSize*4), this.selectorYpos,this.buttonSize,triangles_icon,"icon");
  this.modeSelector[4] = new Button(this.selectorXpos+ (this.buttonSize*5), this.selectorYpos,this.buttonSize,lines_icon,"icon");
  this.modeSelector[5] = new Button(this.selectorXpos+ (this.buttonSize*6), this.selectorYpos,this.buttonSize,dial_text_icon,"icon");
  
  this.editable = new Button (this.selectorXpos+(this.buttonSize*7)+10, this.selectorYpos+5,this.buttonSize/3*2,lines_icon,"radio");

  //Sliders for the different parameters
  //xpos, ypos, len, wid, orientation, minValue, maxValue, startValue, mode, label
  this.margin = 30;
  this.moduleHeight = 70;
  this.editorLeftAlign = 1030;
  this.moduleWidth = 340;
  
   //xpos, ypos, len, wid, orientation, minValue, maxValue, startValue, mode, label
  this.radiusControl = new Slider(this.editorLeftAlign,this.margin+this.moduleHeight,this.moduleWidth,20,"Horizontal", 0, 14.5, 10, "simple_line", "Track Radius (mm)");
  this.markerRadiusControl = new Slider(this.editorLeftAlign,this.margin+(this.moduleHeight*2),this.moduleWidth,20,"Horizontal", 0, 4, 10,"simple_line", "Marker Radius (mm))");
  
  this.font_selection = new Font_Selector(this.editorLeftAlign, this.margin+(this.moduleHeight*2), this.moduleWidth, 20, number_of_fonts);
  
  this.numeralSizeControl = new Slider(this.editorLeftAlign, this.margin+(this.moduleHeight*3), this.moduleWidth, 20, "Horizontal", 1, 4, 30, "simple_line", "Text Size");
  this.markerWidthControl = new Slider(this.editorLeftAlign,this.margin+(this.moduleHeight*4),this.moduleWidth,20,"Horizontal", 0,4, 10,"simple_line", "Marker Width (mm)");
  this.markerLengthControl = new Slider(this.editorLeftAlign,this.margin+(this.moduleHeight*5),this.moduleWidth,20,"Horizontal",0, 4,10,"simple_line", "Marker Length (mm)");
  this.markerChamferControl = new Slider(this.editorLeftAlign,this.margin+(this.moduleHeight*6),this.moduleWidth, 20,"Horizontal", 0,1,0, "simple_line", "Chamfer (mm)");
  this.markerLineWeightControl = new Slider(this.editorLeftAlign,this.margin+(this.moduleHeight*7),this.moduleWidth,20,"Horizontal",0,1,2,"simple_line", "Line Thickness (mm)");

  this.fillSelection = new Colour_Selector(this.editorLeftAlign, this.margin+(this.moduleHeight*8),255,255,255,"Fill");
  this.fillSelection.onButton.isOn = true;
  this.outlineSelection = new Colour_Selector(this.editorLeftAlign+200, this.margin+(this.moduleHeight*8),255,255,255,"Outline");

  this.xDialLength = 500;
  this.yDialLength = 500;

  this.xAdjustmentControl = new Slider(this.xpos-(this.xDialLength/2),580,this.xDialLength,20,"Horizontal",-5,5,0,"simple_line", "X");
  this.yAdjustmentControl = new Slider(this.xpos+(this.xDialLength/2)+20,this.ypos-(this.yDialLength/2), this.yDialLength,20,"Verticle",-5,5,0,"simple_line", "Y");
  
  //xpos, ypos, len, wid, orientation, minValue, maxValue, startValue, mode, label
  this.xDialText = new Slider(this.xpos-(this.xDialLength/2),580,this.xDialLength,20,"Horizontal",-14,14,0,"simple_line", "X");
  this.yDialText = new Slider(this.xpos+(this.xDialLength/2)+20,this.ypos-(this.yDialLength/2), this.yDialLength,20,"Verticle",-14,14,0,"simple_line", "Y");

  this.col_button_xpos = 950;
  this.col_button_ypos = 700;

  var shift = 40;

  this.numberOfMarkersButtons[0] = new Button(this.editorLeftAlign,30,30,four_icon,"icon"); 
  this.numberOfMarkersButtons[1] = new Button(this.editorLeftAlign+shift*1, 30,30,twelve_icon,"icon"); 
  this.numberOfMarkersButtons[1].isOn = true;
  this.numberOfMarkersButtons[2] = new Button(this.editorLeftAlign+shift*2, 30,30,twenty_four_icon,"icon");
  this.numberOfMarkersButtons[3] = new Button(this.editorLeftAlign+shift*3, 30,30,sixty_icon,"icon");
  this.numberOfMarkersButtons[4] = new Button(this.editorLeftAlign+shift*4, 30,30,three_hundred_icon,"icon");


  this.colourSelectorButtons[0] = new Button(this.col_button_xpos, this.col_button_ypos, 30, white_fill_icon,"icon");
  this.colourSelectorButtons[0].isOn = true;
  this.colourSelectorButtons[1] = new Button(this.col_button_xpos + 30, this.col_button_ypos, 30, black_fill_icon,"icon");
  this.colourSelectorButtons[1].isOn = false;
  
  this.lineSelectorButtons[0] = new Button(this.col_button_xpos + 90, this.col_button_ypos, 30, fill_icon, "icon");
  this.lineSelectorButtons[0].isOn = true;
  this.lineSelectorButtons[1] = new Button(this.col_button_xpos + 120, this.col_button_ypos, 30, line_icon, "icon");
  this.lineSelectorButtons[1].isOn = false;

  this.markerNumberSelectionCount = 1;

  this.numeralOrientationButtons = [];
  this.numeralOrientationButtons[0] = new Button(770, 550, 20, numeral_t1_icon, "icon");
  this.numeralOrientationButtons[1] = new Button(770+30, 550, 20, numeral_t2_icon, "icon");
  this.numeralOrientationButtons[1].isOn = true;
  this.numeralOrientationButtons[2] = new Button(770+60, 550, 20, numeral_t3_icon, "icon");
  
  this.numeralButtonCheck = 1;
  this.horizontalNumerals = false;
  this.inverseNumerals = true;

  this.quarterNumeralsSelector = new Numerals_Selector(1025,325, 4, 1, 30, 10);
  this.hourNumeralsSelector = new Numerals_Selector(1025,325, 12, 1, 30, 10);
  this.twentyfourNumeralsSelector = new Numerals_Selector(1025,325,24,1,30,10);
  this.minNumeralsSelector = new Numerals_Selector(1025,325, 60, 1, 30,10);


  //An array which holds the buttons for the number of markers selection
  var shift = 40;
  this.buttonSelected = 10;
  this.markers = [];
  this.range_selector = new Range_Selector(600,630,360,0,360);
  this.inp = createInput('Dial Text', 'text');

}

 display(){

  //this.inp.position(1025, 300);
  this.inp.position(1025, 2000);
  this.inp.size(350);

  if(this.numberOfMarkersButtons[0].isOn == true){
    this.markerNumber = 4;
  }
  if(this.numberOfMarkersButtons[1].isOn == true){
    this.markerNumber = 12;
  }
  if(this.numberOfMarkersButtons[2].isOn == true){
    this.markerNumber = 24;
  }
  if(this.numberOfMarkersButtons[3].isOn == true){
    this.markerNumber = 60;
  }
  if(this.numberOfMarkersButtons[4].isOn == true){
    this.markerNumber = 300;
  }

  
//Shows the range selector button - likely that this will need to move within the modes!!!!!!
  //this.range_selector.display();
  //this.range_selector.calculateRange();

  //displays the mode selector "ON" button all the time and 
  //displays all the mode selector buttons when the On button is On.   
  this.modeOnButton.display();
  this.modeOnButton.interact();
 
  //editable radio button next to interact
  if(this.modeOnButton.isOn == true){
    this.editable.display();
    this.editable.interact();

    //mode selector buttons
    for(var i = 0; i < 6; i++){
      this.modeSelector[i].display();
      this.modeSelector[i].interact();
  }
  }
  if(this.modeOnButton.isOn == false){
    this.editable.isOn = false;
  
  }




 //EDITOR CONTROLS Turn the editor controls on which are relevent to the track.
if(this.editable.isOn == true){
  //console.log("editable is on!");
 
  //EDITOR CONTROLS FOR RECTANGLE BATTON. Track [0].
 if(this.modeSelector[0].isOn == true){
  this.range_selector.display();
  this.range_selector.calculateRange();
  
  for(var j = 0; j < 5; j++){
    this.numberOfMarkersButtons[j].display();
    this.numberOfMarkersButtons[j].interact();
    }


    textSize(14);
    textAlign(LEFT, CENTER);
    fill(0);
    noStroke();
    text("Orientation", 770, 535);
    text("Number of Numerals", this.editorLeftAlign+200, 45);

    this.fillSelection.display();
    this.outlineSelection.display();
  
  this.radiusControl.display();
  this.radiusControl.interact();
  this.radiusControl.handleDrag();
  this.radiusControl.valueReturn();
  
  this.markerWidthControl.display();
  this.markerWidthControl.interact();
  this.markerWidthControl.handleDrag();
  this.markerWidthControl.valueReturn();
    
  this.markerLengthControl.display();
  this.markerLengthControl.interact();
  this.markerLengthControl.handleDrag();
  this.markerLengthControl.valueReturn();
  
  this.markerChamferControl.display();
  this.markerChamferControl.interact();
  this.markerChamferControl.handleDrag();
  this.markerChamferControl.valueReturn();

  this.markerLineWeightControl.display();
  this.markerLineWeightControl.interact();
  this.markerLineWeightControl.handleDrag();
  this.markerLineWeightControl.valueReturn();

  this.xAdjustmentControl.display();
  this.xAdjustmentControl.interact();
  this.xAdjustmentControl.handleDrag();
  this.xAdjustmentControl.valueReturn();

  this.yAdjustmentControl.display();
  this.yAdjustmentControl.interact();
  this.yAdjustmentControl.handleDrag();
  this.yAdjustmentControl.valueReturn();

  for(var i = 0; i <3; i++){
    this.numeralOrientationButtons[i].display();
    this.numeralOrientationButtons[i].interact();
  }


 }
 
  //EDITOR CONTROLS FOR CIRCLE BATTON. Track [1].


  if(this.modeSelector[1].isOn == true){
    this.range_selector.display();
    this.range_selector.calculateRange();

    
    for(var i = 0; i < 5; i++){
      this.numberOfMarkersButtons[i].display();
     this.numberOfMarkersButtons[i].interact();
      }

      noStroke();
      fill(0);
      textAlign(LEFT, CENTER);
      text("Number of Numerals", this.editorLeftAlign+200, 45);

      this.fillSelection.display();//Tools for colour selection of fill
      this.outlineSelection.display();//..and line
    
      this.radiusControl.display();
    this.radiusControl.interact();
    this.radiusControl.handleDrag();
    this.radiusControl.valueReturn();

  this.markerRadiusControl.display();
  this.markerRadiusControl.interact();
  this.markerRadiusControl.handleDrag();
  this.markerRadiusControl.valueReturn();

  this.markerLineWeightControl.display();
  this.markerLineWeightControl.interact();
  this.markerLineWeightControl.handleDrag();
  this.markerLineWeightControl.valueReturn();


  this.xAdjustmentControl.display();
  this.xAdjustmentControl.interact();
  this.xAdjustmentControl.handleDrag();
  this.xAdjustmentControl.valueReturn();

  this.yAdjustmentControl.display();
  this.yAdjustmentControl.interact();
  this.yAdjustmentControl.handleDrag();
  this.yAdjustmentControl.valueReturn();

  }

  //EDITOR CONTROLS FOR NUMERALS. Track [2]. 
  
  if(this.modeSelector[2].isOn == true){
    this.range_selector.display();
    this.range_selector.calculateRange();
    
    for(var i = 0; i < 4; i++){
      this.numberOfMarkersButtons[i].display();
     this.numberOfMarkersButtons[i].interact();
      }
      textSize(14);
      textAlign(LEFT, CENTER);
      fill(0);
      noStroke();
      text("Orientation", 770, 535);
      text("Number of Numerals", this.editorLeftAlign+200, 45);

      this.fillSelection.display();//Tools for colour selection of fill
      this.outlineSelection.display();//..and line
    
      this.radiusControl.display();
    this.radiusControl.interact();
    this.radiusControl.handleDrag();
    this.radiusControl.valueReturn();

  this.markerLineWeightControl.display();
  this.markerLineWeightControl.interact();
  this.markerLineWeightControl.handleDrag();
  this.markerLineWeightControl.valueReturn();
  
  this.numeralSizeControl.display();
  this.numeralSizeControl.interact();
  this.numeralSizeControl.handleDrag();
  this.numeralSizeControl.valueReturn();

  this.xAdjustmentControl.display();
  this.xAdjustmentControl.interact();
  this.xAdjustmentControl.handleDrag();
  this.xAdjustmentControl.valueReturn();

  this.yAdjustmentControl.display();
  this.yAdjustmentControl.interact();
  this.yAdjustmentControl.handleDrag();
  this.yAdjustmentControl.valueReturn();

  if(this.numberOfMarkersButtons[0].isOn == true){
  this.quarterNumeralsSelector.display();
  this.quarterNumeralsSelector.interact();
  }
  if(this.numberOfMarkersButtons[1].isOn == true){
    this.hourNumeralsSelector.display();
    this.hourNumeralsSelector.interact();
  }
  if(this.numberOfMarkersButtons[2].isOn == true){
    this.twentyfourNumeralsSelector.display();
    this.twentyfourNumeralsSelector.interact();
  }
  if(this.numberOfMarkersButtons[3].isOn == true){
    this.minNumeralsSelector.display();
    this.minNumeralsSelector.interact();

  }

  for(var i = 0; i <3; i++){
    this.numeralOrientationButtons[i].display();
    this.numeralOrientationButtons[i].interact();
  }
  this.font_selection.display();

//calls the numeral selector tool depending on the number of markers console

}

  //EDITOR CONTROLS FOR TRIANGLES. Track [3]. 
if(this.modeSelector[3].isOn == true){
  this.range_selector.display();
  this.range_selector.calculateRange();

  for(var i = 0; i < 5; i++){
    this.numberOfMarkersButtons[i].display();
   this.numberOfMarkersButtons[i].interact();
    }
    textSize(14);
    textAlign(LEFT, CENTER);
    fill(0);
    noStroke();
    text("Orientation", 770, 535);
    text("Number of Numerals", this.editorLeftAlign+200, 45);

  
  this.fillSelection.display();//Tools for colour selection of fill
  this.outlineSelection.display();//..and line

  this.radiusControl.display();
  this.radiusControl.interact();
  this.radiusControl.handleDrag();
  this.radiusControl.valueReturn();

  this.markerWidthControl.display();
  this.markerWidthControl.interact();
  this.markerWidthControl.handleDrag();
  this.markerWidthControl.valueReturn();
    
  this.markerLengthControl.display();
  this.markerLengthControl.interact();
  this.markerLengthControl.handleDrag();
  this.markerLengthControl.valueReturn();

  this.markerLineWeightControl.display();
  this.markerLineWeightControl.interact();
  this.markerLineWeightControl.handleDrag();
  this.markerLineWeightControl.valueReturn();

  this.xAdjustmentControl.display();
  this.xAdjustmentControl.interact();
  this.xAdjustmentControl.handleDrag();
  this.xAdjustmentControl.valueReturn();

  this.yAdjustmentControl.display();
  this.yAdjustmentControl.interact();
  this.yAdjustmentControl.handleDrag();
  this.yAdjustmentControl.valueReturn();

  for(var i = 0; i <3; i++){
    this.numeralOrientationButtons[i].display();
    this.numeralOrientationButtons[i].interact();
  }

}
//CONTROLS FOR SIMPLE LINE 
if(this.modeSelector[4].isOn == true){

  this.range_selector.display();
  this.range_selector.calculateRange();

  this.fillSelection.display();//Tools for colour selection of fill
  this.outlineSelection.display();//..and line


  this.radiusControl.display();
  this.radiusControl.interact();
  this.radiusControl.handleDrag();
  this.radiusControl.valueReturn();

  this.markerLineWeightControl.display();
  this.markerLineWeightControl.interact();
  this.markerLineWeightControl.handleDrag();
  this.markerLineWeightControl.valueReturn();


  this.xAdjustmentControl.display();
  this.xAdjustmentControl.interact();
  this.xAdjustmentControl.handleDrag();
  this.xAdjustmentControl.valueReturn();

  this.yAdjustmentControl.display();
  this.yAdjustmentControl.interact();
  this.yAdjustmentControl.handleDrag();
  this.yAdjustmentControl.valueReturn();

  //this.imp.hide();

}

//Editor Controls for Dial text
if(this.modeSelector[5].isOn == true){

  this.fillSelection.display();//Tools for colour selection of fill
  this.outlineSelection.display();//..and line
  
  this.markerLineWeightControl.display();
  this.markerLineWeightControl.interact();
  this.markerLineWeightControl.handleDrag();
  this.markerLineWeightControl.valueReturn();
  
  this.numeralSizeControl.display();
  this.numeralSizeControl.interact();
  this.numeralSizeControl.handleDrag();
  this.numeralSizeControl.valueReturn();


  this.xDialText.display();
this.xDialText.interact();
this.xDialText.handleDrag();
this.xDialText.valueReturn();

this.yDialText.display();
this.yDialText.interact();
this.yDialText.handleDrag();
this.yDialText.valueReturn();


  this.inp.position(1025, 100);
  this.font_selection.display();
}
 }
for(var i = 0; i <3; i++){
  if(i !== this.numeralButtonCheck){
    this.numeralOrientationButtons[i].isOn = false;
  }else{
    this.numeralOrientationButtons[i].isOn = true;
  }
}



}

drawDial(){
if(this.modeOnButton.isOn == true){
  //************************************************LINE DEFINITION************************************************************
  if(this.modeSelector[4].isOn == true){
    if(this.colourSelectorButtons[0].isOn == true){
      fill(255,255,255);
      stroke(255,255,255);
     }
     if(this.fillSelection.isOn == false){
      noFill();
    }
    
    if(this.fillSelection.isOn == true){
      fill(this.fillSelection.redSlider.outputValue, this.fillSelection.greenSlider.outputValue, this.fillSelection.blueSlider.outputValue);   
      }
      
      if(this.outlineSelection.isOn == false){
        noStroke();
      }
      if(this.outlineSelection.isOn == true){
        stroke(this.outlineSelection.redSlider.outputValue, this.outlineSelection.greenSlider.outputValue, this.outlineSelection.blueSlider.outputValue);
      }

    strokeWeight(this.markerLineWeightControl.outputValue*scalar);

    strokeCap(SQUARE);
     arc(this.xpos, this.ypos, this.radiusControl.outputValue*(scalar)*2,this.radiusControl.outputValue*(scalar)*2,radians(this.range_selector.minA-90), radians(this.range_selector.maxA-90));
     arc(this.xpos, this.ypos, this.radiusControl.outputValue*(scalar)*2,this.radiusControl.outputValue*(scalar)*2,radians(this.range_selector.minB-90), radians(this.range_selector.maxB-90));

    //circle(dialXPos, dialYPos, this.radiusControl.outputValue*(scalar*2));
  }
  
  //*********************************************DIAL TEXT DEFINITION************************************************************

  if(this.modeSelector[5].isOn == true){
    fill(255);
    textAlign(CENTER, CENTER);



    
    for(var i = 0; i < number_of_fonts; i++){
        if(this.font_selection.fontContainers[i].isOn == true){
          textFont(fonts[i]);
        }
    }

    if(this.fillSelection.isOn == false){
      noFill();
    }
    
    if(this.fillSelection.isOn == true){
      fill(this.fillSelection.redSlider.outputValue, this.fillSelection.greenSlider.outputValue, this.fillSelection.blueSlider.outputValue);   
      }
      if(this.outlineSelection.isOn == false){
        noStroke();
      }
      if(this.outlineSelection.isOn == true){
        strokeWeight(this.markerLineWeightControl.outputValue*scalar);
        stroke(this.outlineSelection.redSlider.outputValue, this.outlineSelection.greenSlider.outputValue, this.outlineSelection.blueSlider.outputValue);
      }

    textSize(this.numeralSizeControl.outputValue*scalar);
    //text(this.dialText, this.xpos+this.xDialText.outputValue, this.ypos+this.yDialText.outputValue);
   text(String(this.inp.value()), this.xpos+(this.xDialText.outputValue*scalar), this.ypos+(this.yDialText.outputValue*scalar));
   // text("test string",  this.xpos+this.xDialText.outputValue, this.ypos+this.yDialText.outputValue);
  }

  //***************************************************GENERAL DEFINITOION**************************************************/
  push();
  translate(this.xpos+(this.xAdjustmentControl.outputValue*scalar), this.ypos+(this.yAdjustmentControl.outputValue*scalar), this.markerNumber);
  //translate(this.xpos, this.ypos, this.markerNumber);
  for(var i = 0; i < this.markerNumber; i++){   
    push();

    this.currentRotation = (360/this.markerNumber)*(i+1);
    rotate(radians(this.currentRotation));
    translate(0, (-this.radiusControl.outputValue)*scalar);
    
    
    if(this.numeralOrientationButtons[0].isOn == true){
      rotate(-radians(360/this.markerNumber)*(i+1));
      //rotate(radians(-90));
    }
    if(this.numeralOrientationButtons[2].isOn == true){
      rotate(radians(180));
      //rotate(radians(-90));
    }


//******************************************************RECTANGLE DEFINITION*************************************************
    if(this.modeSelector[0].isOn == true){
    rectMode(CENTER);
     this.markers[i] = new Marker(0,0,"rectangle", this.markerWidthControl.outputValue*scalar,this.markerLengthControl.outputValue*scalar,1,255,false,255,this.markerChamferControl.outputValue*scalar,"down");
     this.markers[i].lineWeight = this.markerLineWeightControl.outputValue*scalar;

    
   //turns on the red lines to show that the marker is editable
    if(this.editable.isOn == true){
      this.fillSelection.display();
      this.outlineSelection.display();

      this.markers[i].isEditable = true;
     }else{
      this.markers[i].isEditable = false;
      }

      //Tools to connect the colour selectors to teh drawing of the marker
      if(this.fillSelection.isOn == false){
        this.markers[i].filled = false;
      }
      if(this.fillSelection.isOn == true){
      this.markers[i].filled = true;
      this.markers[i].fillR = this.fillSelection.redSlider.outputValue;
      this.markers[i].fillG = this.fillSelection.greenSlider.outputValue;
      this.markers[i].fillB = this.fillSelection.blueSlider.outputValue;

      }

      if(this.outlineSelection.isOn == false){
        this.markers[i].lineVis = false;
      }
      if(this.outlineSelection.isOn == true){
        this.markers[i].lineVis = true;
        this.markers[i].lineR = this.outlineSelection.redSlider.outputValue;
        this.markers[i].lineG = this.outlineSelection.greenSlider.outputValue;
        this.markers[i].lineB = this.outlineSelection.blueSlider.outputValue;
      }

    if(((this.currentRotation >= this.range_selector.minA)&&(this.currentRotation <= this.range_selector.maxA))||((this.currentRotation >= this.range_selector.minB)&&(this.currentRotation <= this.range_selector.maxB))){
    this.markers[i].display();
    }
  }
//******************************************************NUMERAL DEFINITION*************************************************
if(this.modeSelector[2].isOn == true){
 
   this.markers[i] = new Marker(0,0,"numeral", this.markerWidthControl.outputValue*scalar,this.markerLengthControl.outputValue*scalar,1,255,false,255,this.markerChamferControl.outputValue*scalar,"down");
   
  if(this.numberOfMarkersButtons[0].isOn == true){
    this.markers[i].numeral = this.quarterNumeralsSelector.cells[i].label;
    
  }
  if(this.numberOfMarkersButtons[1].isOn == true){
    this.markers[i].numeral = this.hourNumeralsSelector.cells[i].label;
    
  }

  if(this.numberOfMarkersButtons[2].isOn == true){
    this.markers[i].numeral = this.twentyfourNumeralsSelector.cells[i].label;
    
  }

  if(this.numberOfMarkersButtons[3].isOn == true){
    this.markers[i].numeral = this.minNumeralsSelector.cells[i].label;
    
  }

   
   this.markers[i].lineWeight = this.markerLineWeightControl.outputValue*scalar;
  textAlign(CENTER,CENTER);

 //turns on the red lines to show that the marker is editable
  if(this.editable.isOn == true){
    this.markers[i].isEditable = true;
   }else{
    this.markers[i].isEditable = false;
    }
   
//Tools to connect the colour selectors to teh drawing of the marker
if(this.fillSelection.isOn == false){
  this.markers[i].filled = false;
}
if(this.fillSelection.isOn == true){
this.markers[i].filled = true;
this.markers[i].fillR = this.fillSelection.redSlider.outputValue;
this.markers[i].fillG = this.fillSelection.greenSlider.outputValue;
this.markers[i].fillB = this.fillSelection.blueSlider.outputValue;

}

if(this.outlineSelection.isOn == false){
  this.markers[i].lineVis = false;
}
if(this.outlineSelection.isOn == true){
  this.markers[i].lineVis = true;
  this.markers[i].lineR = this.outlineSelection.redSlider.outputValue;
  this.markers[i].lineG = this.outlineSelection.greenSlider.outputValue;
  this.markers[i].lineB = this.outlineSelection.blueSlider.outputValue;
}
  this.markers[i].sizeOfText = this.numeralSizeControl.outputValue*scalar;
    
  for(var j = 0; j < number_of_fonts; j++){
    if(this.font_selection.fontContainers[j].isOn == true){
      textFont(fonts[j]);
    }
}

if(((this.currentRotation >= this.range_selector.minA)&&(this.currentRotation <= this.range_selector.maxA))||((this.currentRotation >= this.range_selector.minB)&&(this.currentRotation <= this.range_selector.maxB))){
this.markers[i].display();
}
}
  //******************************************************CIRCLE DEFINITION*************************************************
    if(this.modeSelector[1].isOn == true){
      this.markers[i] = new Marker(0,0,"circle", this.markerRadiusControl.outputValue*scalar,this.markerRadiusControl.outputValue*scalar,1,255,true,255,5,"down");
      this.markers[i].lineWeight = this.markerLineWeightControl.outputValue*scalar;
      
      //turns on the red lines to show that the marker is editable
if(this.editable.isOn == true){
  this.markers[i].isEditable = true;
 }else{
  this.markers[i].isEditable = false;
  }

  if(this.fillSelection.isOn == false){
    this.markers[i].filled = false;
  }
  if(this.fillSelection.isOn == true){
  this.markers[i].filled = true;
  this.markers[i].fillR = this.fillSelection.redSlider.outputValue;
  this.markers[i].fillG = this.fillSelection.greenSlider.outputValue;
  this.markers[i].fillB = this.fillSelection.blueSlider.outputValue;

  }

  if(this.outlineSelection.isOn == false){
    this.markers[i].lineVis = false;
  }
  if(this.outlineSelection.isOn == true){
    this.markers[i].lineVis = true;
    this.markers[i].lineR = this.outlineSelection.redSlider.outputValue;
    this.markers[i].lineG = this.outlineSelection.greenSlider.outputValue;
    this.markers[i].lineB = this.outlineSelection.blueSlider.outputValue;
  }

      if(((this.currentRotation >= this.range_selector.minA)&&(this.currentRotation <= this.range_selector.maxA))||((this.currentRotation >= this.range_selector.minB)&&(this.currentRotation <= this.range_selector.maxB))){
      this.markers[i].display();
      }
    }

    //******************************************************TRIANGLE DEFINITION*************************************************
    if(this.modeSelector[3].isOn == true){
      this.markers[i] = new Marker(0,0,"triangle", this.markerWidthControl.outputValue*scalar,this.markerLengthControl.outputValue*scalar,1,255,true,255,5,"down");
      this.markers[i].lineWeight = this.markerLineWeightControl.outputValue*scalar;
    
      //turns on the red lines to show that the marker is editable
    if(this.editable.isOn == true){
      this.markers[i].isEditable = true;
     }else{
      this.markers[i].isEditable = false;
      }

      if(this.fillSelection.isOn == true){
        this.markers[i].filled = true;
        this.markers[i].fillR = this.fillSelection.redSlider.outputValue;
        this.markers[i].fillG = this.fillSelection.greenSlider.outputValue;
        this.markers[i].fillB = this.fillSelection.blueSlider.outputValue;
        
        }
        
        if(this.outlineSelection.isOn == false){
          this.markers[i].lineVis = false;
        }
        if(this.outlineSelection.isOn == true){
          this.markers[i].lineVis = true;
          this.markers[i].lineR = this.outlineSelection.redSlider.outputValue;
          this.markers[i].lineG = this.outlineSelection.greenSlider.outputValue;
          this.markers[i].lineB = this.outlineSelection.blueSlider.outputValue;
        }



      if(((this.currentRotation >= this.range_selector.minA)&&(this.currentRotation <= this.range_selector.maxA))||((this.currentRotation >= this.range_selector.minB)&&(this.currentRotation <= this.range_selector.maxB))){
      this.markers[i].display();
      }
    } 
    pop();
  }
  pop();
 }
 }

 //*************************************ONCLICK FUNCTION***********************************************
onClick(){

  this.modeOnButton.onClick();
  
//RECTANGLE MODE
  if(this.modeSelector[0].isOn == true){
    for(var i = 0; i <3; i++){
      if(this.numeralOrientationButtons[i].rolledOver == true){
      this.numeralOrientationButtons[i].isOn;
      this.numeralButtonCheck = i;
      }
    }
    this.fillSelection.onClick();
    this.outlineSelection.onClick();

    for(var i = 0; i < 5; i++){
      this.numberOfMarkersButtons[i].onClick();
    }
  
  }

  //CIRCLE MODE
  if(this.modeSelector[1].isOn == true){
    this.fillSelection.onClick();
    this.outlineSelection.onClick();
  }
  
  //NUMERAL MODE
  if(this.modeSelector[2].isOn == true){
    this.font_selection.onClick();
    if(this.numberOfMarkersButtons[0].isOn == true){
      this.quarterNumeralsSelector.onClick();
       }
       if(this.numberOfMarkersButtons[1].isOn == true){
        this.hourNumeralsSelector.onClick();
      }
      if(this.numberOfMarkersButtons[2].isOn == true){
        this.twentyfourNumeralsSelector.onClick();
      }
      if(this.numberOfMarkersButtons[3].isOn == true){
        this.minNumeralsSelector.onClick();
      }

      for(var i = 0; i <3; i++){
        if(this.numeralOrientationButtons[i].rolledOver == true){
        this.numeralOrientationButtons[i].isOn;
        this.numeralButtonCheck = i;
        }
      }
      this.fillSelection.onClick();
      this.outlineSelection.onClick();

  }
  
//TRIANGLE MODE
  if(this.modeSelector[3].isOn == true){
    for(var i = 0; i <3; i++){
      if(this.numeralOrientationButtons[i].rolledOver == true){
      this.numeralOrientationButtons[i].isOn;
      this.numeralButtonCheck = i;
      }
    }
    this.fillSelection.onClick();
    this.outlineSelection.onClick();
  }
  
  //CIRCLE MODE
  if(this.modeSelector[4].isOn == true){
    this.fillSelection.onClick();
    this.outlineSelection.onClick();
  }

  //DIAL TEXT MODE
  if(this.modeSelector[5].isOn == true){
    this.font_selection.onClick();
    this.fillSelection.onClick();
    this.outlineSelection.onClick();
  }


//Controls the mode selector panel by using the modeOn button to hide visability and interactivity of the mode buttons
//Tuns all the bottons off and deactivates them when the track is turned off
  

//sets the condtionals for the buttons and controls when the track is turned on
  
if(this.modeOnButton.isOn == true){
  
  this.editable.onClick();

    for(var i = 0; i < 5; i++){
      if(this.numberOfMarkersButtons[i].rolledOver == true){
        this.numberOfMarkersButtons[i].isOn = true;
          this.markerNumberSelectionCount = i;
        }
      }
    
    for(var i = 0; i < 5; i++){
     if(i !== this.markerNumberSelectionCount){
      this.numberOfMarkersButtons[i].isOn = false;
     }
    }

    for(var i = 0; i < 6; i++){
    this.modeSelector[i].isOn = true;
    this.modeSelector[i].isVis = true; 
    }
  

    
//Sets the stae of the selector buttons for colour and line with a toggle so that only one button can be active in each set

    this.colourSelectorButtons[0].isVis = true;
    this.colourSelectorButtons[1].isVis = true;
    this.lineSelectorButtons[0].isVis = true;
    this.lineSelectorButtons[1].isVis = true;


    if(this.colourSelectorButtons[0].rolledOver == true){
      this.colourSelectorButtons[0].isOn = true;
      this.colourSelectorButtons[1].isOn = false;
    }
    
    if(this.colourSelectorButtons[1].rolledOver == true){
      this.colourSelectorButtons[1].isOn = true;
      this.colourSelectorButtons[0].isOn = false;
    }
    
    if(this.lineSelectorButtons[0].rolledOver == true){
      this.lineSelectorButtons[0].isOn = true;
      this.lineSelectorButtons[1].isOn = false;
    }
    
    if(this.lineSelectorButtons[1].rolledOver == true){
      this.lineSelectorButtons[1].isOn = true;
      this.lineSelectorButtons[0].isOn = false;
    }

  }

  for(var i = 0; i < 6; i++){
    if(this.modeSelector[i].rolledOver == true){
    this.modeSelector[i].isOn;
    this.buttonSelected = i;
  }
}

  for(var i = 0; i < 6; i++){
   if(i !== this.buttonSelected){
     this.modeSelector[i].isOn = false;

    }
}

  //Checks the other buttons and turns then off such that only one button is ever turned on
  //uses a variable in the Button clas called 'newClick' which is turneon on when teh button is clicked
  //but turned off after the button has been checked.
  for(var i = 0; i < 6; i++){
    if(i == this.buttonSelected){
      this.modeSelector[i].isOn = true;
    }else{
      this.modeSelector[i].isOn = false;
    }
  }
 }
 

 keyPressed(){
  if((this.modeSelector[2].isOn == true)&&(this.numberOfMarkersButtons[0].isOn == true)){
    this.quarterNumeralsSelector.keyInput();
     }
     if((this.modeSelector[2].isOn == true)&&(this.numberOfMarkersButtons[1].isOn == true)){
      this.hourNumeralsSelector.keyInput();
       }
       if((this.modeSelector[2].isOn == true)&&(this.numberOfMarkersButtons[2].isOn == true)){
        this.twentyfourNumeralsSelector.keyInput();
         } 
         if((this.modeSelector[2].isOn == true)&&(this.numberOfMarkersButtons[3].isOn == true)){
          this.minNumeralsSelector.keyInput();
           }

    }

    keyInput(){
        
      if(this.modeSelector[5].isOn == true){
        if(keyCode === BACKSPACE){
          this.dialText = "";

        }else{
          this.dialText = this.dialText+str(String.fromCharCode(keyCode));


        }
      }  
    }

}
/////////////////////////////////////////////CLASS NUMERALS SELECTOR/////////////////////////////////////////////
class Numerals_Selector{

  constructor(xPos, yPos, numberOfCells, labelSize, cellSize, columns) {
   this.xPos = xPos;
   this.yPos = yPos;
   this.numberOfCells = numberOfCells;  
   this.columns = columns;
  this.cellSize = cellSize;
  this.lanelSize = labelSize;
  this.cells = [];
  this.selected = 100;
  this.label = "Numeral Selector"
  //this.cellValues = [];


  var rowcounter = 0;
  var columncounter = 0;

  for(var i = 0; i < this.numberOfCells; i++){
    this.cells[i] = new Button(this.xPos+(this.cellSize*rowcounter), this.yPos+(this.cellSize*columncounter), this.cellSize, four_icon, "labelled_icon");
    
    if(rowcounter < this.columns-1){
      rowcounter = rowcounter+1;
    }else{
      rowcounter = 0;
      columncounter = columncounter+1;
    }  
    }
 this.populate_cells();
 
  }

 populate_cells(){
  if(this.numberOfCells == 4){
    this.cells[0].label = str(3);
    this.cells[1].label = str(6);
    this.cells[2].label = str(9);
    this.cells[3].label = str(12);
  }else{
    for(var i = 0; i < this.numberOfCells; i++){
      this.cells[i].label = str(i+1);
    }

  }

 }
 
 display(){
  for(var i = 0; i < this.numberOfCells; i++){
  this.cells[i].display();
  }
  textSize(15);
  noStroke();
  fill(0);
  textAlign(LEFT, TOP);
  text(this.label, this.xPos, this.yPos-25);
}

interact(){
  for(var i = 0; i < this.numberOfCells; i++){
    this.cells[i].interact();
  }
}
onClick(){
  //console.log("Clicked");
  for(var i = 0; i < this.numberOfCells; i++){
    this.cells[i].onClick();
    this.selected = i;
    if(this.cells[i].rolledOver !== true){
      this.cells[i].isOn = false;
    }
    }
  }

  keyInput(){
    for(var i = 0; i < this.numberOfCells; i++){
      if (this.cells[i].isOn == true) {
        if (keyCode === BACKSPACE) {
          //console.log("Backspace hit!");
          this.cells[i].label = "";
          //console.log(this.cells[i].label.length);
        } else {
          if (this.cells[i].label.length < 3) {
            this.cells[i].label = this.cells[i].label+str(String.fromCharCode(keyCode));
            //console.log(keyCode);
          }
        }
      }
    }
  }
}
/////////////////////////////////////////CLASS FONT SELECTOR//////////////////////////////////////////////////////
class Font_Selector{
  constructor(xPos, yPos, wid, slotHeights, slots){
  this.xPos = xPos;
  this.yPos = yPos;
  this.wid = wid;
  this.slotHeights = slotHeights;
  this.slots = slots;
  this.fontContainers = [];
  this.fontNames = []
  this.onButton = new Button(this.xPos, this.yPos, this.slotHeights, cross_icon, "open_radio");
  this.selectionTracker = 0
  this.font_names = [];
  this.selectorName = "";
  this.font_names[0] = "DM Sans";
  this.font_names[1] = "IBM Plex Sans";
  this.font_names[2] = "Space Grotesk";
  this.font_names[3] = "Cormorant";
  this.font_names[4] = "FiraSans-Regular";
  this.font_names[5] = "FiraSans-Condensed";
  this.font_names[6] = "Syne";
  this.font_names[7] = "Eczar";
  this.font_names[8] = "Work Sans";
  this.font_names[9] = "Libre Franklin";
  this.font_names[10] = "Roboto";
  this.font_names[11] = "Roboto Slab";
  this.font_names[12] = "Bio Rhyme";
  this.font_names[13] = "Archvo";
  this.font_names[14] = "Playfair";
  this.font_names[15] = "Source Sans";
  this.font_names[16] = "Poppins";
  this.font_names[17] = "Saira Stencil";
  this.font_names[18] = "Libre Baskerville";
  this.font_names[19] = "Alegreya";
  this.font_names[20] = "Alegreya Sans";
  
  this.font_names[21] = "Karla";
  this.font_names[22] = "Lora";
  this.font_names[23] = "Raleway";
  this.font_names[24] = "Rubik";
  this.font_names[25] = "Chivo";
  this.font_names[26] = "Spectral";


  for(var i = 0; i < this.slots; i ++){
    this.fontContainers[i] = new Button(this.xPos, this.yPos+(this.slotHeights*(i+1)), this.slotHeights, cross_icon, "long_button");
    this.fontContainers[i].wid = this.wid;
    //this.fontContainers[i].label = "Font Names";
    this.fontContainers[i].label = this.font_names[i];
    //console.log(font_names[i]);
  }
  }

  display(){
    
    fill(200,200,200);
    noStroke();
    rect(this.xPos, this.yPos, this.wid, this.slotHeights);
    textFont(fonts[0]);
    textSize(15);
    fill(0);
    textAlign(RIGHT, TOP)
    text("Fonts",this.xPos+this.wid-10,this.yPos);
    this.onButton.display();
    this.onButton.interact();
    if(this.onButton.isOn == true){
      for(var i = 0; i < this.slots; i ++){
        if(i !== this.selectionTracker){
          this.fontContainers[i].isOn = false;
        }else{
          this.fontContainers[i].isOn = true;
        }
    }
    for(var i = 0; i < this.slots; i ++){
      textFont(fonts[i]);
      this.fontContainers[i].display();
      this.fontContainers[i].interact();
    }
  }
}
  onClick(){
  this.onButton.onClick();
  if(this.onButton.isOn == true){
  for(var i = 0; i < this.slots; i ++){
    this.fontContainers[i].onClick();
    if(this.fontContainers[i].rolledOver == true){
    this.selectionTracker = i;
  }
  }
}
}
}
/////////////////////////////////////////CLASS RANGE SELECTOR//////////////////////////////////////////////////
class Range_Selector{

  constructor(xPos, yPos, numberOfSlots, startPosition, range){
    this.xPos = xPos;
    this.yPos = yPos;
    this.numberOfSlots = numberOfSlots;
    this.startPosition = startPosition;
    this.range = range;

    this.tempSlotsActive = [];
    this.slotsActive = [];

    this.siderWidth = 20;

    this.minA = 0;
    this.minB = 0;
    this.maxA = 0;
    this.maxB = 0;

    this.minAFound = false;
    this.maxAFound = false;
    this.minBFound = false;
    this.maxBFount = false;

    this.startPositionSlider = new Slider(this.xPos-280, this.yPos, 260, this.siderWidth, "Horizontal", 0, this.numberOfSlots, 0, "simple_line", "Range Start Position (degrees)");
    this.rangeSlider = new Slider(this.xPos+20, this.yPos, 260, this.siderWidth, "Horizontal", 0, this.numberOfSlots, 360, "simple_line", "Range (degrees)");
    
    //xpos, ypos, len, wid, orientation, minValue, maxValue, startValue, mode, label)


    for(var i = 0; i < numberOfSlots; i++){
     this.slotsActive[i] = false;
     this.tempSlotsActive[i] = false;
    }
  }

  display(){

    this.startPositionSlider.display(); 
    this.startPositionSlider.interact(); 
    this.startPositionSlider.handleDrag();
    this.startPositionSlider.valueReturn(); 
    
    this.rangeSlider.display();
    this.rangeSlider.interact();
    this.rangeSlider.handleDrag();
    this.rangeSlider.valueReturn();

    fill(255,0,0,50);
    stroke(255);
    if((this.startPositionSlider.rolledOver == true)||(this.rangeSlider.rolledOver == true)){
    arc(dialXPos, dialYPos, dialSize*scalar, dialSize*scalar, radians(this.minA-90), radians(this.maxA-90));
    arc(dialXPos, dialYPos, dialSize*scalar, dialSize*scalar, radians(this.minB-90), radians(this.maxB-90));
    }
  }

  calculateRange(){
    
    for(var i = this.startPositionSlider.outputValue; i < this.startPositionSlider.outputValue+this.rangeSlider.outputValue; i++ ){
      if(i <= this.numberOfSlots){
        this.tempSlotsActive[i] = true;
      }

      if(i > this.numberOfSlots){
        this.tempSlotsActive[i-this.numberOfSlots] = true;
      }
    }
    for(var i = 0; i < this.numberOfSlots; i++){
      if(this.tempSlotsActive[i] == true){
        this.slotsActive[i] = true;
        this.tempSlotsActive[i] = false;
      }else{
        this.slotsActive[i] = false;
      }
    }

    //Find the minimum and maximum values
    for(var i = 0; i < this.numberOfSlots; i++){
      
      if(this.startPositionSlider.outputValue+this.rangeSlider.outputValue <= this.numberOfSlots){

        textAlign(LEFT);
        noStroke();
        fill(0);
       // text("Within Range for A only", 10,200);
        //text(this.startPositionSlider.outputValue+this.rangeSlider.outputValue, 10, 220);
        
        this.minA = this.startPositionSlider.outputValue;
        this.maxA = this.startPositionSlider.outputValue+this.rangeSlider.outputValue;
        this.minB = this.startPositionSlider.outputValue;
        this.maxB = this.startPositionSlider.outputValue+this.rangeSlider.outputValue;
      }
      
        if(this.startPositionSlider.outputValue+this.rangeSlider.outputValue > this.numberOfSlots){
          textAlign(LEFT);
          noStroke();
          fill(0);
          //text("Within Range for A and B", 10,200);
          //text(this.startPositionSlider.outputValue+this.rangeSlider.outputValue, 10, 220);

          this.minA = this.startPositionSlider.outputValue;
          this.maxA = this.numberOfSlots;
          this.minB = 0;
          this.maxB = (this.startPositionSlider.outputValue+this.rangeSlider.outputValue)-360;

    }
  }

  //console.log("Minimum A");
  //console.log(this.minA);
  //console.log("Maximum A");
  //console.log(this.maxA);
  //console.log("Minimum B");
  //console.log(this.minB);
  //console.log("Maximum B");
  //console.log(this.maxB);

  //text("minA:", 10,240);
  //text(this.minA, 100, 240);
  //text("maxA:", 10,260);
  //text(this.maxA, 100, 260);

  //text("minB:", 10,300);
  //text(this.minB, 100, 300);
  //text("maxB:", 10,320);
  //text(this.maxB, 100, 320);


}

}
////////////////////////////////////////CLASS COLOUR SELECTOR////////////////////////////////////////////////
class Colour_Selector{
  constructor(xPos, yPos, startR, startG, startB, mode){
    this.xPos = xPos;
    this.yPos = yPos;
    this.red = startR;
    this.green = startG;
    this.blue = startB;
    this.mode = mode;
    this.len = 80
    this.isOn = true;

    //xpos, ypos, len, wid, orientation, minValue, maxValue, startValue, mode, label
    this.redSlider = new Slider(this.xPos, this.yPos+50, this.len, 10, "Horizontal",0,255, this.red, "simple_line", "Red");
    this.greenSlider = new Slider(this.xPos, this.yPos+70, this.len, 10, "Horizontal",0,255, this.green, "simple_line", "Green");
    this.blueSlider = new Slider(this.xPos, this.yPos+90, this.len, 10, "Horizontal",0,255, this.blue , "simple_line", "Blue");
    this.onButton = new Button(this.xPos, this.yPos, 15, cross_icon, "radio");
    this.greenSlider.labelMode = false;
    this.redSlider.labelMode = false;
    this.blueSlider.labelMode = false;
    this.isOn = true;
  }

  display(){

    if(this.mode == "Fill"){

    fill(this.redSlider.outputValue, this.greenSlider.outputValue, this.blueSlider.outputValue);
    rect(this.xPos+10,this.yPos,40,40,10);
    
    }
    if(this.mode == "Outline"){
      noFill();
      strokeWeight(5);
      stroke(this.redSlider.outputValue, this.greenSlider.outputValue, this.blueSlider.outputValue);
      rect(this.xPos+10,this.yPos,40,40,10); 
     }

    this.redSlider.display();
    this.redSlider.interact();
    this.redSlider.handleDrag();
    this.redSlider.valueReturn();

    this.greenSlider.display();
    this.greenSlider.interact();
    this.greenSlider.handleDrag();
    this.greenSlider.valueReturn();

    this.blueSlider.display();
    this.blueSlider.interact();
    this.blueSlider.handleDrag();
    this.blueSlider.valueReturn();

    this.onButton.display();
    this.onButton.interact();

    if(this.onButton.isOn == true){
      this.isOn = true;
    }
    if(this.onButton.isOn == false){
      this.isOn = false;
    }

  }
  onClick(){
    this.onButton.onClick();
  }

}
////////////////////////////////////////CLASS HANDS EDITOR////////////////////////////////////////////////////
class Hands_Editor{

  constructor(xPos, yPos, len, onRadioX, onRadioY){
    this.xPos = xPos;
    this.yPos = yPos;
    this.len = len;
    this.wid = 20
    this.offset = 60;
    this.label = "Hand Length (mm)"
    this.onRadioX = onRadioX;
    this.onRadioY = onRadioY;

    this.secondHandSet = new Slider(this.xPos+190,this.yPos+ this.offset, 36, 20, "Verticle", 0, 360, 0, "simple_line", "");
    this.secondHandSet.labelVis = false;
    this.minHandSet = new Slider(this.xPos+190,this.yPos+this.offset*2, 36, 20, "Verticle", 0, 360, 40, "simple_line", "");
    this.minHandSet.labelVis = false;
    this.hourHandSet = new Slider(this.xPos+190,this.yPos+this.offset*3, 36, 20, "Verticle", 0, 360, 80, "simple_line", "");
    this.hourHandSet.labelVis = false;
    this.gmtHandSet = new Slider(this.xPos+190,this.yPos+this.offset*4, 36, 20, "Verticle", 0, 360, 120, "simple_line", "");
    this.gmtHandSet.labelVis = false;

    this.secHandLengthSlider = new Slider(this.xPos, this.yPos+this.offset, this.len, 20, "Horizontal", 0, 15, 13, "simple_line", "Second Hand");
    //xpos, ypos, len, wid, orientation, minValue, maxValue, startValue, mode, label
    this.secHandOn = new Button(this.xPos+len+10, this.yPos+this.offset, 20, "close", "radio");
    this.minHandLengthSlider = new Slider(this.xPos, this.yPos+(this.offset*2), this.len, 20, "Horizontal", 0, 15, 12, "simple_line", "Min Hand");
    this.minHandOn = new Button(this.xPos+len+10, this.yPos+(this.offset*2), 20, "close", "radio");
    
    this.hourHandLengthSlider = new Slider(this.xPos, this.yPos+(this.offset*3), this.len, 20, "Horizontal", 0, 15, 10, "simple_line", "Hour Hand");
    
    this.hourHandOn = new Button(this.xPos+len+10, this.yPos+(this.offset*3), 20, "close", "radio");
    
    this.gmtHandLengthSlider = new Slider(this.xPos, this.yPos+(this.offset*4), this.len, 20, "Horizontal", 0, 15, 8, "simple_line", "GMT Hand");
    
    this.gmtHandOn = new Button(this.xPos+len+10, this.yPos+(this.offset*4), 20, "close", "radio");

    this.onButton = new Button(this.onRadioX, this.onRadioY, 20, "close", "open_radio", "Edit Hands");
}
display(){

  this.onButton.display();
  this.onButton.interact();

  if(this.onButton.isOn == true){

  noStroke();
  fill(255);
  rect(this.xPos-10, this.yPos, this.len+100, this.wid*15, 10);
  fill(0);
  textAlign(LEFT,TOP);
  textSize(15);
  text(this.label, this.xPos, this.yPos+5);
  text("Set", this.xPos+200, this.yPos+5);


  this.secHandOn.display();
  this.secHandOn.interact();
  this.minHandOn.display();
  this.minHandOn.interact();
  this.hourHandOn.display();
  this.hourHandOn.interact();
  this.gmtHandOn.display();
  this.gmtHandOn.interact();
  
  this.secHandLengthSlider.display();
  this.minHandLengthSlider.display(); 
  this.hourHandLengthSlider.display(); 
  this.gmtHandLengthSlider.display();
  
  this.secHandLengthSlider.interact();
  this.minHandLengthSlider.interact(); 
  this.hourHandLengthSlider.interact(); 
  this.gmtHandLengthSlider.interact();
  
  this.secHandLengthSlider.handleDrag();
  this.minHandLengthSlider.handleDrag(); 
  this.hourHandLengthSlider.handleDrag(); 
  this.gmtHandLengthSlider.handleDrag();

  this.secHandLengthSlider.valueReturn();
  this.minHandLengthSlider.valueReturn();
  this.hourHandLengthSlider.valueReturn();
  this.gmtHandLengthSlider.valueReturn();

  this.secondHandSet.display();
  this.secondHandSet.interact();
  this.secondHandSet.handleDrag();
  this.secondHandSet.valueReturn();

  this.minHandSet.display();
  this.minHandSet.interact();
  this.minHandSet.handleDrag();
  this.minHandSet.valueReturn();
  
  this.hourHandSet.display();
  this.hourHandSet.interact();
  this.hourHandSet.handleDrag();
  this.hourHandSet.valueReturn();

  this.gmtHandSet.display();
  this.gmtHandSet.interact();
  this.gmtHandSet.handleDrag();
  this.gmtHandSet.valueReturn();
}  
}

onClick(){
  this.onButton.onClick();
  this.secHandOn.onClick();
  this.minHandOn.onClick();
  this.hourHandOn.onClick();
  this.gmtHandOn.onClick();
}

}
