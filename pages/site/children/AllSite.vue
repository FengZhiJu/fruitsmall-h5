<template>
	<view class="all-site align">
		<view class="nullSite" v-if="site.length <= 0">您还未添加收货地址</view>
		<view class="site-main" v-else>
			<view v-for="(item, index) in site" :key="index" class="site-item">
				<view class="left"  @click="goBack(item)">
					<view class="person-info">
						<text class="person">{{item.person}}</text>
						<text class="number">{{item.number}}</text>
					</view>
					<view class="item-site">{{item.site}} {{item.detailSite}}</view>
				</view>
				<view class="right">
					<text class="default" v-if="item.defaultSite">默认</text>
					<text class="default" v-else @click="defaultSite(item)">设为默认</text>
					<text class="remove" @click="remove(item)">删除</text>
				</view>
			</view>
		</view>
		<uni-popup ref="popupHint" type="dialog" class="hint">
		    <uni-popup-dialog type="error" content="确认删除吗" :duration="0" :before-close="true" @confirm="confirm" @close="cancel"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	
	
	import { mapState } from "vuex"
	
	import { removeSite, defaultSite } from "@/network/user.js"
	export default {
		data() {
			return {
				selectSite: {}
			}
		},
		computed: {
			...mapState(['site'])
		},
		components: {
			uniPopup,
			uniPopupMessage,
			uniPopupDialog,
		},
		methods: {
			goBack(site){
				if(this.page == 'detail') {
					uni.$emit('setCurrentSite', site)
					uni.navigateBack();
				}
			},
			cancel(){
				this.$refs.popupHint.close();
			},
			async confirm(){
				this.$refs.popupHint.close();
				let result = await removeSite(this.selectSite.id);
				this.$store.commit('setSite', result.data)
			},
			remove(site) {
				this.selectSite = site
				this.$refs.popupHint.open();
			},
			
			async defaultSite(site){
				let oldDefault = this.site.find((item) => item.defaultSite);
				let oldID = oldDefault ? oldDefault.id : -1;
				let result = await defaultSite({
					oldID: oldID,
					newID: site.id
				});
				this.$store.commit('setSite', result.data)
			}
		},
		props: {
			page: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style>
	.all-site {
		overflow: hidden;
		margin-top: 30rpx;
		padding-top: 0 !important;
	}
	
	.nullSite {
		margin-top: 50rpx;
		text-align: center;
	}
	.site-item {
		display: flex;
		padding: 25rpx 0 30rpx 0;
		border-bottom: 1px solid #eee;
	}
	.left {
		flex: 70%;
		border-right: 1px solid #eee;
	}
	.right {
		flex: 30%;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		font-size: 26rpx;
		color: #aaa;
	}
	.right .remove {
		color: red;
	}
	.person {
		margin-left: 6rpx;
		font-size: 40rpx;
	}
	.number {
		margin-left: 20rpx;
		font-size: 30rpx;
		color: #888;
	}
	.item-site {
		font-size: 30rpx;
	}
</style>
