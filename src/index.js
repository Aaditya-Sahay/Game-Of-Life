
// creating a 2D array

function TDArray(cols, rows) {
    var arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr
}


class Cell {
    constructor(w, i, j) {
        this.i = i;
        this.j = j;
        this.x = i * w;
        this.y = j * w;
        this.w = w;
        this.alive = 0;
    }
    show() {
        this.update()
        if (!this.alive) {
            fill(255)
            stroke(255)
            rect(this.x, this.y, this.w, this.w);
        } else {
            fill(0)
            stroke(0) 
            rect(this.x, this.y, this.w, this.w);
        }

    }
    update() {
        var total = 0;
        for (var l = -1; l < 2; l++) {
            for (var m = -1; m < 2; m++) {
                var i = this.i + l
                var j = this.j + m
                if (i > -1 && i < cols && j > -1 && j < rows) {
                    var adjacent = grid[i][j];
                    total += adjacent.alive
                }
            }
        }
        total -= this.alive

        if (this.alive == 1 && (total < 2 || total > 3)) {
            this.alive = 0
        }else if (this.alive == 0 && total == 3) {
           this.alive = 1
        }
    }
    
}


var grid;
var cols;
var rows;
var resolution = 10;
var initial = 400;


function setup() {
    createCanvas(801, 801);
    cols = floor(width / resolution);
    rows = floor(height / resolution);
    grid = TDArray(cols, rows)
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {    
            grid[i][j] = new Cell(resolution, i, j);
        }
    }
    let n = 0
    while (n < initial) {
        var i = floor(random(cols))
        var j = floor(random(rows))
        if (!grid[i][j].alive) {
            grid[i][j].alive = 1;
            n++;
        }
    }
}

function draw() {
    background(255)
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].show();
        }
    }
}