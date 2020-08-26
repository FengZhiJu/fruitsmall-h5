<template>
	<view v-if="Object.keys(goods).length > 0" class="detail">
		<toast ref="toast" :message='toast'></toast>
		<goods-info :goods="goods"></goods-info>
		<serve :serve="serve"></serve>
		<delivery-info :goods="goods" ref='deliverInfo'></delivery-info>
		<recommend :recommend="recommend"></recommend>
		<goods-nav :goods="goods" @cart='cart' @navLeft="navLeft"></goods-nav>
		<uni-popup ref="popupHint" type="dialog" class="hint">
		    <uni-popup-dialog type="error" :content="hint" :duration="0" :before-close="true" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import { getRecommend } from "@/network/index.js"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	
	
	import GoodsInfo from "./children/GoodsInfo.vue"
	import Serve from "./children/Serve.vue"
	import DeliveryInfo from "./children/DeliveryInfo.vue"
	import GoodsNav from "./children/GoodsNav.vue"
	import Recommend from "@/components/recommend/Recommend.vue"
	
	import { getDetailData } from "@/network/detail.js"
	export default {
		data(){
			return {
				name: "detail",
				goods: {},
				serve: ['售后服务', '满199包邮', '质量保障', '72小时发货'],
				recommend: [],
				flag: true,
				hint: '',
				toast: ''
			}
		},
		components: {
			uniPopup,
			uniPopupMessage,
			uniPopupDialog,
			GoodsInfo,
			Serve,
			DeliveryInfo,
			GoodsNav,
			Recommend
		},
		methods: {
			getRecommend(){
				if(this.flag) {
					getRecommend().then(res => {
						this.recommend.push(...res.data);
					})
				}
			},
			navLeft(index){
				uni.switchTab({
					url: '/pages/cart/cart'
				})
			},
			cart(isFinish){
				this.$nextTick(() => {
					let deliverInfo = this.$refs.deliverInfo;
					if(!this.$store.state.isLogin) {
						uni.navigateTo({
							url: '/pages/user/user'
						})
					}else if(!deliverInfo.isSelect) {
						this.hint = '请选择规格'
					}else if(Object.keys(deliverInfo.currentSite).length <= 0) {
						this.hint = '请选择地址'
					}else if(isFinish) {
						this.hint= '';
						this.toast = '暂不支持购买';
						this.$refs.toast.show();
					}else{
						this.hint = ''
						let params = {
							goods: this.goods,
							fruits: this.goods.id,
							count: deliverInfo.count,
							site: deliverInfo.currentSite.site + deliverInfo.currentSite.detailSite,
							isFinish
						}
						this.$store.dispatch('isCart', params)
						this.toast = '已添加至购物车';
						this.$refs.toast.show();
						
					}
					this.hint != '' && this.$refs.popupHint.open();
				})
			},
			confirm(){
				this.$refs.popupHint.close();
			}
		},
		onLoad(params) {
			let { id } = params;
			getDetailData(id).then(res => {
				this.goods = res.data[0];
			});
			this.getRecommend();
		},
		
		onReachBottom() {
			this.getRecommend();
			this.flag = false;
		}
	}
</script>

<style>
	.align {
		background-color: #fff;
		padding: 20rpx 30rpx;
		border-radius: 20rpx;
	}
	
	.detail {
		padding-bottom: calc(50px + 20rpx);
		color: #444;
		background-color: #eee;
	}
	
</style>
