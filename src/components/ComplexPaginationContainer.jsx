import { useLoaderData,useLocation,useNavigate } from "react-router-dom"

const ComplexPaginationContainer = () => {
  const {pagination} = useLoaderData();
  const {pageCount,page} =pagination;


  const {search,pathname} = useLocation();
  const navigate = useNavigate();

  const handlePageChange =  (pageNumber) =>{
    const searchParams = new URLSearchParams(search);
    searchParams.set('page',pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  }

  const addPageButton = ({pageNumber,activeClass}) =>{
    return(
        <button key={pageNumber} onClick={()=>handlePageChange(pageNumber)} className={`btn btn-xs sm:btn-md border-none join-item ${activeClass?'bg-base-300 border-base-300': ''}`}>{pageNumber}</button>
      )
  }

  const renderPageButtons = ()=>{
    const pageButtons =[];
    // first button
    pageButtons.push(addPageButton(({pageNumber :1,activeClass:parseInt(page) === 1})));

    if(page > 2){
        //dots1
        pageButtons.push(<button className="join-item btn btn-xs sm:btn-md" key='dots-1'>...</button>)
    }
    

    //active page
    if(page!=1 && page!=pageCount){
        pageButtons.push(addPageButton(({pageNumber :page,activeClass:true})));

    }

    if(page < pageCount-1){
        //dots2
        pageButtons.push(<button className="join-item btn btn-xs sm:btn-md" key='dots-1'>...</button>)
    }

    //last button
    pageButtons.push(addPageButton(({pageNumber :pageCount,activeClass:parseInt(page) === pageCount})));
    return pageButtons;
  }

  if(pageCount < 2) return null;

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button className="btn btn-xs sm:btn-md join-item uppercase" onClick={()=>{
            let prevPage=parseInt(page)-1;
            if(prevPage<1) prevPage=pageCount;
            handlePageChange(prevPage);
          }}>
          Prev
        </button>
        {renderPageButtons()}
        <button className="btn btn-xs sm:btn-md join-item uppercase" onClick={()=>{
          let nextPage=parseInt(page)+1;
          if(nextPage > pageCount) nextPage=1;
          handlePageChange(nextPage);
        }}>
          Next
        </button>
      </div>
    </div>
  )
}
export default ComplexPaginationContainer