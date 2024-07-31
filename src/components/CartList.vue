<script setup>
import { inject } from "vue";
import CartListItem from "./CartListItem.vue";

const cart = inject("cart");
const handleCart = inject("handleCart");
</script>

<template>
	<div class="flex flex-col gap-5 overflow-y-auto" v-auto-animate>
		<CartListItem
			v-for="item in cart"
			:key="item.id"
			:id="item.id"
			:image-url="item.imageUrl"
			:title="item.title"
			:price="item.price"
			@handle-cart="() => handleCart(item)"
		/>
	</div>
</template>
