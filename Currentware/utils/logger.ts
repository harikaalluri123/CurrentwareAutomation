import { Logger } from 'tslog'; // Logging framework

export function makeLogger(name: string) {
    return new Logger({
        name,
        minLevel: 1, // DEBUG level
    });
}
