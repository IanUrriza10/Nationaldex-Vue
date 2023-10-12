<script setup lang="ts">
import { dashToSpace } from "@/utils/index.ts";
import { Ability } from "@/utils/types/pokemonDesc.ts";
import PopupComponent from "@/components/common/PopupComponent.vue";
interface PropsI {
	ability: Ability;
}
const props = defineProps<PropsI>();
</script>
<template>
	<div class="ability">
		<PopupComponent direction="down">
			<template #main>
				<div class="ability__visible">
					<div class="ability__name">
						{{ dashToSpace(props.ability.name) ?? "Unknown" }}
					</div>
					<div
						class="ability__hidden"
						v-if="props.ability.isHidden == 'hidden'"
					>
						Hidden
					</div>
				</div>
			</template>
			<template #popup>
				<div class="ability__effect">{{ props.ability.effect }}</div>
			</template>
		</PopupComponent>
	</div>
</template>
<style scoped lang="scss">
.ability {
	position: relative;
	cursor: default;
}
.ability__name {
	font-size: 1.7rem;
	text-transform: capitalize;
	font-weight: 700;

	&::first-letter {
		font-size: 2rem;
	}
}
</style>
