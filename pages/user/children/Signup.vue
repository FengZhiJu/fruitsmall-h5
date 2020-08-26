<template>
	<view class="signup">
		<ourLoading isFullScreen :translateY="50" :active='isLoading' text="loading..." />
		<view v-if="!flag">
			<input type="text" v-model="username" placeholder="用户名"  maxlength="15">
			<input type="text" password v-model="password" placeholder="密码" maxlength="15">
			<input type="text" password v-model="confirmPwd" placeholder="确认密码" maxlength="15">
			<view class="button">
				<button :disabled="flag" size="mini" class="signup-button" @click="signup">注册</button>
			</view>
			<view class="login">
				<text @click="toLogin">已有账号？去登录</text>
			</view>
			<uni-popup ref="popupHint" type="dialog" class="hint">
			    <uni-popup-dialog type="error" :content="hint" :duration="0" :before-close="true" @confirm="confirm"></uni-popup-dialog>
			</uni-popup>
		</view>
		<view class="finish-signup" v-else>
			<view>注册成功</view>
			<button size="mini" @click="toLogin">去登录</button>
		</view>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	
	import { findUsername, sendSingup } from "@/network/user.js"
	export default {
		data() {
			return {
				username: '',
				password: '',
				confirmPwd: '',
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
			toLogin(){
				this.$emit('toLogin');
			},
			async signup(){
				this.isLoading = true;
				if(this.username == ''){
					this.hint = '用户名不能为空';
				}else if(this.password.length <= 7) {
					this.hint = "密码不能少于8位数";
				}else if(this.password != this.confirmPwd) {
					this.hint = "密码与确认密码不一致";
				}else {
					let TAG = await findUsername(this.username);
					if(TAG.data.length > 0) {
						this.hint = "用户名已被注册";
					}else {
						this.hint = '';
						sendSingup(this.username, this.password);
						this.flag = !this.flag;
					}
				}
				this.isLoading = false;
				this.hint != '' && this.$refs.popupHint.open();
			},
			confirm(){
				this.$refs.popupHint.close();
			}
		}
	}
</script>

<style>
	.signup-button {
		background-color: #333;
		color: #fff;
	}
	.login {
		margin-top: 20rpx;
		font-size: 30rpx;
		color: #404040;
	}
	
	.signup-button /deep/ uni-button:after {
		background-color: rgba(0,0,0,.3);
	}
	.finish-signup view {
		margin-top: 30rpx;
		margin-bottom: 40rpx;
		font-size: 50rpx;
	}
	.finish-signup button {
		background-color: #333;
		color: #fff;
	}
</style>
