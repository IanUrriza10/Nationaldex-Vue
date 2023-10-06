<script setup lang="ts">
import { PropType } from "vue";
import { idToImgRoute, padDexNumber } from "@/utils/index.ts";
import { useRouter } from "vue-router";

interface PokemonNav {
	id?: number;
	name?: string;
	pokedexNum?: number;
}

const router = useRouter();

const props = defineProps({
	prev: Object as unknown as PropType<PokemonNav | undefined>,
	next: Object as unknown as PropType<PokemonNav | undefined>,
});
const imgServer = import.meta.env.VITE_IMAGE_SERVER_URL;
</script>
<template>
	<div class="nav">
		<div
			class="nav__both nav__left"
			v-if="props.prev?.id ?? 0"
			@click="
				router.push({
					path: `/pokemon/${props.prev?.id}`,
					query: router.currentRoute.value.query ?? {},
				})
			"
		>
			<div class="nav__icon">
				<img
					v-svg-inline
					src="@/assets/chevron-left-circle.svg"
					alt="left"
				/>
			</div>
			<div class="nav__both__text">
				<div class="">
					#{{ padDexNumber(props.prev?.pokedexNum ?? 0) }}
				</div>
				<div class="">{{ props.prev?.name }}</div>
			</div>
			<div class="nav__image">
				<img
					v-if="props.prev?.id ?? 0"
					:src="`http://${imgServer}${idToImgRoute(
						props.prev?.id ?? 0
					)}`"
					:alt="`${props.prev?.name}__image`"
				/>
			</div>
		</div>
		<div class=""></div>
		<div
			class="nav__both nav__right"
			v-if="props.next?.id ?? 0"
			@click="
				router.push({
					path: `/pokemon/${props.next?.id}`,
					query: router.currentRoute.value.query ?? {},
				})
			"
		>
			<div class="nav__icon">
				<img
					v-svg-inline
					src="@/assets/chevron-right-circle.svg"
					alt="right"
				/>
			</div>
			<div class="nav__both__text">
				<div class="">
					#{{ padDexNumber(props.next?.pokedexNum ?? 0) }}
				</div>
				<div class="">{{ props.next?.name }}</div>
			</div>
			<div class="nav__image">
				<img
					v-if="props.next?.id ?? 0"
					:src="`http://${imgServer}${idToImgRoute(
						props.next?.id ?? 0
					)}`"
					:alt="`${props.next?.name}__image`"
				/>
			</div>
		</div>
	</div>
</template>
<style scoped lang="scss">
.nav {
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 0 1rem 0 1rem;
	font-size: 1.5rem;
	align-items: center;

	&__icon {
		width: 3rem;
		height: 3rem;
		fill: $dexAction;
		background-color: white;
		border-radius: 50%;
	}
	&__both {
		display: flex;
		gap: 0.5rem;
		align-items: center;
		text-transform: capitalize;
		cursor: pointer;
		&__text {
			display: flex;
			gap: 1rem;
		}
	}
	&__right {
		flex-direction: row-reverse;
	}
	&__image {
		height: 4rem;
		width: 4rem;
		& img {
			height: 100%;
			width: 100%;
			object-fit: contain;
		}
	}
}
</style>
