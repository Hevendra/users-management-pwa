import React from "react";
import "./pagination.style.css";

const Pagination = ({ pageNo, isAllFetched, pageChangeCallback }) => {
  let nextPage = pageNo + 1;
  let prePage = pageNo <= 1 ? 1 : pageNo - 1;
  let preStatusClass = pageNo <= 1 ? "disabled" : "active";
  let nextStatusClass = isAllFetched ? "disabled" : "active";

  return (
    <div className="pagination">
      <a
        href="#/users/"
        onClick={e => pageChangeCallback(prePage)}
        className={preStatusClass}
      >
        ❮❮
      </a>
      <a
        href="#/users/"
        onClick={e => pageChangeCallback(nextPage)}
        className={nextStatusClass}
      >
        ❯❯
      </a>
    </div>
  );
};
export default Pagination;
