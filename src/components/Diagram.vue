<template>
  <div>
    <svg v-bind:width="width" v-bind:height="height">
      <circle v-for="point in points" :cx="point.x" :cy="height - point.y" @click="train(point)" :fill="pointColor(point.team)" r="5"></circle>
      <line x1="0" :x2="width" :y1="height" y2="0" stroke="#000000"/>
    </svg>
    <footer class="footer">
      <button class="regenerate" type="button" @click="generatePoints">Regenerate points</button>
      <div class="weights">
        <p class="weights_weight">Weight for x is <span>{{ weights.x }}</span></p>
        <p class="weights_weight">Weight for y is <span>{{ weights.y }}</span></p>
      </div>
      <div class="learning-rate">
        <p class="learning-rate_header">Learning rate:</p>
        <input type="number" class="learning-rate_field" v-model="learningRate" />
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Diagram',
  data() {
    return {
      width: 0,
      height: 0,
      points: this.$R.range(0, 500),
      weights: { x: this.rand(-1, 1), y: this.rand(-1, 1) },
      learningRate: 0.1
    };
  },
  methods: {
    resize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight - 150;

      this.generatePoints();
    },
    rand(high, low) {
      return Math.random() * (high - low) + low;
    },
    generatePoints() {
      this.points = this.points.map(() => {
        const coordinates = {
          x: Math.floor(this.rand(this.width, 0)),
          y: Math.floor(this.rand(this.height, 0))
        };

        return {
          x: coordinates.x,
          y: coordinates.y,
          team: this.guess(coordinates)
        };
      });
    },
    guess(point) {
      const sum = point.x * this.weights.x + point.y * this.weights.y;
      const team = sum >= 0 ? 1 : -1;
      return team;
    },
    pointColor (team) { return team === 1 ? 'red' : 'blue'; },
    train(point) {
      const correctTeam = point.team === 1 ? -1 : 1;
      const error = correctTeam - point.team;

      this.weights = {
        x: this.weights.x + point.x * error * this.learningRate,
        y: this.weights.y + point.y * error * this.learningRate
      };
      this.generatePoints();
    }
  },
  created() {
    window.addEventListener('resize', this.resize);
    this.resize();
    this.generatePoints();
  }
};
</script>

<style scoped>
  circle:hover {
    cursor: pointer;
  }

  .footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 5px;
    box-sizing: border-box;
    background-color: rgba(44, 62, 80, 0.8);
  }
  .footer::after {
    content: '';
    display: block;
    clear: both;
  }

  .regenerate {
    display: block;
    float: left;
    outline: none;
    border: none;
    font-size: 20px;
    padding: 10px;
    margin: 5px 10px 5px 5px;
    color: #e6e6e6;
    border-radius: 5px;
    line-height: 20px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    background-color: #2c3e50;
  }
  .regenerate:hover {
    cursor: pointer;
  }

  .weights {
    float: left;
    padding: 5px;
  }
  .weights_weight {
    color: #e6e6e6;
    display: block;
    margin: 0px;
    line-height: 20px;
  }
  .weights_weight span { font-weight: bold; }

  .learning-rate {
    float: right;
    width: 150px;
    padding: 5px;
    border-radius: 5px;
    background-color: #2c3e50;
  }
  .learning-rate_header {
    text-align: center;
    line-height: 20px;
    margin: 0px;
    color: #e6e6e6;
  }
  .learning-rate_field {
    text-align: center;
    outline: none;
    border: none;
    padding: 0px;
    color: #e6e6e6;
    height: 20px;
    width: 100%;
    font-size: 20px;
    line-height: 20px;
    background: transparent;
  }
</style>
