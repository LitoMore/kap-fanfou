'use strict';

const path = require('path');
const test = require('ava');
const kapPluginTest = require('kap-plugin-test');

test(async t => {
	const config = {
		consumerKey: 'key',
		consumerSecret: 'secret',
		oauthToken: 'token',
		oauthTokenSecret: 'tokenSecret'
	};
	const plugin = kapPluginTest(path.join(__dirname, 'fixtures/unicorn.gif'), {config});

	await plugin.run();
	delete plugin.context.config.s.useNofanConfig;

	t.deepEqual(config, plugin.context.config.s);
	t.true(plugin.context.notify.calledWith('Invalid consumer'));
});
