import React from 'react';
// import axios from 'axios';

/*************************************************************************
 We ended up not using this but you can upload files with this. 
***************************************************************************/


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
        //Joseph go to dev tools to this console.log
        console.log("test button") 
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