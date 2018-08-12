'use strict';

const fs = require('fs');
const FanfouSDK = require('fanfou-sdk');

const Fanfou = {};
const defaultStatus = '刚刚用 Kap 发布了一张照片';

const isDuplicate = token => {
	const ff = new FanfouSDK(token);
	return new Promise((resolve, reject) => {
		ff.get('/statuses/user_timeline', {count: 1}, (err, res) => {
			if (err) {
				reject(err);
			} else {
				const [item = {}] = res;
				resolve(item.text === defaultStatus);
			}
		});
	});
};

Fanfou.upload = async (token, filePath) => {
	const ff = new FanfouSDK(token);
	const isDup = await isDuplicate(token);
	let status = defaultStatus

	if (isDup) {
		status += '。'
	}

	return new Promise((resolve, reject) => {
		ff.up('/photos/upload', {photo: fs.createReadStream(filePath), status}, err => {
			if (err) {
				reject(err);
			} else {
				resolve('Succeed!');
			}
		});
	});
};

module.exports = Fanfou;
