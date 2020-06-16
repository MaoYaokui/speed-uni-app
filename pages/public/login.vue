<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<view>
			<view>
				<view class='header'>
					<image src='../../static/wx_login.png'></image>
				</view>
				<view class='content'>
					<view>申请获取以下权限</view>
					<text>获得你的公开信息(昵称，头像、地区等)</text>
				</view>

				<button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">
					授权登录
				</button>
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';

	export default {
		computed: mapState(['userId']),
		methods: {
			...mapMutations(['updateUserInfo']),

			//第一授权获取用户信息 ===》 按钮触发
			wxGetUserInfo() {
				let _this = this;
				uni.getUserInfo({
					provider: 'weixin',
					lang: 'zh_CN',
					success: function(infoRes) {
						// infoRes.userInfo.userId = _this.userId
						// _this.updateUserInfo(infoRes.userInfo)
						console.log('---------授权成功---------')
						
						uni.switchTab({
							url: '/pages/index/index'
						})

						// uni.redirectTo({
						// 	url: '/pages/money/paySuccess'
						// })
					},
					fail(res) {}
				});
			}
		},
	}
</script>

<style>
	.header {
		margin: 90rpx 0 90rpx 50rpx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
		line-height: 450rpx;
	}

	.header image {
		width: 200rpx;
		height: 200rpx;
	}

	.content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}

	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}

	.bottom {
		border-radius: 80rpx;
		margin: 70rpx 50rpx;
		font-size: 35rpx;
	}
</style>
