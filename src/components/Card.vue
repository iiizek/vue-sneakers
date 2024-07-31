<script setup>
const props = defineProps({
	id: Number,
	imageUrl: String,
	title: String,
	price: Number,
	isFavorite: Boolean,
	isAdded: Boolean,
	onClickAdd: Function,
	onClickFavorite: Function,
});
</script>

<template>
	<div
		class="inline-block relative border-slate-100 bg-white hover:shadow-xl p-8 border rounded-3xl transition-all hover:-translate-y-2 cursor-pointer"
	>
		<img
			v-if="$route.name !== 'favorites'"
			@click="onClickFavorite"
			class="top-8 left-8 absolute"
			:src="!isFavorite ? '/like-1.svg' : '/like-2.svg'"
			alt="Like"
		/>
		<img :src="imageUrl" alt="Image" />
		<p>{{ title }}</p>

		<div class="flex justify-between items-end mt-4">
			<div class="flex flex-col">
				<span class="text-slate-400">Цена</span>
				<b>{{ price }} руб.</b>
			</div>
			<img
				@click="onClickAdd"
				:src="!isAdded ? '/plus.svg' : '/checked.svg'"
				alt="Add"
			/>
		</div>
	</div>
</template>
