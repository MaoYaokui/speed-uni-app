<template>
	<view class="app">
		<view class="price-box">
			<text>支付金额</text>
			<text class="price">{{orderInfo.payPrice}}</text>
		</view>

		<view class="pay-type-list">

			<view class="type-item b-b" @click="changePayType(1)">
				<text class="icon yticon icon-weixinzhifu"></text>
				<view class="con">
					<text class="tit">微信支付</text>
					<text>推荐使用微信支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 1' />
					</radio>
				</label>
			</view>
			<!-- <view class="type-item b-b" @click="changePayType(2)">
				<text class="icon yticon icon-alipay"></text>
				<view class="con">
					<text class="tit">支付宝支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 2' />
					</radio>
				</label>
			</view> -->
			<!-- <view class="type-item" @click="changePayType(3)">
				<text class="icon yticon icon-erjiye-yucunkuan"></text>
				<view class="con">
					<text class="tit">预存款支付</text>
					<text>可用余额 ¥198.5</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 3' />
					</radio>
				</label>
			</view> -->
		</view>

		<text class="mix-btn" @click="confirm">确认支付</text>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'

	const md5 = require('../../js_sdk/js-md5/src/md5.js');

	export default {
		data() {
			return {
				appid: '',
				key: '',
				payOrder: '',
				payType: 1,
				orderInfo: {
					id: null,
					payPrice: 0.00
				}
			};
		},
		computed: {
			...mapState(['ipAddress'])
		},
		async onLoad(options) {
			const _this = this;
			_this.orderInfo.id = options.orderId
			await uni.request({
				url: _this.ipAddress + '/orders/get',
				data: {
					id: options.orderId
				},
				method: 'GET',
				success: (res) => {
					_this.orderInfo.payPrice = res.data.orders.payPrice
					_this.appid = res.data.appid
					_this.key = res.data.key
					_this.payOrder = res.data.payOrder
					console.log('res', res)
				}
			});
		},
		methods: {
			//选择支付方式
			changePayType(type) {
				this.payType = type;
			},
			//确认支付
			confirm: async function() {
				console.log('orderInfo', this.orderInfo)
				const _this = this;
				const appid = _this.appid
				const key = _this.key
				const timeStamp = String(Date.now());
				const nonceStr = Math.random().toString(32).slice(-8)
				const prepay_id = _this.payOrder.prepayid
				const signType = 'MD5'
				const paySign = md5('appId=' + appid + '&nonceStr=' + nonceStr + '&package=prepay_id=' + prepay_id +
					'&signType=' + signType + '&timeStamp=' + timeStamp + '&key=' + key)

				uni.requestPayment({
					provider: 'wxpay',
					timeStamp,
					nonceStr,
					package: 'prepay_id=' + prepay_id,
					signType,
					paySign,
					success: function(res) {
						console.log('success:' + JSON.stringify(res));
						// 微信支付
						uni.redirectTo({
							url: '/pages/money/paySuccess'
						})
					},
					fail: function(err) {
						console.log('fail:' + JSON.stringify(err));
					}
				});

				// uni.login({
				// 	provider: 'weixin',
				// 	success: function(loginRes) {
				// 		const code = loginRes.code
				// 		console.log('code', code)


				// 	}
				// });



			},
		}
	}
</script>

<style lang='scss'>
	.app {
		width: 100%;
	}

	.price-box {
		background-color: #fff;
		height: 265upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		color: #909399;

		.price {
			font-size: 50upx;
			color: #303133;
			margin-top: 12upx;

			&:before {
				content: '￥';
				font-size: 40upx;
			}
		}
	}

	.pay-type-list {
		margin-top: 20upx;
		background-color: #fff;
		padding-left: 60upx;

		.type-item {
			height: 120upx;
			padding: 20upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 60upx;
			font-size: 30upx;
			position: relative;
		}

		.icon {
			width: 100upx;
			font-size: 52upx;
		}

		.icon-erjiye-yucunkuan {
			color: #fe8e2e;
		}

		.icon-weixinzhifu {
			color: #36cb59;
		}

		.icon-alipay {
			color: #01aaef;
		}

		.tit {
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 4upx;
		}

		.con {
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-sm;
			color: $font-color-light;
		}
	}

	.mix-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 630upx;
		height: 80upx;
		margin: 80upx auto 30upx;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
