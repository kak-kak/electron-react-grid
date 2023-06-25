import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useLayoutEffect, useRef, useState } from 'react';
import Select from 'react-select'

import {
  DataSheetGrid,
  checkboxColumn,
  textColumn,
  keyColumn,
  CellProps,
} from 'react-datasheet-grid'

// Import the style only once in your app!
import 'react-datasheet-grid/dist/style.css'
import zIndex from '@mui/material/styles/zIndex';
import { SelectExample } from './Selection';

const Example = () => {
  const [ data, setData ] = useState([
    { active: true, firstName: 'Elon', lastName: 'Musk' },
    { active: false, firstName: 'Jeff', lastName: 'Bezos' },
  ])

  const columns = [
    { ...keyColumn('active', checkboxColumn), title: 'Active' },
    { ...keyColumn('firstName', textColumn), title: 'First name' },
    { ...keyColumn('lastName', textColumn), title: 'Last name' },
  ]

  return (
    <DataSheetGrid
      value={data}
      onChange={setData as any}
      columns={columns}
    />
  )
}

const SelectComponent = ({ focus,  active }: CellProps) => {
  return (
    <Select
      styles={{
        container: (provided) => ({
          ...provided,
          flex: 1, // full width
          alignSelf: 'stretch', // full height
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
      options={[
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
      ]}
      menuIsOpen={focus}
      menuPortalTarget={document.body}
    />
  )
}


const Example2 = () => {
  // const [ data, setData ] = useState(['chocolate', 'strawberry', null])
  const [ data, setData ] = useState([
    { active: true, firstName: 'Elon', lastName: 'Musk' },
    { active: false, firstName: 'Jeff', lastName: 'Bezos' },
  ])

  return (
    <DataSheetGrid
      value={data}
      onChange={setData as any}
      columns={[
        {
          component: SelectComponent,
          title: 'Flavor',
        },
        { ...keyColumn('active', checkboxColumn), title: 'Active' },
        { ...keyColumn('firstName', textColumn), title: 'First name' },
        { ...keyColumn('lastName', textColumn), title: 'Last name' },    
      ]}
    />
  )
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SelectExample />} />
      </Routes>
    </Router>
  );
}
