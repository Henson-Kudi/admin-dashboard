"use client"

import * as React from "react"
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

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

type YearRange = {
  start: number | null
  end: number | null
}

export function RangeYearPickerWithPresets() {
  const [yearRange, setYearRange] = React.useState<YearRange>({ start: null, end: null })
  const [decade, setDecade] = React.useState(() => Math.floor(new Date().getFullYear() / 10) * 10)

  const years = Array.from({ length: 10 }, (_, i) => decade + i)

  const handleYearClick = (selectedYear: number) => {
    setYearRange(prev => {
      if (prev.start === null || (prev.start !== null && prev.end !== null)) {
        return { start: selectedYear, end: null }
      } else if (selectedYear < prev.start) {
        return { start: selectedYear, end: prev.start }
      } else {
        return { ...prev, end: selectedYear }
      }
    })
  }

  const handleDecadeChange = (change: number) => {
    setDecade(prevDecade => prevDecade + change * 10)
  }

  const formatYearRange = (range: YearRange) => {
    if (range.start === null && range.end === null) return "Select years"
    if (range.start !== null && range.end === null) return `${range.start} - ...`
    return `${range.start} - ${range.end}`
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            (!yearRange.start && !yearRange.end) && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formatYearRange(yearRange)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
        <Select
          onValueChange={(value) => {
            const [start, end] = value.split('-').map(Number)
            setYearRange({ start, end })
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select preset" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value={`${new Date().getFullYear()}-${new Date().getFullYear()}`}>This year</SelectItem>
            <SelectItem value={`${new Date().getFullYear() - 1}-${new Date().getFullYear()}`}>Last year to now</SelectItem>
            <SelectItem value={`${new Date().getFullYear()}-${new Date().getFullYear() + 1}`}>This year to next</SelectItem>
            <SelectItem value={`${new Date().getFullYear() - 4}-${new Date().getFullYear()}`}>Last 5 years</SelectItem>
            <SelectItem value={`${new Date().getFullYear()}-${new Date().getFullYear() + 4}`}>Next 5 years</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border p-2">
          <div className="flex justify-between items-center mb-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handleDecadeChange(-1)}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <span>{decade} - {decade + 9}</span>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handleDecadeChange(1)}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {years.map((y) => (
              <Button
                key={y}
                onClick={() => handleYearClick(y)}
                variant={
                  (yearRange.start === y || yearRange.end === y) ? "default" :
                  (yearRange.start !== null && yearRange.end !== null && y > yearRange.start && y < yearRange.end) ? "secondary" :
                  "outline"
                }
                className="w-full"
              >
                {y}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}