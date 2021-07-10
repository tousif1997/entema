import React, { useEffect, useState, useMemo } from "react";


import useFullPageLoader from "../../../hooks/useFullPageLoader";
import { TableHeader , Pagination, Search} from "../../DataTable";


const DataTable = () => {
    const [comments, setComments] = useState([]);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 10;

    const headers = [
        { name: "Id", field: "Id", sortable: false },
        { name: "Client", field: "Client", sortable: false },
        { name: "Address", field: "Address", sortable: false },
        { name: "Shipping Address", field: "Shipping Address", sortable: false },
        { name: "Order Date", field: "Order Date", sortable: false },
        { name: "Dispatch Date", field: "Dispatch Date", sortable: false },
        { name: "Notic", field: "Notic", sortable: false },
    ];

    useEffect(() => {
        const getData = () => {
            showLoader();

            fetch("http://localhost:3009/getDeliveryNoteData")
                .then(response => response.json())
                .then(json => {
                    hideLoader();
                    setComments(json);
                    console.log(json);
                });
        };

        getData();
    }, []);

    const test=(data)=>{
      alert('hurrray :'+data);
    }
    const commentsData = useMemo(() => {
        let computedComments = comments;

        if (search) {
            computedComments = computedComments.filter(
                comment =>
                    comment.DEL_CLIENT.toLowerCase().includes(search.toLowerCase()) ||
                    comment.DEL_ORDER_DATE.toLowerCase().includes(search.toLowerCase())
            );
        }

        setTotalItems(computedComments.length);

        //Sorting comments
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            computedComments = computedComments.sort(
                (a, b) =>
                    reversed * a[sorting.field].localeCompare(b[sorting.field])
            );
        }

        //Current Page slice
        return computedComments.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
    }, [comments, currentPage, search, sorting]);

    return (
        <>
        

        <div class="scrollbar square scrollbar-lady-lips thin">
        <div class="container" style={{ paddingTop: '3px', paddingLeft: '5px' }}>
        <div className="heading-layout1">
                    <div className="item-title">
                        <h3 style={{ padding: "50px" }}>View Delivery Note</h3>
                    </div>
                    </div>
                    
            <div className="row w-100">
                <div className="col mb-3 col-12 text-center">
                    <div className="row">
                        
                        <div className="col-md-6 d-flex flex-row-reverse" style={{marginBottom:'30px',marginLeft:'340px'}}>
                            <Search
                                onSearch={value => {
                                    setSearch(value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                    </div>

                    <table className="table table-striped">
                        <TableHeader
                            headers={headers}
                            onSorting={(field, order) =>
                                setSorting({ field, order })
                            }
                        />
                        <tbody>
                            {commentsData.map(comment => (
                                <tr>
                                    <th scope="row" key={comment.NOTE_ID}>
                                        {comment.NOTE_ID}
                                    </th>
                                    <td onClick={()=>test(comment.NOTE_ID)}>{comment.DEL_CLIENT}</td>
                                    <td>{comment.DEL_ADD}</td>
                                    <td>{comment.DEL_SHIP_ADD}</td>
                                    <td>{comment.DEL_ORDER_DATE}</td>
                                    <td>{comment.DEL_DISP_DATE}</td>
                                    <td>{comment.DEL_NOTICE}</td>
                                    <td>{comment.CREATED_DATE}</td>
                                    <td>{comment.CREATED_BY}</td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="col-md-6"> 
                            <Pagination
                                total={totalItems}
                                itemsPerPage={ITEMS_PER_PAGE}
                                currentPage={currentPage}
                                onPageChange={page => setCurrentPage(page)}
                            />
                        </div>
            </div></div></div>
            {loader}
        </>
    );
};

export default DataTable;