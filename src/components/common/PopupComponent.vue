<script setup lang="ts">
defineProps({
	direction: {
		type: String,
		default: "up",
		validator: (value: string) =>
			["up", "down", "left", "right"].includes(value),
	},
});
</script>
<template>
	<div class="container">
		<div class="main">
			<slot name="main"> </slot>
		</div>
		<div
			class="popup"
			:class="direction"
		>
			<slot name="popup"></slot>
		</div>
	</div>
</template>
<style scoped lang="scss">
.container {
	position: relative;
}

.main:hover + .popup {
	display: block;
}
.popup {
	&.up {
		display: none;
		position: absolute;
		width: 20rem;
		top: -1rem;
		left: 50%;
		transform: translate(-50%, -100%);
		background-color: $background;
		padding: 1rem;
		z-index: 40;
	}
	&.down {
		display: none;
		position: absolute;
		width: 20rem;
		bottom: -1rem;
		left: 50%;
		transform: translate(-50%, 100%);
		background-color: $background;
		padding: 1rem;
		z-index: 40;
	}

	&.left {
		display: none;
		position: absolute;
		width: 20rem;
		bottom: 50%;
		left: -1rem;
		transform: translate(-100%, 50%);
		background-color: $background;
		padding: 1rem;
		z-index: 40;
	}
	&.right {
		display: none;
		position: absolute;
		width: 20rem;
		bottom: 50%;
		right: -1rem;
		transform: translate(100%, 50%);
		background-color: $background;
		padding: 1rem;
		z-index: 40;
	}
}
</style>
