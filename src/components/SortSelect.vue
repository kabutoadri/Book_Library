<template>
    <div class="sort-control">

        <label for="sort-order">
            Trier par
        </label>

        <select
            id="sort-order"
            :value="modelValue"
            @change="updateSort"
        >
            <option value="relevance">
                Pertinence
            </option>

            <option value="title-asc">
                Titre (A-Z)
            </option>

            <option value="title-desc">
                Titre (Z-A)
            </option>

            <option value="date-desc">
                Date de publication (plus récent)
            </option>

        </select>

    </div>
</template>


<script setup>

// Valeur actuelle du tri
defineProps({
    modelValue: {
        type: String,
        default: 'relevance'
    }
});

// Événement permettant de transmettre le nouveau tri
const emit = defineEmits(['update:modelValue']);

function updateSort(event) {
    emit('update:modelValue', event.target.value);
}

</script>

