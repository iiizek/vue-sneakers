<script setup>
import { computed, provide, ref, watch } from "vue";

import Header from "./components/Header.vue";
import Drawer from "./components/Drawer.vue";

const cart = ref([]);
const isCreatingOrder = ref(false);
const orderId = ref(null);
const drawerOpen = ref(false);
const totalPrice = computed(() =>
	cart.value.reduce((acc, item) => acc + item.price, 0)
);
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100));

const handleCart = item => {
	try {
		if (!item.isAdded) {
			cart.value.push(item);
			item.isAdded = true;
		} else {
			cart.value.splice(cart.value.indexOf(item), 1);
			item.isAdded = false;
		}
		console.log(cart.value);
	} catch (err) {
		console.error(err);
	}
};

const handleDrawer = () => {
	drawerOpen.value = !drawerOpen.value;
	orderId.value = null;
};

watch(
	cart,
	() => {
		localStorage.setItem("cart", JSON.stringify(cart.value));
	},
	{
		deep: true,
	}
);

provide("cart", cart);
provide("handleCart", handleCart);
provide("handleDrawer", handleDrawer);
provide("isCreatingOrder", isCreatingOrder);
provide("orderId", orderId);
</script>

<template>
	<Drawer
		v-if="drawerOpen"
		:is-creating-order="isCreatingOrder"
		:total-price="totalPrice"
		:vat-price="vatPrice"
	/>

	<div class="bg-white shadow-xl m-auto mt-14 rounded-xl w-4/5">
		<Header :total-price="totalPrice" />

		<main class="p-10">
			<router-view />
		</main>
	</div>
</template>
