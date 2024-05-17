<template>
  <div class="container">
    <h1>404 Not Found</h1>
    <hr />
    <div class="msg">nginx</div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.container {
  position: fixed;
  top: 0;
  z-index: 50;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  color: #000;
  h1 {
    display: block;
    font-size: 2em;
    padding-block-start: 0.45em;
    padding-block-end: 0.56em;

    font-weight: bold;
    unicode-bidi: isolate;
    text-align: center;
  }
  hr {
    display: block;
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;
    margin-inline-start: auto;
    margin-inline-end: auto;
    unicode-bidi: isolate;
    overflow: hidden;
    border-style: inset;
    border-width: 1px;
  }
  .msg {
    display: block;
    text-align: -webkit-center;
    unicode-bidi: isolate;
    line-height: 20.8px;
  }
}
</style>
