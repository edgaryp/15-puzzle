export default class Tile {
  constructor(tile, tiles, puzzleDimension) {
    this.tile = tile;
    this.tiles = tiles;
    this.tileIndex = tiles.indexOf(tile);
    this.puzzleDimension = puzzleDimension;
  }

  getTileNeighbors() {
    return {
      /**
       * Top/Bottom: vertical empty space will always be 4 indexes ahead/behind of current tile in tiles array.
       * Right/Left: horizontal empty space will always be 1 index ahead/behind of current tile in tiles array. Last/first tile in it's row will have no neighbours, so avoid that I check tiles position in row with reaminder between current tile index and row length.
       */
      top: this.tiles[this.tileIndex - this.puzzleDimension] === 0 ? 'empty' : this.tiles[this.tileIndex - this.puzzleDimension] || null,
      right: this.tileIndex % this.puzzleDimension !== this.puzzleDimension - 1 ? this.tiles[this.tileIndex + 1] || 'empty' : null,
      bottom: this.tiles[this.tileIndex + this.puzzleDimension] === 0 ? 'empty' : null,
      left: this.tileIndex % this.puzzleDimension ? this.tiles[this.tileIndex - 1] || 'empty' : null,
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
      movement: this.getTileMovement(),
    };
  }
}
