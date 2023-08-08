import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component"


const News = (props) => {
  const capitalize = (string) => {              /// ek capitalize function hai jo string ke first character ko uppercase karta hai 
    return string.charAt(0).toUpperCase() + string.slice(1)
  }


  const [article, setArticle] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)


  document.title = `${capitalize(props.category)} - NewsMonk`       //Aur yaha pe is category string ko capitalize kar diye hai 
  // }


  const update = async () => {
    props.setProgress(10)
    // const myAPI = ''
    const URL = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.myAPI}&page=${page}&pageSize=15`

    //Setting loading to true while fetching
    setLoading(true)

    props.setProgress(30)   //top loading bar setting value
    props.setProgress(50)

    let data = await fetch(URL)
    let jsonData = await data.json()

    props.setProgress(60)



    setArticle(jsonData.articles)
    setTotalResults(jsonData.totalResults)
    setLoading(false)
    // setPage(2)

    props.setProgress(100)
  }



  // useEffect also work as componentDidMount in class bsd comp. 
  useEffect(() => {
    update()
  }, [])



  // This is function from infine loading Pkg 
  const fetchMoreData = async () => {
    props.setProgress(10)

    setPage(page + 1)     //Page being + 1 

    const URL = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.myAPI}&page=${page + 1}&pageSize=15`

    let data = await fetch(URL)
    let jsonData = await data.json()
    console.log(jsonData)

    props.setProgress(50)

    setArticle(article.concat(jsonData.articles))
    setTotalResults(jsonData.totalResults)
    setLoading(false)

    props.setProgress(100)
  }


  return (
    <>
      <div className="container my-4">
        <b><h4 className='' style={{margin: '90px 0px 0px 15px'}}>NewsMonk - Top {capitalize(props.category)} News </h4></b>
      </div>

      {/* Spinner component */}
      {/* {this.state.loading && <Spinner />}   if this.state.loading true ho to Spinner ko render karo */}

      <InfiniteScroll
        dataLength={article.length}
        next={fetchMoreData}
        hasMore={article.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container" style={{ overflow: 'none !important' }}>
          <div className="row">

            {/* In below line, agar this.state.loading true nahi hai to this.state.article ke sabhi element me ye kardo  */}
            {article.map((element) => {

              return <div className="col-md-4 my-3" key={element.url}>

                <NewsItem title={element.title.slice(0, 60)}
                  description={element.description ? element.description : ""} imgURL={element.urlToImage ? element.urlToImage : "https://shorturl.at/kFIPR"} url={element.url} author={element.author ? element.author : 'unknown'} date={element.publishedAt} source={element.source.name} />
              </div>
            })
            }
          </div>
        </div>
      </InfiniteScroll>





      {/*handlePrevPage = async () => {
              //Without that changes prev-next button would not work properly
              this.setState(
                (prevState) => ({ page: prevState.page - 1 }),    //yaha pe ham function me argujent deke page ko -1 kar diye
                () => this.update()                             //AUR this.update ko setState ke andar hi call kiye function bana ke 
              )}
            */}



      {/*   handlePrevPage = async () => {
    //Without that changes prev-next button would not work properly
    this.setState(
      (prevState) => ({ page: prevState.page - 1 }),    //yaha pe ham function me argujent deke page ko -1 kar diye
      () => this.update()                             //AUR this.update ko setState ke andar hi call kiye function bana ke 
    );

  } */}


      {/* Previous and next button  */}
      {/* {!this.state.loading && <div className="prevNext d-flex justify-content-between" >
              <button className="btn btn-primary" disabled={this.state.page === 1} onClick={this.handlePrevPage}>Previous</button>
              <button className="btn btn-primary" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 15)} onClick={this.handleNextPage}>Next</button>
            </div>} */}
      {/* </div> */}
    </>
  )
}

//Default props 
News.defaultProps = {
  country: 'in',
  category: 'general'
}

// getting props 
News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string
}

export default News