import React, {Component} from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import {Row, Col} from 'reactstrap';
import axios from 'axios'


let reader = new FileReader();


class MainForm extends Component{
  constructor(props){
    super(props)
    this.state = {
      fileURL: "https://www.cameraegg.org/wp-content/uploads/2013/03/Canon-EOS-100D-Rebel-SL1-Sample-Image.jpg",
      disp: false,
      result: "",
      color: "",
      colors: [],
      display: "Upload the Image"
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    let imgFile = event.target.files[0];
    let base64String;
    reader.readAsDataURL(imgFile);
    reader.onloadend = ()=>{
      base64String = reader.result;
      this.setState({
        fileURL: base64String,
        file: imgFile,
        disp: false,
        display: "Submit to process"
      })
    }
  }
  handleSubmit(event){
    event.preventDefault();
    this.setState({
      display: "Processing..."
    })
    let newStr = this.state.fileURL.replace("data:image/jpeg;base64,/", "");
    console.log(newStr);
    axios({
      method: 'POST',
      url: 'http://127.0.0.1:8080/raju',
      data: {
        dataB: newStr,
        raja: "bhaiya"
      },
      headers: {'Access-Control-Allow-Origin': '*'}
    })
    .then(response => {
      let base64Data = response.data.image;
      let newColors = response.data.colors;
      console.log(base64Data)
      this.setState({
        result: base64Data,
        disp: true,
        colors: newColors
      })
      console.log(this.state.disp)
    });
  }
  nextC(){
    let index = this.state.colors.indexOf(this.state.color);
    console.log(index);
    if(index===this.state.colors.length-1){
      index = 0;
    }else{
      index++;
    }
    let newCol = this.state.colors[index];
    this.setState({
      color: newCol
    });
  }
  previousC(){
    let index = this.state.colors.indexOf(this.state.color);
    console.log(index)
    if(index!==0){
      index--;
    }else{
      index = this.state.colors.length-1;
    }
    let newCol = this.state.colors[index];
    this.setState({
      color: newCol
    });
  }
  stringToColor(str){
    let hash = 0;
    for(let i=0;i<str.length;i++){
      hash = str.charCodeAt(i) + ((hash << 5)-hash);
    }
    let colour = '#';
    for(let i=0;i<3;i++) {
      let value = (hash >> (i*8)) & 0xFF;
      colour += ('00'+value.toString(16)).substr(-2);
    }
    let colours = this.state.colors;
    colours.push(colour);
    this.setState({
      colors: colours
    })
    return colour;
  }
  render(){
    let showResult = <h2 className="res">{this.state.display}</h2>;;
    if(this.state.disp){
      showResult = <img alt="img" className="resultImage"  src={this.state.result}/>;
    }
    return (
      <div className="imagec container-fluid">
        <div><h1>Get Started</h1></div>
        <Row className="row-1">
            <Col className="cola-1" xs="4">
            <Form onSubmit={this.handleSubmit} className="imageForm">
              <h2>Upload Image</h2>
             <FormGroup>
               <Input src="" id="avatar" onChange={this.handleChange} type="file" />
             </FormGroup>
             <Button>Submit</Button>
             </Form>

            </Col>
            <Col className={this.state.style} xs="8">
              <img alt="img" className="previewImage" src={this.state.fileURL}/>
            </Col>
        </Row>
        <Row className="row-2">
          <Col className="j3" style={{background: this.state.color}} xs="7">
              <div>
                {showResult}
              </div>
          </Col>
          <Col className="cola-1 c2" xs="5">
              <h1>Change Background</h1>
              <div className="butDiv">
                <Button onClick={()=>{this.previousC()}}>Previous</Button>
                <Button onClick={()=>{this.nextC()}}>Next</Button>
              </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MainForm;
