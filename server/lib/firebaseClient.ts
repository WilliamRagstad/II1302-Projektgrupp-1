import { getFirebaseClient } from './firebaseWrapper.ts';

//! Must be kept secret!
// https://console.firebase.google.com/u/1/project/airdash-eb4f7/settings/serviceaccounts/adminsdk Generated private key
const serviceAccountKey = {
	"type": "service_account",
	"project_id": "airdash-eb4f7",
	"private_key_id": "233f31e0bf101f470d552b0f14efcb789e33a131",
	"private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCpn3DKThMDhzNP\n3uB3DobQlEYggEcDQFjH6MX+DhvklUa1soICkDu/jirBqIvK+BfhHq9aVAURhJS4\nfnLI36hsWxtIbBNsT7DFOClHYgqwnDcZmbjm5eJQmsH9TQp0yR3xgw44s2Xoc/Fh\nm2ADQkBVJHKfQmYeo/6tFmFtjpyzXDbxodor47qMqR3cC2BDu2LMxgVDTHBQV4C/\nuRLXMwzQUdT7fXD0+J+RtdtFmyeuspKJ+2II/pw4inF8J4g3+JafedPc1ooWEh5i\nbFd2/X/geWdAZ0evb9tT/AX5xaJ8aG6Rgab02Ei0GweOAKvTeLahPBWWa+81Si9N\nSKOI3gOlAgMBAAECggEAHA9Zr8XZpGBFz0Ut+dQH3lJhBXhjBvkqlqt9sWjxGU/O\nejlVA4qLr8Ubcpzov0NqY93ZIUa77elyVtDoOS2ypXYu3byvO+A0/HMtdPcVkKDP\nBqek7GGEHlRzme0YOTiaAP1uqVeYGKuxdzWmXPOlQ9B7O7hWv2PeuhB1PpP0fUES\n4NWv0P0653B5a4xcKxNGOEeDbHTcWvy3Bx2q1IubzWVbKgdRZnkmH+g+CziX0+T5\nzyVMVC2t8YXaiMIQj9wV7Alaygxjl/euXR5KEfH4DsCtaC3DlXh5+DzF57yfllRb\nofvz+c25ta84vBCkMk095216N7bxy55CvCqwU1qZMwKBgQDvrh22ye9KXY6CAC5+\nH1qza/Rhvq69qat5mue4ndLM2W6Rx//ziDTdL0g0IinvibrxdECG1gTIFYks4Sej\nWLCR8COhFxqKnjx1djDpPNjqZTI+Hfo2JtfYNx6+NHCmYVqfbDC75HZlC8pbQYRf\n0ZGQCxEuWT9UNFuBT2iioGo2qwKBgQC1LCZL9RYNxeAogkrO9UVqu+mHv/joSqCB\nIeWgHQ286Y3yir2TxIVoLn6nxuBOLPP/9Xveh3N60+T9eAC5iEmkFNSdTfobxYnU\nrq5r2TXzgM9GHGmaXXylaVRJTjErBpg3rBvTTaQ3wdeljO2iCumpIHu9JPGJk2b6\nuUf4vKbu7wKBgQCeswlVuMvKz7vGdFxUgmpKFxcPiXSmfKvfryPzZ/zmSqoduPHO\nzMdEFUSX0G83/lhb+/+lyBwOZ8QWhVb7n4P6faj5xxR56GBb3lBwfyuZuDvWSX8d\nUAbnUUf35T0Zzah1muuB3bpPGcl5Nx5xW5AockuEBvAZzzkvm+bKl7D8VQKBgDC+\nxTsQoTNpdwtPKxON+HRkRMwKgcz2L0MvPJoc1xJqAJAudh1o9b/3Koq3vqgp/ihz\nAzX3WcHFe0obXI6OtcmY9S+xyEZqmtAHg9Rup85xbNNfV6Z52syij1P93srFxnTM\nMNxkeneqBvx684Dy0LV5kPFuHDK43y88ZLnvADcvAoGAJdHsreo32e3KzxntTttU\nzuLyNnCCKPCG+p0dJHcVKu6RWK8G4o3lOyUpwO//gHm6g0wAMdIYBEsrbGtgVmDV\ni247j1bV2rqRymzMXSIO/ft8q8lt3a7iYuCdjgN7D6xktwtyE8eRQEQ+Fu0zWT4z\noCP+MVd/rUbjlprc7uBXLX4=\n-----END PRIVATE KEY-----\n",
	"client_email": "firebase-adminsdk-z01bv@airdash-eb4f7.iam.gserviceaccount.com",
	"client_id": "102917941246526003540",
	"auth_uri": "https://accounts.google.com/o/oauth2/auth",
	"token_uri": "https://oauth2.googleapis.com/token",
	"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
	"client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-z01bv%40airdash-eb4f7.iam.gserviceaccount.com"
};
export const Firebase = await getFirebaseClient(serviceAccountKey);