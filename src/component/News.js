import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component"


export class News extends Component {
  static defaultProps = {
    country: 'in',
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string
  }

  capitalize = (string) => {              /// ek capitalize function hai jo string ke firset character ko uppercase karta hai 
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  constructor(props) {
    super(props);
    this.state = {
      article: [],
      loading: false,      // Setting loading to false as Default 
      page: 1,
      totalResults: 0,

    }
    document.title = `${this.capitalize(this.props.category)} - NewsMonk`       //Aur yaha pe is category string ko capitalize kar diye hai 
  }


  async update() {
    this.props.setProgress(10)
    // const myAPI = ''
    const URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.myAPI}&page=${this.state.page}&pageSize=15`

    //Setting loading to true while fetching
    this.setState({
      loading: true
    })
    this.props.setProgress(30)
    this.props.setProgress(50)

    let data = await fetch(URL)
    let jsonData = await data.json()
    // console.log(jsonData)

    this.props.setProgress(60)

    this.setState({
      article: jsonData.articles,
      totalResults: jsonData.totalResults,        //Getting the total results of news from api
      loading: false,          //setting loading to false after it fetched 
      page: 2
    })
    this.props.setProgress(100)
  }


  async componentDidMount() {     //This is the default yani ki construcyor ke bad kya hoga 

    this.setState({
      // (prevState) =>({ page: prevState.page }),
      // () => this.update()
      // page: this.state.page - 1,
    })

    this.update()
  }


  fetchMoreData = async () => {
    this.props.setProgress(10)

    this.setState({
      // (prevState) => ({ page: prevState.page }),
      page: this.state.page + 1
    })
    const myAPI = '727a280dee8e4d7fa9557097f1f803cd'
    const URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${myAPI}&page=${this.state.page}&pageSize=15`

    let data = await fetch(URL)
    let jsonData = await data.json()
    console.log(jsonData)

    this.props.setProgress(50)

    this.setState({
      article: this.state.article.concat(jsonData.articles),
      totalResults: jsonData.totalResults,        //Getting the total results of news from api
      loading: false          //setting loading to false after it fetched 
    })
    this.props.setProgress(100)
    console.log(this.props.setProgress)
  }


query = () => {
  console.log('this is your query')
}

render() {
  return (
    <>
      <div className="container my-4">
        <b><h4 className='my-3'>NewsMonk - Top {this.capitalize(this.props.category)} News </h4></b>
      </div>

      {/* Spinner component */}
      {/* {this.state.loading && <Spinner />}   if this.state.loading true ho to Spinner ko render karo */}

      <InfiniteScroll
        dataLength={this.state.article.length}
        next={this.fetchMoreData}
        hasMore={this.state.article.length !== this.state.totalResults}
        loader={<Spinner />}
      >
        <div className="container" style={{ overflow: 'none !important' }}>
          <div className="row">

            {/* In below line, agar this.state.loading true nahi hai to this.state.article ke sabhi element me ye kardo  */}
            {this.state.article.map((element) => {

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
}

export default News