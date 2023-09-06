import axios from 'axios';
import mapValues from 'lodash/mapValues'

import { HeapStorageUtil } from './utils/HeapStorageUtil';

const mockEnabled = true;


class ApiError extends Error {
    constructor(error, details = {}){
        super()
        this.status = error.status
        this.name= 'ApplicationError'
        this.errorMessage = error?.errorCode == 500 ? 'Something went wrong' : error?.errorMessage
        this.errorCode = error?.errorCode;
        this.dynMsg = error?.dynMsg
        this.details = details
    }
}

const instance = axios.create({})
const newInstance = mapValues(instance, (method, methodName) => {//adding decorator to transform
    return async function(...args){    
        try{
          return await instance[methodName].call(this, ...args)
          //return await method.call(this, ...args)
        }catch(error){
            if (axios.isCancel(error)) {
                console.log("the api call is cancelled by the user.")
                return {};
            }
            if(error instanceof ApiError){
                throw error;
            }
            if(axios.isAxiosError(error)){
                const { response = {} } = error;
                const { data, error: errorObj } = response
                let apiErrorObj = {}
                if(data){
                    apiErrorObj = data
                }
                else if(errorObj){
                    apiErrorObj['errorMessage'] = errorObj['message']
                    apiErrorObj['errorCode'] = errorObj['status']
                }
                else
                {
                    apiErrorObj['errorMessage'] = error['message']
                }

                throw new ApiError(apiErrorObj, error)
            }
            
            throw new ApiError({
                ...data,
                details: error
            })
        }
        throw new ApiError(error)
    }
})


const axiosInstance = Object.assign(Object.create(newInstance), {
    cachedGet: async function(...args) {
        try{
            const argsAsArr = Array.prototype.slice.call(args);
            const cachedResponse = HeapStorageUtil.get(argsAsArr[0]);

            if (cachedResponse) {
                console.log("api response served from cache::",cachedResponse)
                return Promise.resolve(cachedResponse)
            }
            const apiresponse = await newInstance['get'].call(this, ...args);
            console.log("apiresponse:",apiresponse);
            HeapStorageUtil.set(argsAsArr[0], apiresponse);
            return Promise.resolve(apiresponse)
        }catch(err){
            return Promise.reject(err)
        }
        
    }
})

export default axiosInstance;
