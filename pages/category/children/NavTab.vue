<template>
	<view v-if="navList.length > 0" class="nav-tab">
		<view 
		v-for="(item, index) in navList" 
		:key='index' 
		:class="{'nav-tab-item': true, 'select': index == currentIndex}"
		@click="tabClick(index)"
		>
		{{item}}</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {}
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
</style>
