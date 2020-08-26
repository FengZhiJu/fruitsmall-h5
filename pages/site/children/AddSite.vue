<template>
	<view class="add-site align" @click="openPopup">
		<text>新增收货地址</text>
		<uni-icons type="plus" size="20" class="icons"></uni-icons>
		<uni-popup ref="popup" type="bottom">
			<view class="popup">
				<pick-regions :defaultRegion="defaultRegionCode" @getRegion="handleGetRegion">
					<view v-if="region.length <= 0">所在地区</view>
					<view v-else>{{regionName}}</view>
				</pick-regions>
				<input type="text" maxlength="10" v-model="person" placeholder="收件人" class="person">
				<input type="text" maxlength="20" v-model="siteText" placeholder="详细街道,门牌号" class="site-input">
				<input type="number" maxlength="15" v-model="number" placeholder="手机号码" class="number">
				<button class="site-confirm" @click="addSite">确认</button>
			</view>
		</uni-popup>
		<uni-popup ref="popupHint" type="dialog" class="hint">
		    <uni-popup-dialog type="error" :content="hint" :duration="0" :before-close="true" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	
	import pickRegions from '@/components/pick-regions/pick-regions.vue'
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	
	import { addSite } from "@/network/user.js"
	export default {
		data(){
			return {
				region: [],
				defaultRegion: ['广东省', '广州市', '番禺区'],
				defaultRegionCode: '440113',
				flag: true,
				person: '',
				siteText: '',
				number: '',
				hint: ''
			}
		},
		components: {
			uniPopup,
			uniPopupMessage,
			uniPopupDialog,
			pickRegions,
			uniIcons
		},
		computed: {
			regionName() {
				// 转为字符串
				return this.region.map(item => item.name).join(' ')
			},
		},
		methods: {
			handleGetRegion(region) {
				this.region = region
			},
			openPopup(){
				if(this.flag) {
					this.flag = !this.flag;
					this.$refs.popup.open();
				}else {
					this.flag = !this.flag;
				}
			},
			async addSite(){
				if(this.region.length <= 0) {
					this.hint = "地区未选择";
				}else if(this.person == '') {
					this.hint = "收件人未填写";
				}else if(this.siteText == '') {
					this.hint = "详细地址未填写";
				}else if(this.number == '') {
					this.hint = "手机号码未填写";
				}else {
					this.hint = '';
					this.$refs.popup.close();
					let defaultSite = this.$store.state.site.length <= 0 ? true : false;
					let result = await addSite({
						site: this.regionName,
						detailSite: this.siteText,
						number: this.number,
						defaultSite,
						person: this.person
					});
					this.person = '';
					this.region = [];
					this.siteText = '';
					this.number = '';
					this.$store.commit('setSite', result.data);
				}
				this.hint != '' && this.$refs.popupHint.open();
			},
			confirm(){
				this.$refs.popupHint.close();
			}
		}
	}
</script>

<style>
	.add-site {
		display: flex;
		align-items: center;
	}
	.icons {
		vertical-align: middle;
		margin-left: 4rpx;
	}
	.popup {
		padding: 40rpx 40rpx 0;
		height: 550rpx;
		background-color: #fff;
		border-radius: 20rpx 20rpx 0 0;
	}
	.person,
	.site-input,
	.number{
		margin-top: 40rpx;
	}
	.site-confirm {
		position: absolute;
		bottom: 30rpx;
		width: 670rpx;
		background-color: #ff6700;
		color: #fff;
		border-radius: 50rpx;
	}
</style>
