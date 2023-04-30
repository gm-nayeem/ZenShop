import { DEFAULT_IMG_URL } from "./private/URL";

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
                    <img
                        className="cellImg"
                        src={params.row.profilePic || DEFAULT_IMG_URL}
                        alt="avatar"
                    />
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
        headerName: "Order Id",
        width: 220
    },
    {
        field: "userId",
        headerName: "User Id",
        width: 220,
    },
    {
        field: "products",
        headerName: "Products Quantity",
        width: 160,
        renderCell: (params) => {
            let quan = 0;
            params.row.products.forEach(p => {
                quan += p.quantity
            });

            return (
                <div>
                    {quan}
                </div>
            );
        },
    },
    {
        field: "amount",
        headerName: "Total Amount",
        width: 120,
    },
    {
        field: "status",
        headerName: "Status",
        width: 120,
    },
];

export const categoryColumns = [
    {
        field: "_id",
        headerName: "ID",
        width: 240
    },
    {
        field: "title",
        headerName: "Title",
        width: 140,
    },
    {
        field: "img",
        headerName: "Image",
        width: 90,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img
                        className="cellImg"
                        src={params.row.img || DEFAULT_IMG_URL}
                        alt="avatar"
                    />
                </div>
            );
        },
    },
    {
        field: "desc",
        headerName: "Description",
        width: 260,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    {params.row.desc.slice(0, 50)}
                </div>
            );
        },
    }
];

export const subCategoryColumns = [
    {
        field: "_id",
        headerName: "ID",
        width: 240
    },
    {
        field: "title",
        headerName: "title",
        width: 140,
    },
    {
        field: "categories",
        headerName: "Categories",
        width: 400,
        renderCell: (params) => {
            return (
                <div>
                    {
                        params.row.categories.map(cat => (
                            <span style={{marginRight: "5px"}}>{cat}</span>
                        ))
                    }
                </div>
            );
        },
    }
];