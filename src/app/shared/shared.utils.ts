/* eslint-disable prefer-arrow/prefer-arrow-functions */

import { BusinessTypeEnums, QRType } from './shared.enums';
import * as QRious from 'qrious';
import moment from 'moment';

export function getBusinessType(): BusinessTypeEnums {
    return this.authService.modelId.employer?.businessType;
}
export function genereateQRCode(type: QRType, value: string) {
    console.log('Generating QR Code with DATA', `${type}:${value}`);
    return new QRious({
        value: `${type}:${value}`,
        background: '#70d800',
        backgroundAlpha: 0.8,
        foreground: '#14349d',
        size: 500,
    });
}

export function parseQRCode(value: string): {
    type: QRType;
    value: string;
} {
    const splitted = value.split(':');
    if (splitted.length !== 2) {
        return {
            type: QRType.PLANT,
            value,
        };
    }
    return {
        type: +splitted[0] as unknown as QRType,
        value: splitted[1],
    };
}

export function downloadFile(path: string, filename?: string) {
    // Create a new link
    const anchor = document.createElement('a');
    anchor.href = path;
    if (filename) {
        anchor.download = filename;
    }

    // Append to the DOM
    document.body.appendChild(anchor);

    // Trigger `click` event
    anchor.click();

    // Remove element from DOM
    document.body.removeChild(anchor);
}

export function getWellnessCenterSlots(
    openTime: string,
    closeTime: string,
    timeSlotLength: number
) {
    if (!openTime || !closeTime || !timeSlotLength) {
        return [];
    }
    const currentDate = moment().format('DD/MM/YYYY');
    let timeStart = moment(`${currentDate} ${openTime}`, 'DD-MM-YYYY hh:mm A');
    const timeEnd = moment(`${currentDate} ${closeTime}`, 'DD-MM-YYYY hh:mm A');
    const timeChunks = [];
    while (timeStart < timeEnd) {
        timeChunks.push(timeStart.format('hh:mm A'));
        timeStart = timeStart.add(timeSlotLength, 'minutes');
    }
    return timeChunks;
}

export function filterNullValue(data: any) {
    if (!data) {
        return data;
    }
    const result = {};
    Object.keys(data).forEach((k) => {
        if (data[k] !== null) {
            result[k] = data[k];
        }
    });
    return result;
}
