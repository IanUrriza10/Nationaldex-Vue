<script setup lang="ts">
import { computed } from "vue";
const path = new URL(`@/assets`, import.meta.url).href;

const props = defineProps({
	isLocal: {
		type: Boolean,
		default: () => false,
	},
	url: {
		type: String,
		default: () => "",
		required: true,
	},
	isAltLocal: {
		type: Boolean,
		default: () => false,
	},
	altUrl: {
		type: String,
		default: () => "",
	},
	altText: {
		type: String,
		default: () => "",
	},
});

const imgUrl = computed(() => {
	if (props.isLocal) {
		return `${path}/${props.url}`;
	}
	return props.url;
});

const backupImg = (event: Event) => {
	const imgElement = event.target as HTMLImageElement;
	if (imgElement.src.includes(props.altUrl)) {
		return;
	}
	imgElement.src = props.altUrl;
};
</script>

<template>
	<img
		:src="imgUrl"
		:alt="altText"
		@error="backupImg"
	/>
</template>
<style scoped lang="scss"></style>
