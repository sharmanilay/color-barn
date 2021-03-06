import React, { Component } from "react";
import {Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink} from 'reactstrap';

class NavBar extends Component {
  constructor(props){
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle(){
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
        <div>
          <Navbar className="dark" dark expand="md">
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="m1-auto" navbar>
                <NavItem>
                  <NavLink href="#"><h2>Color Barn</h2></NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
    );
  }
}

export default NavBar;
