const N = 50;       //grid size at startup

let globalColor, defaultColor;
let resetButton;
let colorActivator;
let rainbowFlag;
let ent;

ent=window.addEventListener("keydown", e => {
    if(e.key === "Enter"){setGrid()}
})

colorActivator=document.querySelector("body");
colorActivator.addEventListener("mouseup", stopColor);
colorActivator.addEventListener("mousedown", startColor);

createGrid(N);
borderToggle();
resetButton=document.querySelector(".resetButton");
resetButton.addEventListener("click", setGrid);

rainbowFlag=false;
defaultColor="pink";
globalColor="black";
setupButtons();




function setGrid(){
    //finds out number input in text field and calls createGrid with that number, max 100
    //before creating grid checks if current grid is bordered, if it is it will add it after creating the new one
    let inp, value;
    let gridFlag;
    gridFlag = document.querySelector(".row");
    gridFlag = gridFlag.classList.contains("borderActive");
    inp=document.querySelector(".gridSize");
    value= (inp.value <= 100) ? inp.value : 100;
    value= (inp.value === '') ? N : inp.value;
    createGrid(value);
    if (gridFlag) {borderToggle()}
}
function createGrid(n){
    //input number, creates and puts on page the grid with that number of columns and rows
    let grid, docGrid;
    let column, row;
    let i, x;
    grid = document.createElement("div");
    for(i=0; i<n; i++){
        column=document.createElement("div");
        column.classList.add("column");
        for(x=0; x<n; x++){
            row=document.createElement("div");
            row.classList.add("row");
            column.appendChild(row);
        }
        grid.appendChild(column);
    }
    docGrid = document.querySelector(".grid");
    docGrid.innerHTML = grid.innerHTML;
    singleCellDrawingSetup();
}
function singleCellDrawingSetup(){
    //if the user clicks, or starts drawing from a cell, the initial cell wont be counted as "mouseover" since it was already on it when it started clicking, and did not come in afterwards,
    //so we use this function to make sure the first cell of the draw or the only cell clicked gets colored as well
    // it must go on createGrid so that the eventListener is added on every grid created
    let rows;
    rows = document.querySelectorAll(".row");
    rows.forEach(item => item.addEventListener("mousedown", color));
}
function startColor(){
    //start coloring when you click
    //problem: does not work on the first cell you clicked, so we have an event listener for mousedown on every grid cell so that even the first cell will get colored.
    let rows;
    rows = document.querySelectorAll(".row");
    rows.forEach(el => el.addEventListener("mouseover", color));
    /* console.log("start"); */
}
function stopColor(){
    //stops coloring when you unclick
    let rows;
    rows = document.querySelectorAll(".row");
    rows.forEach(item => item.removeEventListener("mouseover", color));
    /* console.log("stop"); */
}
function color(e){
    //check if rainbow flag is active, if not active just draw/erase and set data-weight to 0, otherwise apply rainbow effect.
    if(!rainbowFlag){
        e.target.style.backgroundColor = globalColor;                                               //here you can change the color, to be updated to allow different colors throughh selection
        e.target.removeAttribute("data-weight");
    }else {
        rainbow(e);
    }
}

function setupButtons(){
    //sets up all buttons with right event listeners
    let blackBtn, eraserBtn, colorBtn, rainbowBtn, opacityBtn,borderBtn;
    blackBtn = document.querySelector("#black");
    eraserBtn = document.querySelector("#eraser");
    rainbowBtn = document.querySelector("#rainbow");
    borderBtn = document.querySelector("#borderToggle");
    blackBtn.addEventListener("click", e => {
        globalColor = "black";
        rainbowFlag = false;
    });
    eraserBtn.addEventListener("click", e => {
        globalColor = defaultColor;
        rainbowFlag = false;
    });
    rainbowBtn.addEventListener("click", e => {rainbowFlag = !rainbowFlag});
    borderBtn.addEventListener("click", borderToggle);
}

function borderToggle(){
    //toggles class borderActivate on the grid cells
    let rows;
    rows=document.querySelectorAll(".row");
    rows.forEach(item => item.classList.toggle("borderActive"));
}

function rainbow(e){
    //if !data-weight, change to random rgb and set data-weight 0 and data-color: rgb color
    //otherwise  get data weight, rgb color, and set background color as rgb color + rgbColor/9*dataweight
    let weight, decrease;
    let x, y, z;
    let colors;
    let rgb = [0, 0, 0];
    weight = e.target.getAttribute("data-weight");
    weight = parseInt(weight);
    if(weight===9){
        return;
    }else if((weight>=0) && (weight<9)){
        //code
        weight++;
        rgb = e.target.getAttribute("data-color").split(" ");
        for(item in rgb){
            rgb[item]=parseInt(rgb[item]);
            decrease = (255-rgb[item])/9*weight;
            rgb[item]-=decrease;
        }
    }else{
        rgb[0]=Math.floor(255*Math.random());
        rgb[1]=Math.floor(255*Math.random());
        rgb[2]=Math.floor(255*Math.random());
        weight = 0;
    }
    e.target.style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    e.target.setAttribute(`data-weight`, weight.toString());
    e.target.setAttribute(`data-color`, `${rgb[0]} ${rgb[1]} ${rgb[2]}`);

}