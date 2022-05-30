import { WeekDayName } from "./week-day-name.enum";
import { EQDayPattern } from "../../../../../models/EQDayPattern";

export interface ICurrentDayViewModel{
    weekDayName: WeekDayName,
    dayPattern?: EQDayPattern
}
