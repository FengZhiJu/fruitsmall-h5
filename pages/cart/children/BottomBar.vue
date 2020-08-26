<template>
	<view class="bottom-bar">
		<view class="total-select">
			<view :class="{'tick-box': true, 'tick-box-click': allTick}" @click="reverseTick">
				<text class="iconfont">&#xe60c;</text>
			</view>
			<text class="total-text" >全选</text>
		</view>
		<view class="right">
			<view class="total-price">
				<text>合计：</text>
				<text class="money">￥{{fullTotalPrice}}</text>
			</view>
			<button size="mini" :class="{'clearing': true, 'disabel': !isDisable}" @click="clearing" >结算</button>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from "vuex"
	export default {
		data() {
			return {}
		},
		computed: {
			...mapGetters(['fullTotalPrice', 'allTick']),
			isDisable(){
				return this.$store.state.cart.find(item => item.tick) ? true : false;
			}
		},
		components: {},
		methods: {
			reverseTick(){
				this.$store.commit('reverseTick', this.allTick)
			},
			clearing(){
				if(this.isDisable) {
					this.$emit('showToast');
				}
			}
		}
	}
</script>

<style>
	@import "@/static/iconfont/iconfont.css";
	.bottom-bar {
		display: flex;
		position: fixed;
		bottom: 50px;
		width: 100vw;
		height: 100rpx;
		border-top: 1px solid #eee;
		align-items: center;
		justify-content: space-between;
		background-color: #fff;
	}
	/* #ifdef APP-PLUS */
	.bottom-bar {
		bottom: 0;
	}
	/* #endif */
	.tick-box-click {
		background-color: #ff6700;
		border: 1px solid #ff6700 !important;
	}
	.total-select {
		display: flex;
	}
	.total-text {
		font-size: 30rpx;
	}
	.right {
		display: flex;
		align-items: center;
	}
	.total-price {
		margin-right: 30rpx;
		font-size: 34rpx;
	}
	.money {
		color: #ff6700;
		font-size: 36rpx;
	}
	.clearing {
		height: 70rpx;
		width: 150rpx;
		margin-right: 20rpx;
		line-height: 70rpx !important;
		color: #fff;
		font-size: 30rpx;
		background-color: #ff6700;
		border-radius: 40rpx;	
	}
	.disabel {
		background-color: #ddd;
		color: #fff;
	}
	/* #ifdef MP-WEIXIN */
	.bottom-bar {
		bottom: 0;
	}
	/* #endif */
</style>
