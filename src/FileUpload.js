import React from 'react';
// import axios from 'axios';


class FileUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            csvFile: null,
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onChangeHandler=event=>{
        this.setState ({
            csvFile: event.target.files[0],
        })
        console.log(this.state.csvFile)
    }

    onClickHandler = () => {
        console.log("got rid of axios look for post request into dynamo")
    //     const data = new FormData()
    //     data.append('file', this.state.csvFile)
    //     axios.post("http://localhost:8000/upload", data, { 
    //        // receive two    parameter endpoint url ,form data
    //    })
    //    .then(res => { // then print response status
    //     console.log(res.statusText)
    //  })
    
    }

   
    render() {
        return(
                <div>
                    <form>
                        <h1>Upload CSV file</h1>
                            <input type="file" name="file" onChange={this.onChangeHandler} />            
                        <br />
                        <button type="button" class="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button> 
                        <br />
                    </form>
                </div>
        );            
    }
}
export default FileUpload