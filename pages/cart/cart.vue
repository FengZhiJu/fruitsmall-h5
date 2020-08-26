<template>
	<view class="cart">
		<toast ref="toast" :message='toast'></toast>
		<cart-item></cart-item>
		<bottom-bar @showToast='showToast'></bottom-bar>
	</view>
</template>

<script>
	import CartItem from "./children/CartItem.vue"
	import BottomBar from "./children/BottomBar.vue"
	export default {
		data(){
			return {
				toast: '暂不支持购买'
			}
		},
		components:{
			CartItem,
			BottomBar
		},
		methods: {
			showToast(){
				this.$refs.toast.show();
			}
		}
	}
</script>

<style>
	.cart {
		overflow: hidden;
		min-height: calc(100vh - 50px - 100rpx - 100rpx);
		padding-bottom: 100rpx;
		background-color: #eee;
	}
	/* #ifdef MP-WEIXIN */
	.cart {
		min-height: calc(100vh - 105rpx);
	}
	/* #endif */
	
	/* #ifdef APP-PLUS */
	.cart {
		min-height: 100vh;
	}
	/* #endif */
	/deep/ .tick-box {
		width: 40rpx;
		height: 40rpx;
		margin: 0 20rpx;
		line-height: 40rpx;
		text-align: center;
		color: #fff;
		border: 1px solid #ccc;
		border-radius: 25rpx;
	}
</style>
