<template>
    <select :model="modelValue" @change="changeOption" class="form-control">
        <option value="" disabled selected>Filter Category</option>
        <option v-for="option in options" :key="option.value" :value="option.value">
            {{ option.name }}
        </option>
    </select>
</template>

<script>
export default {
    name: "my-select",
    props: {
        modelValue: {
            type: String
        },
        options: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        changeOption(e){
            this.$emit('update:modelValue', e.target.value)
        }
    }
}
</script>