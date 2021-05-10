import { Context } from "https://deno.land/x/abc@v1.3.0/mod.ts";

export type CodecResult<T> = {
	Succeeded: true,
	Result: T
} | {
	Succeeded: false,
	ErrorMessage: string
}
export type VideoResult = {
	MAC: string,
	Data: string // Video data is formatted as a string.
}
export type InfoResult = {
	MAC: string,
	Accelerometer: number,
	GPS: {
		lat: number,
		long: number
	}
}

// Parser functions
export type ParseResult = {
	Succeeded: true,
	Result: string,
	Remaining: string
} | {
	Succeeded: false,
	ErrorMessage: string,
	Remaining: string
}
function bytes(input: string, count: number): ParseResult {
	if (input.length < count) return {
		Succeeded: false,
		ErrorMessage: "Input length must be at least " + count,
		Remaining: input
	}
	const parsed = input.slice(0, count);
	const remaining = input.slice(count);
	return {
		Succeeded: true,
		Result: parsed,
		Remaining: remaining
	}
}

// Codec
function produceError<T>(message: string): CodecResult<T> {
	return {
		Succeeded: false,
		ErrorMessage: message
	}
}
function Expected<T>(segment: string): CodecResult<T> {
	return produceError(`Unexpected end of input! Expected ${segment}.`);
}
function Invalid<T>(segment: string, message: string): CodecResult<T> {
	return produceError(`Invalid ${segment}! ${message}`);
}
export type CustomHeaders = Record<string, string>;
export const Codec = {
	CustomHeaders: function (c: Context): CustomHeaders {
		const result: CustomHeaders = {};
		c.request.headers.forEach((val, key) => {
			if (key.startsWith('x-')) result[key.replace('x-', '')] = val;
		});
		return result;
	},
	Video: function (request: string): CodecResult<VideoResult> {
		const mac = bytes(request, 6 * 2); // 6 bytes * 2 to represent a 255 number = 48 bits
		if (!mac.Succeeded) return Expected('MAC');
		const rest = mac.Remaining;
		return {
			Succeeded: true,
			Result: {
				MAC: mac.Result,
				Data: rest
			}
		};
	},
	Info: function (request: string): CodecResult<InfoResult> {
		const j = JSON.parse(request);
		if (!j["MAC"]) return Expected('MAC address');
		if (!j["Accelerometer"]) return Expected('accelerometer integer');
		if (isNaN(parseInt(j["Accelerometer"]))) return Invalid('accelerometer', 'must be integer');
		if (!j["GPS"]) return Expected('GPS coordinates');
		if (!j["GPS"]["lat"] || !j["GPS"]["long"]) return Invalid('GPS coordinates', 'lat and long fields');
		if (isNaN(parseFloat(j["GPS"]["lat"]))) return Invalid('GPS coordinates', 'lat must be float');
		if (isNaN(parseFloat(j["GPS"]["long"]))) return Invalid('GPS coordinates', 'long must be float');

		return {
			Succeeded: true,
			Result: j
		};

		/*
		! Old info codec parser
		const mac = bytes(request, 6 * 2); // 6 bytes * 2 to represent a 255 number = 48 bits
		if (!mac.Succeeded) return Expected('MAC address');
		const accelerometer = bytes(mac.Remaining, 4); // 4 bytes = 32 bit = default integer size
		if (!accelerometer.Succeeded) return Expected('accelerometer integer');
		let accelerometerValue = 0;
		for (let i = 0; i < accelerometer.Result.length; i++) accelerometerValue = (accelerometerValue << 1) + accelerometer.Result.charCodeAt(i);
		const gps = accelerometer.Remaining.split(',');
		if (gps.length != 2) return Expected('GPS coordinates');
		let lat, long;
		try {
			[lat, long] = gps.map(c => parseFloat(c));
		} catch (error) {
			return Invalid('GPS coordinates', 'floats separated by a comma');
		}

		return {
			Succeeded: true,
			Result: {
				MAC: mac.Result,
				Accelerometer: accelerometerValue,
				GPS: {
					lat: lat,
					long: long
				}
			}
		};
		*/
	},
	/**
	 * Convert a 32 bit unsigned integer to a string representation
	 * @param integer 32 bit unsigned integer
	 */
	IntegerToString: function (integer: number) {
		if (integer > 4294967295) throw new Error("Integer is larger than max value for unsigned integers.");
		let bits = integer.toString(2).padStart(32, '0');
		let result = '';
		for (let i = 0; i < 8; i++) {
			const byte = bits.slice(0, 8);
			const char = String.fromCharCode(parseInt(byte, 2))
			result += char;
			bits = bits.slice(8);
		}
		return result;
	}
}