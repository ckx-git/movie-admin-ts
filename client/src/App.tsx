import React from 'react';
import _Layout from "./pages/Layout";
import { BrowserRouter, Route } from "react-router-dom";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Route path="/" component={_Layout}></Route>
        </BrowserRouter>
    );
}

export default App;
