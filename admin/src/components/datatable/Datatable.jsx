import './datatable.scss';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {deleteUser} from '../../redux/userRedux/userApiCalls';
import {deleteProduct} from '../../redux/productRedux/productApiCalls';
import { useDispatch } from 'react-redux';
import useFetch from '../../hooks/useFetch';


const Datatable = ({ columns }) => {
    const location = useLocation();
    const path = location.pathname.split("/")[1];
    const [lists, setLists] = useState([]);
    const dispatch = useDispatch();

    const { data, loading, error } = useFetch(
        `/${path}/all?new=true`, 
        path==="users" && "userRequest"
    );

    // set data
    useEffect(() => {
        setLists(data);
    }, [data]);

    // handle delete
    const handleDelete = async (id) => {
        if(path === 'users') {
            deleteUser(dispatch, id)
        } else if(path === 'products') {
            deleteProduct(dispatch, id)
        }
    }

    // create action column
    const actionColumn = [
        {
            field: "action", 
            headerName: "Action", 
            width: 200, 
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to={`/${path}/${params.row._id}`} className='link'>
                            <div className="viewButton">View</div>
                        </Link>
                        <div
                            className="deleteButton"
                            onClick={() => handleDelete(params.row._id)}
                        >
                            Delete
                        </div>
                    </div>
                )
            }
        }
    ]

    return (
        <>
            {
                loading ? (
                    "Loading please wait..."
                ) : error ? (
                    "Something went wrong!!"
                ) : (
                    <div className="datatable">
                        <div className="datatableTitle">
                            <span>{path}</span>
                            <Link to={`/${path}/new`} className='link linkStyle'>
                                <button> Add New</button>
                            </Link>
                        </div>
                        <DataGrid
                            rows={lists}
                            columns={columns.concat(actionColumn)}
                            pageSize={7}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                            getRowId={(row) => row._id}
                        />
                    </div>
                )
            }
        </>
    );
}

export default Datatable;