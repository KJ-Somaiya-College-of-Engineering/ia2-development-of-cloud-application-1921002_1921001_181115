import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class LoginModal extends Component {

    state={
        modal: false,
        email: '',
        password: '',
        msg: null
    }

    componentDidUpdate(prevProps){
        const { error, isAuthenticated } = this.props;
        if(error !== prevProps.error ){
            if(error.id === 'LOGIN_FAIL'){
                this.setState({ msg: error.msg.msg });
            }
            else{
               this.setState({ msg: null });
            }
        }
        
        if(this.state.modal){
            if(isAuthenticated){
                this.toggle();
            }
        }
    }

    toggle = () => {
        //Clear errors
        this.props.clearErrors();

        this.setState( prevState => ({
            modal:!prevState.modal,
            email: '',
            password: '',
            msg: null
        }));
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { email, password } = this.state;

        const user = {
            email,
            password
        };

        //Attempt to login
        this.props.login(user);
    }


    render() {
        return (
            <div>
                <NavLink onClick={this.toggle}  href='#' >
                    Login
                </NavLink>
                <Modal isOpen={this.state.modal}  toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle} >Login</ModalHeader>
                    <ModalBody>
                        {this.state.msg && <Alert color="danger" >{this.state.msg}</Alert> }
                        <Form onSubmit={this.onSubmit}  >
                            
                            <FormGroup>
                                <Label for="email" >Email</Label>
                                <Input 
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    onChange={this.onChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="password" >Password</Label>
                                <Input 
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    onChange={this.onChange}
                                />
                            </FormGroup>

                                <Button
                                type="submit"
                                color="dark"
                                style={{marginTop: '2rem', width:'100%'}}>
                                Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});


export default connect(mapStateToProps,{ login, clearErrors })(LoginModal);
