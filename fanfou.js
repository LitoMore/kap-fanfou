'use strict';

const fs = require('fs');
const FanfouSDK = require('fanfou-sdk');

const Fanfou = {};
const defaultStatus = '刚刚用 Kap 发布了一张照片';

const isDuplicate = async token => {
	const ff = new FanfouSDK(token);
	const res = await ff.get('/statuses/user_timeline', {count: 1});
	const [item = {}] = res;
	return item.text === defaultStatus;
};

Fanfou.upload = async (token, filePath) => {
	const ff = new FanfouSDK(token);
	const isDup = await isDuplicate(token);
	let status = defaultStatus;

	if (isDup) {
		status += '。';
	}

	await ff.upload('/photos/upload', {photo: fs.createReadStream(filePath), status});
	return 'Succeed';
};

module.exports = Fanfou;
