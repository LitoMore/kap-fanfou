'use strict';

const fs = require('fs');
const FanfouSDK = require('fanfou-sdk');

const Fanfou = {};

Fanfou.upload = (token, filePath) => {
	return new Promise(resolve => {
		const ff = new FanfouSDK(token);
		ff.up('/photos/upload', {photo: fs.createReadStream(filePath), status: '刚刚用 Kap 发布了一张照片'}, err => {
			if (err) {
				resolve(err.message);
			} else {
				resolve('Succeed!');
			}
		});
	});
};

module.exports = Fanfou;
