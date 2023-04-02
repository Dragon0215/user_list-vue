<template>
  <nav class="navbar bg-light px-5">
    <div class="container-fluid justify-content-between px-5 mx-3">
      <router-link class="btn btn-outline-primary" to="/">Main menu</router-link>
      <div class="d-flex w-75 justify-content-end">
        <router-link class="btn btn-outline-primary me-2" to="/comment">Comments</router-link>
        <router-link class="btn btn-outline-primary" to="/about">About</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {}
</script>