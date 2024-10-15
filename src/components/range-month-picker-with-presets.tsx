"use client"

import * as React from "react"
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { addMonths, format, startOfMonth } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type MonthRange = {
  start: Date | null
  end: Date | null
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

export function RangeMonthPickerWithPresets() {
  const [monthRange, setMonthRange] = React.useState<MonthRange>({ start: null, end: null })
  const [currentYear, setCurrentYear] = React.useState(() => new Date().getFullYear())

  const handleMonthClick = (month: number) => {
    const clickedDate = new Date(currentYear, month)
    setMonthRange(prev => {
      if (prev.start === null || (prev.start !== null && prev.end !== null)) {
        return { start: clickedDate, end: null }
      } else if (clickedDate < prev.start) {
        return { start: clickedDate, end: prev.start }
      } else {
        return { ...prev, end: clickedDate }
      }
    })
  }

  const handleYearChange = (change: number) => {
    setCurrentYear(prev => prev + change)
  }

  const formatMonthRange = (range: MonthRange) => {
    if (range.start === null && range.end === null) return "Select months"
    if (range.start !== null && range.end === null) return `${format(range.start, "MMM yyyy")} - ...`
    if (range.start !== null && range.end !== null) {
      return `${format(range.start, "MMM yyyy")} - ${format(range.end, "MMM yyyy")}`
    }
    return "Select months"
  }

  const isInRange = (month: number) => {
    if (monthRange.start === null || monthRange.end === null) return false
    const date = new Date(currentYear, month)
    return date >= monthRange.start && date <= monthRange.end
  }

  const isSelected = (month: number) => {
    if (monthRange.start === null) return false
    if (monthRange.end === null) return month === monthRange.start.getMonth() && currentYear === monthRange.start.getFullYear()
    return (month === monthRange.start.getMonth() && currentYear === monthRange.start.getFullYear()) ||
           (month === monthRange.end.getMonth() && currentYear === monthRange.end.getFullYear())
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[300px] justify-start text-left font-normal",
            (!monthRange.start && !monthRange.end) && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formatMonthRange(monthRange)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
        <Select
          onValueChange={(value) => {
            const today = new Date()
            const [startOffset, endOffset] = value.split('-').map(Number)
            setMonthRange({
              start: startOfMonth(addMonths(today, startOffset)),
              end: startOfMonth(addMonths(today, endOffset))
            })
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select preset" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0-0">This month</SelectItem>
            <SelectItem value="-1-0">Last month to now</SelectItem>
            <SelectItem value="0-1">This month to next</SelectItem>
            <SelectItem value="-5-0">Last 6 months</SelectItem>
            <SelectItem value="0-5">Next 6 months</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border p-2">
          <div className="flex justify-between items-center mb-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handleYearChange(-1)}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <span className="font-semibold">{currentYear}</span>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handleYearChange(1)}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {MONTHS.map((month, index) => (
              <Button
                key={month}
                onClick={() => handleMonthClick(index)}
                variant={
                  isSelected(index) ? "default" :
                  isInRange(index) ? "secondary" :
                  "outline"
                }
                className="w-full"
              >
                {month}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}