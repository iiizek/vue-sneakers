<script setup>
import axios from "axios";
import { computed, inject, ref } from "vue";

import DrawerHead from "./DrawerHead.vue";
import CartList from "./CartList.vue";
import InfoBlock from "./InfoBlock.vue";

const cart = inject("cart");
const isCreatingOrder = inject("isCreatingOrder");
const orderId = inject("orderId");

const props = defineProps({
	totalPrice: Number,
	vatPrice: Number,
	isCreatingOrder: Boolean,
});

const createOrder = async () => {
	try {
		isCreatingOrder.value = true;
		const { data } = await axios.post(
			`https://df871e13f071b282.mokky.dev/orders`,
			{
				items: cart.value,
				totalPrice: props.totalPrice,
			}
		);

		cart.value = [];
		orderId.value = data.id;

		return data;
	} catch (err) {
		console.error(err);
	} finally {
		isCreatingOrder.value = false;
	}
};

const buttonDisabled = computed(() =>
	props.isCreatingOrder ? true : props.totalPrice ? false : true
);
</script>

<template>
	<div class="top-0 left-0 z-10 fixed bg-black opacity-70 w-full h-full"></div>
	<div class="top-0 right-0 z-20 fixed bg-white p-8 w-96 h-full">
		<DrawerHead />

		<CartList />

		<div v-if="!totalPrice || orderId" class="flex items-center h-full">
			<InfoBlock
				v-if="orderId"
				title="Заказ оформлен"
				:description="`Ваш заказ #${orderId} скоро будет передан курьерской доставке.`"
				image-url="/order-success-icon.png"
			/>
			<InfoBlock
				v-if="!totalPrice && !orderId"
				title="Корзина пустая"
				description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
				image-url="/package-icon.png"
			/>
		</div>

		<div v-else class="flex flex-col gap-3 my-7">
			<div class="flex justify-between items-center gap-4">
				<span>Итого:</span>
				<div class="flex-1 bg-slate-100 border-b border-dashed"></div>
				<b>{{ totalPrice }} руб.</b>
			</div>
			<div class="flex justify-between items-center gap-4">
				<span>Налог 5%:</span>
				<div class="flex-1 bg-slate-100 border-b border-dashed"></div>
				<b>{{ vatPrice }} руб.</b>
			</div>
			<button
				@click="createOrder"
				class="bg-lime-500 hover:bg-lime-600 active:bg-lime-700 disabled:bg-slate-300 py-3 rounded-xl w-full text-white transition-all cursor-pointer"
				:disabled="buttonDisabled"
			>
				Оформить заказ
			</button>
		</div>
	</div>
</template>
