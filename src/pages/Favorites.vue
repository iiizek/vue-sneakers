<script setup>
import axios from "axios";
import { onMounted, ref, inject } from "vue";

import CardList from "../components/CardList.vue";

const favorites = ref([]);
const cart = ref([]);
const handleCart = inject("handleCart");

onMounted(async () => {
	try {
		cart.value = await (JSON.parse(localStorage.getItem("cart")) || []);
		const { data } = await axios.get(
			"https://df871e13f071b282.mokky.dev/favorites?_relations=sneakers"
		);
		favorites.value = data.map(item => item.sneaker);
		favorites.value = favorites.value.map(item => ({
			...item,
			isAdded: cart.value.some(cartItem => cartItem.id === item.id),
		}));
	} catch (err) {
		console.error(err);
	}
});
</script>

<template>
	<h2 class="mb-8 font-bold text-3xl text-nowrap">Мои закладки</h2>

	<CardList :items="favorites" @handle-cart="handleCart" />
</template>
