<template>
	<view class="search">
		<ourLoading isFullScreen :translateY="50" :active='isLoading' text="loading..." />
		<view @click="searchClick">
			<uni-search-bar
			class="search-bar"
			placeholder="搜索" 
			radius="50"
			bgColor="#fafafa"
			maxlength="20"
			@input='input'
			@confirm='confirm'
			></uni-search-bar>
		</view>
		<filter-info v-if="isShowFilter" :goods="goods" @clickGoods='clickGoods'></filter-info>
		<goods :goodsList="goods" v-else></goods>
	</view>
</template>

<script>
	import { getSearchEntry, getParamSearch } from "@/network/search.js"
	
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import Goods from "@/components/goods/Goods.vue"
	import FilterInfo from "./children/FilterInfo.vue"
	export default {
		data(){
			return {
				isShowFilter: true,
				isLoading: false,
				goods: [],
				timer: -1
			}
		},
		components: {
			uniSearchBar,
			Goods,
			FilterInfo
		},
		async onLoad(params) {
			if(Object.keys(params).length > 0) {
				this.isLoading = true;
				this.isShowFilter = false;
				let result = await getParamSearch(params.fruits)
				this.goods = result.data;
				this.isLoading = false;
			}
		},
		
		methods: {
			input(e){
				if(this.timer) clearTimeout(this.timer)
				this.timer = setTimeout(async() => {
					let result = await getSearchEntry(e.value);
					this.goods = result.data;
				}, 300);
			},
			clickGoods(goods){
				this.isShowFilter = false;
				this.goods = [goods];
			},
			confirm(){
				this.isShowFilter = false;
			},
			searchClick(){
				if(!this.isShowFilter) {
					this.goods.splice(0)
					this.isShowFilter = true;
				}
			}
		}
	}
</script>

<style>
</style>
