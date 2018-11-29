import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {Row, Col} from 'reactstrap';


class MainForm extends Component{
  constructor(props){
    super(props)
    this.state = {
      file: "https://www.cameraegg.org/wp-content/uploads/2013/03/Canon-EOS-100D-Rebel-SL1-Sample-Image.jpg"
    }

    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    })
  }

  render(){
    return (
      <div className="container-fluid">
        <Row>
            <Col xs="6">
            <Form className="imageForm">
             <FormGroup>
               <Label for="exampleEmail">Email</Label>
               <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
             </FormGroup>
             <FormGroup>
               <Label for="examplePassword">Password</Label>
               <Input src="" id="avatar" onChange={this.handleChange} type="file" />
             </FormGroup>
             <FormGroup>
               <Label for="exampleSelect">Select</Label>
               <Input type="select" name="select" id="exampleSelect">
                 <option>1</option>
                 <option>2</option>
                 <option>3</option>
                 <option>4</option>
                 <option>5</option>
               </Input>
             </FormGroup>
             <Button>Submit</Button>
             </Form>
            </Col>
            <Col xs="6">
              <img className="previewImage" src={this.state.file}/>
            </Col>
        </Row>
      </div>
    );
  }
}

export default MainForm;
