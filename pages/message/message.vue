<template>
	<view class="message">
		<view class="content">
			<view class="item" v-for="(item, index) in message" :key='index'>
				<view class="avatar">
					<image :src="item.avatar" class="image"></image>
				</view>
				<view class="text-info">
					<view class="username">{{item.user}}</view>
					<view class="message-text">{{item.message}}</view>
					<view class="timestamp" >{{item.timestamp}}</view>
				</view>
			</view>
		</view>
		<view class="bottom">
			<textarea v-model="text" maxlength="30" placeholder="写点什么吧" class="bottom-text"/>
			<button :disabled="isDisabled" class="push" size="mini" @click="sendPush">发布</button>
			<view class="mask" v-if="!isLogin">
				请 <text class="login" @click="toLogin"> 登录 </text> 后留言
			</view>
		</view>
	</view>
</template>

<script>
	import { getMessage, addMessage } from "@/network/message.js"
	import { mapState } from "vuex"
	export default {
		data() {
			return {
				message: [],
				text: ''
			}
		},
		components: {
		},
		computed: {
			...mapState(['isLogin']),
			isDisabled(){
				return this.text == '';
			}
		},
		methods: {
			sendPush(){
				addMessage({ message: this.text }).then(res => {
					uni.redirectTo({
						url: '/pages/message/message'
					})
				})
			},
			toLogin(){
				uni.navigateTo({
					url: '/pages/user/user'
				})
			}
		},
		onShow() {
			console.log(!this.isLogin)
			getMessage().then(res => this.message = res.data);
		}
	}
</script>

<style>
	.message {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-height: 90vh;
		
		//
		background: linear-gradient(
		  -45deg,
		  rgba(9, 69, 138, 0.2),
		  rgba(68, 155, 255, 0.7),
		  rgba(117, 113, 251, 0.7),
		  rgba(68, 155, 255, 0.7),
		  rgba(9, 69, 138, 0.2)
		);
		-webkit-animation: Gradient 15s ease infinite;
		-moz-animation: Gradient 15s ease infinite;
		animation: Gradient 15s ease infinite;
	}
	.content {
		padding: 20rpx;
		margin-bottom: 30rpx;
	}
	.item {
		position: relative;
		display: flex;
		padding: 20rpx;
		border: 1px solid #eee;
	}
	.item:nth-child(n+2) {
		margin-top: -1px;
	}
	.avatar {
		flex: 18%;
	}
	.avatar .image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}
	.text-info {
		flex: 82%;
		overflow: hidden;
	}
	.text-info .username {
		margin-top: 30rpx;
	}
	.text-info .message-text {
		margin: 25rpx 0;
		font-size: 33rpx;
		word-wrap: break-word;
	}
	.text-info .timestamp {
		font-size: 30rpx;
		color: #888;
	}
	.bottom {
		position: relative;
		margin: 0 20rpx 20rpx;
		border: 1px solid #ddd;
	}
	.bottom .mask {
		display: block;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.3);
		text-align: center;
		line-height: 240rpx;
		font-size: 30rpx;
		color: #eee;
		z-index: 2;
	}
	.bottom .mask .login {
		color: #ff6700;
	}
	.bottom .bottom-text {
		padding: 20rpx;
		height: 200rpx;
	}
	.bottom .push {
		position: absolute;
		right: 0;
		bottom: 0;
		width: 160rpx;
		height: 70rpx;
		line-height: 70rpx;
	}
	
	@-webkit-keyframes Gradient {
	  0% {
	    background-position: 0% 50%;
	  }
	  50% {
	    background-position: 100% 50%;
	  }
	  100% {
	    background-position: 0% 50%;
	  }
	}
	
	@-moz-keyframes Gradient {
	  0% {
	    background-position: 0% 50%;
	  }
	  50% {
	    background-position: 100% 50%;
	  }
	  100% {
	    background-position: 0% 50%;
	  }
	}
	
	@keyframes Gradient {
	  0% {
	    background-position: 0% 50%;
	  }
	  50% {
	    background-position: 100% 50%;
	  }
	  100% {
	    background-position: 0% 50%;
	  }
	}
</style>
