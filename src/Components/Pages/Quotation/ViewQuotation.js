import React, { useEffect, useState, useMemo } from "react";
import Popup from "./quotationModal";
import useFullPageLoader from "../../../hooks/useFullPageLoader";
import { TableHeader, Pagination, Search } from "../../DataTable";


const DataTable = () => {

    const [comments, setComments] = useState([]);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const [openPopup, setOpenPopup] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null)


    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const ITEMS_PER_PAGE = 10;

    const headers = [
        { name: "Quot Id", field: "Quot Id", sortable: false },
        { name: "Doc No", field: "Doc No", sortable: false },
        { name: "Vendor", field: "Vendor", sortable: false },
        { name: "Work Started", field: "Work Started", sortable: false },
        { name: "Work Ended", field: "Work Ended", sortable: false },
        { name: "Created By", field: "Created By", sortable: false },
        { name: "Work Location", field: "Work Location", sortable: false },
        { name: "Quatation", field: "Quatation", sortable: false },
        { name: "Work Order No", field: "Work Order No", sortable: false },
        { name: "Status", field: "Status", sortable: false }
    ];

    useEffect(() => {
        const getData = () => {
            showLoader();

            fetch("http://localhost:3009/getQuatData")
                .then(response => response.json())
                .then(json => {
                    hideLoader();
                    setComments(json);
                    console.log(json);
                });
        };

        getData();
    }, []);

    const test = (data) => {
        alert('hurrray :' + data);
    }
    const commentsData = useMemo(() => {
        let computedComments = comments;

        if (search) {
            computedComments = computedComments.filter(
                comment =>
                    comment.VI_VENDOR.toLowerCase().includes(search.toLowerCase()) ||
                    comment.WS_LOC.toLowerCase().includes(search.toLowerCase())
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
                            <h3 style={{ padding: "50px" }}>View Quatation Order</h3>
                        </div>
                    </div>

                    <div className="row w-100">
                        <div className="col mb-3 col-12 text-center">
                            <div className="row">

                                <div className="col-md-6 d-flex flex-row-reverse" style={{ marginBottom: '30px', marginLeft: '340px' }}>
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
                                            <th scope="row" key={comment.Quot_ID}>
                                                {comment.Quot_ID}
                                            </th>
                                            <td onClick={() => openInPopup(comment.Quot_ID)}>{comment.Quot_ID}</td>
                                            <td onClick={() => openInPopup(comment.Quot_ID)}>{comment.DOC_NO}</td>
                                            <td>{comment.VI_VENDOR}</td>
                                            <td>{comment.WS_START_DATE}</td>
                                            <td>{comment.WS_END_DATE}</td>
                                            <td>{comment.CREATED_BY}</td>
                                            <td>{comment.WS_LOC}</td>
                                            <td>{comment.WO_QUO_REF}</td>
                                            <td>{comment.WO_NUMBER}</td>
                                            <td>"Approve"</td>

                                        </tr>
                                    ))}
                                    {/* <tr>
                                        <th scope="row" >
                                            ID
                                        </th>
                                        <td onClick={() => openInPopup()}>QUOTID</td>
                                        <td onClick={() => openInPopup()}>DOCNO</td>
                                        <td>Vender</td>
                                        <td>start date</td>
                                        <td>End date</td>
                                        <td>createdby</td>
                                        <td>LOC</td>
                                        <td>REF</td>
                                        <td>NUMBER</td>
                                        <td>"Approve"</td>

                                    </tr> */}
                                </tbody>
                            </table>
                            <Popup
                                title="Employee Form"
                                openPopup={openPopup}
                                setOpenPopup={setOpenPopup}
                            ></Popup>
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