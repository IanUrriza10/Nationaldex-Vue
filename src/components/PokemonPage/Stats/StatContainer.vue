<script setup lang="ts">
import EggComponent from "@/components/common/EggComponent.vue";
import StatTable from "./StatTable.vue";
import AbilitiesComponent from "@/components/common/AbilitiesComponent.vue";
import { Ability } from "@/utils/types/pokemonDesc.ts";
import TypeComponent from "@/components/common/TypeComponent.vue";
type PropsT = {
	stat: {
		abilities: {
			visible: Ability[];
			hidden: Ability[];
		};
		eggGroups: string[];
		resistances: Array<{
			multiplier: number;
			name: string;
		}>;
		stats: number[];
	};
};
const props = defineProps<PropsT>();
</script>
<template>
	<div class="container">
		<div class="graph">
			<div class="graph__title">Base Stats</div>
			<StatTable :stats="stat?.stats" />
		</div>
		<div class="misc">
			<div class="abilities">
				<div class="abilities__title">Abilities</div>
				<div class="abilities__container">
					<div class="abilities__container__visible">
						<AbilitiesComponent
							v-for="(ability, index) in props.stat.abilities
								.visible"
							:key="index"
							:ability="ability"
						/>
					</div>
					<div
						class="abilities__container__hidden"
						v-if="props.stat.abilities.hidden.length"
					>
						<AbilitiesComponent
							v-for="(ability, index) in props.stat.abilities
								.hidden"
							:key="index"
							:ability="ability"
						/>
					</div>
				</div>
			</div>
			<div class="eggGroup">
				<div class="eggGroup__title">Egg Groups</div>
				<div class="eggGroup__container">
					<EggComponent
						v-for="(group, index) in props.stat.eggGroups"
						:egg-group="group"
						:key="index"
					/>
				</div>
			</div>
		</div>
		<div class="resistances">
			<div class="resistances__title">Resistances (Damage Taken)</div>
			<div class="resistances__container">
				<div
					class="type"
					v-for="(type, index) in props.stat.resistances"
					:key="index"
				>
					{{ `${type.multiplier}x` }}
					<TypeComponent :type="type.name" />
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
		font-weight: 700;
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
		font-weight: 700;
	}
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 2rem;
	&__container {
		display: flex;
		gap: 8rem;
		justify-content: center;
		&__visible {
			display: flex;
			gap: 1rem;
			flex-direction: column;
			align-items: center;
		}
		&__hidden {
			display: flex;
			align-items: center;
		}
	}
}
.eggGroup {
	width: 100%;
	display: flex;
	gap: 2rem;
	flex-direction: column;
	&__title {
		font-size: 2rem;
		font-weight: 700;
	}
	&__container {
		display: flex;
		gap: 2rem;
		justify-content: center;
	}
}
.resistances {
	display: flex;
	flex-direction: column;
	margin-top: 5rem;
	gap: 2rem;
	&__title {
		font-size: 2rem;
		font-weight: 700;
	}
	&__container {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		gap: 3rem;
		justify-content: space-evenly;
		.type {
			font-size: 1.75rem;
			font-weight: 500;
		}
		// &__top {
		// 	display: flex;
		// }
		// &__bottom {
		// 	display: flex;
		// }
	}
}
</style>
