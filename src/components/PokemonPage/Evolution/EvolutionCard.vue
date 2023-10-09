<script setup lang="ts">
import { padDexNumber } from "@/utils/index.ts";
import PopupComponent from "@/components/common/PopupComponent.vue";
const imgServer = import.meta.env.VITE_IMAGE_SERVER_URL;
</script>
<template>
	<div class="evolution">
		<div class="evolution__base pokemon">
			<div class="pokemon__image"></div>
			<div class="pokemon__number">#{{ padDexNumber(1) }}</div>
			<div class="pokemon__name">bulbasaur</div>
		</div>
		<div class="evolution__condition">
			<PopupComponent>
				<template v-slot:main>
					<div class="evolution__condition__icon">
						<img
							:src="`http://${imgServer}/sprites/items/rare-candy.png`"
						/>
					</div>
				</template>
				<template v-slot:popup>
					<div class="">
						Lorem ipsum dolor sit amet, consectetur adipisicing
						elit. Accusamus eaque aspernatur, alias in quisquam,
						soluta totam exercitationem dicta quae amet fugiat velit
						tenetur eum iste id. Vitae qui ullam atque.
					</div>
				</template>
			</PopupComponent>

			<div class="evolution__condition__arrow">
				<img
					v-svg-inline
					src="@/assets/arrow-right-bold-outline.svg"
				/>
			</div>
		</div>
		<div class="evolution__evolution pokemon">
			<div class="pokemon__image"></div>
			<div class="pokemon__number">#{{ padDexNumber(1) }}</div>
			<div class="pokemon__name">ivysaur</div>
		</div>
	</div>
</template>
<style scoped lang="scss">
.evolution {
	width: 40rem;
	height: 20rem;
	display: flex;
	gap: 1rem;
	justify-content: center;
	** .evolution__base + .evolution__condition + .evolution__evolution {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 30%;
	}
	&__condition {
		&__icon {
			& * {
				width: 5rem;
				height: 5rem;
			}
		}

		&__arrow {
			& * {
				width: 3rem;
				height: 3rem;
				fill: $dexAction;
				outline: none;
			}
		}
	}
}
.pokemon {
	&__image {
		width: 10rem;
		height: 10rem;
		background-color: red;
		& img {
			height: 100%;
			width: 100%;
			object-fit: contain;
		}
	}
	&__name {
		text-transform: capitalize;
		font-size: 1.5rem;
	}
}
</style>
