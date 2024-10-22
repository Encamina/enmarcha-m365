import { DateTime } from "luxon";
import { Holiday } from "../models/IHoliday";
import { HolidayConfig } from "../models/IHolidayConfig";

export interface ICalendarState {
    spSiteUrl: string;
    firstDayOfActiveMonth: DateTime<true>
    holidays: Holiday[];
    holidaysConfig: HolidayConfig[];
  }
  