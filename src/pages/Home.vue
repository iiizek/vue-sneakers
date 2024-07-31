<script setup>
import axios from "axios";
import debounce from "lodash.debounce";

import CardList from "../components/CardList.vue";
import { inject, ref, onMounted, reactive, watch, provide } from "vue";

const items = ref([]);
const filters = reactive({
	sortBy: "title",
	searchQuery: "",
});

const cart = inject("cart");
const handleCart = inject("handleCart");

const fetchItems = async () => {
	try {
		const params = {
			sortBy: filters.sortBy,
		};

		filters.searchQuery && (params.title = `*${filters.searchQuery}*`);

		const { data } = await axios.get(
			"https://df871e13f071b282.mokky.dev/sneakers",
			{ params }
		);

		items.value = data.map(obj => ({
			...obj,
			isAdded: false,
			favoriteId: null,
			isFavorite: false,
		}));
	} catch (err) {
		console.error(err);
	}
};

const fetchFavorites = async () => {
	try {
		const { data: favorites } = await axios.get(
			"https://df871e13f071b282.mokky.dev/favorites"
		);
		items.value = items.value.map(item => {
			const favorite = favorites.find(
				favorite => favorite.sneaker_id === item.id
			);

			if (!favorite) {
				return item;
			}

			return {
				...item,
				isFavorite: true,
				favoriteId: favorite.id,
			};
		});
	} catch (err) {
		console.error(err);
	}
};

const addToFavorite = async item => {
	try {
		if (!item.isFavorite) {
			const obj = {
				sneaker_id: item.id,
			};

			item.isFavorite = true;
			const { data } = await axios.post(
				"https://df871e13f071b282.mokky.dev/favorites",
				obj
			);
			item.favoriteId = data.id;
		} else {
			item.isFavorite = false;
			await axios.delete(
				`https://df871e13f071b282.mokky.dev/favorites/${item.favoriteId}`
			);
			item.favoriteId = null;
		}
	} catch (err) {
		console.log(err);
	}
};

const onChangeSelect = e => {
	filters.sortBy = e.target.value;
};

const onChangeSearchInput = debounce(e => {
	filters.searchQuery = e.target.value;
}, 400);

onMounted(async () => {
	cart.value = await (JSON.parse(localStorage.getItem("cart")) || []);

	await fetchItems();
	await fetchFavorites();
	items.value = items.value.map(item => ({
		...item,
		isAdded: cart.value.some(cartItem => cartItem.id === item.id),
	}));
});

watch(cart, async () => {
	await fetchItems();
	await fetchFavorites();
});

watch(filters, async () => {
	cart.value = await (JSON.parse(localStorage.getItem("cart")) || []);

	await fetchItems();
	await fetchFavorites();
	items.value = items.value.map(item => ({
		...item,
		isAdded: cart.value.some(cartItem => cartItem.id === item.id),
	}));
});

provide("items", items);
provide("filters", filters);
</script>

<template>
	<div class="flex flex-wrap justify-between gap-x-4 gap-y-4 mb-8">
		<h2 class="font-bold text-3xl text-nowrap">Все кроссовки</h2>
		<div class="flex justify-between items-stretch gap-4">
			<select
				@change="onChangeSelect"
				class="border-slate-100 focus:border-slate-400 bg-white px-4 py-2 border rounded-md outline-none"
			>
				<option value="name">По названию</option>
				<option value="price">По цене (дешевые)</option>
				<option value="-price">По цене (дорогие)</option>
			</select>
			<div class="relative">
				<img
					class="top-3 left-3 absolute"
					src="/search.svg"
					alt="search-icon"
				/>
				<input
					@input="onChangeSearchInput"
					class="border-slate-100 focus:border-slate-400 py-2 pr-4 pl-10 border rounded-md outline-none"
					type="text"
					placeholder="Поиск..."
				/>
			</div>
		</div>
	</div>

	<CardList
		:items="items"
		@add-to-favorite="addToFavorite"
		@handle-cart="handleCart"
	/>
</template>
