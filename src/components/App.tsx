import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";
import { ChangeEvent, useMemo, useState } from "react";

import { Timezone, timezones } from "../constants/timezones";

enum Format {
  FIELD = "uuuu-MM-dd'T'HH:mm",
  UI = "'('OOO')' HH:mm:ss dd-MM-uuuu",
}

function formatDate(d: Date, f: Format) {
  return format(d, f);
}

export function App() {
  const [timezone, setTimezone] = useState<string>("");
  const [date, setDate] = useState<string>(
    formatDate(new Date(), Format.FIELD),
  );
  const tz = useMemo(
    () => timezones.find((t) => t.text === timezone),
    [timezone],
  );
  const hasTimezone = timezone.trim().length;

  const handleDateChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleTimezoneChanged = (e: ChangeEvent<HTMLSelectElement>) => {
    setTimezone(e.target.value);
  };

  return (
    <div>
      <h1>Times</h1>
      <h2>Compare timezones easily</h2>
      <div className="col">
        <div className="row">
          <div className="col">
            <input
              onChange={handleDateChanged}
              type="datetime-local"
              value={date}
            />
            <select onChange={handleTimezoneChanged} value={timezone}>
              <option value="">Select a timezone</option>
              {timezones
                // @ts-expect-error toSorted is a new js feature
                .toSorted((t1: Timezone, t2: Timezone) =>
                  t1.abbr.toLowerCase().localeCompare(t2.abbr.toLowerCase()),
                )
                .map((tz: Timezone) => (
                  <option data-value={tz.value} key={tz.text} value={tz.text}>
                    ({tz.abbr}) {tz.text}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="box">
              <h2>Timezone current time</h2>
              <h3>
                {hasTimezone
                  ? formatDate(
                      new TZDate(new Date(date).getTime(), tz?.utc[0]),
                      Format.UI,
                    )
                  : "Select a timezone to compare against your current time."}
              </h3>
            </div>
            <div className="box">
              <h2>My current time</h2>
              <h3>{formatDate(new Date(date), Format.UI)}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
