<template>
		<view class="top-search">
			<uni-nav-bar fixed class="nav-bar" shadow>
				<view slot="left" class="left" @click="toCategory">
					<uni-icons type="bars" size="20"></uni-icons>
				</view>
				<view class="center" @click="searchBarClick">
					<uni-search-bar
					class="search-bar"
					placeholder="搜索" 
					radius="50"
					bgColor="#fafafa"
					maxlength="0"
					cancelButton='none'
					></uni-search-bar>
				</view>
				<view slot="right">
					<view v-if="!isLogin" @click="toLogin">登录</view>
					<uni-icons class="user-icon" type="contact-filled" size="30" color="#555" @click="toProfile" v-else></uni-icons>
				</view>
			</uni-nav-bar>
		</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	
	import { mapState } from "vuex"
	export default {
		data() {
			return {
				
			}
		},
		computed: {
			...mapState(['isLogin'])
		},
		components: {
			uniNavBar,
			uniSearchBar,
			uniIcons
		},
		methods: {
			toLogin(){
				uni.navigateTo({
					url: "/pages/user/user"
				})
			},
			toCategory(){
				uni.switchTab({
					url: '/pages/category/category'
				})
			},
			toProfile(){
				uni.switchTab({
					url: '/pages/profile/profile'
				})
			},
			searchBarClick(){
				uni.navigateTo({
					url: '/pages/search/search'
				})
			}
		}
	}
</script>

<style >
	.search-bar {
		width: 100%;
		font-size: 23rpx;
	}
	.top-search {
		width: 200rpx;
	}
	.center {
		position: relative;
		width: 100%;
	}
	.center::after {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 10rpx;
		content: '';
	}
	/* #ifdef H5 || APP-PLUS */
	.center {
		margin-right: 25rpx;
	}
	/* #endif */
	/deep/ .uni-navbar__header-btns:nth-of-type(1) {
		position: relative;
		left: 10rpx;
		width: 40rpx !important;
	}
	/deep/ .uni-navbar__header-btns:nth-child(3) {
		position: relative;
		right: 6rpx;
		width: 60rpx !important;
		font-size: 28rpx;
		color: #555555;
	}
	
	.user-icon {
		line-height: 120rpx;
	}
	
</style>
