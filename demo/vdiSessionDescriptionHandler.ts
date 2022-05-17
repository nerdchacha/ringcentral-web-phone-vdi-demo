import { VDISessionDescriptionHandler } from '@ringcentral/webadapter-vdisdh/src/VDISessionDescriptionHandler';
import { WebPhoneSession } from 'ringcentral-web-phone/lib/session';
import { defaultMediaStreamFactory, defaultPeerConnectionConfiguration, WebPhoneSessionDescriptionHandlerFactoryOptions, WebPhoneSessionDescriptionHandlerConfiguration, SessionDescriptionHandler } from 'ringcentral-web-phone/lib/sessionDescriptionHandler';

export const vdiSessionDescriptionFactory = (session: WebPhoneSession, options?: WebPhoneSessionDescriptionHandlerFactoryOptions) => {
	const mediaStreamFactory = defaultMediaStreamFactory();

	// make sure we allow `0` to be passed in so timeout can be disabled
	const iceGatheringTimeout = options?.iceGatheringTimeout !== undefined ? options?.iceGatheringTimeout : 5000;

	// merge passed factory options into default session description configuration
	const sessionDescriptionHandlerConfiguration: WebPhoneSessionDescriptionHandlerConfiguration = {
		iceGatheringTimeout,
		enableDscp: options.enableDscp,
		peerConnectionConfiguration: {
			...defaultPeerConnectionConfiguration(),
			...options?.peerConnectionConfiguration,
		},
	};

	const logger = session.userAgent.getLogger('sip.VDISessionDescriptionHandler');

	return new VDISessionDescriptionHandler(logger, mediaStreamFactory, sessionDescriptionHandlerConfiguration);
	// return new SessionDescriptionHandler(logger, mediaStreamFactory, sessionDescriptionHandlerConfiguration);
};
