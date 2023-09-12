<script setup lang="ts"></script>
<template>
	<div class="selection--main">
		<div class="selection--main__option animate-button">Type</div>
		<div class="selection--main__option animate-button">Generation</div>
		<div class="selection--main__option animate-button">Egg Group</div>
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
