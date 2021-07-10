import React, { useEffect, useState, useMemo } from "react";
import Popup from './userModal';

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

    const ITEMS_PER_PAGE = 10;

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const headers = [
        { name: "Id", field: "Id", sortable: false },
        { name: "User Name", field: "User Name", sortable: false },
        { name: "Full Name", field: "Full Name", sortable: false },
        { name: "Email", field: "Email", sortable: false },
        { name: "Phone", field: "Phone", sortable: false },
        { name: "Designation", field: "Designation", sortable: false },
        { name: "Role", field: "Role", sortable: false },
        { name: "Status", field: "Status", sortable: false }
    ];

    useEffect(() => {
        const getData = () => {
            showLoader();

            fetch("http://localhost:3009/getUserData")
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
                    comment.USER_NAME.toLowerCase().includes(search.toLowerCase()) ||
                    comment.USER_DESIG.toLowerCase().includes(search.toLowerCase())
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
                            <h3 style={{ padding: "50px" }}>View Users</h3>
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
                                            <th scope="row" key={comment.USER_ID}>
                                                {comment.USER_ID}
                                            </th>
                                            <td onClick={() => openInPopup(comment.USER_ID)}>{comment.USER_NAME}</td>
                                            <td>{comment.USER_FNAME}</td>
                                            <td>{comment.USER_EMAIL}</td>
                                            <td>{comment.USER_PHONE}</td>
                                            <td>{comment.USER_DESIG}</td>
                                            <td>{comment.USER_ROLE}</td>
                                            <td>{comment.USER_STATUS}</td>

                                        </tr>
                                    ))}
                                </tbody>
                                {/* <tr>
                                    <th scope="row" >
                                        ID
                                    </th>
                                    <td onClick={() => openInPopup()}>NAME</td>
                                    <td>Age</td>
                                    <td>ADDRESS</td>
                                    <td>CITY</td>
                                    <td>CONTACTNO</td>
                                    <td>SALARY</td>
                                    <td>DEOARTMENT</td>

                                </tr> */}
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