<script setup>
import { inject } from "vue";

const props = defineProps({
	totalPrice: Number,
});

const handleDrawer = inject("handleDrawer");
</script>

<template>
	<header class="flex justify-between border-slate-100 mb-8 px-8 py-6 border-b">
		<router-link to="/">
			<div class="flex items-center gap-4">
				<img class="w-10" src="/logo.png" alt="Logo" />
				<div>
					<h2 class="font-bold text-nowrap text-xl uppercase">Vue Sneakers</h2>
					<p class="text-slate-400">Магазин лучших кроссовок</p>
				</div>
			</div>
		</router-link>

		<ul class="flex flex-wrap justify-end items-center gap-x-3 text-gray-500">
			<li
				@click="handleDrawer"
				class="flex items-center gap-3 hover:text-black cursor-pointer"
			>
				<img src="/cart.svg" />
				<span>{{ totalPrice }} руб.</span>
			</li>
			<router-link to="/favorites">
				<li class="flex items-center gap-3 hover:text-black cursor-pointer">
					<img src="/heart.svg" />
					<span>Закладки</span>
				</li>
			</router-link>
			<li class="flex items-center gap-3 hover:text-black cursor-pointer">
				<img src="/profile.svg" />
				<span>Профиль</span>
			</li>
		</ul>
	</header>
</template>
