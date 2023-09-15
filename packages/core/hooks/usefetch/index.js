import axios from 'axios';
import { useEffect, useState } from 'react';
import axiosInstance from '@asvnv/api/axiosInstance';


const getContent = async (url, source, mockData) => {

    try {
        const { data } = 
        // process.env.REACT_APP_MOCKENABLED ? await Promise.resolve({
        //     data: mockData,
        //     status: 200
        // }) :
            await axiosInstance.cachedGet(url, { cancelToken: source.token })
        return Promise.resolve(data);
    } catch (error) {
        return Promise.reject(error)
    }

}

const useFetch = (url, transformer, mockData) => {

    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState();
    const [errorMessage, setErrorMessage] = useState();

    if (transformer && typeof (transformer) != 'function') {
        throw new Error("Invalid transformer function. Transformer should be a function")
    }
    useEffect(() => {

        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();
        setLoading(true)
        getContent(url, source, mockData)
            .then(response => {
                transformer ? setContent(transformer(response)) : setContent(response)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                setErrorMessage(err['errorMessage'])
            })
        return () => source.cancel('api call cancelled by the user.')



    }, [url, transformer])

    return { content, loading, errorMessage }

}

export default useFetch;