<template>
  <div class="container">
    <div class="list container align-left" @baseList="baseList">
      <div><b>id: </b>{{ $route.params.id }}</div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.list {
  border: 1px solid black;
  margin: 10px 0;
  padding: 10px;
  border-radius: 6px;
  align-items: start;
}
</style>