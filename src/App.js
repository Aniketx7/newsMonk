import './App.css';


import React, { useState } from 'react'
import Navbar from './component/Navbar';
import News from './component/News';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'

const App = () =>{

  const APIkey = process.env.REACT_APP_API_KEY   //we can access secret key from .env.local as process.env.

  const [progress, setProgress] = useState(0)
  
  // state = {
  //   progress: 0,
  // }


  // setProgress = (progress) => {
  //   this.setState({
  //     progress: progress
  //   })
  //   console.log(this.state.progress)
  // }

    return (
      <>
        <Router>
          <Navbar />

          <LoadingBar
            color='#f11946'
            progress={progress}
            onLoaderFinished={() =>setProgress(0)}
          />
          <Routes>
            <Route exact path='/newsMonk' element={[<News setProgress={setProgress} myAPI={APIkey} key="general" country='in' category="general" />]} />
            <Route exact path='/' element={[<News setProgress={setProgress} myAPI={APIkey} key="general" country='in' category="general" />]} />
            <Route exact path='/business' element={[<News setProgress={setProgress} myAPI={APIkey} key="business" country='in' category="business" />]} />
            <Route exact path='/entertainment' element={<News setProgress={setProgress} myAPI={APIkey} key="entertainment" country='in' category="entertainment" />} />
            <Route exact path='/health' element={[<News setProgress={setProgress} myAPI={APIkey} key="health" country='in' category="health" />]} />
            <Route exact path='/science' element={[<News setProgress={setProgress} myAPI={APIkey} key="science" country='in' category="science" />]} />
            <Route exact path='/sports' element={[<News setProgress={setProgress} myAPI={APIkey} key="sports" country='in' category="sports" />]} />
            <Route exact path='/technology' element={[<News setProgress={setProgress} myAPI={APIkey} key="technology" country='in' category="technology" />]} />

            {/* <Route exact path="/about" element={[<About />]} /> */}
          </Routes>
        </Router>
      </>
    )
}




/**
 * Terms to be used in this news app
 * 1> News API                              https://newsapi.org
 * 2> Router                                https://v5.reactrouter.com/web/guides/quick-start
 * 3> Make a spinner
 * 4> Infinite scroll npm pkg               https://www.npmjs.com/package/react-infinite-scroll-component
 * 5> Adding top loading bar                https://www.npmjs.com/package/react-top-loading-bar
 * 6> Hiding api by environment custom variable  (by creating .env.local)             https://create-react-app.dev/docs/adding-custom-environment-variables/
 *  
 * 
 */

export default App