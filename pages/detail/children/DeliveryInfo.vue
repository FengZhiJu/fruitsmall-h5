<template>
	<view class="delivery-info align">
		<view class="delivery-info-item" @click="openCount">
			<text class="delivery-type">规格</text>
			<text v-if="!isSelect">请选择</text>
			<text v-else>已选择数量为{{count}}</text>
			<uni-popup ref="popup" type="bottom">
				<view class="popup">
					<view class="popup-head">
						<image :src="goods.img"></image>
						<view>
							<view class="name">{{goods.name}}</view>
							<view class="price">
								<text class="now-price">￥{{goods | setPrice}}</text>
								<text class="old-price" v-if="goods.decorate">￥{{(goods.price * 1).toFixed(2)}}</text>
							</view>
						</view>
					</view>
					<view class="popup-body">
						<view class="count">
							<view class="count-text">数量</view>
							<lxc-count :index="1" :value="count" :min="1" :max="50" @handleCount="handleCountClick" ></lxc-count>
						</view>
					</view>
					<view class="popup-bottom">
						<button hover-class="confirm-click" @click="confirmClick">确认</button>
					</view>
				</view>
			</uni-popup>
			<uni-icons type="more-filled" size="25" class="more"></uni-icons>
		</view>
		<view class="delivery-info-item" @click="toSite">
			<text class="delivery-type">送至</text>
			<view v-if="Object.keys(currentSite).length > 0">{{currentSite.site}} <br> {{currentSite.detailSite}}</view>
			<view v-else-if="defaultSite">{{defaultSite.site}} <br> {{defaultSite.detailSite}}</view>
			<text v-else>请选择</text>
			<uni-icons type="more-filled" size="25" class="more"></uni-icons>
		</view>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import lxcCount from '@/components/lxc-count/lxc-count.vue'
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	
	import { mapState } from "vuex"
	export default {
		data() {
			return {
				count: 1,
				flag: true,
				isSelect: false,
				currentSite: {}
			}
		},
		components: {
			uniPopup,
			uniPopupMessage,
			uniPopupDialog,
			lxcCount,
			uniIcons
		},
		computed: {
			...mapState(['site', 'isLogin']),
			defaultSite(){
				return this.$store.state.site.find((value) => value.defaultSite);
			}
		},
		props: {
			goods: {
				type: Object,
				default(){
					return {}
				}
			}
		},
		methods: {
			openCount(){
				if(this.flag) {
					this.flag = false;
					this.$refs.popup.open();
				}else {
					this.flag = !this.flag;
				}
			},
			handleCountClick(val){
				this.count = val;
			},
			confirmClick(){
				this.isSelect = true;
				this.$refs.popup.close();
			},
			toSite(){
				if(this.isLogin) {
					uni.navigateTo({
						url: '/pages/site/site?page=detail'
					})
				}else {
					uni.navigateTo({
						url: '/pages/user/user'
					})
				}
			}
		},
		filters: {
			setPrice(goods){
				let price = goods.price * 1;
				return goods.decorate ? (price * 0.6).toFixed(2) : price.toFixed(2);
			}
		},
		created() {
			if(this.site.length > 0) {
				let def = this.site.find(item => item.defaultSite);
				this.currentSite =  def ? def : {};
			}
			uni.$on('setCurrentSite', (site) => this.currentSite = site);
		}
	}
</script>

<style>
	.delivery-info {
		margin-top: 20rpx;
		font-size: 30rpx;
	}
	.delivery-info-item {
		display: flex;
		position: relative;
		margin: 15rpx 0;
		padding: 10rpx 0;
	}
	.delivery-info-item .delivery-type{
		margin-right: 30rpx;
		font-weight: 700;
	}
	.popup {
		padding: 30rpx 30rpx 0;
		background-color: #fff;
		border-radius: 20rpx 20rpx 0 0;
	}
	.popup .popup-head {
		display: flex;
		align-items: center;
		height: 300rpx;
		font-size: 40rpx;
	}
	.popup .popup-head .price {
		margin-top: 20rpx;
		font-size: 50rpx;
		color: #ff6700;
	}
	.popup .popup-head .old-price {
		color: #999;
		text-decoration: line-through;
		font-size: 35rpx;
	}
	.popup .popup-head image {
		width: 250rpx;
		height: 250rpx;
		margin-right: 40rpx;
		border-radius: 15rpx;
		vertical-align: middle;
	}
	.popup .popup-body {
		margin-top: 40rpx;
		height: 460rpx;
		overflow-y: auto;
	}
	.popup .popup-body .count {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.popup .popup-body .count .count-text {
		font-weight: 700;
		font-size: 26rpx;
	}
	.popup .popup-bottom {
		height: 100rpx;
		padding-bottom: 20rpx;
	}
	.popup .popup-bottom button {
		background-color: #ff6700;
		color: #fff;
		height: 90%;
		line-height: 90rpx;
		border-radius: 50rpx;
		font-size: 35rpx;
	}
	.more {
		position: absolute;
		right: 0;
		top: 0;
		align-self: center;
	}
	
	.confirm-click {
		opacity: .5;
	}
</style>
