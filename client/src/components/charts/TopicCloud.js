import React from 'react';
import WordCloud from 'react-d3-cloud';

// TODO: will use the data from the database
const TOPICS = ["food", "sport", "weather", "reading", "music", "movie", "pet", "tv" ];

class TopicCloud extends React.Component {

    // convert from an array of topics to the format used for the word cloud
    tagItems = () => TOPICS.map(topic => ({
        text : topic, 
        value : 1000 * Math.random()  // will be used for font size and rotation
    }));

    fontSizeMapper = word => Math.log2(word.value) * 5;
    rotate = word => word.value % 360;

    render() {
        return (
            <div>
                <WordCloud
                    data={this.tagItems()}
                    fontSizeMapper={this.fontSizeMapper}
                    // rotate={this.rotate}
                />
            </div>
        );
    }
}

export default TopicCloud;