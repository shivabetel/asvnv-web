import React from 'react';

import AppContext from "../../contexts/AppContext";

const useAppContext = () => {
    const appContext = React.useContext(AppContext);
    return appContext;
}

export default useAppContext;