<template>
	<view class="goods-nav">
		<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />

	</view>
</template>

<script>
	import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue'

	import {
		mapGetters
	} from "vuex"
	export default {
		data() {
			return {
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		components: {
			uniGoodsNav
		},
		props: {
			goods: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		computed: {
			...mapGetters(['cartLength']),
			options() {
				return [{
					icon: 'cart',
					text: '购物车',
					info: this.cartLength
				}]
			}
		},
		methods: {
			onClick(e) {
				this.$emit('navLeft', e.index);
			},
			
			buttonClick(e) {
				let or = e.index == 0 ? false : true
				this.$emit('cart', or);
			},

		}
	}
</script>

<style>
	.goods-nav {
		position: fixed;
		bottom: 0;
		width: 100%;
	}
</style>
