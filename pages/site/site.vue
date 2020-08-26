<template>
	<view class="site">
		<add-site></add-site>
		<all-site :page="fromPage"></all-site>
	</view>
</template>

<script>
	import AddSite from "./children/AddSite.vue"
	import AllSite from "./children/AllSite.vue"
	
	export default {
		data() {
			return {
				fromPage: ''
			}
		},
		components: {
			AddSite,
			AllSite
		},
		computed: {},
		methods: {},
		onLoad(params) {
			this.fromPage = params.page;
		}
	}
</script>

<style>
	.site {
		background-color: #eee;
	}
	
	.align {
		padding: 15rpx;
		background-color: #fff;
		font-size: 34rpx;
		color: #333;
	}
	
</style>
