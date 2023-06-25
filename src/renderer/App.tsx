import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import {
  DataSheetGrid,
  checkboxColumn,
  textColumn,
  keyColumn,
} from 'react-datasheet-grid'

// Import the style only once in your app!
import 'react-datasheet-grid/dist/style.css'

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
      onChange={setData}
      columns={columns}
    />
  )
}



export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Example />} />
      </Routes>
    </Router>
  );
}
