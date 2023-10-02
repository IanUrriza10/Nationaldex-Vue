<script setup lang="ts">
import GenerationText from "./GenerationText.vue";
import { PropType } from "vue";
import { GenerationFlavorText } from "../../utils/types/pokemonDesc.ts";
import { Dictionary } from "lodash";
const props = defineProps({
	texts: Object as PropType<Dictionary<GenerationFlavorText[]> | undefined>,
});
</script>
<template>
	<div class="container">
		<GenerationText
			v-for="(generation, index) in props.texts"
			:text-arr="generation"
			:key="index"
		/>
	</div>
</template>
<style scoped lang="scss">
.container {
	display: flex;
	flex-direction: column;
	gap: 2rem;
}
</style>
