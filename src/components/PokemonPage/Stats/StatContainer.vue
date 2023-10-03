<script setup lang="ts">
import StatTable from "./StatTable.vue";

const tempValues = [95, 65, 65, 110, 130, 60];
</script>
<template>
	<div class="container">
		<StatTable :stats="tempValues" />
	</div>
</template>
<style scoped lang="scss">
.container {
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
