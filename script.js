
document.addEventListener("DOMContentLoaded", function() {
    const gridSize = 4; // Adjust grid size as needed
    let grid = [];
    let score = 0; 
    let mybest = localStorage.getItem("mybest");

    if( mybest === undefined) {
        mybest = 0;
    }

    function initializeGrid() {
    
        const gameContainer = document.getElementById("game-container");
        gameContainer.innerHTML = ""; // Clear previous content
    
        for (let i = 0; i < gridSize; i++) {
            grid[i] = [];
            for (let j = 0; j < gridSize; j++) {
                grid[i][j] = 0;
                const tile = document.createElement("div");
                tile.className = "tile";
                tile.textContent =  " " ;//i+ " "+j;
    
                // Set a unique ID for each tile based on its position
                tile.id = `tile-${i}-${j}`;
    
                // Append the tile to the game container
                gameContainer.appendChild(tile);
    
            }
        }
        generaterandomtile();
        updateGrid();
    
    
        
    }
    
    
    function updateGrid() {
        const ScoreLabel = document.getElementById("score");
        if( mybest === null) {
            mybest = 0;
        }
        
        ScoreLabel.innerHTML = "Score: "+ score + "  Best: " + mybest;

        const gameContainer = document.getElementById("game-container");
        gameContainer.innerHTML = ""; // Clear previous content
    
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                const tileValue = grid[i][j];
                if (tileValue >= 0) {
                    // Create a tile element
                    const tile = document.createElement("div");
                    tile.className = "tile";
                    tile.textContent = tileValue;
                    if (tileValue == 0){
                        tile.textContent =  " ";
                    }
                    // 239 183 59 2048
                    /// 239 186 70 1024
                    // 239 190 83 512
                    // 238 194 97 256

                    // 180 163 150
                    // 200 184 172
                    // 2 237 24 213
                    // 4 237 220 195
                    // 8 247 167 115
                    // 16 253 137 93
                    // 32 255 111 86
                    // 64 255 82 54
                    // 128 23 199 112

                    switch(tileValue ){
                        case 2:
                            tile.style.backgroundColor = "rgb(237, 224, 213)"
                            break;
                        case 4:
                            tile.style.backgroundColor = "rgb(237, 220, 195)"
                            break;
                        case 8:
                            tile.style.backgroundColor = "rgb(247, 167, 115)"
                            break;
                        case 16:
                            tile.style.backgroundColor = "rgb(253, 137, 93)"
                            break;
                        case 32:
                            tile.style.backgroundColor = "rgb(255, 111, 86)"
                            break;
                        case 64:
                            tile.style.backgroundColor = "rgb(255, 82, 54)"
                            break;
                        case 128:
                            tile.style.backgroundColor = "rgb(238, 199, 112)"
                            break;
                        case 256:
                            tile.style.backgroundColor = "rgb(238, 194, 97)"
                            break;
                        case 512:
                            tile.style.backgroundColor = "rgb(239, 190, 83)"
                            break;
                        case 1024:                            
                            tile.style.backgroundColor = "rgb(239, 186, 70)"
                            break;
                        case 2048:
                            tile.style.backgroundColor = "rgb(239, 183, 59)"
                        default: 
                            tile.style.backgroundColor = "rgb(200, 184, 172)"
                    }

                    if( tileValue > 4){
                        tile.style.color = "rgb(255, 255, 255)"
                    }
    
                    // Set a unique ID for each tile based on its position
                    tile.id = `tile-${i}-${j}`;
    
                    // Append the tile to the game container
                    gameContainer.appendChild(tile);
                }
            }
        }
    }

    function move(direction){


        switch (direction){
            case "up":
                console.log("up", grid)
                for (let i = 0; i < gridSize; i++) {
                    mylist = []
                    // console.log("here2", mylist)
                    for (let j = 0; j < gridSize; j++) {
                        mylist.push(grid[j][i])
                    }
                    // console.log("here2", mylist)
                    // console.log()
                    mylist = reducerow(mylist, -1)
                    for (let j = 0; j < gridSize; j++) {
                        grid[j][i] = mylist[j]
                    }
                }
                break;
            case "down": 
                console.log("down", grid)
                for (let i = 0; i < gridSize; i++) {
                    mylist = []
                    // console.log("here2", mylist)
                    for (let j = 0; j < gridSize; j++) {
                        mylist.push(grid[j][i])
                    }
                    // console.log("here2", mylist)
                    // console.log()
                    mylist = reducerow(mylist, 1)
                    for (let j = 0; j < gridSize; j++) {
                        grid[j][i] = mylist[j]
                    }
                }
                break;
            case "left":
                for (let i = 0; i < gridSize; i++) {
                    console.log("left", grid[i])
                    grid[i] = reducerow(grid[i], -1)
                    
                }
                break;
            case "right":
                for (let i = 0; i < gridSize; i++) {
                    console.log("right", grid[i])
                    grid[i] = reducerow(grid[i], 1)
                    
                }
                break;
            default:
        }
        generaterandomtile();
        updateGrid();
        checkifgameend();
    }

    function reducerow(row, direction){
        mylist = []
        for (let i = 0; i < gridSize; i++) {
            if (row[i]!= 0){
                mylist.push(row[i])
            }
        }
        mylist = combineduplicates(mylist, direction)
        zeroes = gridSize - (mylist.length )
        let zero = 0
        // console.log("rr1",mylist )
        for(let i = 0; i< zeroes; i++){
            if(direction == 1){
                mylist.unshift(0);
            } else {
                // console.log("here-1")
                mylist.push(0);
            }
        }
        // console.log("post",mylist, direction, zeroes )
        
        return mylist
    }

    function combineduplicates(arr, direction ){
        if (direction == 1){
            arr.reverse()
        }
        
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] == arr[i-1]){
                sum = arr[i]+arr[i-1]
                arr[i-1] = sum
                arr.splice(i, 1);
                score += sum
                if (score >mybest) {
                    mybest = score
                    localStorage.setItem("mybest", score);
                }
            }
        }
        if (direction == 1){
            arr.reverse()
        }
        return arr
    }
    function generaterandomtile (){
        empty_spaces = []
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                if (grid[i][j] == 0){
                    empty_spaces.push([i, j])
                }
            }
        }
        
        const randomIndex = Math.floor(Math.random() * empty_spaces.length);
        const position = empty_spaces[randomIndex];

        // Generate a new tile with a value of 2 or 4
        tileValue = Math.random() < 0.5 ? 2 : 4;

        tileValue = Math.random() < 0.9 ? tileValue : 8;

        // Update the grid and HTML
        grid[position[0]][position[1]] = tileValue;
        
    }

    function checkifgameend(){
        
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                if (grid[i][j] == 0){
                    return false
                }
                if (i > 0 && grid[i][j] == grid[i-1][j]){
                    return false
                }
                if (  j> 0 && grid[i][j] == grid[i][j-1]){
                    return false
                }
            }
        }

        alert("GAME OVER");

        document.body.style.backgroundColor = "red";
        // document.location.reload();

    }


    function handleKeyPress(event) {

        switch (event.key) {
            case "ArrowUp":
                move("up");
                break;
            case "ArrowDown":
                move("down");
                break;
            case "ArrowLeft":
                move("left");
                break;
            case "ArrowRight":
                move("right");
                break;
            default:
    }}
    
    // Set up event listeners
    document.addEventListener("keydown", handleKeyPress);
    
    
    initializeGrid() 
    // updateGrid()});
});
