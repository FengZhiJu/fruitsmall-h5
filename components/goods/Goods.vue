<template>
	<view v-if="goodsList.length > 0" class="goods">
		<goods-item v-for="(item, index) in goodsList" :key="index" :item="item"></goods-item>
	</view>
</template>

<script>
	import GoodsItem from './GoodsItem.vue'
	export default {
		data() {
			return {

			}
		},
		components: {
			GoodsItem
		},
		props: {
			goodsList: {
				type: Array,
				default () {
					return []
				}
			},
			
			isRecommend: {
				type: Number,
				default: 0
			}
		}
	}
</script>

<style>
	.goods {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		width: 97%;
		margin: 0 auto;
	}
</style>
