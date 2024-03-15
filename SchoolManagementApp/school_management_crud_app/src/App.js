import './App.css';
import Student_state from './contexts/student_state';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Student_home_page from './components/StudentHome/Student_home_page';

function App() {
  return (
    <>
  <Student_state>
 <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Student_home_page />} />  
    </Routes>
    </BrowserRouter>
    </Student_state>
    </>
  );
}

export default App;
