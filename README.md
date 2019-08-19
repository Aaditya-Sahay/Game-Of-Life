
# Conway's Game of Life | Javascript
A quick tutorial on how to make your very own cellular automaton. For more information about Game of life, you can click [here.](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)

![Game of life](https://cdn.discordapp.com/attachments/598486320427302914/613039842615361546/unknown.png)

###  Rules: 
1.  Any live cell with fewer than two live neighbours dies, as if by underpopulation.
2.  Any live cell with two or three live neighbours lives on to the next generation.
3.  Any live cell with more than three live neighbours dies, as if by overpopulation.
4.  Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

## Libraries Used:
* p5.js

## Tutorial :
1.  ### Setup:
	We will begin with  creating our index.html root file and our index.js script file, where the code for our program will go.
	```bash
		$ touch index.html
		$ mkdir src
		$ touch index.js
	```
	**note** : these commands are only valid for bash, you can proceed to create the files manually as well.
2. ### HTML: 
	Let us quickly set up our HTML file, you can proceed to copy-paste the following. We won't be needing to deal with any HTML in this  tutorial besides this.
	```html
	<!DOCTYPE  html>
	<html  lang="en">
	<head>
		<title>Game of Life - Simulation</title>
		<script  src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/p5.js"></script>
		<script  src="src/index.js"></script>
	</head>
	<body></body>
	</html>
	```
3. ### The Magic Begins : 
	We will be working with our "index.js" file now. P5.js requires two functions to work , **setup( )** function which can be used to initialise and essentially execute function that we want to run only once, and **draw( )**, which is the loop function, any code that we write inside of draw will get executed on a loop.
	```javascript
	function setup() {
		//our setup code goes here
	}

	function draw() {
		//our looping code goes here
	}
	```
4. ### 2D arrays: 
	Javascript by default does not have a 2D array, however, it is quite simple to create one using a for loop.  
	2D arrays are basically arrays inside of an array, which makes them ideal for Grids and other 2-Coordinate systems.
	```javascript
	function  TDArray(cols, rows) {
		var  arr  =  new  Array(cols);
		for (let  i  =  0; i  <  arr.length; i++) {
			arr[i] =  new  Array(rows);
		}
	return  arr
	}
	```
	This function will return us an array whose individual elements can be indexed by array[i][j].
	
5. ### Variables	:
	we will initial some variables that we are going to need later. Starting off, **grid** variable, this is going to hold our 2D array. **cols, rows** will help us navigate through our grid. **resolution** variable is going to determine the number of columns and rows we can fit in our canvas. **initial** will determine the number of cells that will already be alive.
	```javascript
	var  grid;
	var  cols;
	var  rows;
	var  resolution  =  10;
	var  initial  =  300;
	```
	
6. ### Cell Class: 
	We will create a class of cell and assign each grid element to be a cell later.  This lets us leave the handling of each of the cell to themselves. You can definitely go ahead without this step, however, what is happening seems to become a little easier when looked at it this way.
	We want this cell object to know a bit of information about itself. Let us declare our constructor, which will receive the resolution and the column and row index when it is being initialized. 
	```javascript
	class Cell {
	    constructor(w, i, j) {
	        this.i = i;
	        this.j = j;
	        this.x = i * w;
	        this.y = j * w;
	        this.w = w;
	        this.alive = 0;
	    }...
    ```
    **i,j** store the row and column index, while **x,y** are calculated values, that will help us draw small rectangles. **alive** is either going to be 1 or 0 defining whether a cell is alive or not.
    
7. ### Cell Methods: 
	We will be quickly declaring our **show( )** and **update( )** method. However, we will be completing only the show method right now.
	```javascript
	show() {
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
    update() {}
    ```
	 The show method is making a simple decision, based on if the cell is alive or not . If it is not alive, its drawing a white rectangle, and if it is, it is drawing a black rectangle. **rect( )** is a p5.js function that lets us create a rectangle. the first parameter and second parameter, denotes the *x  and y coordinates* and the the remaining two take in values for length and breadth of the rectangle.
	 
8. ### Initial Setup: 
	We have a simple task list to achieve in our setup section. We want to calculate the number of rows and columns we want based on the size of canvas and the resolution variable. We then want to create a grid or a 2D array having the above determined numbers of rows and columns. We then have to assign of each of these indexes to be an object of cell class. Last, and the most fun bit, is randomly deciding which cells are alive in the beginning.
	```javascript
	function setup() {
		//creating a canvas
		createCanvas(801, 801);
		// calculating no of rows and columns. Floor gives us the greatest integer value.
	    cols = floor(width / resolution);
	    rows = floor(height / resolution);
	    //Creating the grid
	    grid = TDArray(cols, rows)
	    //Assigning each element of grid to be an object of cell type.
	    for (let i = 0; i < cols; i++) {
	        for (let j = 0; j < rows; j++) {    
	            grid[i][j] = new Cell(resolution, i, j);
	        }
	    }
	    //Randomly deciding alive cells.
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
	```
9. ### Drawing time:
	We will now complete our draw function. Remember, we wrote a **show** method in our cell class, well because of that, we now just have to call the show method for each grid element and we will be done.
	```javascript
	function draw() {
	    for (let i = 0; i < cols; i++) {
	        for (let j = 0; j < rows; j++) {
	            grid[i][j].show();
	        }
	    }
	}
	```
10. ### The closing act: 
	All there is left to do now is to write the **update( )** method we declared earlier. For this part we will need to a pay attention to the rules that we initially described. 
	For each cell, if it is alive i.e  "alive = 1"  it will die if the neighbours are more than 3 or less than 2. 
If it is not alive i.e "alive = 0" it will be resurrected if it has exactly 3 neighbours.
It is clear that we need some way to determine the number of alive cells in the vicinity of the cell, and then use that to determine if the cell should stay alive or dead or not.
	```javascript
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
	```
	We initialized a **total** variable which will keep count of alive cells. Then we use values -1 to 1 for both columns and rows to access elements one behind in and one ahead. We then increment the value of total if any of the adjacent cells are alive.
	However, we need to also subtract the value of alive for the current cell we are checking for, as when the values of *l and m* are 0, we are actually pointing at the current cell for which we are running the update function.
	We then use the value of **total** to determine the value of alive based on the rules discussed above. 
	Since, the value of a cell remains unchanged if it is alive and has two or three alive neighbouring cells, we don't need to do anything for such a scenario.

### And we are done..
Putting all of these pieces together should give us a working simulation of Conway's game of life.

