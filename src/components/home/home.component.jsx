import React, { useState, useEffect } from "react";
import { userService } from "../../services/user-service";
import UserDetail from "../user/user-detail.component";
import Pagination from "../shared/pagination.component";
import { DEFAULT_PAGE_SIZE } from '../constants'
import "./home.style.css";

const Home = () => {
  
  const [userList, setUserList] = useState([])
  const [pageNo, setPageNo] = useState(1)
  const [isAllFetched, setAllFetched] = useState(false) 

  const fetchUserFromApi = (pageNo, size) => {
  userService.fetchUsers(pageNo, size).then(
    res => {
      const {data, page, total_pages} = res
      setUserList(data)
      setAllFetched(page===total_pages)
    },
    error => {
      console.log(error);
    });
  }

  const deleteUserById = (id) => {
    console.log('Inside Delete '+id)
    let updatedUsersList = userList.filter(
      user => user.id !== id
    );
    setUserList(updatedUsersList)
  }

  const showUsers = () => {
    let users = [];
    if (userList.length) {
       users = userList.map((user, i) => {
          return <UserDetail
            key={i}
            data={user}
            handleDelete={deleteUserById}
          />
      });
    } else {
      users.push(
        <div key={1} className="display-name">
          No User data found!{" "}
        </div>
      );
    }
    return users;
  }

  const onPageChange = (pageNo)=> {
    setPageNo(pageNo)
  }

  useEffect(()=>{
    fetchUserFromApi(pageNo, DEFAULT_PAGE_SIZE);
  },[pageNo])

    return (
      <div className="App">
        <div className="header">
          <h1 className="App-title">User Management</h1>
          <Pagination
            pageNo={pageNo}
            isAllFetched={isAllFetched}
            pageChangeCallback={onPageChange}
          />
        </div>
        <div className="Container">{showUsers()}</div>
      </div>
    )
}

export default Home
