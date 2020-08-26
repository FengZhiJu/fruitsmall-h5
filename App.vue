<script>
	import { verifyLoginTo } from "@/network/user.js"
	export default {
		onLaunch: function() {
			verifyLoginTo().then(res => {
				let user = res.data
				if(user.isLogin) {
					this.$store.commit('setLogin', user)
					this.$store.commit('setCart', user.cart)
					this.$store.commit('setSite', user.site)
					this.$store.commit('setAvatar', user.avatar)
				}
			});
			// #ifdef H5 || APP-PLUS
				uni.preloadPage({ url: '/page/category/category' })
				uni.preloadPage({ url: '/page/cart/cart' })
				uni.preloadPage({ url: '/page/profile/profile' })
			// #endif
		},
		onShow: function() {
		},
		onHide: function() {
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* #ifdef MP-WEIXIN */
	.top-search .nav-bar .uni-navbar__header-btns:nth-of-type(1) {
		position: relative;
		left: 10rpx;
		width: 40rpx !important;
	}
	.top-search .nav-bar .uni-navbar__header-btns:nth-child(3) {
		position: relative;
		right: 6rpx;
		width: 60rpx !important;
		font-size: 28rpx;
		color: #555555;
	}
	.login .wx .wx-button:after {
		background-color: rgba(0,0,0,.3);
	}
	/* #endif */
	.add-site .hint .uni-dialog-button:first-child,
	.detail .uni-dialog-button:first-child{
		display: none;
	}	
	
	.uni-dialog-button {
		border: 0 !important;
	}
</style>
