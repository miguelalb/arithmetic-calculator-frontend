<script setup>
  import IconCalculator from './icons/IconCalculator.vue'
</script>

<template>
  <div class="greetings">
    <h1 class="green">Arithmetic Calculator <IconCalculator /></h1>
    <h3>
      This project is a simple calculator that allows users to perform basic mathematical operations (addition, subtraction, multiplication, division) and also generate a random string. Each one of these operations have a separate cost per request; users have an initial credit/balance and each request updates their balance accordingly.
    </h3>
    <h4>
      Author: <a href="https://www.linkedin.com/in/miguel-acevedo/" target="_blank" rel="noopener noreferrer">Miguel Acevedo</a>
    </h4>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3,
.greetings h4 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3,
  .greetings h4 {
    text-align: left;
  }
}
</style>
