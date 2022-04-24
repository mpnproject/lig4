class Board {
  constructor(columns, rows, players) {
      this._columns = columns
      this._rows = rows
      this._map = this.createEmptyMap()
      this._players = players
      this._currentPlayer = this._players[0];
  }

  get columns() {
    return this._columns
  }
  
  set columns(_) {
    throw 'Cant change this value'
  }

  get rows() {
    return this._rows
  }
  
  set rows(_) {
    throw 'Cant change this value'
  }
  
  get map() {
    return this._map
  }   
  
  set map(_) {
    throw 'Cant change this value'
  }
  
  get players() {
    return this._players
  }
  
  set players(_) {
    throw 'Cant change this value'
  }
  
  get currentPlayer() {
    return this._currentPlayer
  }
  
  set currentPlayer(player) {
    if(player){
        this._currentPlayer = player
    }
  }

  createEmptyMap() {
    const map = [] 
    for (let i=0; i < this.rows; i++) { 
        map.push(new Array(this.columns))
    }
    return map
  }

  renderMap(container) {
    container.innerText = ''
    
    for(let indexColuna = 0; indexColuna < this.columns; indexColuna++) {
        const column = document.createElement('div') 
        column.classList.add('column')
        column.style.width = `${100/this.columns}%`
        column.dataset.column = indexColuna
        column.addEventListener('click', () => {this.handleClick(indexColuna)})

        for(let indexLinha = 0; indexLinha < this.rows; indexLinha++) {
          const celula = document.createElement('div')
          celula.classList.add('cell')
          celula.style.height = `${100/this.rows}%`
          celula.dataset.row = indexLinha
          column.appendChild(celula)
      }
      container.appendChild(column)
    }
  }

  switchPlayer() {
    const playerCurrent = this.players.indexOf(this.currentPlayer)
    const playerNext = (playerCurrent + 1)%this.players.length
    this.currentPlayer = this.players[playerNext]
  }

  handleClick(column) {
    let row = this.map.findIndex(row => row[column])

    if(row === -1) {
        row = this.rows
    }

    this.map[row - 1][column] = this.currentPlayer

    const cell = new Cell(column, row, this.currentPlayer.className)
    
    cell.render()

    if(this.isWinnableMove(column,row-1)) {
      const winnerText = document.getElementsByClassName("modal-text")[0];
      const modal = document.getElementsByClassName("modal")[0];
      winnerText.innerHTML = `${this.currentPlayer.name} ganhou`;
      modal.style.display = "block";
    }
    
    this.switchPlayer()
  }

  checkVertical(column, row) {
    let end = row + 3

    if(end >= this.rows){
        end = this.rows -1
    }

    let counter = 0
    for (let index = row; index <= end; index++) {
        if(this.map[index][column] === this.currentPlayer) {
            counter++
        } else {
            counter = 0
        }
        if (counter === 4) {
            return true
        }
    }
    return false
  }

  checkHorizontal(row) {
    let end = this.columns -1
    
    let counter = 0
    for (let index = 0; index <= end; index++) {
        if(this.map[row][index] === this.currentPlayer) {
            counter++
        } else {
            counter = 0
        }
        if (counter === 4) {
            return true
        }
    }
    return false
  }

  checkDiagonalRight(column, row) {
    let rowEndDiference = this.rows - row -1;
    let colEndDiference = column;
    let start = 0;
    if (rowEndDiference < colEndDiference) {
      start = rowEndDiference;
    } else if (rowEndDiference >= colEndDiference) {
      start = colEndDiference;
    }
    let rowStart = row + start;
    let colStart = column - start;

    let counter = 0;
    for (let i = 0; i <= (rowStart-colStart) ; i++) {
      if(this.map[rowStart-i][colStart+i] === this.currentPlayer) {
        counter++
      } else {
          counter = 0
      }
      if (counter === 4) {
          return true
      }
    }
    return false
  }

  checkDiagonalLeft(column, row) {
    let rowEndDiference = this.rows - row -1;
    let colEndDiference = this.columns - column - 1;
    let start = 0;
    if (rowEndDiference < colEndDiference) {
      start = rowEndDiference;
    } else if (rowEndDiference >= colEndDiference) {
      start = colEndDiference;
    }
    let rowStart = row + start;
    let colStart = column + start;

    let counter = 0;
    for (let i = 0; i < (this.rows-Math.abs(rowStart-colStart)) ; i++) {
      if(this.map[rowStart-i][colStart-i] === this.currentPlayer) {
        counter++
      } else {
          counter = 0
      }
      if (counter === 4) {
          return true
      }
    }
    return false
  }

  isWinnableMove(column, row) {
    return this.checkVertical(column, row) || 
    this.checkHorizontal(row) || 
    this.checkDiagonalRight(column, row) ||
    this.checkDiagonalLeft(column, row)
  }

  resetMap() {
    for (let i=0; i<this.rows; i++) {
      for (let j=0; j<this.columns; j++) {
        this.map[i][j] = undefined;
      }
    }
    const container = document.getElementById('table');
    this.renderMap(container);
  }
}