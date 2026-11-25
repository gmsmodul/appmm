import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, Calendar } from 'lucide-react';
import { CustomSelect } from './CustomSelect';

function parseScheduleDateTime(value?: string): Date | null {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function toLocalDateTimeInputValue(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

const MONTHS_ID = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

const WEEKDAYS_ID = ['Sn', 'Sl', 'Rb', 'Km', 'Jm', 'Sb', 'Mg'];

const HOURS_OPTIONS = Array.from({ length: 24 }, (_, i) => {
  const val = String(i).padStart(2, '0');
  return { value: val, label: val };
});

const MINUTES_OPTIONS = [
  '00',
  '05',
  '10',
  '15',
  '20',
  '25',
  '30',
  '35',
  '40',
  '45',
  '50',
  '55',
  '59',
].map((m) => ({ value: m, label: m }));

interface UiKitDateTimePickerProps {
  value: string;
  onChange: (nextLocalIso: string) => void;
  rangeStart?: string;
  rangeEnd?: string;
  activeLabel?: string;
}

export const UiKitDateTimePicker: React.FC<UiKitDateTimePickerProps> = ({
  value,
  onChange,
  rangeStart,
  rangeEnd,
  activeLabel,
}) => {
  const parsedValue = useMemo(
    () => parseScheduleDateTime(value) || new Date(),
    [value]
  );

  const [viewYear, setViewYear] = useState<number>(() => parsedValue.getFullYear());
  const [viewMonth, setViewMonth] = useState<number>(() => parsedValue.getMonth());

  useEffect(() => {
    setViewYear(parsedValue.getFullYear());
    setViewMonth(parsedValue.getMonth());
  }, [parsedValue]);

  const selectedYear = parsedValue.getFullYear();
  const selectedMonth = parsedValue.getMonth();
  const selectedDay = parsedValue.getDate();
  const selectedHour = String(parsedValue.getHours()).padStart(2, '0');
  const selectedMinute = String(parsedValue.getMinutes()).padStart(2, '0');

  const parsedStart = useMemo(() => parseScheduleDateTime(rangeStart), [rangeStart]);
  const parsedEnd = useMemo(() => parseScheduleDateTime(rangeEnd), [rangeEnd]);

  const { leadingBlanks, daysInMonth } = useMemo(() => {
    const firstDayJs = new Date(viewYear, viewMonth, 1).getDay(); // 0=Sun..6=Sat
    const mondayFirstOffset = (firstDayJs + 6) % 7;
    const totalDays = new Date(viewYear, viewMonth + 1, 0).getDate();
    return { leadingBlanks: mondayFirstOffset, daysInMonth: totalDays };
  }, [viewYear, viewMonth]);

  const minuteSelectOptions = useMemo(() => {
    if (MINUTES_OPTIONS.some((o) => o.value === selectedMinute)) {
      return MINUTES_OPTIONS;
    }
    return [
      ...MINUTES_OPTIONS,
      { value: selectedMinute, label: selectedMinute },
    ].sort((a, b) => a.value.localeCompare(b.value));
  }, [selectedMinute]);

  const emitDateTime = (
    year: number,
    month: number,
    day: number,
    hour: number,
    minute: number
  ) => {
    const next = new Date(year, month, day, hour, minute, 0, 0);
    onChange(toLocalDateTimeInputValue(next));
  };

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const dayKey = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

  const startDayTs = parsedStart ? dayKey(parsedStart) : null;
  const endDayTs = parsedEnd ? dayKey(parsedEnd) : null;

  return (
    <div className="space-y-2.5 text-xs">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-gray-700">
          <Calendar className="w-3.5 h-3.5 text-[#ee2e65]" />
          <span>{activeLabel || 'Pilih Tanggal & Waktu'}</span>
        </span>
        <span className="text-[11.5px] font-mono font-semibold text-[#9D113C] bg-[#FEF1F5] border border-[#FBC2D4]/70 px-2.5 py-0.5 rounded-md tabular-nums">
          {String(selectedDay).padStart(2, '0')} {MONTHS_ID[selectedMonth]} {selectedYear} ·{' '}
          {selectedHour}:{selectedMinute} WIB
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
        {/* Calendar Grid (UI Kit Interactive Calendar Grid) */}
        <div className="sm:col-span-7 space-y-2.5 border border-gray-200 rounded-xl p-3.5 bg-white">
          <div className="flex items-center justify-between font-bold text-gray-800">
            <span>
              {MONTHS_ID[viewMonth]} {viewYear}
            </span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                aria-label="Bulan sebelumnya"
                className="p-1 rounded hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                aria-label="Bulan berikutnya"
                className="p-1 rounded hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            key={`${viewYear}-${viewMonth}`}
            className="grid grid-cols-7 gap-1 text-center tabular-nums animate-ui-fade"
          >
            {WEEKDAYS_ID.map((d) => (
              <div key={d} className="font-bold text-gray-400 py-1 text-[11px]">
                {d}
              </div>
            ))}

            {Array.from({ length: leadingBlanks }).map((_, i) => (
              <div key={`blank-${i}`} />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const isSelected =
                viewYear === selectedYear &&
                viewMonth === selectedMonth &&
                dayNum === selectedDay;

              const cellTs = new Date(viewYear, viewMonth, dayNum).getTime();
              const isInRange =
                startDayTs !== null &&
                endDayTs !== null &&
                endDayTs >= startDayTs &&
                cellTs >= startDayTs &&
                cellTs <= endDayTs;

              const isToday = dayKey(new Date()) === cellTs;

              return (
                <button
                  key={dayNum}
                  type="button"
                  onClick={() =>
                    emitDateTime(
                      viewYear,
                      viewMonth,
                      dayNum,
                      Number(selectedHour),
                      Number(selectedMinute)
                    )
                  }
                  className={`py-1.5 rounded-md transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#ee2e65] text-white font-bold shadow-xs'
                      : isInRange
                      ? 'bg-[#FEF1F5] text-[#9D113C] font-semibold hover:bg-[#FDE0E9]'
                      : isToday
                      ? 'border border-[#ee2e65]/50 text-[#9D113C] font-semibold hover:bg-[#FEF1F5]'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {dayNum}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Selector Column (UI Kit Date Picker with Time) */}
        <div className="sm:col-span-5 flex flex-col justify-between gap-3 border border-gray-200 rounded-xl p-3.5 bg-gray-50/60">
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 font-bold text-gray-800">
              <Clock className="w-3.5 h-3.5 text-[#ee2e65]" />
              <span>Pilih Waktu (WIB)</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-semibold text-gray-500 block mb-1">
                  Jam
                </label>
                <CustomSelect
                  className="w-full"
                  size="sm"
                  triggerClassName="px-2.5 py-1.5 font-mono font-semibold text-gray-800 tabular-nums bg-white"
                  value={selectedHour}
                  onChange={(h) =>
                    emitDateTime(
                      selectedYear,
                      selectedMonth,
                      selectedDay,
                      Number(h),
                      Number(selectedMinute)
                    )
                  }
                  ariaLabel="Pilih jam"
                  options={HOURS_OPTIONS}
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-500 block mb-1">
                  Menit
                </label>
                <CustomSelect
                  className="w-full"
                  size="sm"
                  triggerClassName="px-2.5 py-1.5 font-mono font-semibold text-gray-800 tabular-nums bg-white"
                  value={selectedMinute}
                  onChange={(m) =>
                    emitDateTime(
                      selectedYear,
                      selectedMonth,
                      selectedDay,
                      Number(selectedHour),
                      Number(m)
                    )
                  }
                  ariaLabel="Pilih menit"
                  options={minuteSelectOptions}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-gray-500 block">
                Slot Cepat
              </span>
              <div className="grid grid-cols-2 gap-1.5 tabular-nums">
                {[
                  { h: '08', m: '00' },
                  { h: '12', m: '00' },
                  { h: '17', m: '00' },
                  { h: '23', m: '59' },
                ].map((slot) => {
                  const active =
                    selectedHour === slot.h && selectedMinute === slot.m;
                  return (
                    <button
                      key={`${slot.h}:${slot.m}`}
                      type="button"
                      onClick={() =>
                        emitDateTime(
                          selectedYear,
                          selectedMonth,
                          selectedDay,
                          Number(slot.h),
                          Number(slot.m)
                        )
                      }
                      className={`px-2 py-1.5 rounded-md font-mono font-semibold border transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#ee2e65] text-white border-[#ee2e65]'
                          : 'bg-white text-gray-700 border-gray-200 hover:bg-[#FEF1F5] hover:border-[#FBC2D4]'
                      }`}
                    >
                      {slot.h}:{slot.m}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="text-[11px] text-gray-500 pt-2 border-t border-gray-200/80">
            Perubahan tanggal &amp; jam langsung diterapkan pada jadwal.
          </div>
        </div>
      </div>
    </div>
  );
};
