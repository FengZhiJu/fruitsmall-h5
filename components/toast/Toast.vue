<template>
	<view class="toast" v-if="flag">
		<text ref='toast' class="message" :style="[bottomClass]">{{message}}</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				flag: false,
				opacity: 0
			}
		},
		components: {},

		computed: {
			bottomClass() {
				return {
					bottom: this.bottom + '%',
					opacity: this.opacity
				}
			},
		},
		methods: {
			show() {
				this.flag = true;
				this.opacity = 0
				this.$nextTick(() => {
					setTimeout(() => this.opacity = 1, 10)
					setTimeout(() => {
						this.opacity = 0
						setTimeout(() => this.flag = false, 300)
					}, this.time)
				})
				
			}
		},
		props: {
			message: {
				type: String,
				default: '添加成功'
			},
			bottom: {
				type: Number,
				default: 23
			},
			time: {
				type: Number,
				default: 2000
			}
		}
	}
</script>

<style>
	.toast {
		position: fixed;
		width: 100vw;
		height: 100vh;
		background-color: transform;
		z-index: 99999;
	}

	.message {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		padding: 17rpx 25rpx;
		color: #fff;
		font-size: 27rpx;
		background-color: rgba(0, 0, 0, .7);
		z-index: 999999;
		border-radius: 10rpx;
		transition: all .3s;
		opacity: 0;
	}
</style>
