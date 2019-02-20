<template>
  <div id="app">
    <header class="header">
      <h1>Perceptron</h1>
      <p>Click on the points that are on the wrong side of the line</p>
    </header>
    <Diagram/>
  </div>
</template>

<script>
import Diagram from './components/Diagram.vue';

export default {
  name: 'app',
  components: {
    Diagram
  }
}
</script>

<style>
body { margin: 0px; }

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.header {
  padding: 20px;
}
.header h1 { line-height: 30px; }
.header p {
  line-height: 20px;
}
.header p, .header h1 {
  margin: 0px;
}
</style>
