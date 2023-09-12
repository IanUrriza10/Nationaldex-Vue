<script setup lang="ts">
import MainOptions from "./MainOptions.vue";

const state = {
	type: "steel",
	gen: "7",
	eggGroup: "monster",
};
</script>
<template>
	<div class="sidebar-container">
		<div class="sidebar">
			<div class="screen">
				<div class="screen__text">
					Type:
					<span class="screen__value">
						{{ state.type }}
					</span>
				</div>
				<div class="screen__text">
					Generation:
					<span class="screen__value">
						{{ state.gen }}
					</span>
				</div>
				<div class="screen__text">
					Egg Group:
					<span class="screen__value">
						{{ state.eggGroup }}
					</span>
				</div>
			</div>
			<MainOptions />
			<!-- <TypeOptions /> -->
			<!-- <EggOptions /> -->
			<!-- <GenOptions /> -->
			<div class="footer">
				<div class="action action--submit">
					<img
						v-svg-inline
						src="@/assets/check-bold.svg"
						alt="submit"
					/>
				</div>
				<div class="action action--action">
					<img
						v-svg-inline
						src="@/assets/restore.svg"
						alt="reset"
					/>
				</div>
			</div>
			<div class="floating">
				<div class="action action--action">
					<img
						v-svg-inline
						src="@/assets/arrow-left.svg"
						alt="close"
					/>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped lang="scss">
.sidebar-container {
	position: fixed;
	left: 0;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
}
.sidebar {
	width: 25rem;
	min-height: 35rem;
	padding: 2rem;
	background-color: $dexBackground;
	display: flex;
	flex-direction: column;

	& .screen {
		background-color: $dexScreen;
		width: 100%;
		height: 15rem;
		padding: 1.5rem;
		font-size: 1.75rem;
		color: $dexDisplay;
		&__text {
			text-align: left;
		}
		&__value {
			text-transform: uppercase;
			margin-left: 0.5rem;
		}
	}

	.footer {
		margin: auto auto 0 auto;
		display: flex;
		width: 10rem;
		gap: 3rem;
	}

	& .floating {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateX(75%);
	}
}
.action {
	width: 3rem;
	height: 3rem;
	border-radius: 999px;
	overflow: hidden;
	padding: 0.5rem;
	stroke: white;
	fill: white;
	cursor: pointer;
	transition: transform 0.7s ease-in-out;

	&--submit {
		background-color: $dexSubmit;
	}
	&--action {
		background-color: $dexAction;
	}
	& > *:focus {
		outline: none;
	}
	&:hover {
		transform: rotate(360deg);
	}
}
</style>
<style lang="scss">
.selection__option--back {
	background-color: $dexButtons;
	cursor: pointer;
	width: min-content;
	padding: 0.5rem 1.75rem 0.5rem 2.5rem;
	clip-path: polygon(12.5% 0, 100% 0, 100% 100%, 12.5% 100%, 0% 50%);
}
</style>
