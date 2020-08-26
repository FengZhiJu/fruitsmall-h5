<template>
	<view v-if="carousels.length > 0">
		<swiper  
		class="carousels" 
		indicator-dots="true" 
		autoplay="true"
		interval="2000"
		circular="true"
		>
			<swiper-item v-for="(item, index) in carousels" :key='index'>
				<image :src="item"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		
		props: {
			carousels: {
				type: Array,
				default(){
					return []
				}
			}
		}
	}
</script>

<style>
	.carousels {
		height: 400rpx;
	}
	.carousels image{
		width: 100%;
		height: 100%;
	}
</style>
