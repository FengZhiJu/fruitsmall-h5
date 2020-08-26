<template>
	<view class="recommend" v-if="recommend.length > 0">
		<view>
			<h2>为您推荐</h2>
		</view>
		<goods :goodsList="recommend"></goods>
	</view>
</template>

<script>
	import Goods from "@/components/goods/Goods.vue"
	export default {
		data(){
			return {}
		},
		
		components: {
			Goods
		},
		
		props: {
			recommend: {
				type: Array,
				default(){
					return []
				}
			}
		}
	}
</script>

<style>
	.recommend{
		margin: 20rpx;
		padding: 15rpx;
		border: 1px solid #E9E9E9;
		border-radius: 20rpx;
		background-color: #fff;
	}
	.recommend h2 {
		font-weight: normal;
		font-size: 36rpx;
		text-align: center;
		margin: 10rpx 0;
		color: #333;
	}
	.recommend h2::after,
	.recommend h2::before{
		display: inline-block;
		content: "";
		width: 150rpx;
		height: 3rpx;
		margin: 0 20rpx;
		background-color: #E9E9E9;
		vertical-align: middle;
	}
</style>
