<script setup lang="ts"></script>
<template>
	<div class="navbar">
		<div
			class="navbar__title"
			@click="$router.push(`/`)"
		>
			National Dex
		</div>
		<div class="navbar__options">
			<div
				class="navbar__option"
				@click="$router.push(`/`)"
			>
				Pokemon
			</div>
			<div
				class="navbar__option"
				@click="$router.push(`/items`)"
			>
				Items
			</div>
			<div
				class="navbar__option"
				@click="$router.push(`/moves`)"
			>
				Moves
			</div>
		</div>
	</div>
</template>
<style scoped lang="scss">
.navbar {
	width: 100%;
	height: $navbar-h;
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: $headline;
	&__title {
		font-size: 3rem;
		cursor: pointer;
	}
	&__options {
		display: flex;
		cursor: pointer;
		gap: 1rem;
		font-size: 2rem;
	}
}
</style>
