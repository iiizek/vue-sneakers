<script setup>
const props = defineProps({
	title: String,
	description: String,
	imageUrl: String,
});
</script>

<template>
	<div class="flex flex-col justify-center items-center mx-auto max-w-72">
		<img height="70" width="70" :src="imageUrl" alt="Info image" />
		<h2 class="mt-4 font-medium text-2xl">{{ title }}</h2>
		<p class="mt-2 text-center text-gray-400">{{ description }}</p>
	</div>
</template>
