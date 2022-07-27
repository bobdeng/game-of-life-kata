export default class Game {

    constructor(size, generator) {
        this.size = size;
        this.generator = generator;
        this.matrix = this.newMatrix(this.generator);

    }

    newMatrix(generator) {
        const matrix = []
        for (let i = 0; i < this.size; i++) {
            let line = [];
            for (let j = 0; j < this.size; j++) {
                line.push(generator(i, j))
            }
            matrix.push(line)
        }
        return matrix;
    }

    draw(callback) {
        this.iteration(callback);
    }

    iteration(callback) {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                callback(i, j, this.matrix[i][j])
            }
        }
    }

    getAliveNeibor(line, col) {
        let aliveCount = 0;
        for (let k = line - 1; k <= line + 1; k++) {
            for (let l = col - 1; l <= col + 1; l++) {
                if (k === line && l === col) {
                    continue;
                }
                if (k < 0 || l < 0 || k >= this.size || l >= this.size) {
                    continue;
                }
                if (this.matrix[k][l]) {
                    aliveCount++;
                }
            }
        }
        return aliveCount;
    }

    nextGeneration() {
        let newMatrix = this.newMatrix(() => false);
        this.iteration((i, j, alive) => {
            let aliveCount = this.getAliveNeibor(i, j);
            if (alive) {
                if (aliveCount < 2 || aliveCount > 3) {
                    newMatrix[i][j] = false
                } else {
                    newMatrix[i][j] = true
                }
                return;
            }
            if (aliveCount === 3) {
                newMatrix[i][j] = true
            }
        })
        this.matrix = newMatrix
    }
}
