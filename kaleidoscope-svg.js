const SQUARE_UNITS = 8;
const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
const SOLUTION_BORDER_STROKE_WIDTH = 1.5;

const makeElement = (name) => document.createElementNS(SVG_NAMESPACE, name);

// Makes a base SVG with the right dimensions.
const makeBaseSvg = (size) => {
    const svg = makeElement("svg");
    svg.setAttribute("width", `${size}`);
    svg.setAttribute("height", `${size}`);
    const lowBound = -0.5*SOLUTION_BORDER_STROKE_WIDTH;
    const widthAndHeight = 8*SQUARE_UNITS + SOLUTION_BORDER_STROKE_WIDTH;
    svg.setAttribute("viewBox", `${lowBound} ${lowBound} ${widthAndHeight} ${widthAndHeight}`);
    svg.style["shape-rendering"] = "crispEdges";
    return svg;
}

const squareElement = (i,j,colour,faint=false) => {
    let fillStyle = undefined;
    switch (colour) {
        case "R":
            fillStyle = "#ef1e02";
            break;
        case "B":
            fillStyle = "#111111";
            break;
        case "L":
            fillStyle = "#3366FF";
            break;
        case "Y":
            fillStyle = "#efd300";
            break;
        case "UNSET":
            fillStyle = "#bbbbbb";
            break;
        default:
            throw new Error();
    }

    if (faint) {
        fillStyle += "90";
    }

    const rect = makeElement("rect");
    const [x,y] = xyCoords(i,j);
    rect.setAttribute("x", `${x}`);
    rect.setAttribute("y", `${y}`);
    rect.setAttribute("width", `${SQUARE_UNITS}`);
    rect.setAttribute("height", `${SQUARE_UNITS}`);
    rect.setAttribute("fill", fillStyle);
    return rect;
}

const xyCoords = (x,y) => [x*SQUARE_UNITS, y*SQUARE_UNITS];

const lineBetweenSquares = (i,j,dir) => {
    let a1,b1,a2,b2;
    const adjust = SOLUTION_BORDER_STROKE_WIDTH / 2;
    if (dir === "horizontal") {
        [a1,b1] = xyCoords(i,j+1);
        [a2,b2] = xyCoords(i+1,j+1);
        a1 -= adjust;
        a2 += adjust;
    } else {
        [a1,b1] = xyCoords(i+1,j);
        [a2,b2] = xyCoords(i+1,j+1);
        b1 -= adjust;
        b2 += adjust;
    }
    const line = makeElement("line");
    line.setAttribute("x1", `${a1}`);
    line.setAttribute("y1", `${b1}`);
    line.setAttribute("x2", `${a2}`);
    line.setAttribute("y2", `${b2}`);
    line.setAttribute("stroke-width", `${SOLUTION_BORDER_STROKE_WIDTH}`);
    line.setAttribute("stroke", "#FFF");
    return line;
}

const outerLines = () => {
    const corners = [[0,0],[0,8],[8,8],[8,0]];
    const results = [];
    for (let i = 0; i < corners.length; i++) {
        const [x1,y1] = corners[i];
        const [x2,y2] = corners[(i+1)%corners.length];
        const [cx1, cy1] = xyCoords(x1, y1);
        const [cx2, cy2] = xyCoords(x2, y2);
        // if (x1 === x2) { // vertical
        //     cyStart = Math.max(x1)
        //     cy2 += 
        // }

        const line = makeElement("line");
        line.setAttribute("x1", `${cx1}`);
        line.setAttribute("y1", `${cy1}`);
        line.setAttribute("x2", `${cx2}`);
        line.setAttribute("y2", `${cy2}`);
        line.setAttribute("stroke-width", `${SOLUTION_BORDER_STROKE_WIDTH}`);
        line.setAttribute("stroke", "#FFF");
        results.push(line);
    }
    return results;
}

const getAllBorders = solution => {
    const belonging = [
        Array(8),
        Array(8),
        Array(8),
        Array(8),
        Array(8),
        Array(8),
        Array(8),
        Array(8),
    ];
    for (const [name, cells] of solution) {
        for (const [[x,y], _colour] of cells) {
            belonging[y][x] = name;
        }
    }
    const borders = [];
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const sq = belonging[j][i];
            if (i != 7) {
                const right = belonging[j][i+1];
                if (sq !== right) {
                    borders.push([i,j,"vertical"]);
                }
            }
            if (j != 7) {
                const down = belonging[j+1][i];
                if (sq !== down) {
                    borders.push([i,j,"horizontal"]);
                }
            }
        }
    }
    return borders;
}

const drawBoard = (board, size) => {
    const svg = makeBaseSvg(size);
    for (const [y, row] of board.entries()) {
        for (const [x, colour] of row.entries()) {
            const square = squareElement(x,y,colour);
            svg.appendChild(square);
        }
    }
    return svg;
}

// Draws partial solutinos too.
function drawSolution(solution, board, size) {
    const svg = makeBaseSvg(size);
    const drawnCells = [
        [false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false],
    ]
    for (const [_, cells] of solution) {
        for (const [[x,y], colour] of cells) {
            const square = squareElement(x,y,colour);
            drawnCells[y][x] = true;
            svg.appendChild(square);
        }
    }

    for (const [y,row] of drawnCells.entries()) {
        for (const [x,wasDrawn] of row.entries()) {
            if (!wasDrawn) {
                const colour = board[y][x];
                const square = squareElement(x,y,colour,true);
                drawnCells[y][x] = true;
                svg.appendChild(square);
            }
        }
    }

    const borders = getAllBorders(solution);
    for (const [i,j,type] of borders) {
        const line = lineBetweenSquares(i,j,type);
        svg.appendChild(line);
    }
    for (const line of outerLines()) {
        svg.appendChild(line);
    }
    return svg;
}