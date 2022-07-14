const N = 16;

createGrid(N);

let test;
test=document.querySelector("body");
test.addEventListener("mouseup", stopColor);
test.addEventListener("mousedown", startColor);





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
}

function startColor(){
    let rows;
    rows = document.querySelectorAll(".row");
    rows.forEach(el => el.addEventListener("mouseover", color));
    console.log("start");
}
function stopColor(){
    let rows;
    rows = document.querySelectorAll(".row");
    rows.forEach(item => item.removeEventListener("mouseover", color));
    console.log("stop");
}
function color(e){
    e.target.style.backgroundColor = "black";                                               //here you can change the color, to be updated to allow different colors throughh selection
}

