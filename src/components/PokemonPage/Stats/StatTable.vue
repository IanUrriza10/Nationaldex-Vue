<script setup lang="ts">
import { dashToSpace } from "@/utils/index.ts";

const attributes = [
	"hp",
	"attack",
	"defense",
	"special-attack",
	"special-defense",
	"speed",
];
</script>
<template>
	<div class="table">
		<div
			class="row"
			v-for="(att, index) in attributes"
			:key="index"
		>
			<div class="row__title">{{ dashToSpace(att) }}</div>
			<div class="row__values">
				<div class="row__graph">
					<div
						v-for="i in [...Array(16).keys()]"
						:key="i"
						class="cell"
						:class="`${att} ${i < 10 ? 'colored' : ''}`"
					></div>
				</div>
				<div class="row__value">(255)</div>
			</div>
		</div>
	</div>
</template>
<style scoped lang="scss">
.table {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	.row {
		font-size: 1.25rem;
		display: flex;
		justify-content: space-between;
		gap: 2rem;
		&__title {
			text-transform: capitalize;
		}
		&__values {
			gap: 2rem;
			display: flex;
		}
		&__graph {
			display: flex;
			flex-direction: row;
			gap: 0.5rem;
		}
		.cell {
			min-width: 1.5rem;
			background-color: white;

			&.colored.hp {
				background-color: $att-hp;
			}
			&.colored.attack {
				background-color: $att-atk;
			}
			&.colored.defense {
				background-color: $att-def;
			}
			&.colored.special-attack {
				background-color: $att-spatk;
			}
			&.colored.special-defense {
				background-color: $att-spdef;
			}
			&.colored.speed {
				background-color: $att-spd;
			}
		}
	}
}
</style>
