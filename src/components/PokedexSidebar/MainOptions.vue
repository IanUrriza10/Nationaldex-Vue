<script setup lang="ts">
import { sidebarStore } from "@/utils/stores/index.ts";
const { setOptions } = sidebarStore();

const handleSetOptions = (option: number) => (event: MouseEvent) => {
	event.preventDefault();
	setOptions(option);
};
</script>
<template>
	<div class="selection--main">
		<div
			class="selection--main__option animate-button"
			:onclick="handleSetOptions(1)"
		>
			Type
		</div>
		<div
			class="selection--main__option animate-button"
			:onclick="handleSetOptions(2)"
		>
			Generation
		</div>
		<div
			class="selection--main__option animate-button"
			:onclick="handleSetOptions(3)"
		>
			Egg Group
		</div>
	</div>
</template>
<style scoped lang="scss">
.sidebar {
	& .selection--main {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 2rem 0 2rem 0;

		&__option {
			background-color: $dexButtons;
			gap: 10rem;
			font-size: 1.5rem;
			cursor: pointer;
		}
	}
}
</style>
