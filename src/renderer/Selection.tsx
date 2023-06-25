import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { DataSheetGrid, CellProps, Column,  keyColumn, intColumn} from 'react-datasheet-grid'
import Select, { GroupBase, SelectInstance } from 'react-select'

type Choice = {
  label: string
  value: string
}

type SelectOptions = {
  choices: Choice[]
  disabled?: boolean
}

type Row = {
    flavor: string | null
    quantity: number | null
}
  

const SelectComponent = React.memo(
  ({
    active,
    rowData,
    setRowData,
    focus,
    stopEditing,
    columnData,
  }: CellProps<string | null, SelectOptions>) => {
    const ref = useRef<SelectInstance<Choice, false, GroupBase<Choice>>>(null)

    useLayoutEffect(() => {
      if (focus) {
        ref.current?.focus()
      } else {
        ref.current?.blur()
      }
    }, [focus])

    return (
      <Select
        ref={ref}
        styles={{
          container: (provided) => ({
            ...provided,
            flex: 1,
            alignSelf: 'stretch',
            pointerEvents: focus ? undefined : 'none',
          }),
          control: (provided) => ({
            ...provided,
            height: '100%',
            border: 'none',
            boxShadow: 'none',
            background: 'none',
          }),
          indicatorSeparator: (provided) => ({
            ...provided,
            opacity: 0,
          }),
          indicatorsContainer: (provided) => ({
            ...provided,
            opacity: active ? 1 : 0,
          }),
          placeholder: (provided) => ({
            ...provided,
            opacity: active ? 1 : 0,
          }),
        }}
        isDisabled={columnData.disabled}
        value={
          columnData.choices.find(({ value }) => value === rowData) ?? null
        }
        menuPortalTarget={document.body}
        menuIsOpen={focus}
        onChange={(choice) => {
          if (choice === null) return;

          setRowData(choice.value);
          setTimeout(stopEditing, 0);
          }}
        onMenuClose={() => stopEditing({ nextRow: false })}
        options={columnData.choices}
      />
    )
  }
)
// const inputString: string = "14月244日は日43曜日";
// const pattern: RegExp = /\d+/g;
// const matches: string[] = inputString.match(pattern) || [];

const selectColumn = (
  options: SelectOptions
): Column<string | null, SelectOptions> => ({
  component: SelectComponent,
  columnData: options,
  disableKeys: true,
  keepFocus: true,
  disabled: options.disabled,
  deleteValue: () => null,
  copyValue: ({ rowData }) =>
    options.choices.find((choice) => choice.value === rowData)?.label ?? null,
  pasteValue: ({ value }) =>
    options.choices.find((choice) => choice.label === value)?.value ?? null,
})

export function SelectExample() {
  const [data, setData] = useState<Row[]>([
    { flavor: 'chocolate', quantity: 3 },
    { flavor: 'strawberry', quantity: 5 },
    { flavor: null, quantity: null },
  ])

  const columns: Column<Row>[] = [
    {
      ...keyColumn('flavor', selectColumn({ choices: [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ] })),
      title: 'Flavor',
    },
    {
      ...keyColumn('quantity', intColumn),
      title: 'Quantity',
    },
  ]

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div style={{ marginBottom: 20 }}>
      <DataSheetGrid
        value={data}
        onChange={setData}
        columns={columns}
      />
    </div>
  )
}