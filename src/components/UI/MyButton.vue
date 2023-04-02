<template>
    <button>
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'my-btn'
}
</script>

<style scoped>
    button {
        background: transparent;
        border: none;
        color: blue;
        font-weight: 700;
        font-size: 18px;
        text-shadow: 0 0 3px;
        box-shadow: 0 0 5px;
        border-radius: 6px;
        transition: all .3s ease;
    }

    button:hover{
        box-shadow: 0 0 2px;
    }
</style>