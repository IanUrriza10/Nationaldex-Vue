<script setup lang="ts">
import { idToImgRoute, padDexNumber } from "@/utils/index.ts";
import TypeComponent from "@/components/common/TypeComponent.vue";
import { PropType } from "vue";
const imgServer = import.meta.env.VITE_IMAGE_SERVER_URL;

interface MetaI {
	id?: number;
	name?: string;
	pokedexNum?: number;
	specName?: string;
	types?: string[];
}

const props = defineProps({
	meta: Object as unknown as PropType<MetaI | undefined>,
});
</script>
<template>
	<div class="meta">
		<div class="meta__image">
			<img
				:src="`http://${imgServer}${idToImgRoute(props.meta?.id ?? 0)}`"
				:alt="`${props.meta?.name}__image`"
			/>
		</div>
		<div class="meta__items">
			<div class="meta__items__head">
				<div class="head__number">
					#{{ padDexNumber(props.meta?.pokedexNum ?? 0) }}
				</div>
				<div class="head__name">
					{{ props.meta?.name }}
				</div>
			</div>
			<div class="meta__items__longname">
				{{ props.meta?.specName }}
			</div>
			<div class="meta__items__types">
				<TypeComponent
					:key="index"
					v-for="(type, index) in props.meta?.types"
					:type="type"
				/>
			</div>
		</div>
	</div>
</template>
<style scoped lang="scss">
.meta {
	display: flex;
	align-items: center;
	gap: 4rem;
	width: 100%;
	justify-content: center;
	&__image {
		width: 25rem;
		height: 25rem;
	}
	& img {
		height: 100%;
		width: 100%;
		object-fit: contain;
	}
	&__items {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		&__head {
			gap: 2rem;
			display: flex;
			flex-direction: row;
			font-size: 2.4rem;
			text-transform: capitalize;
		}
		&__longname {
			font-size: 1.6rem;
			margin-bottom: 2rem;
		}
		&__types {
			justify-content: center;
			gap: 2rem;
			display: flex;
			flex-direction: row;
		}
	}
}
</style>
