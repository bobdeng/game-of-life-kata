<template>
  <div>
    <div>
      <canvas width="400" height="400" id="game_canvas" style="border: black 1px solid;"/>
    </div>
    <div>
      <button @click="begin" id="button_begin">开始</button>
    </div>
  </div>

</template>

<script>

import Game from "../game";

export default {
  name: "Game",
  data: () => {
    return {
      game: undefined
    }
  },
  methods: {
    begin: function () {
      this.game = new Game(100, this.generator())
      this.drawGame()
      if (this.interval) {
        clearInterval(this.interval)
      }
      this.interval = setInterval(this.next, 100)
    },
    drawGame() {
      let context = this.context()
      this.game.draw((i, j, alive) => {
        let blockSize = 4;
        context.clearRect(i * blockSize, j * blockSize, blockSize, blockSize)
        if (alive) {
          context.fillRect(i * blockSize, j * blockSize, blockSize, blockSize);
          return;
        }
      })
    },
    generator() {
      return () => Math.random() > 0.8;
    },
    context() {
      const canvas = document.getElementById("game_canvas");
      return canvas.getContext("2d");
    },
    next() {
      this.game.nextGeneration()
      this.drawGame()
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>