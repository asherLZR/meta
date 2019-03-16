import React from 'react';
import { Collection, CollectionItem ,Chip} from 'react-materialize'

import LogOut from './LogOut.js';

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};


class ArticleItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { article: props.article };
    }

    render() {
        return <CollectionItem>
        <div>
            <h5>{this.state.article.category[0].replaceAll('\"','')}</h5>
            <div>{".. " + this.state.article.article_snippet + " .."}</div>
            <div><Chip><img src='//logo.clearbit.com/abc.net.au' alt='News Icon'/>abcnews</Chip></div>
            </div>
        </CollectionItem>;
    }
}

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { articleList: [] };
    }

    componentDidMount() {
        fetch('/api/v1/stats/collection?username=' + 'hdas')
            .then(res => res.json())
            .then(response => {
                console.log(response);
                this.setState({articleList: response});
            })
            .catch(error => console.error(`Error: ${error}`));
    }

    render() {
        return (
            <div>
                <Collection>{this.state.articleList.map(function(x) {
                    console.log(x.source);
                    return <ArticleItem article={x}/>
                })}</Collection>
            </div>
        );
    }
}