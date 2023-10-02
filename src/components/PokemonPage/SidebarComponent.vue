<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const isActive = (text: string) => {
	const selected = route.query?.view ?? "description";
	return selected === text ? "option--active" : "";
};
const handleClick = (temp: string) => {
	router.replace({ query: { view: temp } });
};
</script>
<template>
	<div class="sidebar--container">
		<div class="sidebar">
			<div
				class="option"
				:class="isActive('description')"
				@click="handleClick('description')"
			>
				Description
			</div>
			<div
				class="option"
				:class="isActive('stats')"
				@click="handleClick('stats')"
			>
				Stats
			</div>
			<div
				class="option"
				:class="isActive('moves')"
				@click="handleClick('moves')"
			>
				Moves
			</div>
			<div
				class="option"
				:class="isActive('evolution')"
				@click="handleClick('evolution')"
			>
				Evolution Chart
			</div>
			<div
				class="option"
				:class="isActive('others')"
				@click="handleClick('others')"
			>
				More Info
			</div>
		</div>
	</div>
</template>
<style scoped lang="scss">
.sidebar--container {
	position: fixed;
	left: 0;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: 1.75rem;
}

.sidebar {
}

.option {
	text-align: left;
	padding: 0 4rem 0 4rem;
	cursor: pointer;
	&--active {
		font-weight: $font-bold;
	}
	&:hover {
		font-weight: $font-semibold;
		background-color: $dexBackground;
	}
}
</style>
