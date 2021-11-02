const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('child_process');
const fs = require('fs')

// Create the corde config file
// Run corde --validate to check we have everything we need or fail fast

class CordeConfig {
	constructor(cordeBotToken,
				botTestID,
				botToken,
				guildID,
				channelID,
				botPrefix,
				testMatches,
				timeout
	){
		this.cordeBotToken = cordeBotToken;
		this.botTestID = botTestID;
		this.botToken = botToken;
		this.guildID = guildID;
		this.channelID = channelID;
		this.botPrefix = botPrefix;
		this.testMatches = testMatches;
		this.timeout = timeout;
	}
}



func generateConfig() -> String {
	const cordeBotToken = core.getInput('cordeBotToken');
	const botTestID = core.getInput('botTestID');
	const botToken = core.getInput('botToken');
	const guildID = core.getInput('guildID');
	const channelID = core.getInput('channelID');
	const botPrefix = core.getInput('botPrefix');
	const testMatches = core.getInput('testMatches');
	const timeout = core.getInput('timeout');
	const config = new CordeConfig( cordeBotToken, botTestID, botToken, guildID, channelID, botPrefix, testMatches, timeout)
	return JSON.stringify(config)
}

try {
	const config = generateConfig();
	fs.writeFile('config.json', config)
	exec('npx run test --config config.json')
	core.setOutput("passed", true)
} catch (error) {
	core.setFailed(error);
}