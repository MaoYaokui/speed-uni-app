<template>
	<view v-if="clause" style="margin: 20upx;">
		尊敬的游客朋友您好：<br />
		为您的水上游玩更加顺畅，保障您的安全，请认真阅读以下提示：<br />

		1. 水上项目游玩前必须穿戴好救生衣并经工作人员的检查，由工作人员技术指导后方可进行。<br />
		2. 水上游玩中禁止擅自脱掉救生衣，严禁船艇上打闹、站立，防止意外发生，严禁水中擅自上、下船/艇，换船/艇等危险行为。<br />
		3. 老人（70岁以上）参与水上项目必须有安全监护能力的人员陪同，并在身体允许的情况下参加，禁止独立操作。<br />
		4. 凡患有心脏病、高血压、心脑血管等突发性疾病的人以及孕妇、酗酒醉酒、行动不便等不适合户外运动的人员禁止参与皮划艇、降班等水上运动体验，特殊情况者需征得教练和工作人员同意方可参与，否则后果自负。<br />
		5. 请勿将贵重物品（如手机、手表、首饰、钱包、背包、饰品等）带至水上，请寄存于浪速工作人员处，如您执意要带至水上，请妥善保管个人物品，如有遗失、损坏、泡水，浪速概不负责。<br />
		6. 在游玩过程中请爱护器材，若有人为损坏应按照浪速器材价目表赔偿。<br />
		7. 游玩时请在俱乐部指定安全水域范围内游玩，请勿私自前往安全区域以外划行，如因未遵守此条规定要求，而发生任何安全事故，后果自负。<br />
		8. 本票实行一船一票制，购买后不设退换，如因不可逆原因，不能实时游玩，可标注时间日期下次体验，请妥善保管遗失不补，重新游玩需重新购票，下水前码头教练将统一收取。<br />
		9. 下水计时是按水上时间半小时计算，下水时工作人员会告知上岸时间，若超时十分钟以上按当日执行价格的半小时计算收取。<br />
		10. 游客较多时，会出现排队等候较长的情况，请游客予以理解，听从现场工作人员的引导和安排。<br />
		11. 水上项目游玩时如有不适，请及时向工作人员求助。<br />
		12. 对于任何不遵守水上安全规则，做出危险、无礼、违规行为或严重影响他人安全行为的游客，工作人员有权终止游客体验。<br />
		<view class="list-cell log-out-btn" @click="confirm">
			<text class="cell-tit">确认</text>
		</view>
	</view>
	<view v-else>
		<view class="goods-section">
			<view class="g-item">
				<image :src="order.image"></image>
				<view class="right">
					<text class="title clamp">{{order.title}}</text>
					<text class="spec">{{order.itemName}}</text>
					<view class="price-box">
						<text class="price">￥{{order.salePrice}}</text>
						<text class="number">x {{order.count}}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 金额明细 -->
		<view class="yt-list">
			<view class="yt-list-cell desc-cell">
				<text class="cell-tit clamp">数量</text>
				<view class="example-body">
					<uni-number-box :value="order.count" @change="change" />
				</view>
			</view>
			<!-- <view class="yt-list-cell desc-cell">
				<text class="cell-tit clamp">学员</text>
				<input class="desc" type="text" v-model="desc" placeholder="请选择学员" placeholder-class="placeholder" />
			</view> -->
			<view class="yt-list-cell desc-cell">
				<text class="cell-tit clamp">备注</text>
				<input class="desc" type="text" v-model="order.remark" placeholder="请填写备注信息" placeholder-class="placeholder" />
			</view>
		</view>

		<!-- 电子合同 -->
		<view class="yt-list">
			<view class="yt-list-cell desc-cell" style="margin-top: 10upx;">
				<switch style="transform:scale(0.7)" @change="switchChange" />
				<text @click="notice">阅读并同意
					<text style="text-decoration:underline;">
						《浪速水上运动游客须知》
					</text>
				</text>
			</view>
		</view>

		<!-- 底部 -->
		<view class="footer">
			<view class="price-content">
				<text>应付款</text>
				<text class="price-tip">￥</text>
				<text class="price">{{order.totalPrice}}</text>
			</view>
			<text class="submit" @click="submit">提交订单</text>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"

	export default {
		data() {
			return {
				order: null,
				read: false,
				/**
				 * 是否显示合同
				 */
				clause: false
			}
		},
		computed: {
			...mapState(['ipAddress', 'filePath', 'userId'])
		},
		components: {
			uniNumberBox
		},
		async onLoad(option) {
			//商品数据
			const _this = this;
			await uni.request({
				url: _this.ipAddress + '/orders/info',
				data: {
					productId: option.productId,
					itemId: option.itemId
				},
				method: 'GET',
				success: (res) => {
					let orders = res.data.orders
					orders.image = _this.filePath + orders.image
					orders.count = 1
					orders.totalPrice = orders.count * orders.salePrice
					_this.order = orders
					console.log('order', _this.order)
				}
			});
		},
		methods: {
			...mapMutations(['updateUserInfo', 'updateUserId']),
			submit() {
				const _this = this;
				const order = _this.order
				if (!_this.read) {
					uni.showToast({
						title: '请先阅读并同意游客须知！',
						icon: 'none',
						duration: 2000
					});
					return
				}
				// 判断此用户是否登录
				if (_this.userId === '') {
					uni.showToast({
						title: '首次购买，请先在我的页面进行登录!',
						icon: 'none',
						duration: 2000
					});
				} else {
					uni.showLoading({
						title: '正在生成订单'
					})

					uni.request({
						url: _this.ipAddress + '/orders/create',
						data: {
							productId: order.productId,
							itemId: order.itemId,
							userId: _this.userId,
							count: order.count,
							payPrice: order.totalPrice,
							remark: order.remark
						},
						method: 'POST',
						success: (res) => {
							const orderId = res.data.orderId;
							console.log('orderId', orderId)
							uni.hideLoading();
							uni.redirectTo({
								url: `/pages/money/pay?orderId=${orderId}`
							})
						}
					});
				}
			},
			change(value) {
				this.order.count = value
				this.order.totalPrice = this.order.count * this.order.salePrice
			},
			stopPrevent() {},
			switchChange(e) {
				console.log('read', this.read)
				this.read = e.target.value
				console.log('read', this.read)
			},
			notice() {
				this.clause = true
			},
			confirm() {
				this.clause = false
			},
			login() {
				const _this = this;

				uni.showLoading({
					title: '登录中...'
				});

				// wx获取登录用户code
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						//将用户登录code传递到后台置换用户SessionKey、OpenId等信息
						uni.request({
							url: _this.ipAddress + '/user/login',
							data: {
								code: loginRes.code,
							},
							method: 'GET',
							success: (res) => {
								//openId、或SessionKdy存储//隐藏loading
								_this.updateUserId(res.data.userId)
								//获取用户信息
								uni.getUserInfo({
									provider: 'weixin',
									lang: 'zh_CN',
									success: function(infoRes) {
										console.log('infoRes', infoRes)
										//获取用户信息后向调用信息更新方法
										console.log('userId', _this.userId)
										infoRes.userInfo.userId = _this.userId
										_this.updateUserInfo(infoRes.userInfo); //调用更新信息方法
									},
									fail() {
										//用户未授权转向授权页面
										uni.reLaunch({ //信息更新成功后跳转到小程序首页
											url: '/pages/public/login'
										});
									},
									complete() {
										uni.hideLoading();
									}
								});
							}
						});
					},
				});
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-bottom: 100upx;
	}

	.list-cell {
		display: flex;
		align-items: baseline;
		padding: 20upx $page-row-spacing;
		line-height: 60upx;
		position: relative;
		background: #fff;
		justify-content: center;

		&.log-out-btn {
			margin-top: 40upx;

			.cell-tit {
				color: $uni-color-primary;
				text-align: center;
				margin-right: 0;
			}
		}

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30upx;
		}

		&.m-t {
			margin-top: 16upx;
		}

		.cell-more {
			align-self: baseline;
			font-size: $font-lg;
			color: $font-color-light;
			margin-left: 10upx;
		}

		.cell-tit {
			flex: 1;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			margin-right: 10upx;
		}

		.cell-tip {
			font-size: $font-base;
			color: $font-color-light;
		}

		switch {
			transform: translateX(16upx) scale(.84);
		}
	}

	.address-section {
		padding: 30upx 0;
		background: #fff;
		position: relative;

		.order-content {
			display: flex;
			align-items: center;
		}

		.icon-shouhuodizhi {
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 90upx;
			color: #888;
			font-size: 44upx;
		}

		.cen {
			display: flex;
			flex-direction: column;
			flex: 1;
			font-size: 28upx;
			color: $font-color-dark;
		}

		.name {
			font-size: 34upx;
			margin-right: 24upx;
		}

		.address {
			margin-top: 16upx;
			margin-right: 20upx;
			color: $font-color-light;
		}

		.icon-you {
			font-size: 32upx;
			color: $font-color-light;
			margin-right: 30upx;
		}

		.a-bg {
			position: absolute;
			left: 0;
			bottom: 0;
			display: block;
			width: 100%;
			height: 5upx;
		}
	}

	.goods-section {
		margin-top: 16upx;
		background: #fff;
		padding-bottom: 1px;

		.g-header {
			display: flex;
			align-items: center;
			height: 84upx;
			padding: 0 30upx;
			position: relative;
		}

		.logo {
			display: block;
			width: 50upx;
			height: 50upx;
			border-radius: 100px;
		}

		.name {
			font-size: 30upx;
			color: $font-color-base;
			margin-left: 24upx;
		}

		.g-item {
			display: flex;
			margin: 20upx 30upx;

			image {
				flex-shrink: 0;
				display: block;
				width: 140upx;
				height: 140upx;
				border-radius: 4upx;
			}

			.right {
				flex: 1;
				padding-left: 24upx;
				overflow: hidden;
			}

			.title {
				font-size: 30upx;
				color: $font-color-dark;
			}

			.spec {
				font-size: 26upx;
				color: $font-color-light;
			}

			.price-box {
				display: flex;
				align-items: center;
				font-size: 32upx;
				color: $font-color-dark;
				padding-top: 10upx;

				.price {
					margin-bottom: 4upx;
				}

				.number {
					font-size: 26upx;
					color: $font-color-base;
					margin-left: 20upx;
				}
			}

			.step-box {
				position: relative;
			}
		}
	}

	.yt-list {
		margin-top: 16upx;
		background: #fff;
	}

	.yt-list-cell {
		display: flex;
		align-items: center;
		padding: 10upx 30upx 10upx 40upx;
		line-height: 70upx;
		position: relative;

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30upx;
		}

		.cell-icon {
			height: 32upx;
			width: 32upx;
			font-size: 22upx;
			color: #fff;
			text-align: center;
			line-height: 32upx;
			background: #f85e52;
			border-radius: 4upx;
			margin-right: 12upx;

			&.hb {
				background: #ffaa0e;
			}

			&.lpk {
				background: #3ab54a;
			}

		}

		.cell-more {
			align-self: center;
			font-size: 24upx;
			color: $font-color-light;
			margin-left: 8upx;
			margin-right: -10upx;
		}

		.cell-tit {
			flex: 1;
			font-size: 26upx;
			color: $font-color-light;
			margin-right: 10upx;
		}

		.cell-tip {
			font-size: 26upx;
			color: $font-color-dark;

			&.disabled {
				color: $font-color-light;
			}

			&.active {
				color: $base-color;
			}

			&.red {
				color: $base-color;
			}
		}

		&.desc-cell {
			.cell-tit {
				max-width: 90upx;
			}
		}

		.desc {
			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
		}
	}

	/* 支付列表 */
	.pay-list {
		padding-left: 40upx;
		margin-top: 16upx;
		background: #fff;

		.pay-item {
			display: flex;
			align-items: center;
			padding-right: 20upx;
			line-height: 1;
			height: 110upx;
			position: relative;
		}

		.icon-weixinzhifu {
			width: 80upx;
			font-size: 40upx;
			color: #6BCC03;
		}

		.icon-alipay {
			width: 80upx;
			font-size: 40upx;
			color: #06B4FD;
		}

		.icon-xuanzhong2 {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 60upx;
			height: 60upx;
			font-size: 40upx;
			color: $base-color;
		}

		.tit {
			font-size: 32upx;
			color: $font-color-dark;
			flex: 1;
		}
	}

	.footer {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 995;
		display: flex;
		align-items: center;
		width: 100%;
		height: 90upx;
		justify-content: space-between;
		font-size: 30upx;
		background-color: #fff;
		z-index: 998;
		color: $font-color-base;
		box-shadow: 0 -1px 5px rgba(0, 0, 0, .1);

		.price-content {
			padding-left: 30upx;
		}

		.price-tip {
			color: $base-color;
			margin-left: 8upx;
		}

		.price {
			font-size: 36upx;
			color: $base-color;
		}

		.submit {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 280upx;
			height: 100%;
			color: #fff;
			font-size: 32upx;
			background-color: $base-color;
		}
	}

	/* 优惠券面板 */
	.mask {
		display: flex;
		align-items: flex-end;
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0, 0, 0, 0);
		z-index: 9995;
		transition: .3s;

		.mask-content {
			width: 100%;
			min-height: 30vh;
			max-height: 70vh;
			background: #f3f3f3;
			transform: translateY(100%);
			transition: .3s;
			overflow-y: scroll;
		}

		&.none {
			display: none;
		}

		&.show {
			background: rgba(0, 0, 0, .4);

			.mask-content {
				transform: translateY(0);
			}
		}
	}

	/* 优惠券列表 */
	.coupon-item {
		display: flex;
		flex-direction: column;
		margin: 20upx 24upx;
		background: #fff;

		.con {
			display: flex;
			align-items: center;
			position: relative;
			height: 120upx;
			padding: 0 30upx;

			&:after {
				position: absolute;
				left: 0;
				bottom: 0;
				content: '';
				width: 100%;
				height: 0;
				border-bottom: 1px dashed #f3f3f3;
				transform: scaleY(50%);
			}
		}

		.left {
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex: 1;
			overflow: hidden;
			height: 100upx;
		}

		.title {
			font-size: 32upx;
			color: $font-color-dark;
			margin-bottom: 10upx;
		}

		.time {
			font-size: 24upx;
			color: $font-color-light;
		}

		.right {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 26upx;
			color: $font-color-base;
			height: 100upx;
		}

		.price {
			font-size: 44upx;
			color: $base-color;

			&:before {
				content: '￥';
				font-size: 34upx;
			}
		}

		.tips {
			font-size: 24upx;
			color: $font-color-light;
			line-height: 60upx;
			padding-left: 30upx;
		}

		.circle {
			position: absolute;
			left: -6upx;
			bottom: -10upx;
			z-index: 10;
			width: 20upx;
			height: 20upx;
			background: #f3f3f3;
			border-radius: 100px;

			&.r {
				left: auto;
				right: -6upx;
			}
		}
	}

	.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
	}
</style>
