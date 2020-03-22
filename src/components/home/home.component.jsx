import React, { useState, useEffect } from 'react';
import { userService } from '../../services/user-service';
import UserDetail from '../user/user-detail.component';
import Pagination from '../shared/pagination.component';
import Search from '../shared/search.component'
import { DEFAULT_PAGE_SIZE } from '../constants'
import "./home.style.css";

const Home = () => {
  
  const [userList, setUserList] = useState([])
  const [pageNo, setPageNo] = useState(1)
  const [isAllFetched, setAllFetched] = useState(false)
  const [allUsers, setAllUsers] = useState([])
  
  const fetchUserFromApi = (pageNo, size) => {
  userService.fetchUsers(pageNo, size).then(
    res => {
      const {data, page, total_pages} = res
      setUserList(data)
      setAllFetched(page===total_pages)
      setAllUsers(data)
    },
    error => {
      console.log(error);
    });
  }

  const deleteUserById = (id) => {
    let updatedUsersList = userList.filter(
      user => user.id !== id
    );
    setUserList(updatedUsersList)
    setAllUsers(updatedUsersList)
  }

  const searchUsers = (searchTxt) =>{
    let updatedUsersList = allUsers.filter(user =>   
      `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTxt.toLowerCase())
    );
    setUserList(updatedUsersList)
  }

  const onSearchChange = (e) => {
    const { target:{value}} = e
    if(value.length>2)
    {
      searchUsers(value)
    }
    else if(value.length===2){
      setUserList(allUsers)  
    }
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
          <div className="search-container">
          <Search handleChange={onSearchChange}/>
          <Pagination
            pageNo={pageNo}
            isAllFetched={isAllFetched}
            pageChangeCallback={onPageChange}
          />
          </div>
        </div>
        <div className="Container">{showUsers()}</div>
      </div>
    )
}

export default Home
