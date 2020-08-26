<template>
	<view>
		<view class="goods-image">
			<image :src="goods.img" @click="preview"></image>
		</view>
		<view class="goods-info align">
			<view class="price">
				<text class="now-price">￥{{goods | setPrice}}</text>
				<text class="old-price" v-if="goods.decorate">￥{{(goods.price * 1).toFixed(2)}}</text>
			</view>
			<view class="goods-text-info">
				<h1 class="title">{{goods.name}}</h1>
				<view class="desc">{{goods.desc}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mixin from "@/common/mixin.js"
	export default {
		data() {
			return {
				
			}
		},
		mixins: [mixin],
		components: {

		},
		props: {
			goods: {
				type: Object,
				default(){
					{}
				}
			}
		},
		methods: {
			preview(){
				uni.previewImage({
					urls: [this.goods.img]
				})
			}
		}
	}
</script>

<style>
	.align {
		background-color: #fff;
		padding: 20rpx 30rpx;
		border-radius: 20rpx;
	}
	.goods-image {
		height: 550rpx;
	}
	
	.goods-image uni-image,
	.goods-image image{
		width: 100%;
		height: 100%;
	}
	
	.price {
		color: #ff6700;
		font-size: 60rpx;
	}
	
	.price .old-price {
		color: #999;
		font-size: 45rpx;
		margin-left: 10rpx;
		text-decoration: line-through;
	}
	
	.title {
		margin: 10rpx 0;
		font-weight: normal;
		font-size: 60rpx;
	}
	
	.desc {
		font-size: 26rpx;
		color: #999;
	}
	
</style>
