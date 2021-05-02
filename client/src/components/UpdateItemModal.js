import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

import { connect } from 'react-redux';
import { updateItem } from '../actions/itemActions';

class UpdateItemModal extends Component {

    state={
        // modal:false,
        name:''
    }

    // toggle = () => {
    //     this.setState( prevState => ({
    //         modal:!prevState.modal
    //     }));
    // }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        // const newItem = {
        //     name:this.state.name
        // }

        //Add item via addItem action
        this.props.updateItem(this.props.id, this.state.name);

        //Close the modal
        this.props.toggle();
    }


    render() {
        return (
            <div>

                
                <Modal isOpen={this.props.modal}  toggle={this.props.toggle} >
                    <ModalHeader toggle={this.props.toggle} >Update item</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}  >
                            <FormGroup>
                                <Label for="item" >Item</Label>
                                <Input 
                                    type="text"
                                    name="name"
                                    id="item"
                                    placeholder="Update Shopping Item"
                                    onChange={this.onChange}
                                />
                                <Button
                                color="dark"
                                style={{marginTop: '2rem'}} block>
                                Update Item</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
}) 


export default connect(mapStateToProps,{ updateItem })(UpdateItemModal);
