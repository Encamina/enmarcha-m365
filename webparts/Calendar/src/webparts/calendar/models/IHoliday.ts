import { DateTime } from "luxon"

export interface Holiday {
    title: string;
    fecha: DateTime;
    categoria: string;
    color: string;
  }