<template>
	<view class="nav-view">
		<view v-for="(item, index) in navLabel" :key='index' class="nav-view-item" @click="toSearch(index)">
			<image :src="item" class="image"></image>
			<view class="name">{{fruitsName[index]}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		components: {},
		props: {
			navLabel: {
				type: Array,
				default(){
					return []
				}
			}
		},
		computed: {
			fruitsName(){
				return this.navLabel.map((item) => {
					let regular = /[类|果]\/(.*?)\.jpg$/g
					return regular.exec(item)[1]
				})
			}
		},
		methods: {
			toSearch(index){
				uni.navigateTo({
					url: '/pages/search/search?fruits=' + this.fruitsName[index]
				})
			}
		}
	}
</script>

<style>
	.nav-view {
		box-sizing: border-box;
		flex: 1;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 40rpx 50rpx 0;
		height: calc(100vh - 95px);
		overflow: auto;
	}
	
	.nav-view-item {
		width: 200rpx;
		height: 250rpx;
		text-align: center;
	}
	.nav-view-item .image {
		width: 200rpx;
		height: 150rpx;
	}
	
	/* #ifdef MP-WEIXIN */
	.nav-view {
		height: 100vh;
	}
	/* #endif */
	
	/* #ifdef APP-PLUS */
	.nav-view {
		height: 100vh;
	}
	.name {
		font-size: 34rpx;
	}
	/* #endif */
</style>
