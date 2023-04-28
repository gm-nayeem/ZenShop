import {DEFAULT_IMG_URL} from "./private/URL";

export const userColumns = [
    { 
        field: "_id", 
        headerName: "ID", 
        width: 260 
    },
    {
        field: "user",
        headerName: "User",
        width: 260,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img className="cellImg" src={params.row.img || DEFAULT_IMG_URL} alt="avatar" />
                    {params.row.username}
                </div>
            );
        },
    },
    {
        field: "email",
        headerName: "Email",
        width: 220,
    },
];

export const productColumns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
        field: "title",
        headerName: "Title",
        width: 160,
    },
    {
        field: "images",
        headerName: "Prouct Images",
        width: 160,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img className="cellImg" src={params.row.img || DEFAULT_IMG_URL} alt="avatar" />
                    <img className="cellImg" src={params.row.img2 || DEFAULT_IMG_URL} alt="avatar" />
                </div>
            );
        },
    },
    {
        field: "type",
        headerName: "Type",
        width: 100,
    },
    {
        field: "price",
        headerName: "Price",
        width: 80,
    },
    {
        field: "categories",
        headerName: "Categories",
        width: 90,
    },
    {
        field: "subCategories",
        headerName: "subCategories",
        width: 120,
    },
];

export const orderColumns = [
    { 
        field: "_id", 
        headerName: "ID", 
        width: 240 
    },
    {
        field: "title",
        headerName: "Title",
        width: 180,
    },
    {
        field: "desc",
        headerName: "Description",
        width: 260,
    },
    {
        field: "price",
        headerName: "Price",
        width: 120,
    },
    {
        field: "maxPeople",
        headerName: "Max People",
        width: 120,
    },
];