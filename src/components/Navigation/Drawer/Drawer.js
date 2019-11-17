import React, {Component} from 'react'
import classes from './Drawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'

const links = [
    "Санкт-петербург", "История России", "Законы природы"
]

class Drawer extends Component {
    renderLinks () {
        return links.map ((link, index) => {
            return (
                <li key = {index}>
                    <a>{link}</a>
                </li>
            )   
        })
    }
    render () {
        const cls = [classes.Drawer]

        if (!this.props.isOpen) {
            cls.push(classes.close)
        }
        return (
            <React.Fragment>
                <nav className = {cls.join(' ')}>
                    <h1>Категории: </h1>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
                { this.props.isOpen ? <Backdrop onClick = {this.props.onCLose}/> : null}
            </React.Fragment>
        )
            
            
    }
}
export default Drawer