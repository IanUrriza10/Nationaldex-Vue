<script setup lang="ts">
import EggComponent from "@/components/common/EggComponent.vue";
import StatTable from "./StatTable.vue";

const tempValues = [95, 65, 65, 110, 130, 60];
</script>
<template>
	<div class="container">
		<div class="graph">
			<div class="graph__title">Base Stats</div>
			<StatTable :stats="tempValues" />
		</div>
		<div class="misc">
			<div class="abilities">
				<div class="abilities__title">Abilities</div>
				<div class="abilities__container"></div>
			</div>
			<div class="eggGroup">
				<div class="eggGroup__title">Egg Groups</div>
				<div class="eggGroup__container">
					<EggComponent :egg-group="'monster'" />
					<EggComponent :egg-group="'ground'" />
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped lang="scss">
.container {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1rem;
}

.graph {
	padding: 1rem;
	&__title {
		font-size: 2rem;
		margin-bottom: 2rem;
	}
}
.misc {
	width: 100%;
	display: flex;
	padding: 1rem;
}
.abilities {
	&__title {
		font-size: 2rem;
		margin-bottom: 2rem;
	}
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 2rem;
}
.eggGroup {
	width: 100%;
	display: flex;
	gap: 2rem;
	flex-direction: column;
	justify-content: center;
	&__title {
		font-size: 2rem;
		margin-bottom: 2rem;
	}
	&__container {
		display: flex;
		gap: 2rem;
		justify-content: center;
	}
}
</style>
