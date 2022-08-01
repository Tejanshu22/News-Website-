import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount() {
        let url = "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=736e36f1b8f84f97ab389028701b6bde&page=1&pageSize = 20";
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(data);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })

    }

    handelPreviousClick = async () => {
        let url = `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=736e36f1b8f84f97ab389028701b6bde&page=${this.state.page - 1}&pageSize = 20`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(data);
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })
    }

    handelNextClick = async () => {
        let url = `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=736e36f1b8f84f97ab389028701b6bde&page=${this.state.page + 1}&pageSize = 20`;
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {

        }
        else {
            this.setState({ loading: true })
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false
            })
        }
    }

    render() {
        return (
            <div className='container my-3'>
                <h1>Saru News - Top Headlines</h1>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-3" key={element.url}>
                            <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between ">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-danger" onClick={this.handelPreviousClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 20)} type="button" className="btn btn-success" onClick={this.handelNextClick}>Next&rarr;</button>
                </div>
            </div>
        )
    }
}

export default News