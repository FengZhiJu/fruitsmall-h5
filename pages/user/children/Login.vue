<template>
	<view class="login">
		<ourLoading isFullScreen :translateY="50" :active='isLoading' text="loading..." />
		<!-- #ifdef H5 || APP-PLUS -->
		<input type="text" v-model="username" placeholder="用户名" maxlength="15">
		<input type="text" password v-model="password" placeholder="密码" maxlength="15">
		<view class="button">
			<button size="mini" class="login-button" @click="login">登录</button>
			<button size="mini" class="signup" plain @click="toSignup">注册</button>
		</view>
		<uni-popup ref="popupHint" type="dialog" class="hint">
			<uni-popup-dialog type="error" :content="hint" :duration="0" :before-close="true" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<view class="wx">
			<button :disabled="flag" size="mini" open-type="getUserInfo" @getuserinfo='wxLogin' class="wx-button">微信授权登录</button>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'

	import {
		sendLogin,
		WXVerifyoLogin
	} from "@/network/user.js"
	export default {
		data() {
			return {
				username: '',
				password: '',
				hint: '',
				flag: false,
				isLoading: false
			}
		},
		components: {
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		},
		methods: {
			toSignup() {
				this.$emit('toSignup')
			},
			async login() {
				this.isLoading = true;
				if (this.username == '') {
					this.hint = '用户名不能为空';
				} else if (this.password == '') {
					this.hint = '密码不能为空';
				} else {
					let TAG = await sendLogin(this.username, this.password);
					if (!TAG.data.isLogin) {
						this.hint = '用户名或密码错误';
					} else {
						this.succeed(TAG);
						uni.navigateBack();
					}
				}
				this.hint != '' && this.$refs.popupHint.open();
				this.isLoading = false;
			},
			confirm() {
				this.$refs.popupHint.close();
			},
			succeed(res){
				this.$store.commit('setLogin', res.data)
				this.$store.commit('setCart', res.data.cart)
				this.$store.commit('setSite', res.data.site)
				this.$store.commit('setAvatar', res.data.avatar)
			},
			wxLogin(res) {
				if (res.detail.errMsg.includes('ok')) {
					this.flag = !this.flag;
					this.isLoading = true;
					uni.login({
						provider: 'weixin',
						success: (authResult) => {
							let code = authResult.code;
							uni.getUserInfo({
								success: async(info) => {
									let userInfo = {
										code,
										avatar: info.userInfo.avatarUrl,
										username: info.userInfo.nickName
									}
									let res = await WXVerifyoLogin(userInfo)
									this.succeed(res);
									// #ifdef MP-WEIXIN
									uni.setStorage({
										key: 'cookies',
										data: res.cookies[0]
									})
									this.isLoading = false;
									// #endif
									uni.navigateBack();
								}
							})
						}
					})
				}
			}
		}
	}
</script>

<style>
	.login-button {
		background-color: #333;
		color: #fff;
	}

	button {
		margin-right: 20rpx;
	}

	.signup {
		margin-right: 0;
		margin-left: 20rpx;
	}

	.wx {
		text-align: center;
	}

	.wx-button {
		margin-top: 20rpx;
		width: 460rpx !important;
		margin-right: 0;
		font-size: 30rpx;
		background-color: #333;
		color: #fff;
	}
</style>
