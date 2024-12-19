/* 
 * FEN calculator
 * this will parse and calculate the fen and give updated fen
 * its not exactly a calculator but we can give it a move and a fen to give updated fen
*/

function parseFEN(fen) {
    const parts = fen.split(" ");
    const board = parts[0].split("/").map(row => {
        let expandedRow = "";
        for (let char of row) {
            if (isNaN(char)) {
                expandedRow += char; 
            } else {
                expandedRow += "1".repeat(parseInt(char)); 
            }
        }
        return expandedRow;
    });
    const activeColor = parts[1];
    const castlingRights = parts[2];
    const enPassant = parts[3];
    const halfMoveClock = parts[4];
    const fullMoveNumber = parts[5];

    return {
        board,
        activeColor,
        castlingRights,
        enPassant,
        halfMoveClock,
        fullMoveNumber
    };
}

function notationToIndex(notation) {
    const column = notation.charCodeAt(0) - 'a'.charCodeAt(0);
    const row = 8 - parseInt(notation[1], 10);
    return row * 8 + column;
}

function applyMove(fen, move) {
    let parsedFEN = parseFEN(fen);
    let board = parsedFEN.board;

    const from = notationToIndex(move.slice(0, 2));
    const to = notationToIndex(move.slice(2, 4));

    let fromRow = Math.floor(from / 8);
    let fromCol = from % 8;
    let toRow = Math.floor(to / 8);
    let toCol = to % 8;

    if (fromRow < 0 || fromRow >= 8 || fromCol < 0 || fromCol >= 8 || toRow < 0 || toRow >= 8 || toCol < 0 || toCol >= 8) {
        console.error("Invalid move: out of bounds");
        return fen;
    }

    let piece = board[fromRow]?.charAt(fromCol);

    if (!piece || piece === '1') {
        console.log("Invalid move or empty square");
        return fen;
    }

    if (piece.toLowerCase() === 'k' && Math.abs(toCol - fromCol) === 2 && fromRow === toRow) {
        if (piece === 'K') {
            board[toRow] = board[toRow].substr(0, toCol) + 'K' + board[toRow].substr(toCol + 1);
            board[fromRow] = board[fromRow].substr(0, fromCol) + '1' + board[fromRow].substr(fromCol + 1);
            // move the rook
            if (toCol === 6) { // kingside castling
                board[toRow] = board[toRow].substr(0, toCol - 1) + 'R' + board[toRow].substr(toCol); // Move rook to f1
                board[fromRow] = board[fromRow].substr(0, 7) + '1' + board[fromRow].substr(8); // Clear h1
            } else if (toCol === 2) { // Queenside castling
                board[toRow] = board[toRow].substr(0, toCol + 1) + 'R' + board[toRow].substr(toCol + 2); // Move rook to d1
                board[fromRow] = board[fromRow].substr(0, 0) + '1' + board[fromRow].substr(1); // Clear a1
            }
        } else if (piece === 'k') { // black king
            // move the king
            board[toRow] = board[toRow].substr(0, toCol) + 'k' + board[toRow].substr(toCol + 1);
            board[fromRow] = board[fromRow].substr(0, fromCol) + '1' + board[fromRow].substr(fromCol + 1);
            // move the rook
            if (toCol === 6) { // kingside castling
                board[toRow] = board[toRow].substr(0, toCol - 1) + 'r' + board[toRow].substr(toCol); // Move rook to f8
                board[fromRow] = board[fromRow].substr(0, 7) + '1' + board[fromRow].substr(8); // Clear h8
            } else if (toCol === 2) { // queenside castling
                board[toRow] = board[toRow].substr(0, toCol + 1) + 'r' + board[toRow].substr(toCol + 2); // Move rook to d8
                board[fromRow] = board[fromRow].substr(0, 0) + '1' + board[fromRow].substr(1); // Clear a8
            }
        }
    } else {
        board[toRow] = board[toRow].substr(0, toCol) + piece + board[toRow].substr(toCol + 1); // Place the piece in the new position
        board[fromRow] = board[fromRow].substr(0, fromCol) + "1" + board[fromRow].substr(fromCol + 1); // Clear the original square
    }

    let newCastlingRights = parsedFEN.castlingRights;

    if (piece.toLowerCase() === 'k') {
        if (piece === 'K') {
            newCastlingRights = newCastlingRights.replace('K', '').replace('Q', '');
        } else if (piece === 'k') {
            newCastlingRights = newCastlingRights.replace('k', '').replace('q', '');
        }
    } else if (piece.toLowerCase() === 'r') {
        if (piece === 'R') {
            if (fromCol === 0) {
                newCastlingRights = newCastlingRights.replace('K', '').replace('Q', '');
            } else if (fromCol === 7) {
                newCastlingRights = newCastlingRights.replace('K', '').replace('Q', '');
            }
        } else if (piece === 'r') {
            if (fromCol === 0) {
                newCastlingRights = newCastlingRights.replace('k', '').replace('q', '');
            } else if (fromCol === 7) {
                newCastlingRights = newCastlingRights.replace('k', '').replace('q', '');
            }
        }
    }

    if (newCastlingRights === "") newCastlingRights = "-";

    let newActiveColor = (parsedFEN.activeColor === 'w') ? 'b' : 'w';

    let newFEN = board.join("/") + " " + newActiveColor + " " + newCastlingRights + " " + parsedFEN.enPassant + " " + parsedFEN.halfMoveClock + " " + parsedFEN.fullMoveNumber;
    return newFEN;
}

const startingFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

// code below is depricated
function checkCastle(oldFen, move) {
    const parsedFEN = parseFEN(oldFen);
    const board = parsedFEN.board;

    const from = notationToIndex(move.slice(0, 2));
    const to = notationToIndex(move.slice(2, 4));

    const fromRow = Math.floor(from / 8);
    const fromCol = from % 8;
    const toRow = Math.floor(to / 8);
    const toCol = to % 8;

    const piece = board[fromRow]?.charAt(fromCol);

    if (piece.toLowerCase() !== 'k') {
        return false;
    }

    if (Math.abs(toCol - fromCol) === 2 && fromRow === toRow) {
        if (piece === 'K') {
            if (move === "e1g1") return "White Kingside Castling";
            if (move === "e1c1") return "White Queenside Castling";
        } else if (piece === 'k') {
            if (move === "e8g8") return "Black Kingside Castling";
            if (move === "e8c8") return "Black Queenside Castling";
        }

        return true;
    }

    return false;
}
