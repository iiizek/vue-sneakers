<script setup>
import { inject } from "vue";

const props = defineProps({
	id: Number,
	imageUrl: String,
	title: String,
	price: Number,
});

const emit = defineEmits("handleCart");
</script>

<template>
	<div class="flex items-center gap-4 border-slate-100 p-4 border rounded-xl">
		<img class="w-16 h-16" :src="imageUrl" alt="Image" />

		<div class="flex flex-col justify-between w-full">
			<p>{{ title }}</p>
			<div class="flex justify-between mt-2">
				<b class="flex-1">{{ price }} руб.</b>
				<img
					@click="emit('handleCart')"
					class="opacity-50 hover:opacity-100 transition-all cursor-pointer"
					src="/close.svg"
					alt="Delete"
				/>
			</div>
		</div>
	</div>
</template>
