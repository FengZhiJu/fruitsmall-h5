<template>
	<view v-if="navList.length > 0" class="nav-tab">
		<view 
		v-for="(item, index) in navList" 
		:key='index' 
		:class="{'nav-tab-item': true, 'select': index == currentIndex}"
		@click="tabClick(index)"
		>
		<view :class="{'message-hint': true, 'hint-display': flag}" v-if="index == 3" :style=" { opacity: hint } ">目前只有浆果类这些水果哦</view>
		{{item}}</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				hint: 0,
				flag: false
			}
		},
		components: {},
		props: {
			navList: {
				type: Array,
				default(){
					return []
				}
			},
			currentIndex: {
				type: Number,
				default: 0
			}
		},
		methods: {
			tabClick(index){
				this.$emit('toggleTab', index)
			}
		},
		mounted() {
			setTimeout(() => this.hint = 1, 1000)
			setTimeout(() => {
				this.hint = 0;
				setTimeout(() => this.flag = true, 600);
			}, 3500);
		}
	}
</script>

<style>
	.nav-tab {
		display: flex;
		flex-direction: column;
		min-width: 150rpx;
		min-height: 100%;
		font-size: 30rpx;
		text-align: center;
		background-color: #f2f2f2;
		border-right: 1px solid #f8f8f8;
	}
	.nav-tab-item {
		position: relative;
		height: 90rpx;
		line-height: 90rpx;
	}
	.select {
		background-color: #fff;
	}
	.message-hint {
		box-sizing: border-box;
		position: absolute;
		top: -100rpx;
		right: -150rpx;
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
		z-index: 99;
	}
	.hint-display {
		display: none;
	}
</style>
