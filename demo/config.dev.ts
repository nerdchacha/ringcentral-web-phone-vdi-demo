import { RCBidirectionalWebsocketRouter } from '@ringcentral/ringcentral-media-redirection-sdk/src/RCBidirectionalWebsocketRouter';
import { RCRpcMessageDecoder } from '@ringcentral/ringcentral-media-redirection-sdk/src/RCRpcMessageDecoder';
import { RCRpcMessageEncoder } from '@ringcentral/ringcentral-media-redirection-sdk/src/RCRpcMessageEncoder';
const JSONRPC = require('jsonrpc-bidirectional');

const config = {
	connectionUrl: 'ws://localhost:8235/api',
	router: JSONRPC.BidirectionalWebsocketRouter,
	serverPlugins: [JSONRPC.Plugins.Server.AuthenticationSkip, JSONRPC.Plugins.Server.AuthorizeAll],
	clientPlugins: [],
};

export default config;
