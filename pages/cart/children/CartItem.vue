<template>
	<view class="cart-box">
		<view class="cart-item" v-for="(item, index) in cart" :key='index'>
			<view :class="{'tick-box': true, 'tick-box-click': item.tick}" @click="tickBoxClick(item)">
				<text class="iconfont">&#xe60c;</text>
			</view>
			<image :src="item.img" class="image" @click="toDetail(item)" @longpress='longpress(item)'></image>
			<view class="goods-text-info" @click="toDetail(item)" @longpress='longpress(item)'>
				<view class="name">{{item.name}}</view>
				<view class="desc">{{item.desc}}</view>
				<view class="link-price">
					<view class="price">￥{{item.price}}</view>
					<view class="count">x{{item.count}}</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popupHint" type="dialog" class="hint">
		    <uni-popup-dialog type="error" content="确认删除吗" :duration="0" :before-close="true" @confirm="confirm" @close="cancel"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import { removeCart } from "@/network/cart.js"
	
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	
	import { mapState } from "vuex"
	import mixin from "@/common/mixin.js"
	export default {
		data() {
			return {
				selectCart: {}
			}
		},
		mixins: [mixin],
		computed: {
			...mapState(['cart'])
		},
		components: {
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		},
		methods: {
			tickBoxClick(item) {
				this.$store.commit('setTick', item);
			},
			toDetail(item) {
				uni.navigateTo({
					url: '/pages/detail/detail?id=' + item.id
				})
			},
			cancel(){
				this.$refs.popupHint.close();
			},
			async confirm(){
				this.$refs.popupHint.close();
				let result = await removeCart({
					fruits: this.selectCart.id,
					timestamp: this.selectCart.timestamp
				})
				this.$store.commit('setCart', result.data)
			},
			longpress(item){
				this.selectCart = item;
				this.$refs.popupHint.open();
			}
		}
	}
</script>

<style>
	@import "@/static/iconfont/iconfont.css";
	.cart-item {
		display: flex;
		align-items: center;
		padding: 30rpx 0;
		margin: 20rpx;
		border-bottom: 1px solid #ddd;
		border-radius: 30rpx;
		background-color: #fff;
	}
	
	.tick-box-click {
		background-color: #ff6700;
		border: 1px solid #ff6700 !important;
	}
	.image {
		width: 180rpx;
		height: 180rpx;
		margin-right: 30rpx;
		border: 1px solid #eee;
	}
	.goods-text-info {
		width: 100%;
		flex: 1;
		padding-right: 30rpx;
	}
	.goods-text-info .name {
		font-size: 35rpx;
	}
	.goods-text-info .desc {
		max-width: 370rpx;
		margin: 15rpx 0;
		font-size: 25rpx;
		color: #aaa;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.goods-text-info .link-price {
		display: flex;
		justify-content: space-between;
		width: 100%;
		font-size: 35rpx;
	}
	.goods-text-info .link-price .price {
		color: #ff6700;
		font-size: 37rpx;
	}
</style>
