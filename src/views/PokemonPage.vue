<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import PokemonLayout from "@/layouts/PokemonLayout.vue";
import Navbar from "@/components/common/NavbarComponent.vue";
import { usePokemonDesc } from "@/composables/usePokemonDesc.ts";
import { stringToPosInt } from "@/utils/index.ts";
import TextsContainer from "@/components/PokemonPage/TextsContainer.vue";
import PokemonNav from "@/components/PokemonPage/PokemonNav.vue";
import PokemonMeta from "@/components/PokemonPage/PokemonMeta.vue";

const route = useRoute();
const id = computed(() => stringToPosInt(route.params.id as string));
const { data } = usePokemonDesc(id);

const isActive = (text: string) => {
	const selected = route.query?.view ?? "description";
	return selected === text ? "option--active" : "";
};
</script>
<template>
	<PokemonLayout>
		<Navbar />
		<div class="content">
			<PokemonNav
				:next="data?.next"
				:prev="data?.prev"
			/>
			<PokemonMeta :meta="data?.curr.meta" />

			<!-- Content  -->
			<TextsContainer
				:texts="data?.curr.flavorTexts"
				v-if="isActive('description')"
			/>
		</div>
	</PokemonLayout>
</template>
<style scoped lang="scss">
.content {
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
	gap: 4rem;
	padding: 1rem;
}
</style>
