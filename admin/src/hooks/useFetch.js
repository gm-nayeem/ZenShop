import { useEffect, useState } from "react";
import { publicRequest, userRequest } from "../utils/makeRequest";
import { getUserSuccessful} from '../redux/userRedux/userReducer';
import { getProductSuccessful } from '../redux/productRedux/productReducer';
import { useDispatch } from "react-redux";

const useFetch = (url, requestType = "") => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const dispatch = useDispatch();

    // fetch data from server
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (requestType === "userRequest") {
                    const res = await userRequest.get(url);
                    setData(res.data);
                    setLoading(false);
                    dispatch(getUserSuccessful(res.data));
                } else {
                    const res = await publicRequest.get(url);
                    setData(res.data);
                    setLoading(false);
                    dispatch(getProductSuccessful(res.data));
                }
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };
        fetchData();
    }, [url]);


    // refetch data
    const reFetch = async () => {
        setLoading(true);
        try {
            const res = await publicRequest.get(url);
            setData(res.data);
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    };

    return { data, loading, error, reFetch };
};

export default useFetch;