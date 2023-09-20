<script setup lang="ts">
import { eggs } from "./constants.ts";
import { sidebarStore as SidebarStore } from "@/utils/stores/index.ts";

const sidebarStore = SidebarStore();
const { setOptions, setEggGroup } = sidebarStore;

const handleBack = (e: MouseEvent) => {
	e.preventDefault();
	setOptions(0);
};

const handleEggType = (e: MouseEvent) => {
	e.preventDefault();
	if (e.target instanceof Element) {
		const egg = parseInt(e.target.getAttribute("data-value") ?? "0");
		setEggGroup(egg);
	}
};
</script>
<template>
	<div class="selection--egg">
		<div
			class="selection__option--back"
			:onclick="handleBack"
		>
			Egg
		</div>
		<div class="selection--egg__grid">
			<div
				v-for="(temp, index) in eggs"
				:key="index"
				class="selection__option--egg animate-button"
				:class="'egg-' + temp"
				:data-value="index + 1"
				:onclick="handleEggType"
			>
				{{ temp }}
			</div>
		</div>
	</div>
</template>
<style scoped lang="scss">
.sidebar {
	& .selection {
		&--egg {
			width: 100%;
			margin-top: 2rem;
			&__grid {
				display: grid;
				margin: 2rem auto 2rem auto;
				row-gap: 1rem;
				column-gap: 0.5rem;
				grid-template-columns: 1fr 1fr;
			}
		}
		&__option--egg {
			font-size: 1.25rem;
			border-radius: 2rem;
			padding: 0.5rem;
			text-transform: capitalize;
			cursor: pointer;
			box-shadow: 0 1.5rem 4rem rgba(#111, 0.15);

			&:hover {
				transform: translateY(-0.25rem);
			}
			&:active {
				transform: translateY(0.125rem);
			}
		}
	}
}
</style>
