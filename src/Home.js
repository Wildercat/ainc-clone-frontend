import React from 'react';
import axios from 'axios';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
        }
    }

    async getDocs() {
        let response;
        let params = {
          headers: {
            authorization: 'Bearer ' + this.props.apiKey
          }
        };
        console.log({ params });
        try {
          response = await axios.get('http://127.0.0.1:8000/api/documents', params);
        } catch (error) {
          // Error 
          if (error.response) {
            /*
             * The request was made and the server responded with a
             * status code that falls out of the range of 2xx
             */
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            /*
             * The request was made but no response was received, `error.request`
             * is an instance of XMLHttpRequest in the browser and an instance
             * of http.ClientRequest in Node.js
             */
            console.log(error.request);
          } else {
            // Something happened in setting up the request and triggered an Error
            console.log('Error', error.message);
          }
          console.log(error);
        }
        console.log(response.data.data);
        this.setState({data: response.data.data})
      }

    componentDidMount() {
        this.getDocs();
    }

    showDocs(docs) {
        // return (
        //     <p>{docs[0].title}</p>
        // );
        return docs.map(doc => {
            return this.doc(doc);
        })
    }

    doc(doc) {
        return (
            <div key={doc.id}>
                <h3>{doc.title}</h3>
                <p>{doc.content.substring(0, 40) + '...'}</p>
            </div>
        );
    }
    render() {
        const apiKey = this.props.apiKey;
        const documents = this.state.data ? this.showDocs(this.state.data) : <p>loading</p>;
        return (
            <>
            <h1>Documents</h1>
            {documents}
            </>
        );
    }
}

export default Home;