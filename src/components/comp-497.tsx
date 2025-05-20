// components/CustomCalendar.tsx
"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DropdownNavProps, DropdownProps } from "react-day-picker"

export function CustomCalendar({
  selected,
  onSelect,
  ...props
}: {  
  selected?: Date
  onSelect?: (date: Date) => void
}) {
  const [date, setDate] = useState<Date | undefined>(selected ?? new Date())

  const handleCalendarChange = (
    value: string | number,
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  ) => {
    const _event = {
      target: { value: String(value) },
    } as React.ChangeEvent<HTMLSelectElement>
    onChange(_event)
  }

  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={(d) => {
        setDate(d)
        onSelect?.(d)
      }}
      className="rounded-md border p-2"
      captionLayout="dropdown"
      defaultMonth={new Date()}
      startMonth={new Date(1980, 0)}
      hideNavigation
      classNames={{ month_caption: "mx-0" }}
      components={{
        DropdownNav: (props: DropdownNavProps) => (
          <div className="flex w-full items-center gap-2">{props.children}</div>
        ),
        Dropdown: (props: DropdownProps) => (
          <Select
            value={String(props.value)}
            onValueChange={(value) => {
              if (props.onChange) {
                handleCalendarChange(value, props.onChange)
              }
            }}
          >
            <SelectTrigger className="h-8 w-fit font-medium first:grow">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-[min(26rem,var(--radix-select-content-available-height))]">
              {props.options?.map((option) => (
                <SelectItem
                  key={option.value}
                  value={String(option.value)}
                  disabled={option.disabled}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ),
      }}
      {...props}
    />
  )
}
