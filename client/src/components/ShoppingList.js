import React, { Component } from 'react';
import {Container, Button, ListGroup, ListGroupItem} from 'reactstrap';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import UpdateItemModal from './UpdateItemModal'

class ShoppingList extends Component {
    componentDidMount(){
        this.props.getItems();
    }

    state= {
        modal: false,
        selectedId: null
    }

    toggle = () => {
        this.setState( prevState => ({
            modal:!prevState.modal
        }));
    }


    onDeleteClick = (id) => {
        this.props.deleteItem(id);
    }

    onUpdateClick = (id, name) => {
        this.setState({ selectedId: id}, () => {
            this.toggle()
        })
    }

    render() {
        const {items} = this.props.item;

        return (
            <Container>
                <UpdateItemModal  modal={this.state.modal}  toggle={this.toggle} id={this.state.selectedId}  />
                <ListGroup>
                    <TransitionGroup  className='shopping-list'>
                        {items.map(({_id,name}) =>(
                            <CSSTransition key={_id} timeout={500}  classNames='fade' >
                                <ListGroupItem>
                                    { this.props.isAuthenticated && <Button 
                                    className='remove-btn'
                                    color='danger'
                                    size='sm'
                                    onClick={this.onDeleteClick.bind(this,_id)}>
                                      &times;
                                    </Button>
                                    }
                                    { this.props.isAuthenticated && <Button 
                                    size='sm'
                                    style={{ marginRight: 5}}
                                    onClick={this.onUpdateClick.bind(this,_id,name)}>
                                      Update
                                    </Button>
                                    }
                                   
                                    {name}
                                </ListGroupItem>

                            </CSSTransition>
                        ) )}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { getItems,deleteItem })(ShoppingList);
