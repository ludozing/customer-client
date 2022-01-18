import { useReducer, useEffect } from "react";
// LOADING, SUCCESS, ERROR
function reducer(state, action){
    switch(action.type){
        case 'LOADING':
            return {
                loading: true,
                data: null,
                error: null
            };
        case 'SUCCESS':
            return {
                loading: false,
                data: action.data,
                error: null
            };
        case 'ERROR':
            return {
                loading: false,
                data: null,
                error: action.error
            };
        default:
            return state;
    };
}

function useAsync(callback, deps=[]){
    // 상태관리하기
    // useReducer(함수, 초기값)
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        data: null,
        error: null
    });
    const fetchData = async () => {
        try{
            dispatch({ type: 'LOADING' })
            const data = await callback()
            // 요청이 성공했을 때
            dispatch({ type: 'SUCCESS', data: data });
        }
            // 요청이 실패했을 때
        catch(e){
            dispatch({ type: 'ERROR', error: e });
        }
    };
    // render 하고 난 다음에 호출
    useEffect(()=>{
        fetchData();
    },deps);
    return state;
}
export default useAsync;