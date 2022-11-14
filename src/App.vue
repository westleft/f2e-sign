<script setup lang="ts">

</script>

<template>
<div id="main-view">
  <RouterView />
</div>
</template>

<style lang="scss">
#main-view {
  @include size(100vh, 100vw);
  padding: 6vh 3vw;
}

* {
  font-family: "Resource Han Rounded CN" !important;
}
</style>