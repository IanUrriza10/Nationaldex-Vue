<script setup lang="ts">
defineProps({
	placeholder: {
		type: String,
		default: "Input",
	},
	modelValue: {
		type: String,
		default: "",
	},
});

const emits = defineEmits(["update:modelValue"]);
</script>
<template>
	<div class="input-container">
		<input
			id="search"
			:placeholder="placeholder"
			:value="modelValue"
			@input="
				emits(
					'update:modelValue',
					($event.target as HTMLInputElement).value
				)
			"
		/>
		<img
			v-svg-inline
			src="@/assets/magnify.svg"
			alt="magnify"
		/>
	</div>
</template>
<style scoped lang="scss">
.input-container {
	background-color: white;
	width: 100%;
	display: flex;
	vertical-align: middle;
	height: 3rem;
}
input {
	font-size: 1.5rem;
	padding-left: 1rem;
	border: none;

	&:focus {
		outline: none;
	}
}
svg {
	&:hover {
		cursor: pointer;
	}
	&:focus {
		outline: none;
	}
}
</style>
