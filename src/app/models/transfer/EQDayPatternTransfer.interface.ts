import { IEQRecordPatternTransfer } from "./EQRecordPatternTransfer.inteface";

export interface IEQDayPatternTransfer{
    id?: string
    creatorId: string
    name: string,
    records: IEQRecordPatternTransfer[]
}
