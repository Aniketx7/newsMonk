import React from 'react'

const NewsItem = (props) => {
    // let { title, description, imgURL, url, author, date , source} = props
    return (
      <>
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-img-container">
                <img src={props.imgURL} className="card-img-top" alt="..." />
              </div>
              <div className="card-body">
                <h5 className="card-title">{props.title}...</h5>
                <p className="card-text description">{props.description}</p>

                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success" style={{zIndex: '1'}}>
                 {props.source}
                  <span className="visually-hidden">unread messages</span>
                </span>
              </div>
                <p className="card-text date"><small className="text-muted">By {props.author} on {new Date(props.date).toUTCString()}</small></p>
              <a href={props.url} target="_blank" rel="noreferrer" className='btn  btn-primary read-more'>Read more</a>
            </div>
          </div>
        </div>

      </>
    )
  }

export default NewsItem