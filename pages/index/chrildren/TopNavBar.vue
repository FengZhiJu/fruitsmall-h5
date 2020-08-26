<template>
	<view class="top-nav" v-if="Object.keys(category).length > 0">
		<view class="nav-item" v-for="(v, k, index) in category" :key="k">
			<!-- #ifdef H5 || APP-PLUS -->
			<image class="nav-item-icon" :src="index | setImg" @click="toCategory(index)" @load='imgLoad'></image>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<image class="nav-item-icon" :src="k | setImg(category)" @click="toCategory(index)" @load='imgLoad'></image>
			<!-- #endif -->
			<view>{{k}}</view>
			<view :class="{'message-hint': true, 'hint-display': flag}" v-if="index == 3" :style=" { opacity: hint } ">目前只有浆果类这些水果哦</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				hint: 0,
				count: 0,
				flag: false
			}
		},
		
		props: {
			category: {
				type: Object,
				default(){
					return {}
				}
			}
		},
		methods: {
			toCategory(index){
				uni.setStorageSync('index', index)
				uni.switchTab({
					url: '/pages/category/category'
				})
			},
			imgLoad(){
				this.count++;
				if(this.count == 6) {
					setTimeout(() => this.hint = 1, 500);
					setTimeout(() => {
						this.hint = 0;
						setTimeout(() => this.flag = true, 600);
					}, 3500);
				}
			}
		},
		
		filters: {
			setImg(index, category){
				// #ifdef MP-WEIXIN
					index = Object.keys(category).indexOf(index);
				// #endif
				return require(`static/topnav/${index}.png`);
			}
		}
		
	}
</script>

<style>
	.top-nav {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin-top: 7rpx;
		margin: 20rpx;
		text-align: center;
		font-size: 25rpx;
		color: #666;
	}
	.nav-item {
		position: relative;
		flex: 33.33%;
		margin: 10rpx 0;
	}
	.nav-item-icon {
		width: 85rpx;
		height: 85rpx;
		border-radius: 50%;
	}
	.message-hint {
		box-sizing: border-box;
		position: absolute;
		top: -100rpx;
		right: -90rpx;
		width: 210rpx;
		height: 210rpx;
		padding: 37rpx 20rpx;
		text-align: center;
		font-size: 25rpx;
		line-height: 30rpx;
		word-wrap: break-word;
		background: url('~@/static/message.png') no-repeat;
		background-size: 100%;
		transition: all .6s;
		z-index: 9999;
	}
	.hint-display {
		display: none;
	}
</style>
