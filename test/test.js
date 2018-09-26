'use strict';

const path = require('path');
const test = require('ava');
const kapPluginTest = require('kap-plugin-test');

test('test plugin', async t => {
	const config = {
		consumerKey: 'key',
		consumerSecret: 'secret',
		oauthToken: 'token',
		oauthTokenSecret: 'tokenSecret'
	};
	const plugin = kapPluginTest(path.join(__dirname, 'fixtures/unicorn.gif'), {config});

	delete plugin.context.config.s.useNofanConfig;
	t.deepEqual(config, plugin.context.config.s);

	const error = await t.throwsAsync(plugin.run);
	t.is(error.message, 'Invalid consumer');
});
