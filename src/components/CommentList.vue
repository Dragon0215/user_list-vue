<template>
  <div class="container">
    <div v-if="comments.length > 0">
      <h3 class="com my-4 text-primary">Comments</h3>
      <transition-group name="list">
        <div class="list" v-for="comment in comments" :key="comment.id">
          <div class="about">
            <div><b>Name: </b>{{ comment.name }}</div>
            <div><b>Email: </b>{{ comment.email }}</div>
            <div><b>Body: </b>{{ comment.body }}</div>
          </div>
          <div class="d-flex del">
            <button class="btn btn-secondary me-2" @click="$router.push(`/comment/${comment.id}`)">
              View
            </button>
            <button class="btn btn-danger" @click="$emit('remove', comment)">
              Delete
            </button>
          </div>
        </div>
      </transition-group>
    </div>
    <div v-else>
      <h3 class="notCom">No comments yet</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comments: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.list {
  width: 1200px;
  height: 130px !important;
  border: 1px solid black;
  margin: 10px 0;
  padding: 10px;
  border-radius: 6px;
}

.about {
  width: 90%;
  height: 100%;
  float: left;
  align-items: center;
}

.del {
  display: flex;
  width: 10%;
  height: 100%;
  justify-content: right;
  align-items: center;
}

.com {
  width: 1200px;
  text-align: center;
  font-weight: 700;
}

.notCom {
  font-weight: 700;
  color: #ff0000;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-move {
  transition: all 0.5s ease;
}
</style>