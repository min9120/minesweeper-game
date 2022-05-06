import { makeAutoObservable } from 'mobx';
import { getRandomInt } from '../utils/randomUtil';

export class Cell {
  cell: number;
  isOpen: boolean;
  isPicked: boolean;

  constructor(cell: number, isOpen: boolean, isPicked: boolean) {
    this.cell = cell;
    this.isOpen = isOpen;
    this.isPicked = isPicked;
  }

  isZero() {
    return this.cell === 0;
  }

  isMine() {
    return this.cell === -1;
  }

  open() {
    this.isOpen = true;
  }
  pickFlag() {
    this.isPicked = true;
  }
  removeFlag() {
    this.isPicked = false;
  }
}

export default class GameStore {
  WIDTH: number = 8;
  TOTAL_MINE: number = 10;
  mineCount: number = this.TOTAL_MINE;

  isOver: boolean = false;
  isStart: boolean = false;
  isWin: boolean = false;

  board: Cell[][] = this.createBoard();

  constructor() {
    makeAutoObservable(this);
  }

  totalCell() {
    return this.WIDTH * this.WIDTH;
  }

  reset() {
    this.isOver = false;
    this.isStart = false;
    this.isWin = false;
    this.mineCount = this.TOTAL_MINE;
    this.board = this.createBoard();
  }

  saveMineCount(count: number) {
    this.mineCount = count;
  }

  saveBoard(board: Cell[][]) {
    this.board = board;
  }

  over() {
    this.isOver = true;
  }

  checkWin() {
    if (this.countOpenCell() === this.totalCell() - this.TOTAL_MINE) {
      this.isWin = true;
    }
  }

  start() {
    this.isStart = true;
  }

  countOpenCell() {
    return this.board.map((value) => value.filter((v) => v.isOpen === true).length).reduce((pre, curr) => pre + curr);
  }

  createBoard() {
    const mineMap = Array.from(Array(this.WIDTH), () => {
      return Array(this.WIDTH)
        .fill(undefined)
        .map(() => {
          return new Cell(0, false, false);
        });
    });

    // 지뢰 랜덤 배치
    for (let i = 0; i < this.TOTAL_MINE; i++) {
      const randomIntX = getRandomInt(this.WIDTH);
      const randomIntY = getRandomInt(this.WIDTH);

      if (mineMap[randomIntX][randomIntY].cell === -1) {
        i--;
        continue;
      }

      mineMap[randomIntX][randomIntY].cell = -1;
    }

    // Cell 주변 지뢰 수 체크
    for (let x = 0; x < this.WIDTH; x++) {
      for (let y = 0; y < this.WIDTH; y++) {
        let mineCount: number = 0;
        if (mineMap[x][y].cell === -1) continue;
        // 윗줄
        if (x > 0) {
          mineMap[x - 1][y].cell === -1 ? mineCount++ : null;
          if (y > 0) {
            mineMap[x - 1][y - 1].cell === -1 ? mineCount++ : null;
          }
          if (y < this.WIDTH - 1) {
            mineMap[x - 1][y + 1].cell === -1 ? mineCount++ : null;
          }
        }
        // 왼쪽
        if (y > 0) {
          mineMap[x][y - 1].cell === -1 ? mineCount++ : null;
        }
        // 오른쪽
        if (y < this.WIDTH - 1) {
          mineMap[x][y + 1].cell === -1 ? mineCount++ : null;
        }
        // 아랫줄
        if (x < this.WIDTH - 1) {
          mineMap[x + 1][y].cell === -1 ? mineCount++ : null;
          if (y > 0) {
            mineMap[x + 1][y - 1].cell === -1 ? mineCount++ : null;
          }
          if (y < this.WIDTH - 1) {
            mineMap[x + 1][y + 1].cell === -1 ? mineCount++ : null;
          }
        }

        mineMap[x][y].cell = mineCount;
      }
    }

    return mineMap;
  }

  openCell(x: number, y: number) {
    const newBoard = [...this.board];
    newBoard[x][y].open();
    this.saveBoard(newBoard);
  }
  pickFlag(x: number, y: number) {
    const newBoard = [...this.board];
    newBoard[x][y].pickFlag();
    this.saveBoard(newBoard);
  }
  removeFlag(x: number, y: number) {
    const newBoard = [...this.board];
    newBoard[x][y].removeFlag();
    this.saveBoard(newBoard);
  }
  openMines() {
    const newBoard = [...this.board];
    for (let x = 0; x < newBoard.length; x++) {
      for (let y = 0; y < newBoard[0].length; y++) {
        if (newBoard[x][y].cell !== -1) continue;
        newBoard[x][y].cell === -1 ? (newBoard[x][y].isOpen = true) : null;
      }
    }
    this.saveBoard(newBoard);
    this.over();
  }

  openSafeCells(x: number, y: number) {
    const newBoard = [...this.board];
    const zeroInCell: { x: number; y: number }[] = [];

    function cellOpen(x: number, y: number) {
      if (newBoard[x][y].isOpen === false) {
        newBoard[x][y].open();
        newBoard[x][y].cell === 0 && zeroInCell.push({ x, y });
      }
    }

    if (x > 0) {
      cellOpen(x - 1, y);

      if (y > 0) {
        cellOpen(x - 1, y - 1);
      }
      if (y < this.WIDTH - 1) {
        cellOpen(x - 1, y + 1);
      }
    }
    // 왼쪽
    if (y > 0) {
      cellOpen(x, y - 1);
    }
    // 오른쪽
    if (y < this.WIDTH - 1) {
      cellOpen(x, y + 1);
    }
    // 아랫줄
    if (x < this.WIDTH - 1) {
      cellOpen(x + 1, y);

      if (y > 0) {
        cellOpen(x + 1, y - 1);
      }
      if (y < this.WIDTH - 1) {
        cellOpen(x + 1, y + 1);
      }
    }
    if (zeroInCell.length) {
      zeroInCell.forEach((cell) => {
        this.openSafeCells(cell.x, cell.y);
      });
    } else {
      this.saveBoard(newBoard);
    }
  }
}

export function createGameStore() {
  return new GameStore();
}
