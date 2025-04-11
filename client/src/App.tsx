import React, { useState } from 'react';
import Test1 from './tasks/test1';
import Test2 from './tasks/test2';
import Test3 from './tasks/test3';
import Test4 from './tasks/test4';
import Test5 from './tasks/test5';
import Test from './tasks/test';
import DialogSelect from './components/DialogSelect';
// import Test6 from './tasks/test6';
// import Test7 from './tasks/test7';
// import Test8 from './tasks/test8';
// import Test9 from './tasks/test9';
// import Test10 from './tasks/test10';
import './App.css';
import Counter from './tasks/zadanie1';
import TodoList from './tasks/zadanie2';
import LoginForm from './tasks/zadanie3';
import CardList from './tasks/zadanie4';
import Post from './tasks/zadanie5';
import { useTheme } from './tasks/zadanie6';
import { IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const testComponents: { [key: string]: React.ReactElement } = {
  '1': <Test1 />,
  '2': <Test2 name='Lol'/>,
  '3': <Test3 />,
  '4': <Test4 />,
  '5': <Test5 />,
  'Zadanie 1': <Counter />,
  'Zadanie 2': <TodoList />,
  'Zadanie 3': <LoginForm />,
  'Zadanie 4': <CardList />,
  'Zadanie 5': <Post />,
  'Own Test': <Test />,
};

const App: React.FC = () => {
  const [selectedTest, setSelectedTest] = useState<string>('1');
  const { theme, toggleTheme } = useTheme()
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTest(e.target.value);
  };

  const handleOk = (value: string) => {
    setSelectedTest(value);
  };

  return (
    <div className="app-container">
      
      <header className="app-header">
        <h1>React Test Assignments</h1>
        <IconButton 
          onClick={toggleTheme}
          color='inherit'
        >
          {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
        <DialogSelect 
          onClose={() => {}} title="Select a test" options={Object.keys(testComponents).map((key) => ({
            label: key,
            value: key,
            component: testComponents[key]
          }))} 
          onOk={handleOk} 
          selectTitle="Select a test" 
        />
        {/* <select 
          value={selectedTest} 
          onChange={handleSelectChange} 
          className="test-select"
        >
          <option value="1">Test 1: Basic Functional Component</option>
          <option value="2">Test 2: Component with Props</option>
          <option value="3">Test 3: Component with State using useState</option>
          <option value="4">Test 4: Handling Events (Button Click)</option>
          <option value="5">Test 5: Using useEffect for Data Fetch Simulation</option>
          <option value="6">Test 6: Conditional Rendering</option>
          <option value="7">Test 7: Rendering a List</option>
          <option value="8">Test 8: Using React Context</option>
          <option value="9">Test 9: Custom Hook (useToggle)</option>
          <option value="10">Test 10: Basic Routing with React Router</option>
        </select> */}
      </header>
      <main className="app-main">
        {testComponents[selectedTest]}
      </main>
    </div>
  );
};

export default App;
