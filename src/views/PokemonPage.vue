<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import PokemonLayout from "@/layouts/PokemonLayout.vue";
import Navbar from "@/components/common/NavbarComponent.vue";
import { usePokemonDesc } from "@/composables/usePokemonDesc.ts";
import { idToImgRoute, padDexNumber, stringToPosInt } from "@/utils/index.ts";
import TypeComponent from "@/components/common/TypeComponent.vue";
import TextsContainer from "@/components/PokemonPage/TextsContainer.vue";

const route = useRoute();
const id = computed(() => stringToPosInt(route.params.id as string));
const { data } = usePokemonDesc(id);

const imgServer = import.meta.env.VITE_IMAGE_SERVER_URL;
</script>
<template>
	<PokemonLayout>
		<Navbar />
		<div class="content">
			<div class="nav">
				<div
					class="nav__both nav__left"
					v-if="data?.prev.id ?? 0"
					@click="$router.push(`/pokemon/${data?.prev.id}`)"
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
							#{{ padDexNumber(data?.prev.pokedexNum ?? 0) }}
						</div>
						<div class="">{{ data?.prev.name }}</div>
					</div>
					<div class="nav__image">
						<img
							v-if="data?.prev.id ?? 0"
							:src="`http://${imgServer}${idToImgRoute(
								data?.prev.id ?? 0
							)}`"
							:alt="`${data?.prev.name}__image`"
						/>
					</div>
				</div>
				<div class=""></div>
				<div
					class="nav__both nav__right"
					v-if="data?.next.id ?? 0"
					@click="$router.push(`/pokemon/${data?.next.id}`)"
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
							#{{ padDexNumber(data?.next.pokedexNum ?? 0) }}
						</div>
						<div class="">{{ data?.next.name }}</div>
					</div>
					<div class="nav__image">
						<img
							v-if="data?.prev.id ?? 0"
							:src="`http://${imgServer}${idToImgRoute(
								data?.next.id ?? 0
							)}`"
							:alt="`${data?.next.name}__image`"
						/>
					</div>
				</div>
			</div>
			<div class="meta">
				<div class="meta__image">
					<img
						:src="`http://${imgServer}${idToImgRoute(
							data?.curr.meta.id ?? 0
						)}`"
						:alt="`${data?.curr.meta.name}__image`"
					/>
				</div>
				<div class="meta__items">
					<div class="meta__items__head">
						<div class="head__number">
							#{{ padDexNumber(data?.curr.meta.pokedexNum ?? 0) }}
						</div>
						<div class="head__name">
							{{ data?.curr.meta.name }}
						</div>
					</div>
					<div class="meta__items__longname">
						{{ data?.curr.meta.specName }}
					</div>
					<div class="meta__items__types">
						<TypeComponent
							:key="index"
							v-for="(type, index) in data?.curr.meta.types"
							:type="type"
						/>
					</div>
				</div>
			</div>
			<TextsContainer :texts="data?.curr.flavorTexts" />
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
