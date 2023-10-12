<script setup lang="ts">
import PopupComponent from "@/components/common/PopupComponent.vue";
import { EvoRequirements } from "../../../utils/types/pokemonDesc.ts";
import { computed } from "vue";
import ImageWrapper from "@/components/common/ImageWrapper.vue";
import { dashToSpace } from "@/utils/index.ts";
const imgServer = import.meta.env.VITE_IMAGE_SERVER_URL;
//1 level  | rare candy
// :src="`http://${imgServer}/sprites/items/rare-candy.png`"

//2 trade  | trade icon

// use item | item names

// friendship pts /affection hearts soothebell

// disc movetype
// disc move

interface PropsI {
	props: EvoRequirements;
}
const props = defineProps<PropsI>();

// watch(props, () => {
// 	console.log(props.props);
// });

const isLocalImg = computed(() => {
	if (props.props?.trigger?.id == 3) {
		return false;
	}
	if (props.props?.trigger?.id == 2) {
		return true;
	}
	if (props.props?.trigger?.id == 1) {
		return false;
	}
	return false;
});

const conditionIcon = computed(() => {
	if (props.props?.trigger?.id == 3) {
		return props.props?.needUseItem?.name ?? "#";
	}
	if (props.props?.trigger?.id == 2) {
		return "trade_icon";
	}
	if (props.props?.trigger?.id == 1) {
		return "rare-candy";
	}
	return "";
});
const imageUrl = (isLocalImg: boolean, item: string) => {
	if (isLocalImg) {
		return `${conditionIcon.value}.png` ?? "#";
	}
	return `http://${imgServer}/sprites/items/${item}.png` ?? "#";
};
</script>
<template>
	<PopupComponent>
		<template #main>
			<div
				class="evolution__condition__icon"
				v-if="conditionIcon"
			>
				<ImageWrapper
					:is-local="isLocalImg"
					:url="imageUrl(isLocalImg, conditionIcon)"
				/>
			</div>
		</template>
		<template #popup>
			<div class="">
				<div class="title">Evolution Conditions</div>
				<div class="content">
					<div
						class=""
						v-if="props.props.needUseItem?.name"
					>
						{{
							`Use a ${dashToSpace(props.props.needUseItem.name)}`
						}}
					</div>
					<div
						class=""
						v-if="props.props.needLevel"
					>
						{{ `Level up to ${props.props.needLevel}` }}
					</div>

					<div
						class=""
						v-if="props.props.needHappiness"
					>
						{{ `Level up with High Happiness` }}
					</div>
					<div
						class=""
						v-if="props.props.needGender"
					>
						{{ `Needs to be ${props.props.needGender.name}` }}
					</div>
					<div
						class=""
						v-if="props.props.trigger?.id == 2"
					>
						Trade to Another Player
					</div>
					<div v-if="props.props.needHeldItem?.name">
						while holding
						<span class="capitalize">
							{{
								`
							${dashToSpace(props.props.needHeldItem.name)}`
							}}
							<div class="item-image">
								<ImageWrapper
									:is-local="false"
									:url="
										imageUrl(
											false,
											`${props.props?.needHeldItem?.name}` ??
												''
										)
									"
								/>
							</div>
						</span>
					</div>
				</div>
			</div>
		</template>
	</PopupComponent>
</template>
<style scoped lang="scss">
.evolution__condition__icon {
	& * {
		width: 5rem;
		height: 5rem;
	}
}

.title {
	font-weight: 700;
	font-size: 1.7rem;
}
.content {
	font-size: 1.5rem;
}
.item-image {
	display: inline;
	width: 2rem;
	height: 2rem;
}
</style>
