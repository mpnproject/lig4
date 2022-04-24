class Cell {
  constructor(posicaoColuna, posicaoLinha, className) {
      this._className = className
      this._coluna = posicaoColuna
      this._linha = posicaoLinha
  }

  get coluna() {
    return this._coluna
  }

  set coluna(_) {
      throw 'Cant change this value'
  }

  get linha() {
      return this._linha
  }

  set linha(_) {
      throw 'Cant change this value'
  }

  get className() {
      return this._className
  }

  set className(_) {
      throw 'Cant change this value'
  }

  render() {
    const div = document.querySelector(`.column[data-column="${this.coluna}"] > .cell[data-row="${this.linha - 1}"]`)
    div.innerText = ''

    const playerDiv = document.createElement('div')
    playerDiv.classList.add(this.className)
    div.appendChild(playerDiv)
  }
}