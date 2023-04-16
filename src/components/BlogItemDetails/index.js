import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class BlogItemdetails extends Component {
  state = {blogdata: {}, isLoading: true}

  componentDidMount() {
    this.getblogitemdetails()
  }

  getblogitemdetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/blogs/${id}`)
    const blogdetail = await response.json()

    const formateddata = {
      title: blogdetail.title,
      imageUrl: blogdetail.image_url,
      content: blogdetail.content,
      avatarUrl: blogdetail.avatar_url,
      author: blogdetail.author,
    }
    this.setState({blogdata: formateddata, isLoading: false})
  }

  displayblogitemdetails = () => {
    const {blogdata} = this.state
    const {title, imageUrl, content, avatarUrl, author} = blogdata

    return (
      <div className="blogdetailcontainer">
        <h1 className="blog-title">{title}</h1>
        <div className="author-info">
          <img className="author-image" src={avatarUrl} alt={author} />
          <p className="author-name">{author}</p>
        </div>
        <img className="blog-image" src={imageUrl} alt={title} />
        <p className="blog-content">{content}</p>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="blogdetail-container">
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
          </div>
        ) : (
          this.getblogitemdetails()
        )}
      </div>
    )
  }
}

export default BlogItemdetails
