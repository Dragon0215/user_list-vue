<template>
    <div>
        <div class="container">
            <h3 class="text-primary">Add information</h3>
            <form @submit.prevent>
                <input class="form-control"
                v-model="comment.name"
                placeholder="Enter name...">
                <input class="form-control my-2"
                v-model="comment.email"
                type="email"
                placeholder="Enter email...">
                <input class="form-control"
                v-model="comment.body"
                placeholder="Enter body...">
                <my-btn class="btn w-100 my-2" @click="createComment">Add list</my-btn>
            </form>
        </div>
    </div>
</template>

<script>
let a=2;
export default {
    data() {
        return {
            comment: {                
                name: "",
                email: "",
                body: ""
            }
        }
    },
    methods: {
        createComment() {
            this.comment.id = a++; //or Math.floor(Math.random()*10)
            this.$emit('addComment', this.comment);
            this.comment = {
                name: "",
                email: "",
                body: ""
            }
        }
    }
}
</script>

<style>
    .container, form {
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: center;
    }
</style>