<template>
	<view class="seckill" v-if="seckill.length > 0">
		<view>
			<h2>限时秒杀</h2>
		</view>
		<goods :goodsList="seckill"></goods>
	</view>
</template>

<script>
	import Goods from "@/components/goods/Goods.vue"
	export default {
		data(){
			return {
				
			}
		},
		
		components: {
			Goods
		},
		
		props: {
			seckill: {
				type: Array,
				default(){
					return []
				}
			}
		}
	}
</script>

<style>
	.seckill{
		margin: 20rpx;
		padding: 15rpx;
		border: 1px solid #E9E9E9;
		border-radius: 20rpx;
		background-color: #fff;
	}
	.seckill h2 {
		font-weight: normal;
		font-size: 30rpx;
		margin: 10rpx;
	}
</style>
