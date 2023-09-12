import DropdownBar from '@/components/MainPage/DropdownBar.vue';
<script setup lang="ts">
defineProps({
	options: {
		type: Array,
		default: () => [],
	},
});
const tempOptions = [
	{ text: "Alphabetical - ASC" },
	{ text: "Alphabetical - DESC" },
	{ text: "National Dex # - ASC" },
	{ text: "National Dex # - DESC" },
];
const visibility = false ? "visible" : "invisible";
const invert = false ? "invertY" : "";
</script>
<template>
	<div class="dropdown">
		<div class="dropdown__text">
			{{ tempOptions[0].text ?? "Dropdown" }}
		</div>
		<img
			:class="invert"
			src="@/assets/menu.svg"
			alt="dropdown"
			v-svg-inline
		/>
		<div
			class="dropdown__options"
			:class="visibility"
		>
			<div
				v-for="({ text }, index) in tempOptions"
				v-bind:key="index"
				class="dropdown__option"
			>
				{{ text }}
			</div>
		</div>
	</div>
</template>
<style scoped lang="scss">
.dropdown {
	position: relative;
	display: flex;
	background-color: white;
	align-items: center;
	height: 3rem;
	cursor: pointer;

	svg {
		stroke: $subHeadline;
		fill: $subHeadline;
		height: 2rem;
		width: 2rem;
		&:focus {
			outline: none;
		}
	}

	&__text {
		font-size: 1.5rem;
		color: $subHeadline;
		padding: 0.25rem 0.5rem 0.25rem 0.5rem;
	}

	&__options {
		position: absolute;
		top: calc(100% + 1rem);
		left: 0;
		width: 100%;
		font-size: 1.25rem;
		display: flex;
		flex-direction: column;
		background-color: $subHeadline;

		.dropdown__option {
			text-align: justify;
			padding-left: 1rem;

			&:hover {
				color: $subHeadline;
				background-color: white;
			}
			&:not(:last-child) {
				margin-bottom: 0.5rem;
			}
		}
	}
}
</style>
