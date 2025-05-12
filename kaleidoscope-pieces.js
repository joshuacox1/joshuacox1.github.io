const PIECE_SET = new Map([
    ["O1R", [
        [[[0,0],"R"]],
        [[[0,0],"B"]],
    ].sort()],
    ["O1B", [
        [[[0,0],"B"]],
        [[[0,0],"L"]],
    ].sort()],
    ["I2", [
        [[[0,0],"R"], [[0,1],"B"]],
        [[[0,0],"B"], [[0,1],"L"]],
    ].sort()],
    ["I3R", [
        [[[0,0],"R"], [[0,1],"B"], [[0,2],"R"]],
        [[[0,0],"L"], [[0,1],"B"], [[0,2],"Y"]],
    ].sort()],
    ["I3B", [
        [[[0,0],"B"], [[0,1],"R"], [[0,2],"B"]],
        [[[0,0],"B"], [[0,1],"Y"], [[0,2],"B"]],
    ].sort()],
    ["L3R", [
        [[[0,0],"R"], [[1,0],"B"], [[1,1],"R"]],
        [[[0,0],"L"], [[1,0],"B"], [[1,1],"Y"]],
    ].sort()],
    ["L3B", [
        [[[0,0],"B"], [[1,0],"R"], [[1,1],"B"]],
        [[[0,0],"B"], [[1,0],"Y"], [[1,1],"B"]],
    ].sort()],
    ["L4BS", [
        [[[2,0],"R"], [[1,0],"B"], [[0,0],"R"], [[0,1], "B"]],
        [[[2,1],"B"], [[2,0],"L"], [[1,0],"B"], [[0,0], "Y"]],
    ].sort()],
    ["L4RS", [
        [[[2,0],"B"], [[1,0],"R"], [[0,0],"B"], [[0,1], "R"]],
        [[[2,1],"B"], [[2,0],"Y"], [[1,0],"B"], [[0,0], "L"]],
    ].sort()],
    ["G4BS", [
        [[[2,1],"B"], [[2,0],"R"], [[1,0],"B"], [[0,0], "R"]],
        [[[2,0],"B"], [[1,0],"Y"], [[0,0],"B"], [[0,1], "L"]],
    ].sort()],
    ["G4RS", [
        [[[2,1],"R"], [[2,0],"B"], [[1,0],"R"], [[0,0], "B"]],
        [[[2,0],"B"], [[1,0],"L"], [[0,0],"B"], [[0,1], "Y"]],
    ].sort()],
    ["S4", [
        [[[0,0],"R"], [[0,1],"B"], [[1,1],"R"], [[1,2], "B"]],
        [[[0,0],"Y"], [[1,0],"B"], [[1,1],"L"], [[2,1], "B"]],
    ].sort()],
    ["Z4", [
        [[[0,0],"R"], [[1,0],"B"], [[1,1],"R"], [[2,1], "B"]],
        [[[0,0],"L"], [[0,1],"B"], [[1,1],"Y"], [[1,2], "B"]],
    ].sort()],
    ["T4R", [
        [[[0,0],"R"], [[1,0],"B"], [[2,0],"R"], [[1,1], "R"]],
        [[[0,0],"B"], [[1,0],"L"], [[2,0],"B"], [[1,1], "B"]],
    ].sort()],
    ["T4B", [
        [[[0,0],"B"], [[1,0],"R"], [[2,0],"B"], [[1,1], "B"]],
        [[[0,0],"Y"], [[1,0],"B"], [[2,0],"L"], [[1,1], "Y"]],
    ].sort()],
    ["O4", [
        [[[0,0],"B"], [[1,0],"R"], [[0,1],"R"], [[1,1], "B"]],
        [[[0,0],"B"], [[1,0],"L"], [[0,1],"Y"], [[1,1], "B"]],
    ].sort()],
    ["L4", [
        [[[0,0],"B"], [[1,0],"R"], [[2,0],"B"], [[3,0], "R"]],
        [[[0,0],"B"], [[1,0],"Y"], [[2,0],"B"], [[3,0], "L"]],
    ].sort()],
    ["L8", [
        [[[0,0],"B"], [[1,0],"R"], [[2,0],"B"], [[3,0], "R"], [[4,0],"B"], [[5,0],"R"], [[6,0],"B"], [[7,0], "R"]],
        [[[0,0],"B"], [[1,0],"Y"], [[2,0],"B"], [[3,0], "L"], [[4,0],"B"], [[5,0],"Y"], [[6,0],"B"], [[7,0], "L"]],
    ].sort()],
]);

const ROTATIONS = [
    (x,y) => [x,y],
    (x,y) => [-y,x],
    (x,y) => [-x,-y],
    (x,y) => [y,-x],
];

const transform = (side, f) => {
    const results = [];
    for (const cell of side) {
        let [[x,y], colour] = cell;
        let [x_,y_] = f(x,y);
        // console.log(cell, x,y,colour,x_,y_);
        if (0 <= x_ && x_ < 8 && 0 <= y_ && y_ < 8) {
            results.push([[x_,y_], colour]);
        } else {
            return null;
        }
    }
    return results.sort();
}

const SETS = new Map();
for (const [pieceName, sides] of PIECE_SET.entries()) {
    const placementSet = new Set();
    for (const side of sides) {
        for (let i = -8; i <= 8; i++) {
            for (let j = -8; j <= 8; j++) {
                for (const rotation of ROTATIONS) {
                    const pos = transform(side, (x,y) => rotation(x+i,y+j));
                    if (pos !== null) {
                        placementSet.add(JSON.stringify(pos));
                    }
                }
            }
        }
    }
    SETS.set(pieceName, placementSet);
}
const ALL_PLACEMENTS = new Map();
for (const [pieceName, placementStrs] of SETS.entries()) {
    const list = [];
    for (const placementStr of placementStrs) {
        const placement = JSON.parse(placementStr);
        list.push(placement);
    }
    ALL_PLACEMENTS.set(pieceName, list);
}

const NUM_PIECES = PIECE_SET.size;
const PIECE_NAME_INDEX = new Map();

const f = () => {
    let i = 0;
    for (const pieceName of PIECE_SET.keys()) {
        PIECE_NAME_INDEX.set(pieceName, i);
        i += 1;
    }
}
f();


/* Examples */

const BABY_ELEPHANT = [
    ['B','R','B','R','B','R','B','R'],
    ['R','B','R','B','R','B','R','B'],
    ['B','R','B','R','B','R','B','R'],
    ['R','B','R','R','R','B','R','B'],
    ['R','B','B','B','R','R','B','R'],
    ['B','R','B','B','B','B','R','B'],
    ['R','R','R','B','B','B','R','R'],
    ['B','R','R','B','R','B','R','B'],
];
const GAMES_BOARD = (() => {
    const b = "B";
    const r = "R";
    const l = "L";
    const y = "Y";
    return [
        [l,b,l,b,l,b,l,b],
        [b,y,b,y,b,y,b,l],
        [l,b,y,b,y,b,y,b],
        [b,y,b,l,b,y,b,l],
        [l,b,y,b,l,b,y,b],
        [b,y,b,y,b,y,b,l],
        [l,b,y,b,y,b,y,b],
        [b,l,b,l,b,l,b,l],
    ];
})();
const STARSHIP = (() => {
    const b = "B";
    const r = "R";
    const l = "L";
    const y = "Y";
    return [
        [b,l,b,l,b,y,b,l],
        [l,b,b,b,b,b,l,b],
        [b,b,y,y,y,y,b,y],
        [l,b,y,y,b,b,l,b],
        [b,b,y,b,l,l,b,l],
        [y,b,y,b,l,b,y,b],
        [b,l,b,l,b,y,b,y],
        [l,b,y,b,l,b,y,b],
    ];
})();
const GOLDFISH = (() => {
    const b = "B";
    const r = "R";
    const l = "L";
    const y = "Y";
    return [
        [b,y,b,l,b,y,b,l],
        [y,b,b,b,y,b,l,b],
        [b,b,r,r,b,l,b,y],
        [l,b,r,r,r,b,y,b],
        [b,y,b,r,b,y,b,l],
        [y,b,l,b,y,b,l,b],
        [b,l,b,y,b,l,b,y],
        [l,b,y,b,l,b,y,b],
    ];
})();
const QUESTION_MARK = [
    ["B","L","B","Y","B","L","B","Y"],
    ["Y","B","L","R","R","B","L","B"],
    ["B","Y","B","B","R","Y","B","L"],
    ["L","B","Y","R","R","B","Y","B"],
    ["B","L","B","R","B","L","B","Y"],
    ["Y","B","L","B","Y","B","L","B"],
    ["B","Y","B","R","B","Y","B","L"],
    ["L","B","Y","B","L","B","Y","B"],
];
const DOMINOES_CLASH = [
    ["B","B","R","R","B","B","R","R"],
    ["B","R","B","B","R","R","B","B"],
    ["R","B","R","R","B","B","R","R"],
    ["R","B","R","B","R","R","B","B"],
    ["B","R","B","R","B","B","R","R"],
    ["B","R","B","R","B","R","B","B"],
    ["R","B","R","B","R","B","R","R"],
    ["R","B","R","B","R","B","R","B"],
];
const SIGNAL_MAN = [
    ["B","R","B","R","B","R","B","R"],
    ["R","B","R","B","R","B","R","B"],
    ["B","R","B","R","R","R","B","R"],
    ["R","B","B","B","Y","B","Y","B"],
    ["B","Y","Y","L","B","L","Y","B"],
    ["B","B","B","L","L","L","B","B"],
    ["R","B","B","R","R","R","B","R"],
    ["B","B","R","R","B","R","R","B"],
];
const LONG_STEM_ROSE = (() => {
    const b = "B";
    const r = "R";
    const l = "L";
    const y = "Y";
    return [
        [l,b,y,b,l,b,y,b],
        [b,l,b,r,b,y,b,y],
        [y,b,r,r,b,b,y,b],
        [b,r,r,r,b,l,b,l],
        [l,b,b,b,r,b,l,b],
        [b,y,b,l,b,r,b,y],
        [y,b,y,b,l,b,r,b],
        [b,y,b,l,b,y,b,l],
    ];
})();
const VOLCANO = (() => {
    const b = "B";
    const r = "R";
    const l = "L";
    const y = "Y";
    return [
        [l,b,r,b,r,b,r,b],
        [b,l,b,r,b,r,b,r],
        [r,b,y,b,r,b,b,b],
        [b,r,b,y,b,b,r,r],
        [r,b,r,b,r,r,r,b],
        [b,r,b,b,r,r,b,r],
        [r,b,b,r,r,b,r,b],
        [b,r,b,r,b,r,b,r],
    ];
})();
const HOT_AIR_BALLOON = (() => {
    const b = "B";
    const r = "R";
    const l = "L";
    const y = "Y";
    return [
        [b,l,b,l,b,l,b,l],
        [y,b,y,b,r,b,y,b],
        [b,y,b,r,r,r,b,y],
        [l,b,r,r,b,r,r,b],
        [b,l,b,r,r,r,b,l],
        [y,b,y,b,r,b,y,b],
        [b,y,b,y,b,y,b,y],
        [l,b,l,b,r,b,l,b],
    ];
})();
const CITY_SQUARE = (() => {
    const b = "B";
    const r = "R";
    return [
        [r,b,r,b,r,b,r,b],
        [b,b,r,b,r,b,r,r],
        [r,r,b,r,b,r,b,b],
        [b,b,r,b,r,b,r,r],
        [r,r,b,r,b,r,b,b],
        [b,b,r,b,r,b,r,r],
        [r,r,b,r,b,r,b,b],
        [b,r,b,r,b,r,b,r],
    ];
})();
const BAMBI = (() => {
    const b = "B";
    const r = "R";
    return [
        [b,r,b,r,b,r,b,r],
        [r,b,r,b,r,b,r,b],
        [b,r,b,r,r,r,b,r],
        [r,b,b,b,r,r,b,b],
        [b,r,r,r,r,b,b,r],
        [b,b,r,r,r,b,r,b],
        [r,b,r,b,r,b,b,r],
        [b,b,r,b,r,b,r,b],
    ];
})();
const THE_SPIDER = (() => {
    const b = "B";
    const r = "R";
    const l = "L";
    return [
        [r,b,r,b,r,b,r,b],
        [b,r,b,r,b,r,r,r],
        [r,b,r,r,r,b,b,b],
        [b,r,r,b,b,b,r,r],
        [r,b,r,b,b,l,b,b],
        [b,r,b,b,l,b,r,r],
        [r,r,b,r,b,r,b,b],
        [b,r,b,r,b,r,b,r],
    ];
})();
const CUSTOM = [
    ["UNSET", "UNSET", "UNSET", "UNSET", "UNSET", "UNSET", "UNSET", "UNSET"],
    ["UNSET", "UNSET", "UNSET", "UNSET", "UNSET", "UNSET", "UNSET", "UNSET"],
    ["UNSET", "UNSET", "UNSET", "UNSET", "UNSET", "UNSET", "UNSET", "UNSET"],
    ["UNSET", "UNSET", "UNSET", "UNSET", "UNSET", "UNSET", "UNSET", "UNSET"],
    ["UNSET", "UNSET", "UNSET", "UNSET", "UNSET", "UNSET", "UNSET", "UNSET"],
    ["UNSET", "UNSET", "UNSET", "UNSET", "UNSET", "UNSET", "UNSET", "UNSET"],
    ["UNSET", "UNSET", "UNSET", "UNSET", "UNSET", "UNSET", "UNSET", "UNSET"],
    ["UNSET", "UNSET", "UNSET", "UNSET", "UNSET", "UNSET", "UNSET", "UNSET"],
];

const EXAMPLES = [
    ["example1", "custom", CUSTOM],
    ["example2", "elephant", BABY_ELEPHANT],
    ["example3", "starship", STARSHIP],
    ["example4", "city-square", CITY_SQUARE],
    ["example5", "volcano", VOLCANO],
    ["example6", "long-stem-rose", LONG_STEM_ROSE],
    ["example7", "bambi", BAMBI],
    ["example8", "hot-air-balloon", HOT_AIR_BALLOON],
    ["example9", "question-mark", QUESTION_MARK],
    ["example10", "signal-man", SIGNAL_MAN],
    ["example11", "games-board", GAMES_BOARD],
    ["example12", "the-spider", THE_SPIDER],
];

/* Now the code */

// Takes a board array a[8][8] and turns it into a generator of solutions.
// set showPartialSolutions to true to get partial solutions
function* solveBoard(board, showPartialSolutions) {
    const NUM_CONSTRAINT_COLUMNS = NUM_PIECES + 8*8; // 82
    const placementIndex = [];
    const constraints = [];
    for (const [pieceName, placements] of ALL_PLACEMENTS.entries()) {
        for (const placement of placements) {
            if (placement.every(cell => {
                const [[x,y], c] = cell;
                return board[y][x] === c; // important y/x flip
            })) {
                placementIndex.push([pieceName, placement]);
                // There are 18+64=82 constraint columns: 18, one for
                // each piece, then 64, one for each square.
                const constraint = [PIECE_NAME_INDEX.get(pieceName)];
                for (const cell of placement) {
                    const [[x,y], _] = cell;
                    constraint.push(NUM_PIECES+x+y*8);
                }
                constraints.push(constraint);
            }
        }
    }

    const gen = dlxSolveOnes(
        constraints, NUM_CONSTRAINT_COLUMNS, showPartialSolutions);

    for (const output of gen) {
        let [outputType, result] = output;
        const actual = result.map(i => placementIndex[i]);
        yield [outputType, actual];
    }
}