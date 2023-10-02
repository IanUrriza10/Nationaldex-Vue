<script setup lang="ts"></script>
<template>
	<div class="sidebar--container">
		<div class="sidebar">
			<div class="option option--active">Description</div>
			<div class="option">Stats</div>
			<div class="option">Moves</div>
			<div class="option">More Info</div>
			<div class="option">Evolution Chart</div>
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
	// gap: 0.25rem;
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
