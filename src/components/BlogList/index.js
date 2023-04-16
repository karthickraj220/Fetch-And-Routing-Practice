import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import BlogItem from '../BlogItem'

import './index.css'

class BlogList extends Component {
  state = {isLoading: true, blogList: []}

  componentDidMount() {
    this.getblogsdata()
  }

  getblogsdata = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const blogsdata = await response.json()
    const formateddata = blogsdata.map(eachItem => ({
      id: eachItem.id,
      title: eachItem.title,
      imageUrl: eachItem.image_url,
      avatarUrl: eachItem.avatar_url,
      author: eachItem.author,
      topic: eachItem.topic,
    }))

    this.setState({isLoading: false, blogList: formateddata})
  }

  render() {
    const {isLoading, blogList} = this.state
    console.log(blogList)

    return (
      <div className="blogList-container">
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
          </div>
        ) : (
          blogList.map(item => <BlogItem blogData={item} key={item.id} />)
        )}
      </div>
    )
  }
}

export default BlogList
