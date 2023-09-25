import DropdownBar from '@/components/MainPage/DropdownBar.vue';
<script setup lang="ts">
import { ref, computed, PropType } from "vue";
const props = defineProps({
	options: {
		type: Array as PropType<Array<{ text: string; value: Object }>>,
		default: () => [],
	},
	modelValue: {
		type: Number,
		default: 0,
	},
});

const emits = defineEmits(["update:modelValue"]);

const visibility = ref(false);
const selected = ref(0);
const isVisible = computed(() => (visibility.value ? "visible" : "invisible"));
const invert = computed(() => (visibility.value ? "invertY" : ""));

const handleClick = (index: number) => {
	selected.value = index;
	emits("update:modelValue", index);
};
</script>
<template>
	<div class="dropdown">
		<div
			class="dropdown__text"
			@click="visibility = !visibility"
		>
			{{ props.options[selected]?.text ?? "Dropdown" }}
		</div>
		<img
			v-svg-inline
			:class="invert"
			src="@/assets/menu.svg"
			alt="dropdown"
		/>
		<div
			class="dropdown__options"
			:class="isVisible"
		>
			<div
				v-for="(option, index) in props.options"
				:key="index"
				class="dropdown__option"
				@click="handleClick(index)"
			>
				{{ option.text }}
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
