/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import type { ICalendarProps } from './ICalendarProps';
import { ICalendarState } from './ICalendarState';
import { SPComponentLoader } from "@microsoft/sp-loader";
import { spfi, SPFx } from '@pnp/sp';
import "@pnp/sp/sites";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/fields";
import { Info, DateTime, Interval} from "luxon";
import {Holiday} from '../models/IHoliday'
import { FontIcon, IconButton, IIconProps } from '@fluentui/react';
import { HolidayConfig } from '../models/IHolidayConfig';
import styles from "./Calendar.module.scss";

const leftArrow: IIconProps = { iconName: 'ChevronLeftMed' };
const rightArrow: IIconProps = { iconName: 'ChevronRightMed' };


export default class CalendarComponent extends React.Component<ICalendarProps, ICalendarState> {

    constructor(props: ICalendarProps) {
      super(props);
      this.state = {
        spSiteUrl: "",
        firstDayOfActiveMonth: DateTime.local().startOf('month'),
        holidays: [],
        holidaysConfig:[]
      };
    }

    public async componentDidMount(): Promise<void> {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        SPComponentLoader.loadScript("/_layouts/15/init.js", {
          globalExportsName: "$_global_init",
        })
          .then((): Promise<{}> => {
            return SPComponentLoader.loadScript("/_layouts/15/MicrosoftAjax.js", {
              globalExportsName: "Sys",
            });
          })
          .then((): Promise<{}> => {
            return SPComponentLoader.loadScript("/_layouts/15/SP.Runtime.js", {
              globalExportsName: "SP",
            });
          })
          .then((): Promise<{}> => {
            return SPComponentLoader.loadScript("/_layouts/15/SP.js", {
              globalExportsName: "SP",
            });
          })
          .then((): Promise<{}> => {
            return SPComponentLoader.loadScript("/_layouts/15/sp.init.js", {
              globalExportsName: "SP",
            });
          })
          .then((): Promise<{}> => {
            return SPComponentLoader.loadScript("/_layouts/15/SP.taxonomy.js", {
              globalExportsName: "SP",
            });
          });
          await this.getWebUrl();
          await this.getHolidaysConfig();
          await this.getHolidays();       
      }

      private mapToHoliday = (source: any): Holiday => {
        return {
          title: source.Title,
          categoria: source.Categoria,
          fecha: DateTime.fromISO(source.Fecha),
          color: source.CategoriaLookup.Color
        }
      }

      private mapToHolidayConfig = (source: any): HolidayConfig => {
        return {
          title: source.Title,
          color: source.Color
        }
      }
    
      private getWebUrl = async (): Promise<void> => {
        const sp = spfi().using(SPFx(this.props.context));
        const web = await sp.web();
        this.setState({
          spSiteUrl: web.Url,
        });
      };
      
      private getHolidaysConfig = async (): Promise<void> => {
        const sp = spfi().using(SPFx(this.props.context));
        const items: any[] = await sp.web.lists.getByTitle(this.props.configList).items.select("Title", "Color")();
        const holidaysConfig = items.map(this.mapToHolidayConfig);
        this.setState({
          holidaysConfig: holidaysConfig
        })
      }

      private getHolidays = async (): Promise<void> => {
        const sp = spfi().using(SPFx(this.props.context));
        const items: any[] = await sp.web.lists.getByTitle(this.props.list).items.select("Title", "Categoria", "Fecha", "CategoriaLookup/Title", "CategoriaLookup/Color")
        .expand("CategoriaLookup")
        .orderBy("Fecha", false)
        ();
        const holidays = items.map(this.mapToHoliday);

        this.setState({
          holidays: holidays
        })
      };

      private goToPreviousMonth = (): void => {
        this.setState({
          firstDayOfActiveMonth: this.state.firstDayOfActiveMonth.minus({ month: 1 }),
        });
      };

      private goToNextMonth = (): void => {
        this.setState({
          firstDayOfActiveMonth: this.state.firstDayOfActiveMonth.plus({ month: 1 }),
        });
      };



      public render(): React.ReactElement<ICalendarProps> {
        const firstDay = this.state.firstDayOfActiveMonth;
        const weekDays = Info.weekdays("short");
        const daysOfMonth = Interval.fromDateTimes(
        firstDay.startOf("week"),
        firstDay.endOf("month").endOf("week")
    )
    .splitBy({ day: 1 })
    .map((day) => day.start);
 

  return (
    <div className={styles.calendar_container}>
      <div className={styles.calendar}>
        <div className={styles.calendar_title}>{this.props.title}</div>
        <div className={styles.calendar_headline}>
          <div className={styles.calendar_headline_controls}>
            <IconButton iconProps={leftArrow} className={styles.calendar_button} title="previousMonth" ariaLabel="previousMonth" onClick={() => this.goToPreviousMonth()}/>
            <div className={styles.calendar_headline_month}>
            {firstDay.monthLong} {firstDay.year}
            </div>
            <IconButton iconProps={rightArrow} className={styles.calendar_button} title="nextMonth" ariaLabel="nextMonth" onClick={() => this.goToNextMonth()}/>
          </div>
        </div>
        <div className={styles.calendar_weeks_grid}>
          {weekDays.map((weekDay, weekDayIndex) => (
            <div key={weekDayIndex} className={styles.calendar_weeks_grid_cell}>
              {weekDay}
            </div>
          ))}
        </div>
        <div className={styles.calendar_grid}>
          {daysOfMonth.map((dayOfMonth, dayOfMonthIndex) => (
            <div
              key={dayOfMonthIndex}
              style={this.state.holidays.length > 0 && this.state.holidays.some(x => dayOfMonth?.hasSame(x.fecha, 'day')) ? {backgroundColor: this.state.holidays.filter(x => dayOfMonth?.hasSame(x.fecha, 'day'))[0].color, color: '#ffffff'}:{}}
              className={`${styles.calendar_grid_cell} ${dayOfMonth?.month !== firstDay.month ? styles.calendar_grid_cell_inactive : ""}`}
            >
              {this.state.holidays.length > 0 && this.state.holidays.some(x => dayOfMonth?.hasSame(x.fecha, 'day')) ? 
              <span title={this.state.holidays.filter(x => dayOfMonth?.hasSame(x.fecha, 'day'))[0].title} >{dayOfMonth?.day}</span> 
              : <span>{dayOfMonth?.day}</span>}
            </div>
          ))}
        </div>
        <div>
        <span className={styles.calendar_event_type_title}>Festivos/eventos</span>
        <div className={styles.calendar_event_list}>
        {this.state.holidaysConfig.map((config, index) => (
          <div key={index} className={styles.calendar_event_type}> 
          <FontIcon aria-label="CircleFill" iconName="CircleFill" style={{color: config.color}}/><span>{config.title}</span>
          </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
      }
}