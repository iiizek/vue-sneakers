<script setup>
import { inject } from "vue";
import Card from "./Card.vue";

const props = defineProps({
	items: Array,
});

const emit = defineEmits(["addToFavorite", "handleCart"]);
</script>

<template>
	<div
		class="gap-5 grid grid-cols-5 max-sm:grid-cols-1 max-md:grid-cols-2 max-xl:grid-cols-3 max-2xl:grid-cols-4 pb-8"
		v-auto-animate
	>
		<Card
			v-for="item in items"
			:key="item.id"
			:id="item.id"
			:image-url="item.imageUrl"
			:title="item.title"
			:price="item.price"
			:is-added="item.isAdded"
			:is-favorite="item.isFavorite"
			:on-click-add="() => emit('handleCart', item)"
			:on-click-favorite="() => emit('addToFavorite', item)"
		/>
	</div>
</template>
