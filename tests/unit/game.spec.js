import Game from "../../src/game"

describe("生命游戏", () => {
    it('初始化游戏，随机产生第一代', function () {
        const game = new Game(2, (i, j) => i === 0);
        const lines = [];
        game.draw((x, y, alive) => {
            lines.push(`x=${x};y=${y};alive=${alive}`)
        })
        expect(lines.length).toBe(4)
        expect(lines).toEqual([
            'x=0;y=0;alive=true',
            'x=0;y=1;alive=true',
            'x=1;y=0;alive=false',
            'x=1;y=1;alive=false'
        ])
    });
    it('四个点都是活着，稳定 ', function () {
        const game = new Game(2, (i, j) => true);
        const lines = [];
        game.nextGeneration();
        game.draw((x, y, alive) => {
            lines.push(`x=${x};y=${y};alive=${alive}`)
        })
        expect(lines.length).toBe(4)
        expect(lines).toEqual([
            'x=0;y=0;alive=true',
            'x=0;y=1;alive=true',
            'x=1;y=0;alive=true',
            'x=1;y=1;alive=true'
        ])
    });
    it('当周围数量小于2，死亡', function () {
        const game = new Game(3, (i, j) => {
            return i === 1 && j === 1;
        });
        const lines = [];
        game.nextGeneration();
        game.draw((x, y, alive) => {
            lines.push(`x=${x};y=${y};alive=${alive}`)
        })
        expect(lines).toEqual([
            'x=0;y=0;alive=false',
            'x=0;y=1;alive=false',
            'x=0;y=2;alive=false',
            'x=1;y=0;alive=false',
            'x=1;y=1;alive=false',
            'x=1;y=2;alive=false',
            'x=2;y=0;alive=false',
            'x=2;y=1;alive=false',
            'x=2;y=2;alive=false',
        ])
    });
})