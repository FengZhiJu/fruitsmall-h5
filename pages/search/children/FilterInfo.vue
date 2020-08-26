<template>
	<view class="filter-info">
		<view class="info-item" v-for="(item, index) in goods" :key="index" @click="toSearch(item)">{{item.name}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		components: {

		},
		props: {
			goods: {
				type: Array,
				default () {
					return []
				}
			}
		},
		methods: {
			toSearch(item) {
				this.$emit('clickGoods', item)
			}
		}
	}
</script>

<style>
	.filter-info {
		max-height: 80vh;
		padding: 0 30rpx;
		font-size: 27rpx;
		overflow-y: auto;
		border-bottom: 1px solid #eee;
	}

	.info-item {
		height: 80rpx;
		line-height: 80rpx;
		border-bottom: 1px solid #fafafa;
	}
</style>
