<script setup lang="ts">
const types = [
	"normal",
	"fire",
	"water",
	"grass",
	"electric",
	"ice",
	"fighting",
	"poison",
	"ground",
	"flying",
	"psychic",
	"bug",
	"rock",
	"ghost",
	"dark",
	"dragon",
	"steel",
	"fairy",
];
</script>
<template>
	<div class="selection--type">
		<div class="selection__option--back animate-button">Type</div>
		<div class="selection--type__grid animate-button">
			<div
				v-for="(temp, index) in types"
				:key="index"
				class="selection__option--type"
				:class="'type-' + temp"
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

		&__option--type {
			font-size: 1.25rem;
			border-radius: 2rem;
			padding: 0.5rem;
			text-transform: capitalize;
			cursor: pointer;
			box-shadow: 0 1.5rem 4rem rgba(#111, 0.15);
		}
	}
}
</style>
