<template>
	<view class="user-state">
		<image src="~@/static/logo.png" class="logo"></image>
		<login @toSignup="toggle" v-if="flag"></login>
		<signup @toLogin='toggle' v-else></signup>
	</view>
</template>

<script>
	import Login from "./children/Login.vue"
	import Signup from "./children/Signup.vue"
	
	export default {
		data() {
			return {
				flag: true
			}
		},
		components: {
			Login,
			Signup
		},
		methods: {
			toggle(){
				this.flag = !this.flag;
			}
		}
	}
</script>

<style scoped>
	.user-state {
		text-align: center;
	}
	.logo {
		width: 500rpx;
		height: 200rpx;
		margin: 60rpx 0;
	}
	/deep/ input {
		display: inline-block;
		width: 580rpx;
		height: 70rpx;
		padding: 10rpx;
		border-bottom: 1px solid #333;
		text-align: left;
	}
	/deep/ .button {
		margin-top: 50rpx;
	}
	/deep/ button {
		width: 150rpx;
		height: 70rpx;
		line-height: 70rpx;	
		border-radius: 35rpx;
	}
	/deep/ .uni-dialog-button:first-child {
		display: none;
	}
</style>
