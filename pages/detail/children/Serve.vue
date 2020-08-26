<template>
	<view class="serve align">
		<view v-for="(item, index) in serve" :key="index" class="serve-item">
			<text class="iconfont serve-icon">&#xe607;</text>
			<text>{{item}}</text>
		</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				
			}
		},
		components: {

		},
		props: {
			serve: {
				type: Array,
				default(){
					return []
				}
			}
		}
	}
</script>

<style>
	@import "~@/static/iconfont/iconfont.css";
	.serve {
		position: relative;
		display: flex;
		height: 40rpx;
		margin-top: 20rpx;
		justify-content: space-around;
		align-items: center;
		font-size: 20rpx;
		color: #999;
	}
	.serve-icon {
		vertical-align: middle;
		margin-right: 4rpx;
		color: #ff6700;
	}
</style>
