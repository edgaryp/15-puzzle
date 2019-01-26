export default class Tile {
  constructor(tile, tiles, puzzleDimension) {
    this.tile = tile;
    this.tiles = tiles;
    this.tileIndex = tiles.indexOf(tile);
    this.puzzleDimension = puzzleDimension;
  }

  getTileNeighbors() {
    return {
      top: this.tiles[this.tileIndex - this.puzzleDimension] === 0 ? 'empty' : this.tiles[this.tileIndex - this.puzzleDimension] || null,
      right: this.tileIndex % this.puzzleDimension !== this.puzzleDimension - 1 ? this.tiles[this.tileIndex + 1] || 'empty' : null,
      bottom: this.tiles[this.tileIndex + this.puzzleDimension] === 0 ? 'empty' : null,
      left: this.tileIndex % this.puzzleDimension ? this.tiles[this.tileIndex - 1] || 'empty' : null
    };
  }

  getTileMovement() {
    const neighbors = this.getTileNeighbors();
    const { top, right, bottom, left } = neighbors;
    return top === 'empty' || right === 'empty' || left === 'empty' || bottom === 'empty';
  }

  getTile() {
    return {
      label: this.tile,
      index: this.tileIndex,
      neighbors: this.getTileNeighbors(),
      movement: this.getTileMovement()
    };
  }
}
