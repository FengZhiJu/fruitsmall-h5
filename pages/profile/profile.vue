<template>
	<view class="profile">
		<view class="head">
			<image :src="avatar +'?'+ Math.random()" class="image" @click="avatarClick" v-if="isShow"></image>
			<view class="username" v-if="isLogin">{{username}}</view>
			<view @click="login" v-else>登录</view>
		</view>
		<view class="body">
			<view class="item" @click="toSite">
				<text>地址管理</text>
				<text class="iconfont">&#xe6b9;</text>
			</view>
			<view class="item" @click="toMessage">
				<text>留言板</text>
				<text class="iconfont">&#xe6b9;</text>
			</view>
			<!-- #ifdef H5 -->
			<view class="item" @click="openApp">
				<a href="http://39.101.173.169/apk/gmm.apk" ref='apk'></a>
				<text>下载APP</text>
				<text class="iconfont">&#xe6b9;</text>
			</view>
			<!-- #endif -->
			<view class="item logout" @click="logout" v-if="isLogin">
				<text>退出登录</text>
				<text class="iconfont">&#xe6b9;</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	import { logout, updateAvatar } from "@/network/user.js"

	export default {
		data() {
			return {
				isShow: true,
				timer: -1
			}
		},
		
		methods: {
			toSite(){
				if(this.isLogin) {
					uni.navigateTo({
						url: '/pages/site/site?page=profile'
					})
				}else {
					uni.navigateTo({
						url: '/pages/user/user'
					})
				}
			},
			logout(){
				if(this.isLogin) {
					logout();
					this.$store.commit('logout')
					uni.reLaunch({
						url: '/pages/index/index'
					})
				}else {
					uni.navigateTo({
						url: '/pages/user/user'
					})
				}
			},
			login(){
				uni.navigateTo({
					url: '/pages/user/user'
				})
			},
			toMessage(){
				uni.navigateTo({
					url: '/pages/message/message'
				})
			},
			avatarClick(){
				if(!this.isLogin) {
					this.login()
				}else {
					uni.chooseImage({
						count: 1,
						success: async({tempFilePaths, tempFiles}) => {
							let result = await uni.uploadFile({
								url: 'http://39.101.173.169/api/user/avatar',
								// url: 'http://localhost:3000/api/user/avatar',
								filePath: tempFilePaths[0],
								name: 'file',
								formData: {
									username: this.username
								}
							})
							this.$store.commit('setAvatar', result[1].data)
							this.isShow = false;
							this.isShow = true;
						}
					})
				}
			},
			// #ifdef H5
			openApp(){
				window.location.href = 'gmm://';
				this.timer = setTimeout(() => {
					this.$refs.apk.click();
					clearTimeout(this.timer);
				}, 1500);
			},
			// #endif
			test(){
				// plus.runtime.launchApplication({
				// 	pname: 'com.tencent.mm'
				// })
			}
		},
		computed: {
			...mapState(['avatar', 'username', 'isLogin'])
		},
		// #ifdef H5
		onHide() {
			if(this.timer) clearTimeout(this.timer);
		}
		// #endif
	}
</script>

<style>
	@import '@/static/iconfont/iconfont.css';
	.profile {
		height: calc(100vh - 94px);
		background-color: #E9E9E9;
	}

	/* #ifdef MP-WEIXIN */
	.profile {
		height: 100vh;
	}
	/* #endif */
	
	/* #ifdef APP-PLUS */
	.profile {
		height: 100vh;
	}
	/* #endif */
	.head {
		padding-bottom: 20rpx;
		overflow: hidden;
		text-align: center;
		font-size: 45rpx;
		background-color: #fff;
	}

	.image {
		width: 230rpx;
		height: 230rpx;
		margin: 50rpx auto 10rpx auto;
		border: 1px solid #ccc;
		border-radius: 50%;
	}
	.body {
		margin-top: 25rpx;
	}
	.item a {
		position: absolute;
	}
	.body .item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx;
		font-size: 36rpx;
		border-bottom: 1px solid #E9E9E9;
		background-color: #fff;
	}
	.body .logout {
		margin-top: 20rpx;
		color: red;
		border-bottom: 0;
	}
	.body .iconfont {
		float: right;
	}
</style>
