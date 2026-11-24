
<script setup>
defineProps({
    message: {
        type: String,
        default: ''
    }
});
</script>

<template>
    <div
        v-if="message"
        class="error-message"
        role="alert"
        aria-live="assertive"
    >
        <span class="error-icon">⚠</span>

        <p>{{ message }}</p>
    </div>
</template>
