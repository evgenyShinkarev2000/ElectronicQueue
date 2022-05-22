export class TimeOnly {
    public get minutes(): number {
        return this._minutes;
    }

    public set minutes(value: number) {
        if (value < 0 || value > 60 || value % 1 !== 0) {
            throw new Error();
        }

        this._minutes = value;
    }

    public get hours(): number {
        return this._hours;
    }

    public set hours(value: number) {
        if (value < 0 || value > 23 || value % 1 !== 0) {
            throw new Error();
        }

        this._hours = value;
    }

    public static fromMinutes(minutesAll: number): TimeOnly {
        const hours: number = Math.floor(minutesAll / 60);
        const minutes: number = minutesAll % 60;

        return new TimeOnly(null, hours, minutes);
    }
    public static tryFromMinutes(minutesAll: number): TimeOnly | null{
        if (minutesAll >= 60 * 24){
            return null;
        }

        return this.fromMinutes(minutesAll);
    }

    private _minutes: number;
    private _hours: number;

    constructor(timeString?: string, hours: number = 0, minutes: number = 0) {
        if (timeString) {
            const re: RegExp = new RegExp(String.raw`\d\d:\d\d`);
            if (!timeString.match(re)) {
                throw new Error();
            }
            const tokens: string[] = timeString.split(":");
            this.hours = parseInt(tokens[0]);
            this._minutes = parseInt(tokens[1]);
        } else {
            this.hours = hours;
            this.minutes = minutes;
        }
    }


    public toString(): string {
        const hoursStr: string = this.hours < 10 ? "0" + this.hours.toString() : this.hours.toString();
        const minutesStr: string = this.minutes < 10 ? "0" + this.minutes.toString() : this.minutes.toString();

        return `${hoursStr}:${minutesStr}`;
    }

    public toMinutes(): number {
        return this.hours * 60 + this.minutes;
    }

    public getCopy(): TimeOnly {
        return new TimeOnly(null, this.hours, this.minutes);
    }

    public toDTO(): number {
        return this.toMinutes();
    }

}
