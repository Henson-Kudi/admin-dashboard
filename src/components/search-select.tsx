import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Input } from './ui/input'
import { debounce } from 'lodash'

type Option = Record<string, any>&{id: string, label: string}

export default function SearchSelect({
    data,
    defaultSelected,
    onSelectItem,
    placeholder = 'Select Item',
    onInputChange,
    debounceMillis = 1000,
    noOptionsMessage = 'No items found',
    inputPlaceHolder = 'Search items...',
    showSearchInput = true
}:{
    data: Option[];
    defaultSelected?: Option;
    onSelectItem?: (item: Option | null)=>void,
    onInputChange?: (text: string)=>void,
    debounceMillis?: number
    placeholder?: string
    noOptionsMessage?: string,
    inputPlaceHolder?: string,
    showSearchInput?: boolean
}) {
    const [value, setValue] = React.useState<Option | null>(defaultSelected ?? null)
    const [inputText, setInputText] = React.useState('')

    const debounceSearch = debounce((txt:string) => {
    onInputChange?.(txt)
  }, debounceMillis
  )

  return (
    <Select onValueChange={(val)=>{
       const item = data.find((item)=>item.id === val)

       
       if(item){
        const isSame = val === value?.id;
        setValue(isSame ? null : item)
        
        onSelectItem?.(isSame ? null : item)
       }
    }}>
      <SelectTrigger className="w-[180px] capitalize">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent className="w-[200px] p-0">
        {
            showSearchInput && (
                <Input
                    placeholder={inputPlaceHolder ?? "Search items..."}
                    onChange={(e)=>{
                        setInputText(e.target.value)
                        debounceSearch(e.target.value)
                    }}
                    value={inputText}
                />
            )
        }
         
        {data.map((item) => (
            <SelectItem
              key={item.id}
              value={item.id}
            >
              {item.label}
            </SelectItem>
        ))}
        {
            !data.length && (
                <SelectItem value={noOptionsMessage ?? 'no options'} disabled>
                    {noOptionsMessage}
                </SelectItem>
            )
        }
            
      </SelectContent>
    </Select>
  )
}

