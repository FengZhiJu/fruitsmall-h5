<template>
	<view class="goods-item" @click="toDetail">
		<view class="image">
			<image :src="item.img"></image>
		</view>
		<view class="item-info">
			<view class="name"><h3>{{item.name}}</h3></view>
			<view class="price">
				<text class="now-price">￥{{item | setPrice}}</text>
				<text class="old-price" v-if="item.decorate">￥{{(item.price * 1).toFixed(2)}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		props: {
			item: {
				type: Object,
				default(){
					return {}
				}
			}
		},
		filters: {
			setPrice(item){
				let price = item.price * 1;
				return item.decorate ? (price * 0.6).toFixed(2) : price.toFixed(2);
			}
		},
		methods: {
			toDetail(){
				uni.navigateTo({
					url: "/pages/detail/detail?id=" + this.item.id
				})
			},
			
		}
	}
</script>

<style>
	.goods-item{
		box-sizing: border-box;
		width: 48%;
		height: 330rpx;
		padding-bottom: 20rpx;
		margin: 10rpx 4rpx;
		text-align: center;
		border: 1px solid #eee;
	}
	/* #ifdef MP-WEIXIN */
	goods-item {
		width: 48%;
	}
	.goods-item {
		width: 98%;
	}
	/* #endif */
	.image{
		width: 100%;
		height: 200rpx;
	}
	.image image {
		width: 100%;
		height: 100%;
	}
	.item-info {
		padding-top: 20rpx;
	}
	.name h3{
		margin: 5rpx;
		font-weight: normal;
		font-size: 32rpx;
	}
	.price {
		color: #ff6700;
		font-size: 25rpx;
	}
	.price .old-price {
		color: #999;
		margin-left: 5rpx;
		text-decoration: line-through;
	}
</style>
