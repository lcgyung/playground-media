import React, { useEffect } from 'react';
import ZoomMtgEmbedded from '@zoomus/websdk/embedded';
import hmacSHA256 from 'crypto-js/hmac-sha256';
import encBase64 from 'crypto-js/enc-base64';
import { Base64 } from 'js-base64';

const convertToMeetingNumber = () => (process.env.REACT_APP_MEETING_NUMBER ? process.env.REACT_APP_MEETING_NUMBER : '');
const convertToRole = () => (process.env.REACT_APP_ROLE ? Number(process.env.REACT_APP_ROLE) : 0);
const convertToPw = () => (process.env.REACT_APP_PW ? process.env.REACT_APP_PW : '');
const convertToName = () => (process.env.REACT_APP_NAME ? process.env.REACT_APP_NAME : '');
const convertToEmail = () => (process.env.REACT_APP_EMAIL ? process.env.REACT_APP_EMAIL : '');

const API_KEY = process.env.REACT_APP_API_KEY;
const API_SECRET = process.env.REACT_APP_API_SECRET;
const MEETING_NUMBER = convertToMeetingNumber();
const ROLE = convertToRole();
const PASS_WORD = convertToPw();

const client = ZoomMtgEmbedded.createClient();

const initClient = (element: HTMLElement | null) => {
	client
		.init({
			debug: true,
			zoomAppRoot: element || undefined,
			language: 'en-US',
		})
		.then(() => console.log('Init success'));
};

const joinClient = (signature: string) => {
	client
		.join({
			apiKey: API_KEY,
			signature,
			meetingNumber: MEETING_NUMBER,
			userName: convertToName(),
			password: PASS_WORD,
			userEmail: convertToEmail(),
			success: (success: string) => {
				console.log('success : ', success);
			},
			error: (error: string) => {
				console.log('error : ', error);
			},
		})
		.then(() => {
			console.log('success');
		})
		.catch((error) => console.error('시발 에러 : ', error));
};

interface generateSignatureProps {
	apiKey: string;
	apiSecret: string;
	meetingNumber: string;
	role: number;
	success?: Function;
	error?: Function;
}

export function generateSignature(props: generateSignatureProps) {
	let signature = '';
	const { apiKey, apiSecret, meetingNumber, role } = props;
	try {
		const timestamp = new Date().getTime() - 30000;
		const msg = Base64.encode(apiKey + meetingNumber + timestamp + role);
		const hash = hmacSHA256(msg, apiSecret);
		signature = Base64.encodeURI(`${apiKey}.${meetingNumber}.${timestamp}.${role}.${encBase64.stringify(hash)}`);
		console.log('signature : ', signature);
		if (props?.success) {
			props.success(signature);
		}
	} catch (e) {
		console.error(e);
	}
	return signature;
}

function SampleZoom() {
	useEffect(() => {
		let meetingSDKElement = document.getElementById('meetingSDKElement');
		initClient(meetingSDKElement);
		const signature = generateSignature({
			apiKey: API_KEY,
			apiSecret: API_SECRET,
			meetingNumber: MEETING_NUMBER,
			role: ROLE,
		});
		joinClient(signature);
	}, []);

	return <div id="meetingSDKElement" style={{ border: '1px solid black', width: '300px', height: '300px' }}></div>;
}

export default SampleZoom;
