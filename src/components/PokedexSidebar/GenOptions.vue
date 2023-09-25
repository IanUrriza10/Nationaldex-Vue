<script setup lang="ts">
import { generation } from "./constants.ts";
import { sidebarStore as SidebarStore } from "@/utils/stores/index.ts";

const sidebarStore = SidebarStore();
const { setOptions, setGeneration } = sidebarStore;
const handleBack = (e: MouseEvent) => {
	e.preventDefault();
	setOptions(0);
};

const handleSetGeneration = (e: MouseEvent) => {
	e.preventDefault();
	if (e.target instanceof Element) {
		const generation = parseInt(e.target.getAttribute("data-value") ?? "0");
		setGeneration(generation);
	}
};
</script>
<template>
	<div class="selection--type">
		<div
			class="selection__option--back"
			:onclick="handleBack"
		>
			Type
		</div>
		<div class="selection--type__grid">
			<div
				v-for="(temp, index) in generation"
				:key="index"
				class="selection__option--gen animate-button"
				:class="'type-' + temp"
				:data-value="index + 1"
				:onclick="handleSetGeneration"
			>
				{{ temp }}
			</div>
		</div>
	</div>
</template>
<style scoped lang="scss">
.sidebar {
	& .selection {
		&--type {
			width: 100%;
			margin-top: 2rem;
			&__grid {
				display: grid;
				margin: 2rem auto 2rem auto;
				row-gap: 1rem;
				column-gap: 0.5rem;
				grid-template-columns: 1fr 1fr 1fr;
			}
		}
		&__option--gen {
			font-size: 1.25rem;
			border-radius: 2rem;
			padding: 0.5rem;
			text-transform: capitalize;
			cursor: pointer;
			background-color: $dexOption;
			box-shadow: 0 1.5rem 4rem rgba(#111, 0.15);
		}
	}
}
</style>
